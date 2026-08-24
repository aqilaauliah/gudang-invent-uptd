<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'keterangan', 'penanggung_jawab'];

    public function stocks(): HasMany
    {
        return $this->hasMany(ItemLocationStock::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
}
