<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor',
        'tipe',
        'item_id',
        'location_id',
        'location_from_id',
        'location_to_id',
        'jumlah',
        'tanggal',
        'dicatat_oleh',
        'nama_petugas',
        'nama_pengambil',
        'sumber_supplier',
        'no_dokumen',
        'keperluan',
        'keterangan',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
        ];
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

    public function locationFrom(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_from_id');
    }

    public function locationTo(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_to_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function generateNomor(string $tipe): string
    {
        $prefix = match ($tipe) {
            'masuk' => 'BM',
            'keluar' => 'BK',
            'mutasi' => 'MT',
            default => 'TX',
        };

        $date = now()->format('Ymd');
        $seq = static::where('nomor', 'like', "{$prefix}-{$date}-%")->count() + 1;

        do {
            $nomor = sprintf('%s-%s-%03d', $prefix, $date, $seq);
            $seq++;
        } while (static::where('nomor', $nomor)->exists());

        return $nomor;
    }
}
