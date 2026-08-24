<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        * { font-family: 'DejaVu Sans', sans-serif; color: #172033; box-sizing: border-box; }
        body { padding: 28px; font-size: 11px; margin: 0; }

        .kop { width: 100%; border-collapse: collapse; margin-bottom: 5px; }
        .kop .logo-cell { width: 95px; vertical-align: middle; text-align: center; }
        .kop .logo-cell img { width: 80px; height: auto; }
        .kop .inst-cell { text-align: center; vertical-align: middle; padding: 0 8px; }
        .kop .line1 { font-size: 13px; font-weight: bold; color: #0B1F3A; letter-spacing: 0.08em; }
        .kop .line2 { font-size: 13px; font-weight: bold; color: #0B1F3A; letter-spacing: 0.04em; }
        .kop .line3 { font-size: 12px; font-weight: bold; color: #0B1F3A; letter-spacing: 0.02em; }
        .kop .addr { font-size: 9px; color: #64748B; margin-top: 3px; }
        .kop-rule { border-top: 3px solid #0B1F3A; margin-bottom: 2px; }
        .kop-rule-thin { border-top: 1px solid #0B1F3A; margin-bottom: 24px; }

        .doc-title { font-size: 15px; font-weight: bold; color: #0B1F3A; text-align: center; margin: 0 0 4px; }
        .periode { text-align: center; color: #64748B; margin: 0 0 18px; font-size: 11px; }

        table.data { width: 100%; border-collapse: collapse; }
        table.data th {
            background: #0B1F3A;
            color: #FFFFFF;
            border: 1px solid #0B1F3A;
            padding: 7px 8px;
            text-align: left;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }
        table.data td { border: 1px solid #E2E8F0; padding: 6px 8px; font-size: 10px; }
        table.data tr:nth-child(even) td { background: #F7F9FC; }
        td.num, th.num { text-align: right; white-space: nowrap; }

        .summary { margin-top: 14px; font-size: 11px; }
        .summary b { color: #0B1F3A; }

        .sign { margin-top: 44px; width: 100%; border-collapse: collapse; }
        .sign td { font-size: 11px; vertical-align: bottom; }
        .sign .right { text-align: center; }
        .sign .space { height: 64px; }

        .footer { margin-top: 26px; padding-top: 8px; border-top: 1px solid #E2E8F0; font-size: 9px; color: #94A3B8; text-align: center; }
    </style>
</head>
<body>
    <table class="kop">
        <tr>
            <td class="logo-cell">
                <img src="{{ public_path('image/logo-disnakertrans.png') }}" alt="Logo DISNAKERTRANS">
            </td>
            <td class="inst-cell">
                <div class="line1">PEMERINTAH PROVINSI JAWA BARAT</div>
                <div class="line2">DINAS TENAGA KERJA DAN TRANSMIGRASI</div>
                <div class="line3">UPTD PENGAWASAN KETENAGAKERJAAN WILAYAH II KARAWANG</div>
                <div class="addr">Jl. Husni Hamid No.55A, Nagasari, Kec. Karawang Bar., Karawang, Jawa Barat 41312</div>
            </td>
            <td style="width: 92px;"></td>
        </tr>
    </table>
    <div class="kop-rule"></div>
    <div class="kop-rule-thin"></div>

    <p class="doc-title">{{ $title }}</p>
    <p class="periode">Periode: {{ $dari }} s/d {{ $sampai }}</p>

    <table class="data">
        <thead>
            <tr>
                @foreach ($headings as $heading)
                    <th>{{ $heading }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @forelse ($rows as $row)
                <tr>
                    @foreach ($row as $cell)
                        <td>{{ $cell }}</td>
                    @endforeach
                </tr>
            @empty
                <tr>
                    <td colspan="{{ count($headings) }}" style="text-align:center; color:#64748B;">Tidak ada data.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <p class="summary">Total: <b>{{ count($rows) }}</b> baris.</p>

    <table class="sign">
        <tr>
            <td style="width: 55%;"></td>
            <td class="right" style="width: 45%;">
                Karawang, {{ now()->format('d F Y') }}
                <div class="space"></div>
                <b>Petugas Gudang</b>
            </td>
        </tr>
    </table>

    <div class="footer">
        Dokumen ini dibuat otomatis oleh sistem SIGUDIN pada {{ now()->format('d M Y H:i') }}.
    </div>
</body>
</html>
