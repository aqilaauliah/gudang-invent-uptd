<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        * { font-family: 'DejaVu Sans', sans-serif; font-size: 12px; color: #172033; }
        body { padding: 24px; }
        .header { display: flex; align-items: center; margin-bottom: 16px; }
        .brand { flex: 1; }
        .brand h1 { font-size: 20px; margin: 0; color: #0B1F3A; }
        .brand p { margin: 2px 0; color: #64748B; }
        h2 { font-size: 16px; margin: 16px 0 4px; color: #0B1F3A; }
        .periode { color: #64748B; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th { background: #F7F9FC; border: 1px solid #E2E8F0; padding: 8px; text-align: left; font-size: 11px; }
        td { border: 1px solid #E2E8F0; padding: 7px 8px; }
        tr:nth-child(even) td { background: #FAFBFC; }
        .footer { margin-top: 24px; color: #64748B; font-size: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="brand">
            <h1>SIGUDIN</h1>
            <p>Sistem Informasi Gudang dan Inventaris</p>
            <p>UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang</p>
        </div>
    </div>

    <h2>{{ $title }}</h2>
    <p class="periode">Periode: {{ $dari }} s/d {{ $sampai }}</p>

    <table>
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
                    <td colspan="{{ count($headings) }}" style="text-align:center">Tidak ada data.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dokumen ini dibuat otomatis oleh sistem SIGUDIN pada {{ now()->format('d M Y H:i') }}.
    </div>
</body>
</html>
