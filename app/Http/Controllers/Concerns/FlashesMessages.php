<?php

namespace App\Http\Controllers\Concerns;

trait FlashesMessages
{
    protected function flash(string $type, string $message): void
    {
        session()->flash('flash_type', $type);
        session()->flash('flash_message', $message);
    }
}
