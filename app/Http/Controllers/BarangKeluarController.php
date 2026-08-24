<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Controllers\Concerns\ProvidesItemOptions;
use App\Http\Requests\StoreOutgoingRequest;
use App\Models\Item;
use App\Models\Transaction;
use App\Services\StockService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class BarangKeluarController extends Controller
{
    use FlashesMessages, ProvidesItemOptions;

    public function create(): Response
    {
        return Inertia::render('Transaksi/Keluar', [
            'nomor' => Transaction::generateNomor('keluar'),
            'items' => $this->formItems(),
        ]);
    }

    public function store(StoreOutgoingRequest $request, StockService $stocks): RedirectResponse
    {
        $data = $request->validated();

        $transaction = DB::transaction(function () use ($data, $request, $stocks) {
            $stocks->subtract((int) $data['item_id'], (int) $data['location_id'], (int) $data['jumlah']);

            return Transaction::create([
                'nomor' => Transaction::generateNomor('keluar'),
                'tipe' => 'keluar',
                'item_id' => $data['item_id'],
                'location_id' => $data['location_id'],
                'jumlah' => $data['jumlah'],
                'tanggal' => $data['tanggal'],
                'dicatat_oleh' => 'petugas',
                'nama_petugas' => $request->user()->name,
                'nama_pengambil' => $data['nama_pengambil'],
                'keperluan' => $data['keperluan'] ?? null,
                'keterangan' => $data['keterangan'] ?? null,
                'user_id' => $request->user()->id,
            ]);
        });

        $item = Item::find($transaction->item_id);

        $this->flash('success', 'Barang keluar berhasil dicatat.');

        activity()
            ->causedBy($request->user())
            ->withProperties(['nomor' => $transaction->nomor, 'item' => $item?->nama, 'jumlah' => $transaction->jumlah])
            ->log("Mencatat barang keluar {$transaction->nomor} - {$item?->nama} ({$transaction->jumlah} {$item?->satuan})");

        return redirect()->back();
    }
}
