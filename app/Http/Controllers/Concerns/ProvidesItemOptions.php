<?php

namespace App\Http\Controllers\Concerns;

use App\Models\Item;

trait ProvidesItemOptions
{
    protected function formItems(): array
    {
        return Item::with('stocks')->where('status', 'aktif')->orderBy('nama')->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'kode' => $item->kode,
                'nama' => $item->nama,
                'satuan' => $item->satuan,
                'stok_minimum' => $item->stok_minimum,
                'total_stock' => $item->total_stock,
                'stok_status' => $item->stok_status,
                'stocks' => $item->stocks->map(fn ($s) => [
                    'location_id' => $s->location_id,
                    'jumlah' => $s->jumlah,
                ]),
            ])
            ->toArray();
    }
}
