<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\ItemLocationStock;
use App\Models\Location;
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

    public function test_asset_export_endpoint_is_removed(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');

        $this->actingAs($admin)->get('/aset/export/pdf')->assertNotFound();
    }

    public function test_admin_can_correct_stock_but_petugas_cannot(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $petugas = User::factory()->create();
        $petugas->assignRole('Petugas Gudang');
        $item = Item::create([
            'kode' => 'ATK-001',
            'nama' => 'Kertas',
            'kategori' => 'ATK',
            'satuan' => 'Rim',
            'stok_minimum' => 1,
            'status' => 'aktif',
        ]);
        $location = Location::create(['nama' => 'Gudang Utama']);
        ItemLocationStock::create([
            'item_id' => $item->id,
            'location_id' => $location->id,
            'jumlah' => 10,
        ]);

        $this->actingAs($petugas)
            ->put("/persediaan/{$item->id}", [
                'location_id' => $location->id,
                'jumlah' => 3,
            ])
            ->assertForbidden();

        $this->actingAs($admin)
            ->put("/persediaan/{$item->id}", [
                'location_id' => $location->id,
                'jumlah' => 3,
            ])
            ->assertRedirect()
            ->assertSessionHas('flash_message', 'Persediaan berhasil diperbarui.');

        $this->assertDatabaseHas('item_location_stocks', [
            'item_id' => $item->id,
            'location_id' => $location->id,
            'jumlah' => 3,
        ]);
    }

    public function test_stock_correction_rejects_negative_quantity(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $item = Item::create([
            'kode' => 'ATK-002',
            'nama' => 'Pulpen',
            'kategori' => 'ATK',
            'satuan' => 'Box',
            'status' => 'aktif',
        ]);
        $location = Location::create(['nama' => 'Gudang Sekunder']);

        $this->actingAs($admin)
            ->put("/persediaan/{$item->id}", [
                'location_id' => $location->id,
                'jumlah' => -1,
            ])
            ->assertSessionHasErrors('jumlah');
    }

}
