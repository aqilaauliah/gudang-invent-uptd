<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Location;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $items = Item::all()->keyBy('kode');
        $locations = Location::all()->keyBy('nama');
        $user = User::where('email', 'aqilaaulia1905@gmail.com')->first();

        $masuk = [
            'ATK-001' => [['Gudang Utama', 40], ['Ruang Tata Usaha', 8]],
            'ATK-002' => [['Gudang Utama', 25]],
            'ATK-003' => [['Gudang Utama', 80], ['Ruang Administrasi', 15]],
            'ATK-004' => [['Gudang Utama', 30]],
            'ATK-005' => [['Gudang Utama', 20]],
            'ATK-006' => [['Gudang Utama', 5]],
            'ATK-007' => [['Gudang Utama', 6]],
            'ATK-008' => [['Gudang Utama', 4]],
            'ELE-001' => [['Gudang Utama', 20]],
            'KBR-001' => [['Gudang Utama', 10]],
            'KBR-002' => [['Gudang Utama', 8]],
            'PKL-001' => [['Gudang Utama', 6]],
        ];

        $keluar = [
            'ATK-001' => [['Ruang Administrasi', 2, 'Keperluan rapat']],
            'ATK-003' => [['Ruang Pengawasan', 5, 'Keperluan pengawasan lapangan']],
            'ATK-007' => [['Ruang Administrasi', 1, 'Penggantian tinta habis']],
            'ATK-004' => [['Ruang Pengawasan', 3, 'Kegiatan pelatihan']],
            'KBR-001' => [['Ruang Tata Usaha', 1, 'Kebersihan harian']],
        ];

        $mutasi = [
            'ATK-001' => ['Gudang Utama', 'Ruang Administrasi', 6],
            'ATK-003' => ['Gudang Utama', 'Ruang Pengawasan', 12],
            'ATK-005' => ['Gudang Utama', 'Ruang Arsip', 5],
        ];

        $seq = 1;

        foreach ($masuk as $kode => $rows) {
            foreach ($rows as [$lokasi, $jumlah]) {
                $this->createTransaction($items, $locations, $user, $seq++, 'masuk', [
                    'item' => $kode,
                    'location' => $lokasi,
                    'jumlah' => $jumlah,
                    'tanggal' => Carbon::now()->subMonths(4)->addDays(($seq % 20))->toDateString(),
                    'sumber_supplier' => 'Toko ATK Berkah',
                    'no_dokumen' => 'SPB-'.str_pad((string) $seq, 3, '0', STR_PAD_LEFT),
                ]);
            }
        }

        foreach ($keluar as $kode => $rows) {
            foreach ($rows as [$lokasi, $jumlah, $keperluan]) {
                $this->createTransaction($items, $locations, $user, $seq++, 'keluar', [
                    'item' => $kode,
                    'location' => $lokasi,
                    'jumlah' => $jumlah,
                    'tanggal' => Carbon::now()->subDays(rand(5, 45))->toDateString(),
                    'nama_pengambil' => 'Staf Tata Usaha',
                    'keperluan' => $keperluan,
                ]);
            }
        }

        foreach ($mutasi as $kode => [$from, $to, $jumlah]) {
            $this->createTransaction($items, $locations, $user, $seq++, 'mutasi', [
                'item' => $kode,
                'from' => $from,
                'to' => $to,
                'jumlah' => $jumlah,
                'tanggal' => Carbon::now()->subDays(rand(3, 20))->toDateString(),
            ]);
        }
    }

    private function createTransaction($items, $locations, $user, int $seq, string $tipe, array $data): void
    {
        $item = $items->get($data['item']);
        $prefix = ['masuk' => 'BM', 'keluar' => 'BK', 'mutasi' => 'MT'][$tipe];
        $tanggal = $data['tanggal'];

        $payload = [
            'nomor' => sprintf('%s-%s-%03d', $prefix, Carbon::parse($tanggal)->format('Ymd'), $seq),
            'tipe' => $tipe,
            'item_id' => $item->id,
            'jumlah' => $data['jumlah'],
            'tanggal' => $tanggal,
            'dicatat_oleh' => 'petugas',
            'nama_petugas' => $user?->name,
            'user_id' => $user?->id,
        ];

        if ($tipe === 'mutasi') {
            $payload['location_from_id'] = $locations->get($data['from'])->id;
            $payload['location_to_id'] = $locations->get($data['to'])->id;
            $payload['keterangan'] = 'Pemindahan stok antar lokasi.';
        } else {
            $payload['location_id'] = $locations->get($data['location'])->id;
        }

        if ($tipe === 'masuk') {
            $payload['sumber_supplier'] = $data['sumber_supplier'] ?? null;
            $payload['no_dokumen'] = $data['no_dokumen'] ?? null;
        }

        if ($tipe === 'keluar') {
            $payload['nama_pengambil'] = $data['nama_pengambil'] ?? null;
            $payload['keperluan'] = $data['keperluan'] ?? null;
        }

        $transaction = Transaction::create($payload);

        activity()
            ->causedBy($user)
            ->withProperties($this->activityProperties($tipe, $transaction, $item, $data))
            ->log(match ($tipe) {
                'masuk' => "Mencatat barang masuk {$transaction->nomor} - {$item->nama}",
                'keluar' => "Mencatat barang keluar {$transaction->nomor} - {$item->nama} oleh {$transaction->nama_pengambil}".($transaction->keperluan ? " untuk {$transaction->keperluan}" : ''),
                'mutasi' => "Melakukan mutasi barang {$transaction->nomor} - {$item->nama}",
            });
    }

    private function activityProperties(string $tipe, Transaction $transaction, Item $item, array $data): array
    {
        $typeMap = ['masuk' => 'barang_masuk', 'keluar' => 'barang_keluar', 'mutasi' => 'mutasi'];

        $properties = [
            'type' => $typeMap[$tipe],
            'nomor' => $transaction->nomor,
            'tanggal' => $transaction->tanggal->format('d M Y'),
            'item' => $item->nama,
            'kode' => $item->kode,
            'jumlah' => $transaction->jumlah,
            'satuan' => $item->satuan,
            'petugas' => $transaction->nama_petugas,
        ];

        if ($tipe === 'mutasi') {
            $properties['dari'] = $data['from'];
            $properties['ke'] = $data['to'];
            $properties['keterangan'] = $transaction->keterangan;
        } else {
            $properties['lokasi'] = $data['location'];
        }

        if ($tipe === 'masuk') {
            $properties['sumber_supplier'] = $transaction->sumber_supplier;
            $properties['no_dokumen'] = $transaction->no_dokumen;
        }

        if ($tipe === 'keluar') {
            $properties['nama_pengambil'] = $transaction->nama_pengambil;
            $properties['keperluan'] = $transaction->keperluan;
        }

        return $properties;
    }
}
