import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Pencil, Trash2, Eye, MonitorSmartphone } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';
import ConfirmModal from '@/Components/ConfirmModal';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import { KondisiBadge, Badge } from '@/Components/StatusBadge';

export default function AsetIndex({ assets, filters, options }) {
    const { auth } = usePage().props;
    const canManageAssets = auth.permissions?.includes('manage-assets') ?? false;
    const [deleting, setDeleting] = useState(null);

    function applyFilter(key, value) {
        router.get(route('aset.index'), { ...filters, [key]: value || undefined, page: undefined }, {
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

    return (
        <AuthenticatedLayout>
            <Head title="Inventaris / Aset" />

            <PageHeader title="Inventaris / Aset" description="Kelola aset kantor secara individual.">
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
        </AuthenticatedLayout>
    );
}
