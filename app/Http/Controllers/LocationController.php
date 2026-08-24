<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use App\Models\Asset;
use App\Models\ItemLocationStock;
use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    use FlashesMessages;

    public function index(): Response
    {
        $locations = Location::withCount('assets')
            ->with(['stocks' => function ($q) {
                $q->where('jumlah', '>', 0);
            }])
            ->orderBy('nama')
            ->get()
            ->map(fn (Location $location) => [
                'id' => $location->id,
                'nama' => $location->nama,
                'keterangan' => $location->keterangan,
                'penanggung_jawab' => $location->penanggung_jawab,
                'jenis_barang' => $location->stocks->count(),
                'total_stok' => (int) $location->stocks->sum('jumlah'),
                'total_inventaris' => $location->assets_count,
            ]);

        return Inertia::render('Lokasi/Index', [
            'locations' => $locations,
        ]);
    }

    public function show(Location $location): Response
    {
        $location->loadCount('assets');

        $stocks = $location->stocks()
            ->where('jumlah', '>', 0)
            ->with('item')
            ->get()
            ->map(fn ($s) => [
                'item_id' => $s->item_id,
                'kode' => $s->item->kode,
                'nama' => $s->item->nama,
                'kategori' => $s->item->kategori,
                'satuan' => $s->item->satuan,
                'jumlah' => $s->jumlah,
            ]);

        $assets = $location->assets()->get(['id', 'kode', 'nama', 'kategori', 'kondisi', 'status', 'foto', 'penanggung_jawab']);

        return Inertia::render('Lokasi/Show', [
            'location' => $location,
            'stocks' => $stocks,
            'assets' => $assets,
        ]);
    }

    public function store(StoreLocationRequest $request): RedirectResponse
    {
        $location = Location::create($request->validated());

        $this->flash('success', "Lokasi \"{$location->nama}\" berhasil ditambahkan.");

        activity()
            ->causedBy($request->user())
            ->withProperties(['location_id' => $location->id])
            ->log("Menambahkan lokasi \"{$location->nama}\"");

        return redirect()->back();
    }

    public function update(UpdateLocationRequest $request, Location $location): RedirectResponse
    {
        $location->update($request->validated());

        $this->flash('success', "Lokasi \"{$location->nama}\" berhasil diperbarui.");

        activity()
            ->causedBy($request->user())
            ->withProperties(['location_id' => $location->id])
            ->log("Mengubah lokasi \"{$location->nama}\"");

        return redirect()->back();
    }

    public function destroy(Location $location): RedirectResponse
    {
        $nama = $location->nama;
        $location->delete();

        $this->flash('success', "Lokasi \"{$nama}\" berhasil dihapus.");

        activity()
            ->causedBy(request()->user())
            ->log("Menghapus lokasi \"{$nama}\"");

        return redirect()->back();
    }
}
