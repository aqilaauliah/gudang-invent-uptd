<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode',
        'nama',
        'kategori',
        'satuan',
        'stok_minimum',
        'deskripsi',
        'status',
    ];

    protected $appends = ['total_stock', 'stok_status'];

    public function stocks(): HasMany
    {
        return $this->hasMany(ItemLocationStock::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function getTotalStockAttribute(): int
    {
        return (int) $this->stocks()->sum('jumlah');
    }

    public function getStokStatusAttribute(): string
    {
        $total = $this->total_stock;

        if ($total <= 0) {
            return 'habis';
        }

        if ($total <= $this->stok_minimum) {
            return 'menipis';
        }

        return 'aman';
    }
}
