<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\ItemLocationStock;
use App\Models\Location;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['kode' => 'ATK-001', 'nama' => 'Kertas A4', 'kategori' => 'ATK', 'satuan' => 'Rim', 'stok_minimum' => 5],
            ['kode' => 'ATK-002', 'nama' => 'Kertas F4', 'kategori' => 'ATK', 'satuan' => 'Rim', 'stok_minimum' => 3],
            ['kode' => 'ATK-003', 'nama' => 'Pulpen', 'kategori' => 'ATK', 'satuan' => 'Pcs', 'stok_minimum' => 10],
            ['kode' => 'ATK-004', 'nama' => 'Spidol', 'kategori' => 'ATK', 'satuan' => 'Pcs', 'stok_minimum' => 5],
            ['kode' => 'ATK-005', 'nama' => 'Map Ordner', 'kategori' => 'ATK', 'satuan' => 'Pcs', 'stok_minimum' => 5],
            ['kode' => 'ATK-006', 'nama' => 'Amplop', 'kategori' => 'ATK', 'satuan' => 'Box', 'stok_minimum' => 3],
            ['kode' => 'ATK-007', 'nama' => 'Tinta Printer', 'kategori' => 'ATK', 'satuan' => 'Pcs', 'stok_minimum' => 2],
            ['kode' => 'ATK-008', 'nama' => 'Stapler', 'kategori' => 'ATK', 'satuan' => 'Pcs', 'stok_minimum' => 2],
            ['kode' => 'ELE-001', 'nama' => 'Baterai AA', 'kategori' => 'Elektronik', 'satuan' => 'Pcs', 'stok_minimum' => 5],
            ['kode' => 'KBR-001', 'nama' => 'Cairan Pembersih', 'kategori' => 'Kebersihan', 'satuan' => 'Botol', 'stok_minimum' => 2],
            ['kode' => 'KBR-002', 'nama' => 'Tissue', 'kategori' => 'Kebersihan', 'satuan' => 'Box', 'stok_minimum' => 3],
            ['kode' => 'PKL-001', 'nama' => 'Lakban', 'kategori' => 'Perlengkapan Kantor', 'satuan' => 'Pcs', 'stok_minimum' => 5],
        ];

        $locations = Location::all()->keyBy('nama');

        // [item kode => [lokasi => jumlah]]
        $stocks = [
            'ATK-001' => ['Gudang Utama' => 60, 'Ruang Tata Usaha' => 10, 'Ruang Administrasi' => 4],
            'ATK-002' => ['Gudang Utama' => 30, 'Ruang Tata Usaha' => 5],
            'ATK-003' => ['Gudang Utama' => 120, 'Ruang Administrasi' => 20, 'Ruang Pengawasan' => 7],
            'ATK-004' => ['Gudang Utama' => 40, 'Ruang Pengawasan' => 5],
            'ATK-005' => ['Gudang Utama' => 25, 'Ruang Arsip' => 5],
            'ATK-006' => ['Gudang Utama' => 3, 'Ruang Tata Usaha' => 2],
            'ATK-007' => ['Gudang Utama' => 6, 'Ruang Administrasi' => 1],
            'ATK-008' => ['Gudang Utama' => 2],
            'ELE-001' => ['Gudang Utama' => 20],
            'KBR-001' => ['Gudang Utama' => 8, 'Ruang Tata Usaha' => 2],
            'KBR-002' => ['Gudang Utama' => 5],
            'PKL-001' => ['Gudang Utama' => 3],
        ];

        foreach ($items as $data) {
            $item = Item::updateOrCreate(['kode' => $data['kode']], $data);

            foreach ($stocks[$data['kode']] ?? [] as $locationName => $jumlah) {
                $location = $locations->get($locationName);

                if (! $location) {
                    continue;
                }

                ItemLocationStock::updateOrCreate(
                    ['item_id' => $item->id, 'location_id' => $location->id],
                    ['jumlah' => $jumlah],
                );
            }
        }
    }
}
