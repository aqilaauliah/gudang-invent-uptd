<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ReportExport implements FromCollection, WithHeadings, WithTitle
{
    public function __construct(
        protected array $data,
    ) {
    }

    public function collection(): \Illuminate\Support\Collection
    {
        return collect($this->data['rows']);
    }

    public function headings(): array
    {
        return $this->data['headings'];
    }

    public function title(): string
    {
        return $this->data['title'];
    }
}
