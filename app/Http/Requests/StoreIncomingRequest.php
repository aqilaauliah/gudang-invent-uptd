<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIncomingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tanggal' => ['required', 'date'],
            'item_id' => ['required', 'exists:items,id'],
            'location_id' => ['required', 'exists:locations,id'],
            'jumlah' => ['required', 'integer', 'min:1'],
            'sumber_supplier' => ['nullable', 'string', 'max:255'],
            'no_dokumen' => ['nullable', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
        ];
    }
}
