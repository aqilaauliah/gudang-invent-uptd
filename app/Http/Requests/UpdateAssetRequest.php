<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kode' => ['required', 'string', 'max:50', 'unique:assets,kode,'.$this->route('asset')->id],
            'nama' => ['required', 'string', 'max:255'],
            'kategori' => ['required', 'string', 'max:100'],
            'merk' => ['nullable', 'string', 'max:100'],
            'tipe_model' => ['nullable', 'string', 'max:100'],
            'no_seri' => ['nullable', 'string', 'max:100'],
            'tahun_perolehan' => ['nullable', 'integer', 'min:1990', 'max:2100'],
            'sumber_perolehan' => ['nullable', 'string', 'max:255'],
            'nilai_perolehan' => ['nullable', 'numeric', 'min:0'],
            'location_id' => ['nullable', 'exists:locations,id'],
            'penanggung_jawab' => ['nullable', 'string', 'max:255'],
            'kondisi' => ['required', 'in:Baik,Rusak Ringan,Rusak Berat'],
            'status' => ['required', 'in:Digunakan,Tersimpan,Dipindahkan,Dalam Perbaikan,Tidak Digunakan'],
            'foto' => ['nullable', 'image', 'max:2048'],
            'keterangan' => ['nullable', 'string'],
        ];
    }
}
