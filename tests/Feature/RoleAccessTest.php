<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolePermissionSeeder::class);
    }

    public function test_petugas_can_open_operational_read_and_transaction_pages(): void
    {
        $petugas = User::factory()->create();
        $petugas->assignRole('Petugas Gudang');

        $this->assertTrue($petugas->can('view-items'));
        $this->assertFalse($petugas->can('manage-items'));
        $this->assertFalse($petugas->can('manage-users'));

        foreach (['/barang', '/persediaan', '/barang-masuk', '/barang-keluar', '/mutasi', '/aset', '/lokasi', '/profile'] as $path) {
            $this->actingAs($petugas)->get($path)->assertOk();
        }
    }

    public function test_petugas_is_allowed_to_submit_operational_transactions(): void
    {
        $petugas = User::factory()->create();
        $petugas->assignRole('Petugas Gudang');

        $this->actingAs($petugas)
            ->from('/barang-masuk')
            ->post('/barang-masuk', [])
            ->assertSessionHasErrors();
    }

    public function test_petugas_cannot_open_admin_pages_or_mutate_master_data(): void
    {
        $petugas = User::factory()->create();
        $petugas->assignRole('Petugas Gudang');

        $this->actingAs($petugas)->get('/pengguna')->assertForbidden();
        $this->actingAs($petugas)->get('/aktivitas')->assertForbidden();
        $this->actingAs($petugas)->get('/laporan')->assertForbidden();
        $this->actingAs($petugas)->get('/aset/create')->assertForbidden();
        $this->actingAs($petugas)->post('/barang', [])->assertForbidden();
        $this->actingAs($petugas)->post('/lokasi', [])->assertForbidden();
        $this->actingAs($petugas)->get('/laporan/export/pdf')->assertForbidden();
    }

    public function test_authenticated_user_without_a_role_cannot_open_the_dashboard(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/dashboard')->assertForbidden();
    }

    public function test_admin_can_open_administration_pages(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');

        $this->assertTrue($admin->can('view-reports'));
        $this->actingAs($admin)->get('/pengguna')->assertOk();
        $this->actingAs($admin)->get('/aktivitas')->assertOk();
        $this->actingAs($admin)->get('/aset/create')->assertOk();
    }
}
