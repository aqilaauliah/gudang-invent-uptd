<?php

namespace App\Services;

use App\Exceptions\InsufficientStockException;
use App\Models\ItemLocationStock;
use Illuminate\Support\Facades\DB;

class StockService
{
    public function add(int $itemId, int $locationId, int $qty): void
    {
        DB::transaction(function () use ($itemId, $locationId, $qty) {
            $stock = ItemLocationStock::firstOrCreate(
                ['item_id' => $itemId, 'location_id' => $locationId],
                ['jumlah' => 0],
            );

            $stock->increment('jumlah', $qty);
        });
    }

    public function subtract(int $itemId, int $locationId, int $qty): void
    {
        DB::transaction(function () use ($itemId, $locationId, $qty) {
            $stock = ItemLocationStock::where('item_id', $itemId)
                ->where('location_id', $locationId)
                ->lockForUpdate()
                ->first();

            if (! $stock || $stock->jumlah < $qty) {
                throw new InsufficientStockException;
            }

            $stock->decrement('jumlah', $qty);
        });
    }

    public function transfer(int $itemId, int $fromId, int $toId, int $qty): void
    {
        DB::transaction(function () use ($itemId, $fromId, $toId, $qty) {
            $this->subtract($itemId, $fromId, $qty);
            $this->add($itemId, $toId, $qty);
        });
    }

    public function available(int $itemId, int $locationId): int
    {
        return (int) (ItemLocationStock::where('item_id', $itemId)
            ->where('location_id', $locationId)
            ->value('jumlah') ?? 0);
    }
}
