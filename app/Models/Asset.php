<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode',
        'nama',
        'kategori',
        'merk',
        'tipe_model',
        'no_seri',
        'tahun_perolehan',
        'sumber_perolehan',
        'nilai_perolehan',
        'location_id',
        'penanggung_jawab',
        'kondisi',
        'status',
        'foto',
        'keterangan',
    ];

    protected function casts(): array
    {
        return [
            'tahun_perolehan' => 'integer',
            'nilai_perolehan' => 'decimal:2',
        ];
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function histories(): HasMany
    {
        return $this->hasMany(AssetHistory::class)->orderByDesc('tanggal')->orderByDesc('id');
    }
}
