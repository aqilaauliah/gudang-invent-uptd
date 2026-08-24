<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\AssetHistory;
use App\Models\Location;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    public function run(): void
    {
        $locations = Location::all()->keyBy('nama');

        $assets = [
            ['kode' => 'INV-001', 'nama' => 'Laptop Lenovo ThinkPad', 'kategori' => 'Elektronik', 'merk' => 'Lenovo', 'tipe_model' => 'ThinkPad E14', 'no_seri' => 'LP-2026-001', 'tahun_perolehan' => 2024, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 12500000, 'lokasi' => 'Ruang Tata Usaha', 'penanggung_jawab' => 'Admin', 'kondisi' => 'Baik', 'status' => 'Digunakan'],
            ['kode' => 'INV-002', 'nama' => 'Komputer Desktop', 'kategori' => 'Elektronik', 'merk' => 'Dell', 'tipe_model' => 'OptiPlex 7010', 'no_seri' => 'PC-2024-012', 'tahun_perolehan' => 2024, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 9800000, 'lokasi' => 'Ruang Administrasi', 'penanggung_jawab' => 'Staf Administrasi', 'kondisi' => 'Baik', 'status' => 'Digunakan'],
            ['kode' => 'INV-003', 'nama' => 'Printer Canon', 'kategori' => 'Elektronik', 'merk' => 'Canon', 'tipe_model' => 'PIXMA G3010', 'no_seri' => 'PR-2024-008', 'tahun_perolehan' => 2023, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 3200000, 'lokasi' => 'Ruang Tata Usaha', 'penanggung_jawab' => 'Staf Tata Usaha', 'kondisi' => 'Rusak Ringan', 'status' => 'Dalam Perbaikan'],
            ['kode' => 'INV-004', 'nama' => 'Proyektor Epson', 'kategori' => 'Elektronik', 'merk' => 'Epson', 'tipe_model' => 'EB-X51', 'no_seri' => 'PJ-2022-003', 'tahun_perolehan' => 2022, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 7500000, 'lokasi' => 'Ruang Pengawasan', 'penanggung_jawab' => 'Staf Pengawasan', 'kondisi' => 'Baik', 'status' => 'Digunakan'],
            ['kode' => 'INV-005', 'nama' => 'AC Split 1 PK', 'kategori' => 'Elektronik', 'merk' => 'Daikin', 'tipe_model' => 'FTNE25', 'no_seri' => 'AC-2022-011', 'tahun_perolehan' => 2022, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 4500000, 'lokasi' => 'Ruang Kepala UPTD', 'penanggung_jawab' => 'Kepala UPTD', 'kondisi' => 'Rusak Berat', 'status' => 'Dalam Perbaikan'],
            ['kode' => 'INV-006', 'nama' => 'Meja Kerja', 'kategori' => 'Perlengkapan Kantor', 'merk' => 'Olympic', 'tipe_model' => 'Meja 120', 'no_seri' => 'MJ-2023-021', 'tahun_perolehan' => 2023, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 1850000, 'lokasi' => 'Ruang Administrasi', 'penanggung_jawab' => 'Staf Administrasi', 'kondisi' => 'Baik', 'status' => 'Digunakan'],
            ['kode' => 'INV-007', 'nama' => 'Kursi Kantor', 'kategori' => 'Perlengkapan Kantor', 'merk' => 'Chitose', 'tipe_model' => 'Uno', 'no_seri' => 'KR-2023-034', 'tahun_perolehan' => 2023, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 950000, 'lokasi' => 'Ruang Tata Usaha', 'penanggung_jawab' => 'Staf Tata Usaha', 'kondisi' => 'Baik', 'status' => 'Digunakan'],
            ['kode' => 'INV-008', 'nama' => 'Lemari Arsip', 'kategori' => 'Perlengkapan Kantor', 'merk' => 'Brother', 'tipe_model' => 'Lemari Besi 2 Pintu', 'no_seri' => 'LM-2022-006', 'tahun_perolehan' => 2022, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 2400000, 'lokasi' => 'Ruang Arsip', 'penanggung_jawab' => 'Staf Arsip', 'kondisi' => 'Rusak Ringan', 'status' => 'Digunakan'],
            ['kode' => 'INV-009', 'nama' => 'Kipas Angin', 'kategori' => 'Elektronik', 'merk' => 'Maspion', 'tipe_model' => 'F-16', 'no_seri' => 'KP-2021-009', 'tahun_perolehan' => 2021, 'sumber_perolehan' => 'APBD', 'nilai_perolehan' => 450000, 'lokasi' => null, 'penanggung_jawab' => 'Petugas Gudang', 'kondisi' => 'Rusak Berat', 'status' => 'Tidak Digunakan'],
        ];

        foreach ($assets as $data) {
            $locationName = $data['lokasi'];
            unset($data['lokasi']);

            $asset = Asset::updateOrCreate(['kode' => $data['kode']], array_merge($data, [
                'location_id' => $locationName ? optional($locations->get($locationName))->id : null,
            ]));

            if ($asset->histories()->count() === 0) {
                AssetHistory::create([
                    'asset_id' => $asset->id,
                    'tanggal' => Carbon::createFromDate($asset->tahun_perolehan ?? 2024, 1, 1)->toDateString(),
                    'lokasi' => $locationName,
                    'kondisi' => $asset->kondisi,
                    'status' => $asset->status,
                    'catatan' => 'Aset dicatat ke dalam sistem.',
                ]);
            }
        }
    }
}
