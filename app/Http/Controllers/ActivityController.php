<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ActivityController extends Controller
{
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
                'time' => $activity->created_at?->diffForHumans(),
                'created_at' => $activity->created_at?->format('d M Y H:i'),
                'properties' => $activity->properties->toArray(),
            ]);

        return Inertia::render('Aktivitas/Index', [
            'activities' => $activities,
            'filters' => request()->only(['search']),
        ]);
    }
}
