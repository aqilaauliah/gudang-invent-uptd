<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <style>
        @page { margin: 1.35cm 1.45cm 1.6cm; }
        * { box-sizing: border-box; font-family: Helvetica, Arial, sans-serif; color: #111; }
        body { margin: 0; font-size: 10pt; }
        .letterhead { width: 100%; border-collapse: collapse; }
        .logo { width: 3.35cm; vertical-align: middle; }
        .logo img { display: block; width: 3.15cm; height: auto; margin: 0 auto; }
        .heading { text-align: center; vertical-align: middle; }
        .heading div { line-height: 1.08; white-space: nowrap; }
        .line-1, .line-2 { font-size: 13.5pt; }
        .line-3, .line-4 { font-size: 17pt; font-weight: bold; }
        .line-5, .line-6, .line-7 { font-size: 10.5pt; }
        .line-7 { font-weight: bold; }
        .rule { border-top: 3px solid #000; border-bottom: 1px solid #000; height: 5px; margin-top: 8px; }
        h1 { text-align: center; font-size: 14pt; margin: 16px 0 3px; }
        .period { text-align: center; margin: 0 0 12px; font-size: 10pt; }
        table.data { width: 100%; border-collapse: collapse; table-layout: fixed; }
        table.data thead { display: table-header-group; }
        table.data th { background: #e5e5e5; border: 1px solid #777; padding: 4px 3px; font-weight: bold; text-align: center; font-size: 8.5pt; word-wrap: break-word; }
        table.data td { border: 1px solid #999; padding: 3px; vertical-align: top; word-wrap: break-word; overflow-wrap: anywhere; font-size: 8.5pt; }
        .compact th, .compact td { font-size: 7.2pt !important; padding: 2px !important; }
        .no { width: 25px; text-align: center; }
        .summary { margin-top: 10px; font-size: 9.5pt; }
        .signature { width: 42%; margin: 28px 0 0 auto; text-align: center; font-size: 10pt; }
        .signature .space { height: 58px; }
        .footer { position: fixed; bottom: -1.05cm; left: 0; right: 0; text-align: center; font-size: 8pt; color: #555; }
        .page:after { content: "Halaman " counter(page) " dari " counter(pages); }
    </style>
</head>
<body>
    <table class="letterhead">
        <tr>
            <td class="logo"><img src="{{ $logo }}" alt="Logo Jawa Barat"></td>
            <td class="heading">
                <div class="line-1">PEMERINTAH DAERAH PROVINSI JAWA BARAT</div>
                <div class="line-2">DINAS TENAGA KERJA DAN TRANSMIGRASI</div>
                <div class="line-3">UPTD PENGAWASAN KETENAGAKERJAAN</div>
                <div class="line-4">WILAYAH II</div>
                <div class="line-5">Jl. Husni Hamid No. 55 A, Nagasari, Karawang Barat</div>
                <div class="line-6">Email : bppkwilayah2@gmail.com</div>
                <div class="line-7">KARAWANG - 41311</div>
            </td>
            <td class="logo"></td>
        </tr>
    </table>
    <div class="rule"></div>
    <h1>LAPORAN DATA INVENTARIS / ASET</h1>
    <p class="period">Periode: {{ $period }}</p>

    <table class="data {{ count($columns) > 7 ? 'compact' : '' }}">
        <thead>
            <tr><th class="no">No</th>@foreach ($columns as $column)<th>{{ $columnLabels[$column] }}</th>@endforeach</tr>
        </thead>
        <tbody>
            @foreach ($assets as $index => $asset)
                <tr>
                    <td class="no">{{ $index + 1 }}</td>
                    @foreach ($columns as $column)
                        <td>
                            @switch($column)
                                @case('kode'){{ $asset->kode }}@break
                                @case('nama'){{ $asset->nama }}@break
                                @case('kategori'){{ $asset->kategori }}@break
                                @case('merk'){{ $asset->merk ?: '-' }}@break
                                @case('no_seri'){{ $asset->no_seri ?: '-' }}@break
                                @case('lokasi'){{ $asset->location?->nama ?: '-' }}@break
                                @case('penanggung_jawab'){{ $asset->penanggung_jawab ?: '-' }}@break
                                @case('kondisi'){{ $asset->kondisi }}@break
                                @case('status'){{ $asset->status }}@break
                                @case('tanggal_perolehan'){{ $asset->tahun_perolehan ? '01 Januari '.$asset->tahun_perolehan : '-' }}@break
                            @endswitch
                        </td>
                    @endforeach
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
        <b>Ringkasan:</b> Total aset: <b>{{ $assets->count() }}</b> |
        Baik: <b>{{ $conditionSummary['Baik'] ?? 0 }}</b> |
        Rusak Ringan: <b>{{ $conditionSummary['Rusak Ringan'] ?? 0 }}</b> |
        Rusak Berat: <b>{{ $conditionSummary['Rusak Berat'] ?? 0 }}</b>
    </div>

    <div class="signature">
        Karawang, {{ $printedAt->locale('id')->translatedFormat('d F Y') }}<br>
        {{ $signature['title'] ?: 'Admin' }}
        <div class="space"></div>
        <b>{{ $signature['name'] }}</b><br>
        {{ $signature['nip'] ? 'NIP. '.$signature['nip'] : '' }}
    </div>
    <div class="footer"><span class="page"></span></div>
</body>
</html>
