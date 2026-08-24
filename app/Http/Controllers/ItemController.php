<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ItemController extends Controller
{
    use FlashesMessages;

    public function index(): Response
    {
        $items = QueryBuilder::for(Item::class)
            ->with('stocks.location')
            ->allowedFilters(
                'kategori',
                'status',
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($q) use ($value) {
                        $q->where('kode', 'like', "%{$value}%")
                            ->orWhere('nama', 'like', "%{$value}%");
                    });
                }),
            )
            ->allowedSorts('kode', 'nama', 'kategori', 'stok_minimum')
            ->defaultSort('kode')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Barang/Index', [
            'items' => $items,
            'filters' => request()->only(['search', 'kategori', 'status']),
        ]);
    }

    public function store(StoreItemRequest $request): RedirectResponse
    {
        $item = Item::create($request->validated());

        $this->flash('success', "Barang \"{$item->nama}\" berhasil ditambahkan.");

        activity()
            ->causedBy($request->user())
            ->withProperties(['item_id' => $item->id, 'kode' => $item->kode])
            ->log("Menambahkan barang baru \"{$item->nama}\"");

        return redirect()->back();
    }

    public function update(UpdateItemRequest $request, Item $item): RedirectResponse
    {
        $item->update($request->validated());

        $this->flash('success', "Barang \"{$item->nama}\" berhasil diperbarui.");

        activity()
            ->causedBy($request->user())
            ->withProperties(['item_id' => $item->id, 'kode' => $item->kode])
            ->log("Mengubah data barang \"{$item->nama}\"");

        return redirect()->back();
    }

    public function destroy(Item $item): RedirectResponse
    {
        $nama = $item->nama;
        $item->delete();

        $this->flash('success', "Barang \"{$nama}\" berhasil dihapus.");

        activity()
            ->causedBy(request()->user())
            ->withProperties(['kode' => $item->kode])
            ->log("Menghapus barang \"{$nama}\"");

        return redirect()->back();
    }
}
