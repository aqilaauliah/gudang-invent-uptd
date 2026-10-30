<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Activitylog\Models\Activity;
use Tests\TestCase;

class ActivityFilterTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolePermissionSeeder::class);
    }

    public function test_activity_filters_search_causer_name_and_match_local_date_and_type(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $siti = User::factory()->create(['name' => 'Siti Aminah']);
        $budi = User::factory()->create(['name' => 'Budi Santoso']);

        $this->createActivity($siti, 'Penerimaan inventaris dicatat', 'barang_masuk', '2026-10-29 17:00:00');
        $this->createActivity($budi, 'Barang masuk lainnya', 'barang_masuk', '2026-10-29 17:00:00');
        $this->createActivity($siti, 'Penerimaan sebelum tanggal pilihan', 'barang_masuk', '2026-10-29 16:59:59');
        $this->createActivity($siti, 'Perubahan aset', 'ubah_aset', '2026-10-29 17:00:00');

        $this->actingAs($admin)
            ->get('/aktivitas?search=Siti&date_from=2026-10-30&date_to=2026-10-30&type=barang_masuk')
            ->assertInertia(fn (Assert $page) => $page
                ->component('Aktivitas/Index')
                ->has('activities.data', 1)
                ->where('activities.data.0.description', 'Penerimaan inventaris dicatat')
                ->where('activities.data.0.causer', 'Siti Aminah')
                ->where('filters.search', 'Siti')
                ->where('filters.date_from', '2026-10-30')
                ->where('filters.date_to', '2026-10-30')
                ->where('filters.type', 'barang_masuk')
            );
    }

    private function createActivity(User $causer, string $description, string $type, string $createdAt): void
    {
        Activity::query()->create([
            'log_name' => 'default',
            'description' => $description,
            'causer_type' => User::class,
            'causer_id' => $causer->id,
            'properties' => ['type' => $type],
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);
    }
}
