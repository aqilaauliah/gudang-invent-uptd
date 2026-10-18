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
                'last_transaction_date' => $item->transactions()->max('tanggal'),
                'stocks' => $item->stocks->map(fn ($s) => [
                    'location_id' => $s->location_id,
                    'location_nama' => $s->location?->nama,
                    'jumlah' => $s->jumlah,
                ])->sortBy('location_nama')->values(),
            ])
            ->filter(function (array $item) use ($request): bool {
                $from = $request->input('tanggal_dari');
                $to = $request->input('tanggal_sampai');
                $lastDate = $item['last_transaction_date'];

                return (!$from || ($lastDate && $lastDate >= $from))
                    && (!$to || ($lastDate && $lastDate <= $to));
            })
            ->values();

        $summary = [
            'total_barang' => $items->count(),
            'aman' => $items->where('stok_status', 'aman')->count(),
            'menipis' => $items->where('stok_status', 'menipis')->count(),
            'habis' => $items->where('stok_status', 'habis')->count(),
        ];

        return Inertia::render('Persediaan/Index', [
            'items' => $items,
            'summary' => $summary,
            'filters' => $request->only(['tanggal_dari', 'tanggal_sampai']),
            'locations' => \App\Models\Location::orderBy('nama')->get(['id', 'nama']),
        ]);
    }
}
