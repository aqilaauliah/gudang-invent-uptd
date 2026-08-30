<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailChangeCode extends Model
{
    protected $fillable = ['user_id', 'code_hash', 'new_email', 'expires_at', 'used_at', 'attempts'];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'used_at' => 'datetime',
            'attempts' => 'integer',
        ];
    }
}
