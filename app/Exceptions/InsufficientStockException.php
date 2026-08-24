<?php

namespace App\Exceptions;

use RuntimeException;

class InsufficientStockException extends RuntimeException
{
    public function __construct(string $message = 'Stok tidak mencukupi.')
    {
        parent::__construct($message);
    }
}
