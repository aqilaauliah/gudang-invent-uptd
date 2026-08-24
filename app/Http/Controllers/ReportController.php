<?php

namespace App\Http\Controllers;

use App\Exports\ReportExport;
use App\Models\Asset;
use App\Models\Item;
use App\Models\ItemLocationStock;
use App\Models\Location;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Laporan/Index', $this->buildReportData($request));
    }

    public function export(Request $request, string $format): SymfonyResponse
    {
        $data = $this->buildReportData($request);

        if ($format === 'pdf') {
            return Pdf::loadView('exports.report', $data)
                ->setPaper('a4', 'landscape')
                ->download($data['filename'].'.pdf');
        }

        return Excel::download(new ReportExport($data), $data['filename'].'.xlsx');
    }

    private function buildReportData(Request $request): array
    {
        $type = $request->string('type', 'persediaan')->toString();
        $dari = $request->input('dari') ?: now()->startOfMonth()->toDateString();
        $sampai = $request->input('sampai') ?: now()->endOfMonth()->toDateString();

        $titles = [
            'persediaan' => 'Laporan Persediaan',
            'masuk' => 'Laporan Barang Masuk',
            'keluar' => 'Laporan Barang Keluar',
            'mutasi' => 'Laporan Mutasi Barang',
            'inventaris' => 'Laporan Inventaris',
            'menipis' => 'Laporan Stok Menipis',
        ];

        $type = array_key_exists($type, $titles) ? $type : 'persediaan';

        return [
            'type' => $type,
            'title' => $titles[$type],
            'filename' => str_replace(' ', '-', strtolower($titles[$type])).'-'.$dari.'-'.$sampai,
            'dari' => $dari,
            'sampai' => $sampai,
            'charts' => $this->charts($dari, $sampai),
            'headings' => $this->headings($type),
            'rows' => $this->rows($type, $dari, $sampai),
        ];
    }

    private function headings(string $type): array
    {
        return match ($type) {
            'persediaan', 'menipis' => ['Kode', 'Nama Barang', 'Kategori', 'Total Stok', 'Stok Minimum', 'Status'],
            'masuk' => ['Nomor', 'Tanggal', 'Kode', 'Nama Barang', 'Jumlah', 'Satuan', 'Lokasi', 'Sumber', 'No Dokumen', 'Petugas'],
            'keluar' => ['Nomor', 'Tanggal', 'Kode', 'Nama Barang', 'Jumlah', 'Satuan', 'Lokasi', 'Pengambil', 'Keperluan', 'Petugas'],
            'mutasi' => ['Nomor', 'Tanggal', 'Kode', 'Nama Barang', 'Jumlah', 'Satuan', 'Dari', 'Ke', 'Petugas'],
            'inventaris' => ['Kode', 'Nama', 'Kategori', 'Merk', 'No Seri', 'Lokasi', 'Penanggung Jawab', 'Kondisi', 'Status'],
            default => [],
        };
    }

    private function rows(string $type, string $dari, string $sampai): array
    {
        $statusLabel = fn ($s) => match ($s) {
            'aman' => 'AMAN',
            'menipis' => 'MENIPIS',
            'habis' => 'HABIS',
            default => $s,
        };

        if ($type === 'persediaan' || $type === 'menipis') {
            return Item::with('stocks')
                ->when($type === 'menipis', fn ($q) => $q->where('status', 'aktif'))
                ->get()
                ->map(fn (Item $item) => [
                    $item->kode,
                    $item->nama,
                    $item->kategori,
                    $item->total_stock,
                    $item->stok_minimum,
                    $statusLabel($item->stok_status),
                ])
                ->when($type === 'menipis', fn ($c) => $c->filter(fn ($r) => in_array($r[5], ['MENIPIS', 'HABIS'])))
                ->values()
                ->toArray();
        }

        if ($type === 'inventaris') {
            return Asset::with('location')->get()->map(fn (Asset $asset) => [
                $asset->kode,
                $asset->nama,
                $asset->kategori,
                $asset->merk,
                $asset->no_seri,
                $asset->location?->nama,
                $asset->penanggung_jawab,
                $asset->kondisi,
                $asset->status,
            ])->toArray();
        }

        return Transaction::with(['item', 'location', 'locationFrom', 'locationTo'])
            ->where('tipe', $type)
            ->whereBetween('tanggal', [$dari, $sampai])
            ->orderByDesc('tanggal')
            ->get()
            ->map(function (Transaction $t) use ($type) {
                if ($type === 'mutasi') {
                    return [
                        $t->nomor,
                        $t->tanggal->toDateString(),
                        $t->item->kode,
                        $t->item->nama,
                        $t->jumlah,
                        $t->item->satuan,
                        $t->locationFrom?->nama,
                        $t->locationTo?->nama,
                        $t->nama_petugas,
                    ];
                }

                if ($type === 'masuk') {
                    return [
                        $t->nomor,
                        $t->tanggal->toDateString(),
                        $t->item->kode,
                        $t->item->nama,
                        $t->jumlah,
                        $t->item->satuan,
                        $t->location?->nama,
                        $t->sumber_supplier,
                        $t->no_dokumen,
                        $t->nama_petugas,
                    ];
                }

                return [
                    $t->nomor,
                    $t->tanggal->toDateString(),
                    $t->item->kode,
                    $t->item->nama,
                    $t->jumlah,
                    $t->item->satuan,
                    $t->location?->nama,
                    $t->nama_pengambil,
                    $t->keperluan,
                    $t->nama_petugas ?? 'Self Service',
                ];
            })
            ->toArray();
    }

    private function charts(string $dari, string $sampai): array
    {
        $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        $rows = Transaction::selectRaw("DATE_FORMAT(tanggal, '%Y-%m') as bulan, tipe, SUM(jumlah) as total")
            ->whereBetween('tanggal', [$dari, $sampai])
            ->whereIn('tipe', ['masuk', 'keluar'])
            ->groupBy('bulan', 'tipe')
            ->get();

        $labels = [];
        $masuk = [];
        $keluar = [];

        $start = \Illuminate\Support\Carbon::parse($dari)->startOfMonth();
        $end = \Illuminate\Support\Carbon::parse($sampai)->startOfMonth();

        $cursor = $start->copy();
        while ($cursor->lte($end)) {
            $key = $cursor->format('Y-m');
            $labels[] = $monthNames[$cursor->month - 1].' '.$cursor->format('Y');
            $masuk[] = (int) $rows->where('bulan', $key)->where('tipe', 'masuk')->sum('total');
            $keluar[] = (int) $rows->where('bulan', $key)->where('tipe', 'keluar')->sum('total');
            $cursor->addMonth();
        }

        $stokPerKategori = Item::selectRaw('kategori, (SELECT COALESCE(SUM(jumlah),0) FROM item_location_stocks WHERE item_location_stocks.item_id = items.id) as total')
            ->where('status', 'aktif')
            ->get()
            ->groupBy('kategori')
            ->map(fn ($g, $k) => ['name' => $k, 'value' => (int) $g->sum('total')])
            ->values()
            ->toArray();

        $kondisi = Asset::selectRaw('kondisi, COUNT(*) as total')
            ->groupBy('kondisi')
            ->orderBy('kondisi')
            ->get()
            ->map(fn ($r) => ['name' => $r->kondisi, 'value' => (int) $r->total])
            ->values()
            ->toArray();

        $stocks = ItemLocationStock::selectRaw('location_id, SUM(jumlah) as total')
            ->groupBy('location_id')
            ->pluck('total', 'location_id');

        $perLokasi = Location::orderBy('nama')->get()
            ->map(fn ($l) => ['name' => $l->nama, 'value' => (int) ($stocks[$l->id] ?? 0)])
            ->toArray();

        return [
            'masukVsKeluar' => ['labels' => $labels, 'masuk' => $masuk, 'keluar' => $keluar],
            'stokPerKategori' => $stokPerKategori,
            'kondisiInventaris' => $kondisi,
            'stokPerLokasi' => $perLokasi,
        ];
    }
}
