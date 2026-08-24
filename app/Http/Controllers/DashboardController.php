<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Item;
use App\Models\ItemLocationStock;
use App\Models\Location;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $items = Item::with('stocks')->get();
        $totalStok = (int) ItemLocationStock::sum('jumlah');

        $stats = [
            'total_barang' => $items->count(),
            'total_stok' => $totalStok,
            'total_inventaris' => Asset::count(),
            'total_lokasi' => Location::count(),
            'barang_menipis' => $items->filter(fn ($i) => $i->stok_status === 'menipis')->count(),
            'barang_habis' => $items->filter(fn ($i) => $i->stok_status === 'habis')->count(),
            'inventaris_bermasalah' => Asset::where('kondisi', '!=', 'Baik')->count(),
        ];

        $masukVsKeluar = $this->masukVsKeluarChart();
        $stokPerKategori = $this->stokPerKategoriChart();
        $stokPerLokasi = $this->stokPerLokasiChart();
        $kondisiInventaris = $this->kondisiInventarisChart();

        $lowStock = $items->filter(fn ($i) => in_array($i->stok_status, ['menipis', 'habis']))
            ->sortBy(fn ($i) => $i->stok_status === 'habis' ? 0 : 1)
            ->values()
            ->map(fn ($i) => [
                'id' => $i->id,
                'nama' => $i->nama,
                'kode' => $i->kode,
                'satuan' => $i->satuan,
                'total_stock' => $i->total_stock,
                'stok_minimum' => $i->stok_minimum,
                'stok_status' => $i->stok_status,
            ]);

        $recentActivities = Activity::with('causer')->latest()->take(10)->get()
            ->map(fn ($a) => [
                'id' => $a->id,
                'description' => $a->description,
                'causer' => $a->causer?->name,
                'time' => $a->created_at?->diffForHumans(),
                'created_at' => $a->created_at?->toISOString(),
            ]);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'charts' => [
                'masukVsKeluar' => $masukVsKeluar,
                'stokPerKategori' => $stokPerKategori,
                'stokPerLokasi' => $stokPerLokasi,
                'kondisiInventaris' => $kondisiInventaris,
            ],
            'lowStock' => $lowStock,
            'recentActivities' => $recentActivities,
        ]);
    }

    private function masukVsKeluarChart(): array
    {
        $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        $start = now()->subMonths(5)->startOfMonth();

        $rows = Transaction::selectRaw("DATE_FORMAT(tanggal, '%Y-%m') as bulan, tipe, SUM(jumlah) as total")
            ->where('tanggal', '>=', $start)
            ->whereIn('tipe', ['masuk', 'keluar'])
            ->groupBy('bulan', 'tipe')
            ->get();

        $labels = [];
        $masuk = [];
        $keluar = [];

        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $key = $date->format('Y-m');
            $labels[] = $monthNames[$date->month - 1];
            $masuk[] = (int) $rows->where('bulan', $key)->where('tipe', 'masuk')->sum('total');
            $keluar[] = (int) $rows->where('bulan', $key)->where('tipe', 'keluar')->sum('total');
        }

        return ['labels' => $labels, 'masuk' => $masuk, 'keluar' => $keluar];
    }

    private function stokPerKategoriChart(): array
    {
        return Item::selectRaw('kategori, (SELECT COALESCE(SUM(jumlah),0) FROM item_location_stocks WHERE item_location_stocks.item_id = items.id) as total')
            ->where('status', 'aktif')
            ->get()
            ->groupBy('kategori')
            ->map(fn ($group, $kategori) => ['name' => $kategori, 'value' => (int) $group->sum('total')])
            ->values()
            ->toArray();
    }

    private function stokPerLokasiChart(): array
    {
        $locations = Location::orderBy('nama')->get();
        $stocks = ItemLocationStock::selectRaw('location_id, SUM(jumlah) as total')
            ->groupBy('location_id')
            ->pluck('total', 'location_id');

        return $locations->map(fn ($l) => [
            'name' => $l->nama,
            'value' => (int) ($stocks[$l->id] ?? 0),
        ])->toArray();
    }

    private function kondisiInventarisChart(): array
    {
        $order = ['Baik', 'Rusak Ringan', 'Rusak Berat'];

        return Asset::selectRaw('kondisi, COUNT(*) as total')
            ->groupBy('kondisi')
            ->get()
            ->sortBy(fn ($r) => array_search($r->kondisi, $order))
            ->map(fn ($r) => ['name' => $r->kondisi, 'value' => (int) $r->total])
            ->values()
            ->toArray();
    }
}
