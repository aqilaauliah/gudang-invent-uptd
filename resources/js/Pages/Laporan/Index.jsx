import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import EmptyState from '@/Components/EmptyState';
import Modal from '@/Components/Modal';

const TYPES = [
    { value: 'persediaan', label: 'Persediaan' },
    { value: 'masuk', label: 'Barang Masuk' },
    { value: 'keluar', label: 'Barang Keluar' },
    { value: 'mutasi', label: 'Mutasi' },
    { value: 'inventaris', label: 'Inventaris' },
    { value: 'menipis', label: 'Stok Menipis' },
];

const COLORS = ['#0B1F3A', '#2563EB', '#F5B700', '#16A34A', '#64748B'];

export default function LaporanIndex({ type, title, dari, sampai, tahun, tahunOptions, charts, headings, rows, columnOptions }) {
    const { auth } = usePage().props;
    const canExportReports = auth.permissions?.includes('export-reports') ?? false;
    const [exportOpen, setExportOpen] = useState(false);
    const [exportConfig, setExportConfig] = useState({
        columns: columnOptions.map((column) => column.value),
        orientation: 'landscape',
        signature_name: auth.user?.name ?? '',
        signature_title: 'Admin',
        signature_nip: '',
    });

    function apply(field, value) {
        const params = { type, dari, sampai, tahun };
        if (field === 'tahun') {
            params.tahun = value || undefined;
            delete params.dari;
            delete params.sampai;
        } else {
            params[field] = value || undefined;
        }
        router.get(route('laporan.index'), params, {
            preserveState: true,
            replace: true,
        });
    }

    function exportUrl(format, extra = {}) {
        const params = new URLSearchParams();
        params.set('type', type);
        if (tahun) params.set('tahun', tahun);
        if (dari) params.set('dari', dari);
        if (sampai) params.set('sampai', sampai);
        Object.entries(extra).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        return `/laporan/export/${format}?${params.toString()}`;
    }

    function exportPdf() {
        const params = new URLSearchParams();
        params.set('type', type);
        if (tahun) params.set('tahun', tahun);
        if (dari) params.set('dari', dari);
        if (sampai) params.set('sampai', sampai);
        exportConfig.columns.forEach((column) => params.append('columns[]', column));
        params.set('orientation', exportConfig.orientation);
        params.set('signature_name', exportConfig.signature_name);
        params.set('signature_title', exportConfig.signature_title);
        params.set('signature_nip', exportConfig.signature_nip);
        window.location.href = `/laporan/export/pdf?${params.toString()}`;
        setExportOpen(false);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Laporan" />

            <PageHeader
                title="Laporan"
                description={canExportReports ? 'Pantau dan ekspor laporan persediaan & inventaris.' : 'Pantau laporan operasional persediaan & inventaris.'}
            >
                {canExportReports && (
                    <>
                        <Button variant="secondary" onClick={() => setExportOpen(true)}>
                            <FileText className="h-4 w-4" />
                            Export PDF
                        </Button>
                        <Button external href={exportUrl('excel')}>
                            <FileSpreadsheet className="h-4 w-4" />
                            Export Excel
                        </Button>
                    </>
                )}
            </PageHeader>

            <Modal open={exportOpen} onClose={() => setExportOpen(false)} title={`Ekspor PDF - ${title}`} size="lg">
                <div className="space-y-5">
                    <div>
                        <p className="mb-2 text-sm font-medium text-ink">Pilih kolom laporan</p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {columnOptions.map((column) => (
                                <label key={column.value} className="flex items-center gap-2 text-sm text-muted">
                                    <input
                                        type="checkbox"
                                        checked={exportConfig.columns.includes(column.value)}
                                        onChange={(e) => setExportConfig((current) => ({
                                            ...current,
                                            columns: e.target.checked
                                                ? [...current.columns, column.value]
                                                : current.columns.filter((value) => value !== column.value),
                                        }))}
                                        className="h-4 w-4 rounded border-line text-primary focus:ring-primary"
                                    />
                                    {column.label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="text-sm font-medium text-ink">Orientasi
                            <select value={exportConfig.orientation} onChange={(e) => setExportConfig({ ...exportConfig, orientation: e.target.value })} className="mt-1 h-11 w-full rounded-btn border border-line bg-white px-3.5 text-sm">
                                <option value="portrait">Portrait</option>
                                <option value="landscape">Landscape</option>
                            </select>
                        </label>
                        <label className="text-sm font-medium text-ink">Nama penandatangan
                            <input value={exportConfig.signature_name} onChange={(e) => setExportConfig({ ...exportConfig, signature_name: e.target.value })} className="mt-1 h-11 w-full rounded-btn border border-line px-3.5 text-sm" />
                        </label>
                        <label className="text-sm font-medium text-ink">Jabatan
                            <input value={exportConfig.signature_title} onChange={(e) => setExportConfig({ ...exportConfig, signature_title: e.target.value })} className="mt-1 h-11 w-full rounded-btn border border-line px-3.5 text-sm" />
                        </label>
                        <label className="text-sm font-medium text-ink">NIP
                            <input value={exportConfig.signature_nip} onChange={(e) => setExportConfig({ ...exportConfig, signature_nip: e.target.value })} className="mt-1 h-11 w-full rounded-btn border border-line px-3.5 text-sm" />
                        </label>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Button variant="secondary" onClick={() => setExportOpen(false)}>Batal</Button>
                        <Button onClick={exportPdf} disabled={exportConfig.columns.length === 0}>Ekspor PDF</Button>
                    </div>
                </div>
            </Modal>

            <div className="mb-6 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => apply('type', t.value)}
                            className={`rounded-btn px-4 py-2 text-sm font-medium transition ${
                                type === t.value
                                    ? 'bg-primary text-white'
                                    : 'border border-line bg-white text-muted hover:bg-surface'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <select
                        value={tahun ?? ''}
                        onChange={(e) => apply('tahun', e.target.value)}
                        className="h-11 w-full rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none sm:w-auto"
                    >
                        <option value="">Semua Tahun</option>
                        {tahunOptions.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={dari}
                            onChange={(e) => apply('dari', e.target.value)}
                            className="h-11 w-full rounded-btn border border-line bg-white px-3 text-sm focus:border-primary focus:outline-none sm:w-auto"
                        />
                        <span className="text-sm text-muted">s/d</span>
                        <input
                            type="date"
                            value={sampai}
                            onChange={(e) => apply('sampai', e.target.value)}
                            className="h-11 w-full rounded-btn border border-line bg-white px-3 text-sm focus:border-primary focus:outline-none sm:w-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card title="Barang Masuk vs Keluar">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={charts.masukVsKeluar.labels.map((label, i) => ({
                                periode: label,
                                masuk: charts.masukVsKeluar.masuk[i],
                                keluar: charts.masukVsKeluar.keluar[i],
                            }))} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="periode" tickLine={false} axisLine={false} fontSize={11} stroke="#64748B" />
                                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="#64748B" allowDecimals={false} />
                                <Tooltip cursor={{ fill: '#F7F9FC' }} contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                <Bar dataKey="masuk" name="Masuk" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={24} />
                                <Bar dataKey="keluar" name="Keluar" fill="#F5B700" radius={[6, 6, 0, 0]} maxBarSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Stok Berdasarkan Kategori">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={charts.stokPerKategori} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                                    {charts.stokPerKategori.map((entry, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Kondisi Inventaris">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={charts.kondisiInventaris} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                                    {charts.kondisiInventaris.map((entry, i) => (
                                        <Cell key={i} fill={['#16A34A', '#F5B700', '#DC2626'][i] ?? COLORS[i]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Barang Berdasarkan Lokasi">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={charts.stokPerLokasi}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke="#64748B" interval={0} />
                                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="#64748B" allowDecimals={false} />
                                <Tooltip cursor={{ fill: '#F7F9FC' }} contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                                <Bar dataKey="value" name="Stok" fill="#0B1F3A" radius={[6, 6, 0, 0]} maxBarSize={28} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="mt-6">
                <Card title={title} action={<span className="flex items-center gap-1.5 text-sm text-muted"><Download className="h-4 w-4" />{rows.length} baris</span>}>
                    {rows.length === 0 ? (
                        <EmptyState
                            title="Tidak Ada Data"
                            description="Tidak ada data untuk periode yang dipilih."
                        />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                                        {headings.map((h) => (
                                            <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-line">
                                    {rows.map((row, i) => (
                                        <tr key={i} className="transition hover:bg-surface">
                                            {row.map((cell, j) => (
                                                <td key={j} className={`whitespace-nowrap px-4 py-3 ${j === 0 ? 'font-medium text-ink' : 'text-muted'}`}>
                                                    {cell ?? '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
