<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ActivityController extends Controller
{
    private const DISPLAY_TIMEZONE = 'Asia/Jakarta';

    public function index(Request $request): Response
    {
        $activities = QueryBuilder::for(Activity::class)
            ->with('causer')
            ->allowedFilters(
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where('description', 'like', "%{$value}%");
                }),
            )
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
            'filters' => request()->only(['search']),
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
