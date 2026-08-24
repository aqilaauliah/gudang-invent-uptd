<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Controllers\Concerns\ProvidesItemOptions;
use App\Http\Requests\StoreIncomingRequest;
use App\Models\Item;
use App\Models\Transaction;
use App\Services\StockService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class BarangMasukController extends Controller
{
    use FlashesMessages, ProvidesItemOptions;

    public function create(): Response
    {
        return Inertia::render('Transaksi/Masuk', [
            'nomor' => Transaction::generateNomor('masuk'),
            'items' => $this->formItems(),
        ]);
    }

    public function store(StoreIncomingRequest $request, StockService $stocks): RedirectResponse
    {
        $data = $request->validated();

        $transaction = DB::transaction(function () use ($data, $request, $stocks) {
            $stocks->add((int) $data['item_id'], (int) $data['location_id'], (int) $data['jumlah']);

            return Transaction::create([
                'nomor' => Transaction::generateNomor('masuk'),
                'tipe' => 'masuk',
                'item_id' => $data['item_id'],
                'location_id' => $data['location_id'],
                'jumlah' => $data['jumlah'],
                'tanggal' => $data['tanggal'],
                'dicatat_oleh' => 'petugas',
                'nama_petugas' => $request->user()->name,
                'sumber_supplier' => $data['sumber_supplier'] ?? null,
                'no_dokumen' => $data['no_dokumen'] ?? null,
                'keterangan' => $data['keterangan'] ?? null,
                'user_id' => $request->user()->id,
            ]);
        });

        $item = Item::find($transaction->item_id);

        $this->flash('success', 'Barang masuk berhasil dicatat.');

        activity()
            ->causedBy($request->user())
            ->withProperties(['nomor' => $transaction->nomor, 'item' => $item?->nama, 'jumlah' => $transaction->jumlah])
            ->log("Mencatat barang masuk {$transaction->nomor} - {$item?->nama} ({$transaction->jumlah} {$item?->satuan})");

        return redirect()->back();
    }
}
