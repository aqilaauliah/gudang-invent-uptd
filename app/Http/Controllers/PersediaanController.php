<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PersediaanController extends Controller
{
    public function index(Request $request): Response
    {
        $items = Item::with('stocks.location')
            ->where('status', 'aktif')
            ->get()
            ->map(fn (Item $item) => [
                'id' => $item->id,
                'kode' => $item->kode,
                'nama' => $item->nama,
                'kategori' => $item->kategori,
                'satuan' => $item->satuan,
                'stok_minimum' => $item->stok_minimum,
                'total_stock' => $item->total_stock,
                'stok_status' => $item->stok_status,
                'stocks' => $item->stocks->map(fn ($s) => [
                    'location_id' => $s->location_id,
                    'location_nama' => $s->location?->nama,
                    'jumlah' => $s->jumlah,
                ])->sortBy('location_nama')->values(),
            ]);

        $summary = [
            'total_barang' => $items->count(),
            'aman' => $items->where('stok_status', 'aman')->count(),
            'menipis' => $items->where('stok_status', 'menipis')->count(),
            'habis' => $items->where('stok_status', 'habis')->count(),
        ];

        return Inertia::render('Persediaan/Index', [
            'items' => $items,
            'summary' => $summary,
        ]);
    }
}
