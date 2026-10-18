<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Requests\StoreAssetMutationRequest;
use App\Models\Asset;
use App\Models\AssetHistory;
use App\Models\AssetMutation;
use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AssetMutationController extends Controller
{
    use FlashesMessages;

    public function index(): Response
    {
        $mutations = AssetMutation::with(['asset', 'fromLocation', 'toLocation', 'recorder'])
            ->when(request('tanggal_dari'), fn ($q, $date) => $q->whereDate('tanggal', '>=', $date))
            ->when(request('tanggal_sampai'), fn ($q, $date) => $q->whereDate('tanggal', '<=', $date))
            ->latest('tanggal')
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Aset/Mutasi/Index', [
            'mutations' => $mutations,
            'filters' => request()->only(['tanggal_dari', 'tanggal_sampai']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Aset/Mutasi/Form', [
            'assets' => Asset::with('location')->orderBy('nama')->get(['id', 'kode', 'nama', 'location_id']),
            'locations' => Location::orderBy('nama')->get(['id', 'nama']),
        ]);
    }

    public function store(StoreAssetMutationRequest $request, Asset $asset): RedirectResponse
    {
        $data = $request->validated();
        $fromLocationId = $asset->location_id;

        DB::transaction(function () use ($request, $asset, $data, $fromLocationId): void {
            AssetMutation::create([
                'asset_id' => $asset->id,
                'from_location_id' => $fromLocationId,
                'to_location_id' => $data['to_location_id'],
                'tanggal' => $data['tanggal'],
                'pj_baru' => $data['pj_baru'] ?? null,
                'keterangan' => $data['keterangan'] ?? null,
                'dicatat_oleh' => $request->user()->id,
            ]);

            $asset->update([
                'location_id' => $data['to_location_id'],
                'penanggung_jawab' => $data['pj_baru'] ?? $asset->penanggung_jawab,
            ]);

            AssetHistory::create([
                'asset_id' => $asset->id,
                'tanggal' => $data['tanggal'],
                'lokasi' => Location::find($data['to_location_id'])?->nama,
                'kondisi' => $asset->kondisi,
                'status' => $asset->status,
                'catatan' => 'Aset dipindahkan melalui mutasi aset.',
                'user_id' => $request->user()->id,
            ]);

            activity()
                ->causedBy($request->user())
                ->withProperties([
                    'type' => 'mutasi_aset',
                    'kode' => $asset->kode,
                    'nama' => $asset->nama,
                    'dari_lokasi_id' => $fromLocationId,
                    'ke_lokasi_id' => $data['to_location_id'],
                    'tanggal' => $data['tanggal'],
                    'pj_baru' => $data['pj_baru'] ?? null,
                ])
                ->log("Memutasi aset \"{$asset->nama}\"");
        });

        $this->flash('success', "Aset \"{$asset->nama}\" berhasil dimutasi.");

        return redirect()->route('aset.mutasi.index');
    }
}
