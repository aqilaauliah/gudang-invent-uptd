<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Requests\StoreAssetRequest;
use App\Http\Requests\UpdateAssetRequest;
use App\Http\Requests\UpdateAssetConditionRequest;
use App\Models\Asset;
use App\Models\AssetHistory;
use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class AssetController extends Controller
{
    use FlashesMessages;

    public function index(): Response
    {
        $filterValues = request()->input('filter', []);
        $assets = QueryBuilder::for(Asset::class)
            ->with('location')
            ->allowedFilters(
                'kategori',
                'kondisi',
                'status',
                AllowedFilter::callback('lokasi', fn ($query, $value) => $query->where('location_id', $value)),
                AllowedFilter::callback('tahun_dari', fn ($query, $value) => $query->where('tahun_perolehan', '>=', (int) substr($value, 0, 4))),
                AllowedFilter::callback('tahun_sampai', fn ($query, $value) => $query->where('tahun_perolehan', '<=', (int) substr($value, 0, 4))),
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($q) use ($value) {
                        $q->where('kode', 'like', "%{$value}%")
                            ->orWhere('nama', 'like', "%{$value}%")
                            ->orWhere('merk', 'like', "%{$value}%")
                            ->orWhere('no_seri', 'like', "%{$value}%");
                    });
                }),
            )
            ->allowedSorts('kode', 'nama', 'kategori', 'kondisi', 'status')
            ->defaultSort('kode')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Aset/Index', [
            'assets' => $assets,
            'filters' => $filterValues,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Aset/Form');
    }

    public function edit(Asset $asset): Response
    {
        return Inertia::render('Aset/Form', [
            'asset' => $asset,
        ]);
    }

    public function show(Asset $asset): Response
    {
        $asset->load(['location', 'histories.user']);
        $asset->load(['mutations.fromLocation', 'mutations.toLocation', 'mutations.recorder']);

        return Inertia::render('Aset/Show', [
            'asset' => $asset,
            'histories' => $asset->histories->map(fn ($h) => [
                'id' => $h->id,
                'tanggal' => $h->tanggal->toDateString(),
                'lokasi' => $h->lokasi,
                'kondisi' => $h->kondisi,
                'status' => $h->status,
                'catatan' => $h->catatan,
                'user' => $h->user?->name,
            ]),
            'mutations' => $asset->mutations->map(fn ($mutation) => [
                'id' => $mutation->id,
                'tanggal' => $mutation->tanggal->toDateString(),
                'dari' => $mutation->fromLocation?->nama,
                'ke' => $mutation->toLocation?->nama,
                'pj_baru' => $mutation->pj_baru,
                'keterangan' => $mutation->keterangan,
                'user' => $mutation->recorder?->name,
            ]),
        ]);
    }

    public function store(StoreAssetRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('assets', 'public');
        }

        $asset = Asset::create($data);

        $this->recordHistory($asset, [
            'catatan' => 'Aset dicatat ke dalam sistem.',
        ]);

        $this->flash('success', "Aset \"{$asset->nama}\" berhasil ditambahkan.");

        activity()
            ->causedBy($request->user())
            ->withProperties([
                'type' => 'tambah_aset',
                'kode' => $asset->kode,
                'nama' => $asset->nama,
                'kategori' => $asset->kategori,
                'merk' => $asset->merk,
                'lokasi' => $asset->location?->nama,
                'penanggung_jawab' => $asset->penanggung_jawab,
                'kondisi' => $asset->kondisi,
                'status' => $asset->status,
            ])
            ->log("Menambahkan aset \"{$asset->nama}\"");

        return redirect()->route('aset.index');
    }

    public function update(UpdateAssetRequest $request, Asset $asset): RedirectResponse
    {
        $data = $request->validated();

        $changes = [];

        if ($request->hasFile('foto')) {
            if ($asset->foto) {
                Storage::disk('public')->delete($asset->foto);
            }

            $data['foto'] = $request->file('foto')->store('assets', 'public');
        }

        $lokasiSebelum = $asset->location?->nama;
        $kondisiSebelum = $asset->kondisi;
        $statusSebelum = $asset->status;

        $asset->update($data);

        $lokasiBaru = Location::find($asset->location_id)?->nama;

        if ($lokasiSebelum !== $lokasiBaru) {
            $changes[] = ['lokasi' => $lokasiBaru, 'catatan' => "Dipindahkan ke {$lokasiBaru}."];
        }

        if ($kondisiSebelum !== $asset->kondisi) {
            $changes[] = ['kondisi' => $asset->kondisi, 'catatan' => "Kondisi berubah menjadi {$asset->kondisi}."];
        }

        if ($statusSebelum !== $asset->status) {
            $changes[] = ['status' => $asset->status, 'catatan' => "Status berubah menjadi {$asset->status}."];
        }

        foreach ($changes as $change) {
            $this->recordHistory($asset, $change);
        }

        $this->flash('success', "Aset \"{$asset->nama}\" berhasil diperbarui.");

        activity()
            ->causedBy($request->user())
            ->withProperties([
                'type' => 'ubah_aset',
                'kode' => $asset->kode,
                'nama' => $asset->nama,
                'kategori' => $asset->kategori,
                'merk' => $asset->merk,
                'lokasi' => $asset->location?->nama,
                'penanggung_jawab' => $asset->penanggung_jawab,
                'kondisi' => $asset->kondisi,
                'status' => $asset->status,
            ])
            ->log("Mengubah data aset \"{$asset->nama}\"");

        return redirect()->route('aset.index');
    }

    public function updateCondition(UpdateAssetConditionRequest $request, Asset $asset): RedirectResponse
    {
        $data = $request->validated();
        $oldCondition = $asset->kondisi;

        if ($request->hasFile('foto')) {
            if ($asset->foto) {
                Storage::disk('public')->delete($asset->foto);
            }
            $data['foto'] = $request->file('foto')->store('assets', 'public');
        }

        $asset->update($data);

        if ($oldCondition !== $asset->kondisi || array_key_exists('foto', $data)) {
            $this->recordHistory($asset, [
                'kondisi' => $asset->kondisi,
                'catatan' => $oldCondition !== $asset->kondisi
                    ? "Kondisi berubah menjadi {$asset->kondisi}."
                    : 'Foto kondisi aset diperbarui.',
            ]);
        }

        activity()
            ->causedBy($request->user())
            ->withProperties(['type' => 'ubah_kondisi_aset', 'kode' => $asset->kode, 'kondisi' => $asset->kondisi])
            ->log("Memperbarui kondisi aset \"{$asset->nama}\"");

        $this->flash('success', "Kondisi aset \"{$asset->nama}\" berhasil diperbarui.");

        return redirect()->back();
    }

    public function destroy(Asset $asset): RedirectResponse
    {
        $nama = $asset->nama;

        if ($asset->foto) {
            Storage::disk('public')->delete($asset->foto);
        }

        $asset->delete();

        $this->flash('success', "Aset \"{$nama}\" berhasil dihapus.");

        activity()
            ->causedBy(request()->user())
            ->withProperties([
                'type' => 'hapus_aset',
                'kode' => $asset->kode,
                'nama' => $nama,
            ])
            ->log("Menghapus aset \"{$nama}\"");

        return redirect()->back();
    }

    private function recordHistory(Asset $asset, array $data): void
    {
        AssetHistory::create([
            'asset_id' => $asset->id,
            'tanggal' => now()->toDateString(),
            'lokasi' => $data['lokasi'] ?? $asset->location?->nama,
            'kondisi' => $data['kondisi'] ?? $asset->kondisi,
            'status' => $data['status'] ?? $asset->status,
            'catatan' => $data['catatan'] ?? null,
            'user_id' => auth()->id(),
        ]);
    }
}
