import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Plus, MapPin, Package, Boxes, MonitorSmartphone, Pencil, Trash2, ArrowRight, User } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import ConfirmModal from '@/Components/ConfirmModal';
import FormInput from '@/Components/FormInput';
import FormTextarea from '@/Components/FormTextarea';
import EmptyState from '@/Components/EmptyState';

export default function LokasiIndex({ locations }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        nama: '',
        keterangan: '',
        penanggung_jawab: '',
    });

    function openCreate() {
        setEditing(null);
        form.reset();
        setModalOpen(true);
    }

    function openEdit(location) {
        setEditing(location);
        form.setData({
            nama: location.nama,
            keterangan: location.keterangan ?? '',
            penanggung_jawab: location.penanggung_jawab ?? '',
        });
        setModalOpen(true);
    }

    function submit(e) {
        e.preventDefault();
        if (editing) {
            form.put(route('lokasi.update', editing.id), { onSuccess: () => setModalOpen(false), preserveScroll: true });
        } else {
            form.post(route('lokasi.store'), { onSuccess: () => setModalOpen(false), preserveScroll: true });
        }
    }

    function confirmDelete() {
        if (!deleting) return;
        router.delete(route('lokasi.destroy', deleting.id), { onSuccess: () => setDeleting(null), preserveScroll: true });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Lokasi" />

            <PageHeader title="Lokasi" description="Ringkasan penyimpanan di setiap lokasi.">
                <Button onClick={openCreate}>
                    <Plus className="h-4 w-4" />
                    Tambah Lokasi
                </Button>
            </PageHeader>

            {locations.length === 0 ? (
                <EmptyState
                    description="Belum ada lokasi yang terdaftar. Tambahkan lokasi penyimpanan."
                    actionLabel="+ Tambah Lokasi"
                    action={openCreate}
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {locations.map((location) => (
                        <div key={location.id} className="rounded-card border border-line bg-white p-5 shadow-card">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-card bg-primary-soft">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-semibold text-ink">{location.nama}</h3>
                                        {location.penanggung_jawab && (
                                            <p className="flex items-center gap-1 text-xs text-muted">
                                                <User className="h-3 w-3" /> {location.penanggung_jawab}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => openEdit(location)} className="rounded-btn p-2 text-muted transition hover:bg-primary-soft hover:text-primary" title="Edit">
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => setDeleting(location)} className="rounded-btn p-2 text-muted transition hover:bg-danger-soft hover:text-danger" title="Hapus">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-btn bg-surface py-3 text-center">
                                <div>
                                    <p className="font-display text-lg font-bold text-ink">{location.jenis_barang}</p>
                                    <p className="flex items-center justify-center gap-1 text-[11px] text-muted"><Package className="h-3 w-3" />Jenis</p>
                                </div>
                                <div>
                                    <p className="font-display text-lg font-bold text-ink">{location.total_stok}</p>
                                    <p className="flex items-center justify-center gap-1 text-[11px] text-muted"><Boxes className="h-3 w-3" />Stok</p>
                                </div>
                                <div>
                                    <p className="font-display text-lg font-bold text-ink">{location.total_inventaris}</p>
                                    <p className="flex items-center justify-center gap-1 text-[11px] text-muted"><MonitorSmartphone className="h-3 w-3" />Aset</p>
                                </div>
                            </div>

                            {location.keterangan && <p className="mt-3 text-xs text-muted">{location.keterangan}</p>}

                            <Link href={`/lokasi/${location.id}`} className="mt-4 flex items-center justify-center gap-1.5 rounded-btn border border-line py-2 text-sm font-medium text-ink transition hover:bg-surface">
                                Lihat Detail <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Lokasi' : 'Tambah Lokasi'}>
                <form onSubmit={submit} className="space-y-4">
                    <FormInput label="Nama Lokasi" value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} error={form.errors.nama} placeholder="Gudang Utama" />
                    <FormInput label="Penanggung Jawab" value={form.data.penanggung_jawab} onChange={(e) => form.setData('penanggung_jawab', e.target.value)} error={form.errors.penanggung_jawab} placeholder="Nama penanggung jawab" />
                    <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan lokasi (opsional)" />
                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={form.processing}>{form.processing ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </Modal>

            <ConfirmModal
                open={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={confirmDelete}
                title="Hapus Lokasi"
                message={`Lokasi "${deleting?.nama}" akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
            />
        </AuthenticatedLayout>
    );
}
