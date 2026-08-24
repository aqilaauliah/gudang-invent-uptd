<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLocationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255', 'unique:locations,nama'],
            'keterangan' => ['nullable', 'string'],
            'penanggung_jawab' => ['nullable', 'string', 'max:255'],
        ];
    }
}
