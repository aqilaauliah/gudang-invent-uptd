import { Head, router } from '@inertiajs/react';
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

const TYPES = [
    { value: 'persediaan', label: 'Persediaan' },
    { value: 'masuk', label: 'Barang Masuk' },
    { value: 'keluar', label: 'Barang Keluar' },
    { value: 'mutasi', label: 'Mutasi' },
    { value: 'inventaris', label: 'Inventaris' },
    { value: 'menipis', label: 'Stok Menipis' },
];

const COLORS = ['#0B1F3A', '#2563EB', '#F5B700', '#16A34A', '#64748B'];

export default function LaporanIndex({ type, title, dari, sampai, charts, headings, rows }) {
    function apply(field, value) {
        router.get(route('laporan.index'), { type, dari, sampai, [field]: value }, {
            preserveState: true,
            replace: true,
        });
    }

    function exportUrl(format) {
        const params = new URLSearchParams({ type, dari, sampai });
        return `/laporan/export/${format}?${params.toString()}`;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Laporan" />

            <PageHeader title="Laporan" description="Pantau dan ekspor laporan persediaan & inventaris.">
                <Button variant="secondary" href={exportUrl('pdf')}>
                    <FileText className="h-4 w-4" />
                    Export PDF
                </Button>
                <Button href={exportUrl('excel')}>
                    <FileSpreadsheet className="h-4 w-4" />
                    Export Excel
                </Button>
            </PageHeader>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={dari}
                        onChange={(e) => apply('dari', e.target.value)}
                        className="h-11 rounded-btn border border-line bg-white px-3 text-sm focus:border-primary focus:outline-none"
                    />
                    <span className="text-sm text-muted">s/d</span>
                    <input
                        type="date"
                        value={sampai}
                        onChange={(e) => apply('sampai', e.target.value)}
                        className="h-11 rounded-btn border border-line bg-white px-3 text-sm focus:border-primary focus:outline-none"
                    />
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
