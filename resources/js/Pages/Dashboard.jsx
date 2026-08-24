import { Head, Link, usePage } from '@inertiajs/react';
import {
    Package,
    Boxes,
    MonitorSmartphone,
    MapPin,
    AlertTriangle,
    Wrench,
    Plus,
    Activity,
    ArrowRight,
} from 'lucide-react';
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
import StatCard from '@/Components/StatCard';
import Card from '@/Components/Card';
import { StatusBadge } from '@/Components/StatusBadge';
import Button from '@/Components/Button';

const CHART_COLORS = ['#0B1F3A', '#2563EB', '#F5B700', '#16A34A', '#64748B'];

export default function Dashboard({ stats, charts, lowStock, recentActivities }) {
    const { auth } = usePage().props;
    const fmt = (n) => Number(n ?? 0).toLocaleString('id-ID');

    const pieData = (data) =>
        data.map((d) => ({ name: d.name, value: Number(d.value) }));

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
                        Selamat datang, {auth.user?.name ?? 'Admin'} 👋
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Kelola persediaan dan inventaris UPTD dengan lebih mudah dan terstruktur.
                    </p>
                </div>
                <Button href="/barang">
                    <Plus className="h-4 w-4" />
                    Tambah Barang
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                <StatCard icon={Package} label="Total Jenis Barang" value={fmt(stats.total_barang)} tone="blue" />
                <StatCard icon={Boxes} label="Total Stok" value={fmt(stats.total_stok)} tone="navy" />
                <StatCard icon={MonitorSmartphone} label="Total Inventaris" value={fmt(stats.total_inventaris)} tone="green" />
                <StatCard icon={MapPin} label="Total Lokasi" value={fmt(stats.total_lokasi)} tone="yellow" />
                <StatCard icon={AlertTriangle} label="Barang Menipis" value={fmt(stats.barang_menipis)} tone="yellow" />
                <StatCard icon={Wrench} label="Inventaris Bermasalah" value={fmt(stats.inventaris_bermasalah)} tone="red" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card title="Barang Masuk vs Keluar" className="lg:col-span-2">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={charts.masukVsKeluar.labels.map((label, i) => ({
                                bulan: label,
                                masuk: charts.masukVsKeluar.masuk[i],
                                keluar: charts.masukVsKeluar.keluar[i],
                            }))} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="bulan" tickLine={false} axisLine={false} fontSize={12} stroke="#64748B" />
                                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#64748B" allowDecimals={false} />
                                <Tooltip
                                    cursor={{ fill: '#F7F9FC' }}
                                    contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                                <Bar dataKey="masuk" name="Masuk" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={28} />
                                <Bar dataKey="keluar" name="Keluar" fill="#F5B700" radius={[6, 6, 0, 0]} maxBarSize={28} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Stok Berdasarkan Kategori">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData(charts.stokPerKategori)}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={55}
                                    outerRadius={90}
                                    paddingAngle={3}
                                >
                                    {pieData(charts.stokPerKategori).map((entry, i) => (
                                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card title="Barang Berdasarkan Lokasi">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={charts.stokPerLokasi.map((d) => ({ name: d.name, stok: Number(d.value) }))}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke="#64748B" interval={0} />
                                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#64748B" allowDecimals={false} />
                                <Tooltip
                                    cursor={{ fill: '#F7F9FC' }}
                                    contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }}
                                />
                                <Bar dataKey="stok" name="Stok" fill="#0B1F3A" radius={[6, 6, 0, 0]} maxBarSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Kondisi Inventaris">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData(charts.kondisiInventaris)}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={50}
                                    outerRadius={85}
                                    paddingAngle={3}
                                >
                                    {pieData(charts.kondisiInventaris).map((entry, i) => (
                                        <Cell key={i} fill={['#16A34A', '#F5B700', '#DC2626'][i] ?? CHART_COLORS[i]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card
                    title="Peringatan Stok Menipis"
                    action={
                        lowStock.length > 0 && (
                            <Link href="/persediaan" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                                Lihat semua <ArrowRight className="h-4 w-4" />
                            </Link>
                        )
                    }
                >
                    {lowStock.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted">Semua stok dalam kondisi aman.</p>
                    ) : (
                        <ul className="space-y-3">
                            {lowStock.map((item) => (
                                <li
                                    key={item.id}
                                    className={`rounded-btn border p-3.5 ${
                                        item.stok_status === 'habis' ? 'border-danger/30 bg-danger-soft' : 'border-gold/40 bg-gold-soft'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-ink">{item.nama}</p>
                                            <p className="text-xs text-muted">
                                                {item.total_stock} {item.satuan} / minimum {item.stok_minimum} {item.satuan}
                                            </p>
                                        </div>
                                        <StatusBadge status={item.stok_status} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>

            <div className="mt-6">
                <Card title="Aktivitas Terbaru">
                    {recentActivities.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted">Belum ada aktivitas tercatat.</p>
                    ) : (
                        <ul className="divide-y divide-line">
                            {recentActivities.map((activity) => (
                                <li key={activity.id} className="flex items-start gap-3 py-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-card bg-primary-soft">
                                        <Activity className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-ink">{activity.description}</p>
                                        <p className="mt-0.5 text-xs text-muted">
                                            {activity.causer ?? 'Sistem'} · {activity.time}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
