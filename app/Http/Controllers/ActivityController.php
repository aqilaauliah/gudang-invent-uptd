<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;
use Spatie\QueryBuilder\QueryBuilder;

class ActivityController extends Controller
{
    private const DISPLAY_TIMEZONE = 'Asia/Jakarta';

    private const ACTIVITY_TYPES = [
        'barang_masuk',
        'barang_keluar',
        'mutasi',
        'tambah_barang',
        'ubah_barang',
        'hapus_barang',
        'tambah_aset',
        'ubah_aset',
        'hapus_aset',
        'tambah_lokasi',
        'ubah_lokasi',
        'hapus_lokasi',
        'tambah_pengguna',
        'ubah_pengguna',
        'hapus_pengguna',
    ];

    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'date_from' => ['nullable', 'date_format:Y-m-d'],
            'date_to' => ['nullable', 'date_format:Y-m-d'],
            'type' => ['nullable', 'string', Rule::in(self::ACTIVITY_TYPES)],
        ]);

        $activities = QueryBuilder::for(Activity::class)
            ->with('causer')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('description', 'like', "%{$search}%")
                        ->orWhereHas('causer', fn ($causer) => $causer->where('name', 'like', "%{$search}%"));
                });
            })
            ->when($filters['type'] ?? null, fn ($query, $type) => $query->where('properties->type', $type))
            ->when($filters['date_from'] ?? null, fn ($query, $date) => $query->where(
                'created_at',
                '>=',
                Carbon::parse($date, self::DISPLAY_TIMEZONE)->startOfDay()->utc(),
            ))
            ->when($filters['date_to'] ?? null, fn ($query, $date) => $query->where(
                'created_at',
                '<=',
                Carbon::parse($date, self::DISPLAY_TIMEZONE)->endOfDay()->utc(),
            ))
            ->allowedSorts('created_at', 'description')
            ->defaultSort('-created_at')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Activity $activity) => [
                'id' => $activity->id,
                'description' => $activity->description,
                'causer' => $activity->causer?->name,
                'time' => $this->activityTime($activity)?->diffForHumans(),
                'created_at' => $this->activityTime($activity)?->format('d M Y H:i'),
                'properties' => $activity->properties->toArray(),
            ]);

        return Inertia::render('Aktivitas/Index', [
            'activities' => $activities,
            'filters' => $filters,
        ]);
    }

    private function activityTime(Activity $activity): ?Carbon
    {
        $createdAt = $activity->getRawOriginal('created_at');

        return $createdAt
            ? Carbon::parse($createdAt, 'UTC')->setTimezone(self::DISPLAY_TIMEZONE)
            : null;
    }
}
