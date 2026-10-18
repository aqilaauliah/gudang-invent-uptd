import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Pencil, Trash2, Eye, MonitorSmartphone } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';
import ConfirmModal from '@/Components/ConfirmModal';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import Modal from '@/Components/Modal';
import { KondisiBadge, Badge } from '@/Components/StatusBadge';

export default function AsetIndex({ assets, filters, options }) {
    const { auth, locations } = usePage().props;
    const canManageAssets = auth.permissions?.includes('manage-assets') ?? false;
    const canExportAssets = auth.permissions?.includes('export-asset-reports') ?? false;
    const [deleting, setDeleting] = useState(null);
    const [exportOpen, setExportOpen] = useState(false);
    const [exportConfig, setExportConfig] = useState({
        columns: ['kode', 'nama', 'kategori', 'merk', 'no_seri', 'lokasi', 'penanggung_jawab', 'kondisi', 'status', 'tanggal_perolehan'],
        orientation: 'landscape',
        signature_name: auth.user?.name ?? '',
        signature_title: '',
        signature_nip: '',
    });

    const exportColumns = [
        ['kode', 'Kode Inventaris'], ['nama', 'Nama'], ['kategori', 'Kategori'], ['merk', 'Merk'],
        ['no_seri', 'No. Seri'], ['lokasi', 'Lokasi'], ['penanggung_jawab', 'Penanggung Jawab'],
        ['kondisi', 'Kondisi'], ['status', 'Status'], ['tanggal_perolehan', 'Tanggal Perolehan'],
    ];

    function applyFilter(key, value) {
        router.get(route('aset.index'), { filter: { ...filters, [key]: value || undefined }, page: undefined }, {
            preserveState: true,
            replace: true,
        });
    }

    function confirmDelete() {
        if (!deleting) return;
        router.delete(route('aset.destroy', deleting.id), {
            onSuccess: () => setDeleting(null),
            preserveScroll: true,
        });
    }

    function exportPdf() {
        const params = new URLSearchParams();
        Object.entries(filters ?? {}).forEach(([key, value]) => {
            if (value) params.set(`filter[${key}]`, value);
        });
        exportConfig.columns.forEach((column) => params.append('columns[]', column));
        params.set('orientation', exportConfig.orientation);
        params.set('signature_name', exportConfig.signature_name);
        params.set('signature_title', exportConfig.signature_title);
        params.set('signature_nip', exportConfig.signature_nip);
        window.location.href = `${route('aset.export.pdf')}?${params.toString()}`;
        setExportOpen(false);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Inventaris / Aset" />

            <PageHeader title="Inventaris / Aset" description="Kelola aset kantor secara individual.">
                {canExportAssets && <Button variant="secondary" onClick={() => setExportOpen(true)}>Ekspor PDF</Button>}
                {canManageAssets && (
                    <Button href="/aset/create">
                        <Plus className="h-4 w-4" />
                        Tambah Aset
                    </Button>
                )}
            </PageHeader>

            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        defaultValue={filters.search}
                        placeholder="Cari kode, nama, merk..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') applyFilter('search', e.target.value);
                        }}
                        className="h-11 w-full rounded-btn border border-line bg-white pl-10 pr-3.5 text-sm focus:border-primary focus:outline-none"
                    />
                </div>
                <select value={filters.kategori ?? ''} onChange={(e) => applyFilter('kategori', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none">
                    <option value="">Semua Kategori</option>
                    {options.assetCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <select value={filters.kondisi ?? ''} onChange={(e) => applyFilter('kondisi', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none">
                    <option value="">Semua Kondisi</option>
                    {options.kondisis.map((k) => (
                        <option key={k} value={k}>{k}</option>
                    ))}
                </select>
                <select value={filters.status ?? ''} onChange={(e) => applyFilter('status', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none">
                    <option value="">Semua Status</option>
                    {options.assetStatuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <select value={filters.lokasi ?? ''} onChange={(e) => applyFilter('lokasi', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none">
                    <option value="">Semua Lokasi</option>
                    {locations.map((location) => <option key={location.id} value={location.id}>{location.nama}</option>)}
                </select>
                <input type="date" value={filters.tahun_dari ?? ''} onChange={(e) => applyFilter('tahun_dari', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none" aria-label="Perolehan dari" />
                <input type="date" value={filters.tahun_sampai ?? ''} onChange={(e) => applyFilter('tahun_sampai', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none" aria-label="Perolehan sampai" />
                <button type="button" onClick={() => router.get(route('aset.index'))} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm font-medium text-muted hover:bg-surface">Reset Filter</button>
            </div>

            {assets.data.length === 0 ? (
                <EmptyState
                    description="Belum ada aset yang terdaftar."
                    actionLabel={canManageAssets ? '+ Tambah Aset' : undefined}
                    actionHref={canManageAssets ? '/aset/create' : undefined}
                />
            ) : (
                <>
                    <div className="hidden overflow-hidden rounded-card border border-line bg-white shadow-card md:block">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                                    <th className="px-5 py-3.5 font-semibold">Aset</th>
                                    <th className="px-5 py-3.5 font-semibold">Kategori</th>
                                    <th className="px-5 py-3.5 font-semibold">Merk</th>
                                    <th className="px-5 py-3.5 font-semibold">Lokasi</th>
                                    <th className="px-5 py-3.5 font-semibold">Penanggung Jawab</th>
                                    <th className="px-5 py-3.5 font-semibold">Kondisi</th>
                                    <th className="px-5 py-3.5 font-semibold">Status</th>
                                    <th className="px-5 py-3.5 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                                {assets.data.map((asset) => (
                                    <tr key={asset.id} className="transition hover:bg-surface">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                {asset.foto ? (
                                                    <img src={`/storage/${asset.foto}`} alt={asset.nama} className="h-10 w-10 rounded-btn object-cover" />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary-soft">
                                                        <MonitorSmartphone className="h-5 w-5 text-primary" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-ink">{asset.nama}</p>
                                                    <p className="text-xs text-muted">{asset.kode}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted">{asset.kategori}</td>
                                        <td className="px-5 py-3.5 text-muted">{asset.merk ?? '-'}</td>
                                        <td className="px-5 py-3.5 text-muted">{asset.location?.nama ?? '-'}</td>
                                        <td className="px-5 py-3.5 text-muted">{asset.penanggung_jawab ?? '-'}</td>
                                        <td className="px-5 py-3.5"><KondisiBadge kondisi={asset.kondisi} /></td>
                                        <td className="px-5 py-3.5"><Badge tone="gray">{asset.status}</Badge></td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={`/aset/${asset.id}`} className="rounded-btn p-2 text-muted transition hover:bg-surface hover:text-ink" title="Lihat">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                {canManageAssets && (
                                                    <>
                                                        <Link href={`/aset/${asset.id}/edit`} className="rounded-btn p-2 text-muted transition hover:bg-primary-soft hover:text-primary" title="Edit">
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                        <button onClick={() => setDeleting(asset)} className="rounded-btn p-2 text-muted transition hover:bg-danger-soft hover:text-danger" title="Hapus">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:hidden">
                        {assets.data.map((asset) => (
                            <div key={asset.id} className="rounded-card border border-line bg-white p-4 shadow-card">
                                <div className="flex items-start gap-3">
                                    {asset.foto ? (
                                        <img src={`/storage/${asset.foto}`} alt={asset.nama} className="h-12 w-12 rounded-btn object-cover" />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-btn bg-primary-soft">
                                            <MonitorSmartphone className="h-6 w-6 text-primary" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-ink">{asset.nama}</p>
                                        <p className="text-xs text-muted">{asset.kode} · {asset.kategori}</p>
                                        <p className="text-xs text-muted">{asset.location?.nama ?? '-'}</p>
                                    </div>
                                    <KondisiBadge kondisi={asset.kondisi} />
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <Badge tone="gray">{asset.status}</Badge>
                                    <div className="flex items-center gap-1">
                                        <Link href={`/aset/${asset.id}`} className="rounded-btn p-2 text-muted hover:bg-surface"><Eye className="h-4 w-4" /></Link>
                                        {canManageAssets && (
                                            <>
                                                <Link href={`/aset/${asset.id}/edit`} className="rounded-btn p-2 text-muted hover:bg-primary-soft hover:text-primary"><Pencil className="h-4 w-4" /></Link>
                                                <button onClick={() => setDeleting(asset)} className="rounded-btn p-2 text-muted hover:bg-danger-soft hover:text-danger"><Trash2 className="h-4 w-4" /></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <Pagination links={assets.links} />

            {canManageAssets && <ConfirmModal
                open={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={confirmDelete}
                title="Hapus Aset"
                message={`Aset "${deleting?.nama}" akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
            />}
            <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Ekspor Laporan Aset" size="lg">
                <div className="space-y-5">
                    <div>
                        <p className="mb-2 text-sm font-medium text-ink">Kolom laporan</p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {exportColumns.map(([value, label]) => (
                                <label key={value} className="flex items-center gap-2 text-sm text-muted">
                                    <input type="checkbox" checked={exportConfig.columns.includes(value)} onChange={(e) => setExportConfig((current) => ({ ...current, columns: e.target.checked ? [...current.columns, value] : current.columns.filter((column) => column !== value) }))} className="h-4 w-4 rounded border-line text-primary focus:ring-primary" />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="text-sm font-medium text-ink">Orientasi
                            <select value={exportConfig.orientation} onChange={(e) => setExportConfig({ ...exportConfig, orientation: e.target.value })} className="mt-1 h-11 w-full rounded-btn border border-line bg-white px-3.5 text-sm">
                                <option value="portrait">Portrait</option><option value="landscape">Landscape</option>
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
        </AuthenticatedLayout>
    );
}
