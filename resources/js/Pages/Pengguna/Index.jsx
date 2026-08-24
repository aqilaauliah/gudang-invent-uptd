import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import Modal from '@/Components/Modal';
import ConfirmModal from '@/Components/ConfirmModal';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import { Badge } from '@/Components/StatusBadge';

export default function PenggunaIndex({ users, roles }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'Petugas Gudang',
    });

    function openCreate() {
        setEditing(null);
        form.reset();
        form.setData('role', 'Petugas Gudang');
        setModalOpen(true);
    }

    function openEdit(user) {
        setEditing(user);
        form.setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            role: user.roles?.[0]?.name ?? 'Petugas Gudang',
        });
        setModalOpen(true);
    }

    function submit(e) {
        e.preventDefault();
        if (editing) {
            form.put(route('pengguna.update', editing.id), { onSuccess: () => setModalOpen(false), preserveScroll: true });
        } else {
            form.post(route('pengguna.store'), { onSuccess: () => setModalOpen(false), preserveScroll: true });
        }
    }

    function confirmDelete() {
        if (!deleting) return;
        router.delete(route('pengguna.destroy', deleting.id), { onSuccess: () => setDeleting(null), preserveScroll: true });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Pengguna" />

            <PageHeader title="Pengguna" description="Kelola akun pengguna dan peran.">
                <Button onClick={openCreate}>
                    <Plus className="h-4 w-4" />
                    Tambah Pengguna
                </Button>
            </PageHeader>

            {users.data.length === 0 ? (
                <EmptyState description="Belum ada pengguna yang terdaftar." actionLabel="+ Tambah Pengguna" action={openCreate} />
            ) : (
                <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                                    <th className="px-5 py-3.5 font-semibold">Nama</th>
                                    <th className="px-5 py-3.5 font-semibold">Email</th>
                                    <th className="px-5 py-3.5 font-semibold">Peran</th>
                                    <th className="px-5 py-3.5 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="transition hover:bg-surface">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-9 w-9 items-center justify-center rounded-card bg-navy text-sm font-semibold text-white">
                                                    {user.name.charAt(0)}
                                                </span>
                                                <span className="font-medium text-ink">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted">{user.email}</td>
                                        <td className="px-5 py-3.5">
                                            {user.roles?.map((role) => (
                                                <Badge key={role.id} tone="blue">{role.name}</Badge>
                                            ))}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => openEdit(user)} className="rounded-btn p-2 text-muted transition hover:bg-primary-soft hover:text-primary" title="Edit">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => setDeleting(user)} className="rounded-btn p-2 text-muted transition hover:bg-danger-soft hover:text-danger" title="Hapus">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Pagination links={users.links} />

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Pengguna' : 'Tambah Pengguna'}>
                <form onSubmit={submit} className="space-y-4">
                    <FormInput label="Nama" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={form.errors.name} placeholder="Nama lengkap" />
                    <FormInput label="Email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} error={form.errors.email} placeholder="nama@uptd.go.id" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label={editing ? 'Password Baru' : 'Password'} type="password" value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} error={form.errors.password} placeholder={editing ? 'Kosongkan jika tetap' : '••••••••'} />
                        <FormInput label="Konfirmasi Password" type="password" value={form.data.password_confirmation} onChange={(e) => form.setData('password_confirmation', e.target.value)} error={form.errors.password_confirmation} placeholder="••••••••" />
                    </div>
                    <FormSelect label="Peran" value={form.data.role} onChange={(e) => form.setData('role', e.target.value)} error={form.errors.role}>
                        {roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </FormSelect>
                    <div className="flex flex-col gap-3 pt-2 [&>*]:w-full sm:flex-row sm:justify-end sm:[&>*]:w-auto">
                        <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={form.processing}>{form.processing ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </Modal>

            <ConfirmModal
                open={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={confirmDelete}
                title="Hapus Pengguna"
                message={`Pengguna "${deleting?.name}" akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
            />
        </AuthenticatedLayout>
    );
}
