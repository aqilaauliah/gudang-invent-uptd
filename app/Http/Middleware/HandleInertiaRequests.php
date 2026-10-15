<?php

namespace App\Http\Middleware;

use App\Models\Item;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->loadMissing('roles'),
                'permissions' => $request->user()?->getAllPermissions()->pluck('name')->all() ?? [],
            ],
            'flash' => [
                'type' => $request->session()->get('flash_type'),
                'message' => $request->session()->get('flash_message'),
            ],
            'lowStockCount' => fn () => Item::where('status', 'aktif')->get()
                ->filter(fn ($item) => $item->stok_status !== 'aman')
                ->count(),
            'locations' => fn () => Location::orderBy('nama')->get(['id', 'nama', 'keterangan', 'penanggung_jawab']),
            'options' => fn () => [
                'categories' => ['ATK', 'Elektronik', 'Perlengkapan Kantor', 'Kebersihan', 'Peralatan Pengawasan', 'Lainnya'],
                'units' => ['Pcs', 'Rim', 'Box', 'Unit', 'Set', 'Botol', 'Buah'],
                'assetCategories' => ['Elektronik', 'Perabot', 'Perlengkapan Kantor', 'Lainnya'],
                'kondisis' => ['Baik', 'Rusak Ringan', 'Rusak Berat'],
                'assetStatuses' => ['Digunakan', 'Tersimpan', 'Dipindahkan', 'Dalam Perbaikan', 'Tidak Digunakan'],
                'itemStatuses' => ['aktif', 'nonaktif'],
            ],
        ];
    }
}
