<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAssetMutationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $asset = $this->route('asset');

        return [
            'to_location_id' => [
                'required',
                'exists:locations,id',
                Rule::notIn([$asset?->location_id]),
            ],
            'tanggal' => ['required', 'date'],
            'pj_baru' => ['nullable', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return ['to_location_id.not_in' => 'Lokasi tujuan harus berbeda dari lokasi asal.'];
    }
}
