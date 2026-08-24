<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            ['nama' => 'Gudang Utama', 'penanggung_jawab' => 'Petugas Gudang', 'keterangan' => 'Pusat penyimpanan utama persediaan.'],
            ['nama' => 'Ruang Tata Usaha', 'penanggung_jawab' => 'Staf Tata Usaha', 'keterangan' => 'Penyimpanan ATK operasional tata usaha.'],
            ['nama' => 'Ruang Administrasi', 'penanggung_jawab' => 'Staf Administrasi', 'keterangan' => null],
            ['nama' => 'Ruang Pengawasan', 'penanggung_jawab' => 'Staf Pengawasan', 'keterangan' => null],
            ['nama' => 'Ruang Kepala UPTD', 'penanggung_jawab' => 'Kepala UPTD', 'keterangan' => null],
            ['nama' => 'Ruang Arsip', 'penanggung_jawab' => 'Staf Arsip', 'keterangan' => 'Penyimpanan berkas dan dokumen.'],
        ];

        foreach ($locations as $location) {
            Location::updateOrCreate(['nama' => $location['nama']], $location);
        }
    }
}
