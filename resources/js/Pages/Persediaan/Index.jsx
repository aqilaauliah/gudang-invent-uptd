import { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Search, MapPin, PackageCheck, PackageSearch, PackageX, Boxes } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import { StatusBadge } from '@/Components/StatusBadge';
import EmptyState from '@/Components/EmptyState';

export default function PersediaanIndex({ items, summary, locations }) {
    const [search, setSearch] = useState('');
    const [kategori, setKategori] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [status, setStatus] = useState('');

    const kategoriList = useMemo(() => [...new Set(items.map((i) => i.kategori))].sort(), [items]);

    const filtered = useMemo(() => {
        return items.filter((item) => {
            const matchSearch =
                !search ||
                item.nama.toLowerCase().includes(search.toLowerCase()) ||
                item.kode.toLowerCase().includes(search.toLowerCase());
            const matchKategori = !kategori || item.kategori === kategori;
            const matchStatus = !status || item.stok_status === status;
            const matchLokasi = !lokasi || item.stocks.some((s) => String(s.location_id) === String(lokasi));

            return matchSearch && matchKategori && matchStatus && matchLokasi;
        });
    }, [items, search, kategori, lokasi, status]);

    const summaryCards = [
        { label: 'Total Barang', value: summary.total_barang, icon: Boxes, tone: 'blue' },
        { label: 'Barang Aman', value: summary.aman, icon: PackageCheck, tone: 'green' },
        { label: 'Barang Menipis', value: summary.menipis, icon: PackageSearch, tone: 'yellow' },
        { label: 'Barang Habis', value: summary.habis, icon: PackageX, tone: 'red' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Persediaan" />

            <PageHeader title="Persediaan" description="Pantau stok barang di setiap lokasi penyimpanan." />

            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <Card key={card.label}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted">{card.label}</span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-card bg-primary-soft">
                                <card.icon className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <p className="mt-2 font-display text-2xl font-bold text-ink">{card.value}</p>
                    </Card>
                ))}
            </div>

            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari barang..."
                        className="h-11 w-full rounded-btn border border-line bg-white pl-10 pr-3.5 text-sm focus:border-primary focus:outline-none"
                    />
                </div>
                <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none">
                    <option value="">Semua Kategori</option>
                    {kategoriList.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <select value={lokasi} onChange={(e) => setLokasi(e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none">
                    <option value="">Semua Lokasi</option>
                    {locations.map((l) => (
                        <option key={l.id} value={l.id}>{l.nama}</option>
                    ))}
                </select>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none">
                    <option value="">Semua Status</option>
                    <option value="aman">Aman</option>
                    <option value="menipis">Menipis</option>
                    <option value="habis">Habis</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <EmptyState
                    title="Tidak Ada Hasil"
                    description="Tidak ada barang yang cocok dengan filter yang dipilih."
                />
            ) : (
                <>
                    <div className="hidden overflow-hidden rounded-card border border-line bg-white shadow-card md:block">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                                    <th className="px-5 py-3.5 font-semibold">Kode</th>
                                    <th className="px-5 py-3.5 font-semibold">Nama Barang</th>
                                    <th className="px-5 py-3.5 font-semibold">Kategori</th>
                                    <th className="px-5 py-3.5 font-semibold">Lokasi</th>
                                    <th className="px-5 py-3.5 text-right font-semibold">Stok</th>
                                    <th className="px-5 py-3.5 text-right font-semibold">Minimum</th>
                                    <th className="px-5 py-3.5 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                                {filtered.map((item) => (
                                    <tr key={item.id} className="transition hover:bg-surface">
                                        <td className="px-5 py-3.5 font-medium text-ink">{item.kode}</td>
                                        <td className="px-5 py-3.5 font-medium text-ink">{item.nama}</td>
                                        <td className="px-5 py-3.5 text-muted">{item.kategori}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex max-w-xs flex-wrap gap-1">
                                                {item.stocks.map((s) => (
                                                    <span key={s.location_id} className="inline-flex items-center gap-1 rounded-badge bg-surface px-2 py-0.5 text-xs text-muted">
                                                        <MapPin className="h-3 w-3" />
                                                        {s.location_nama}: {s.jumlah}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-right font-semibold text-ink">
                                            {item.total_stock} <span className="font-normal text-muted">{item.satuan}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right text-muted">{item.stok_minimum}</td>
                                        <td className="px-5 py-3.5"><StatusBadge status={item.stok_status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:hidden">
                        {filtered.map((item) => (
                            <div key={item.id} className="rounded-card border border-line bg-white p-4 shadow-card">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-medium text-muted">{item.kode}</p>
                                        <p className="font-medium text-ink">{item.nama}</p>
                                        <p className="text-xs text-muted">{item.kategori}</p>
                                    </div>
                                    <StatusBadge status={item.stok_status} />
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {item.stocks.map((s) => (
                                        <span key={s.location_id} className="inline-flex items-center gap-1 rounded-badge bg-surface px-2 py-0.5 text-xs text-muted">
                                            <MapPin className="h-3 w-3" />
                                            {s.location_nama}: {s.jumlah}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-3 text-sm text-muted">
                                    Total: <span className="font-semibold text-ink">{item.total_stock} {item.satuan}</span>
                                    {' '}· Min: {item.stok_minimum}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
