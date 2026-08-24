<?php

namespace App\Http\Requests;

use App\Services\StockService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreMutationRequest extends FormRequest
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
            'location_from_id' => ['required', 'exists:locations,id', 'different:location_to_id'],
            'location_to_id' => ['required', 'exists:locations,id'],
            'jumlah' => ['required', 'integer', 'min:1'],
            'keterangan' => ['nullable', 'string'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                $itemId = (int) $this->input('item_id');
                $fromId = (int) $this->input('location_from_id');
                $jumlah = (int) $this->input('jumlah');

                if (! $itemId || ! $fromId || $jumlah < 1) {
                    return;
                }

                $available = app(StockService::class)->available($itemId, $fromId);

                if ($jumlah > $available) {
                    $validator->errors()->add('jumlah', 'Stok tidak mencukupi.');
                }
            },
        ];
    }
}
