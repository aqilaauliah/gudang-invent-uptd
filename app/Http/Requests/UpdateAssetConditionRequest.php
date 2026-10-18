<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssetConditionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kondisi' => ['required', 'in:Baik,Rusak Ringan,Rusak Berat'],
            'foto' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
