<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kode' => ['required', 'string', 'max:50', 'unique:items,kode'],
            'nama' => ['required', 'string', 'max:255'],
            'kategori' => ['required', 'string', 'max:100'],
            'satuan' => ['required', 'string', 'max:50'],
            'stok_minimum' => ['required', 'integer', 'min:0'],
            'deskripsi' => ['nullable', 'string'],
            'status' => ['required', 'in:aktif,nonaktif'],
        ];
    }
}
