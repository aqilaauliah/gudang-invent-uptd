<?php

namespace App\Http\Requests;

use App\Services\StockService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreOutgoingRequest extends FormRequest
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
            'nama_pengambil' => ['required', 'string', 'max:255'],
            'keperluan' => ['nullable', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                $itemId = (int) $this->input('item_id');
                $locationId = (int) $this->input('location_id');
                $jumlah = (int) $this->input('jumlah');

                if (! $itemId || ! $locationId || $jumlah < 1) {
                    return;
                }

                $available = app(StockService::class)->available($itemId, $locationId);

                if ($jumlah > $available) {
                    $validator->errors()->add('jumlah', 'Stok tidak mencukupi.');
                }
            },
        ];
    }
}
