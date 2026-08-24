<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Controllers\Concerns\ProvidesItemOptions;
use App\Http\Requests\StoreKioskRequest;
use App\Models\Item;
use App\Models\Transaction;
use App\Services\StockService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class KioskController extends Controller
{
    use FlashesMessages, ProvidesItemOptions;

    public function create(): Response
    {
        return Inertia::render('Kiosk/Index', [
            'nomor' => Transaction::generateNomor('keluar'),
            'items' => $this->formItems(),
        ]);
    }

    public function store(StoreKioskRequest $request, StockService $stocks): RedirectResponse
    {
        $data = $request->validated();

        $transaction = DB::transaction(function () use ($data, $stocks) {
            $stocks->subtract((int) $data['item_id'], (int) $data['location_id'], (int) $data['jumlah']);

            return Transaction::create([
                'nomor' => Transaction::generateNomor('keluar'),
                'tipe' => 'keluar',
                'item_id' => $data['item_id'],
                'location_id' => $data['location_id'],
                'jumlah' => $data['jumlah'],
                'tanggal' => $data['tanggal'],
                'dicatat_oleh' => 'self-service',
                'nama_petugas' => null,
                'nama_pengambil' => $data['nama_pengambil'],
                'keperluan' => $data['keperluan'] ?? null,
                'keterangan' => $data['keterangan'] ?? null,
                'user_id' => null,
            ]);
        });

        $item = Item::find($transaction->item_id);

        $this->flash('success', 'Pengambilan barang berhasil dicatat.');

        activity()
            ->withProperties(['nomor' => $transaction->nomor, 'item' => $item?->nama, 'jumlah' => $transaction->jumlah, 'mode' => 'self-service'])
            ->log("Pengambilan barang (self-service) {$transaction->nomor} - {$item?->nama} oleh {$transaction->nama_pengambil}");

        return redirect()->route('kiosk.index');
    }
}
