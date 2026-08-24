import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import FormTextarea from '@/Components/FormTextarea';
import Modal from '@/Components/Modal';
import ConfirmModal from '@/Components/ConfirmModal';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import { StatusBadge, ItemStatusBadge } from '@/Components/StatusBadge';

export default function BarangIndex({ items, filters, options }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        kode: '',
        nama: '',
        kategori: '',
        satuan: '',
        stok_minimum: 0,
        deskripsi: '',
        status: 'aktif',
    });

    function openCreate() {
        setEditing(null);
        form.reset();
        form.setData('status', 'aktif');
        form.setData('stok_minimum', 0);
        setModalOpen(true);
    }

    function openEdit(item) {
        setEditing(item);
        form.setData({
            kode: item.kode,
            nama: item.nama,
            kategori: item.kategori,
            satuan: item.satuan,
            stok_minimum: item.stok_minimum,
            deskripsi: item.deskripsi ?? '',
            status: item.status,
        });
        setModalOpen(true);
    }

    function submit(e) {
        e.preventDefault();
        if (editing) {
            form.put(route('barang.update', editing.id), {
                onSuccess: () => setModalOpen(false),
                preserveScroll: true,
            });
        } else {
            form.post(route('barang.store'), {
                onSuccess: () => setModalOpen(false),
                preserveScroll: true,
            });
        }
    }

    function applyFilter(key, value) {
        router.get(route('barang.index'), { ...filters, [key]: value || undefined, page: undefined }, {
            preserveState: true,
            replace: true,
        });
    }

    function confirmDelete() {
        if (!deleting) return;
        router.delete(route('barang.destroy', deleting.id), {
            onSuccess: () => setDeleting(null),
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Data Barang" />

            <PageHeader title="Data Barang" description="Kelola master data barang persediaan.">
                <Button onClick={openCreate}>
                    <Plus className="h-4 w-4" />
                    Tambah Barang
                </Button>
            </PageHeader>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        defaultValue={filters.search}
                        placeholder="Cari kode atau nama barang..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') applyFilter('search', e.target.value);
                        }}
                        className="h-11 w-full rounded-btn border border-line bg-white pl-10 pr-3.5 text-sm focus:border-primary focus:outline-none"
                    />
                </div>
                <select
                    value={filters.kategori ?? ''}
                    onChange={(e) => applyFilter('kategori', e.target.value)}
                    className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none"
                >
                    <option value="">Semua Kategori</option>
                    {options.categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <select
                    value={filters.status ?? ''}
                    onChange={(e) => applyFilter('status', e.target.value)}
                    className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm focus:border-primary focus:outline-none"
                >
                    <option value="">Semua Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                </select>
            </div>

            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                {items.data.length === 0 ? (
                    <EmptyState
                        description="Belum ada barang yang tersedia. Tambahkan barang untuk mulai mengelola persediaan."
                        actionLabel="+ Tambah Barang"
                        action={openCreate}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                                    <th className="px-5 py-3.5 font-semibold">Kode</th>
                                    <th className="px-5 py-3.5 font-semibold">Nama Barang</th>
                                    <th className="px-5 py-3.5 font-semibold">Kategori</th>
                                    <th className="px-5 py-3.5 font-semibold">Satuan</th>
                                    <th className="px-5 py-3.5 text-right font-semibold">Stok</th>
                                    <th className="px-5 py-3.5 text-right font-semibold">Minimum</th>
                                    <th className="px-5 py-3.5 font-semibold">Status Stok</th>
                                    <th className="px-5 py-3.5 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                                {items.data.map((item) => (
                                    <tr key={item.id} className="transition hover:bg-surface">
                                        <td className="px-5 py-3.5 font-medium text-ink">{item.kode}</td>
                                        <td className="px-5 py-3.5">
                                            <p className="font-medium text-ink">{item.nama}</p>
                                            <p className="text-xs text-muted"><ItemStatusBadge status={item.status} /></p>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted">{item.kategori}</td>
                                        <td className="px-5 py-3.5 text-muted">{item.satuan}</td>
                                        <td className="px-5 py-3.5 text-right font-semibold text-ink">{item.total_stock}</td>
                                        <td className="px-5 py-3.5 text-right text-muted">{item.stok_minimum}</td>
                                        <td className="px-5 py-3.5"><StatusBadge status={item.stok_status} /></td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(item)}
                                                    className="rounded-btn p-2 text-muted transition hover:bg-primary-soft hover:text-primary"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleting(item)}
                                                    className="rounded-btn p-2 text-muted transition hover:bg-danger-soft hover:text-danger"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Pagination links={items.links} />

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Barang' : 'Tambah Barang'}>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Kode Barang" value={form.data.kode} onChange={(e) => form.setData('kode', e.target.value)} error={form.errors.kode} placeholder="ATK-001" />
                        <FormInput label="Nama Barang" value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} error={form.errors.nama} placeholder="Kertas A4" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormSelect label="Kategori" value={form.data.kategori} onChange={(e) => form.setData('kategori', e.target.value)} error={form.errors.kategori} placeholder="Pilih kategori">
                            {options.categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </FormSelect>
                        <FormSelect label="Satuan" value={form.data.satuan} onChange={(e) => form.setData('satuan', e.target.value)} error={form.errors.satuan} placeholder="Pilih satuan">
                            {options.units.map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Stok Minimum" type="number" min="0" value={form.data.stok_minimum} onChange={(e) => form.setData('stok_minimum', e.target.value)} error={form.errors.stok_minimum} />
                        <FormSelect label="Status" value={form.data.status} onChange={(e) => form.setData('status', e.target.value)} error={form.errors.status}>
                            <option value="aktif">Aktif</option>
                            <option value="nonaktif">Nonaktif</option>
                        </FormSelect>
                    </div>
                    <FormTextarea label="Deskripsi" value={form.data.deskripsi} onChange={(e) => form.setData('deskripsi', e.target.value)} error={form.errors.deskripsi} placeholder="Deskripsi barang (opsional)" />

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <ConfirmModal
                open={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={confirmDelete}
                title="Hapus Barang"
                message={`Barang "${deleting?.nama}" akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
            />
        </AuthenticatedLayout>
    );
}
