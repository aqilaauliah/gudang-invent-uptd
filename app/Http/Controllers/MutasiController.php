<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Controllers\Concerns\ProvidesItemOptions;
use App\Http\Requests\StoreMutationRequest;
use App\Models\Item;
use App\Models\Location;
use App\Models\Transaction;
use App\Services\StockService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MutasiController extends Controller
{
    use FlashesMessages, ProvidesItemOptions;

    public function create(): Response
    {
        return Inertia::render('Transaksi/Mutasi', [
            'nomor' => Transaction::generateNomor('mutasi'),
            'items' => $this->formItems(),
        ]);
    }

    public function store(StoreMutationRequest $request, StockService $stocks): RedirectResponse
    {
        $data = $request->validated();

        $transaction = DB::transaction(function () use ($data, $request, $stocks) {
            $stocks->transfer(
                (int) $data['item_id'],
                (int) $data['location_from_id'],
                (int) $data['location_to_id'],
                (int) $data['jumlah'],
            );

            return Transaction::create([
                'nomor' => Transaction::generateNomor('mutasi'),
                'tipe' => 'mutasi',
                'item_id' => $data['item_id'],
                'location_from_id' => $data['location_from_id'],
                'location_to_id' => $data['location_to_id'],
                'jumlah' => $data['jumlah'],
                'tanggal' => $data['tanggal'],
                'dicatat_oleh' => 'petugas',
                'nama_petugas' => $request->user()->name,
                'keterangan' => $data['keterangan'] ?? null,
                'user_id' => $request->user()->id,
            ]);
        });

        $item = Item::find($transaction->item_id);
        $from = Location::find($transaction->location_from_id);
        $to = Location::find($transaction->location_to_id);

        $this->flash('info', "Barang berhasil dipindahkan ke {$to?->nama}.");

        activity()
            ->causedBy($request->user())
            ->withProperties([
                'type' => 'mutasi',
                'nomor' => $transaction->nomor,
                'tanggal' => $transaction->tanggal->format('d M Y'),
                'item' => $item?->nama,
                'kode' => $item?->kode,
                'jumlah' => $transaction->jumlah,
                'satuan' => $item?->satuan,
                'dari' => $from?->nama,
                'ke' => $to?->nama,
                'keterangan' => $transaction->keterangan,
                'petugas' => $transaction->nama_petugas,
            ])
            ->log("Melakukan mutasi barang {$item?->nama} dari {$from?->nama} ke {$to?->nama} ({$transaction->jumlah} {$item?->satuan})");

        return redirect()->back();
    }
}
