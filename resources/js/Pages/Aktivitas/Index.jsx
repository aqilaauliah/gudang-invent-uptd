import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Search, History, ChevronRight } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';
import Modal from '@/Components/Modal';
import Badge from '@/Components/StatusBadge';

const TYPE_META = {
    barang_masuk: {
        label: 'Barang Masuk',
        tone: 'green',
        fields: [
            ['nomor', 'No. Transaksi'],
            ['tanggal', 'Tanggal'],
            ['item', 'Nama Barang'],
            ['jumlah', 'Jumlah'],
            ['lokasi', 'Lokasi'],
            ['sumber_supplier', 'Sumber / Supplier'],
            ['no_dokumen', 'No. Dokumen'],
            ['petugas', 'Petugas'],
        ],
    },
    barang_keluar: {
        label: 'Barang Keluar',
        tone: 'red',
        fields: [
            ['nomor', 'No. Transaksi'],
            ['tanggal', 'Tanggal Pengambilan'],
            ['item', 'Nama Barang'],
            ['jumlah', 'Jumlah'],
            ['lokasi', 'Lokasi'],
            ['nama_pengambil', 'Nama Pengambil'],
            ['keperluan', 'Keperluan'],
            ['petugas', 'Petugas'],
        ],
    },
    pengambilan_kiosk: {
        label: 'Pengambilan Mandiri',
        tone: 'navy',
        fields: [
            ['nomor', 'No. Transaksi'],
            ['tanggal', 'Tanggal Pengambilan'],
            ['item', 'Nama Barang'],
            ['jumlah', 'Jumlah'],
            ['lokasi', 'Lokasi'],
            ['nama_pengambil', 'Nama Pengambil'],
            ['keperluan', 'Keperluan'],
        ],
    },
    mutasi: {
        label: 'Mutasi Barang',
        tone: 'blue',
        fields: [
            ['nomor', 'No. Transaksi'],
            ['tanggal', 'Tanggal'],
            ['item', 'Nama Barang'],
            ['jumlah', 'Jumlah'],
            ['dari', 'Dari Lokasi'],
            ['ke', 'Ke Lokasi'],
            ['keterangan', 'Keterangan'],
            ['petugas', 'Petugas'],
        ],
    },
    tambah_barang: {
        label: 'Tambah Barang',
        tone: 'green',
        fields: [
            ['kode', 'Kode Barang'],
            ['nama', 'Nama Barang'],
            ['kategori', 'Kategori'],
            ['satuan', 'Satuan'],
            ['stok_minimum', 'Stok Minimum'],
        ],
    },
    ubah_barang: {
        label: 'Ubah Barang',
        tone: 'blue',
        fields: [
            ['kode', 'Kode Barang'],
            ['nama', 'Nama Barang'],
            ['kategori', 'Kategori'],
            ['satuan', 'Satuan'],
            ['stok_minimum', 'Stok Minimum'],
        ],
    },
    hapus_barang: {
        label: 'Hapus Barang',
        tone: 'red',
        fields: [
            ['kode', 'Kode Barang'],
            ['nama', 'Nama Barang'],
        ],
    },
    tambah_aset: {
        label: 'Tambah Aset',
        tone: 'green',
        fields: [
            ['kode', 'Kode Aset'],
            ['nama', 'Nama Aset'],
            ['kategori', 'Kategori'],
            ['merk', 'Merk'],
            ['lokasi', 'Lokasi'],
            ['penanggung_jawab', 'Penanggung Jawab'],
            ['kondisi', 'Kondisi'],
            ['status', 'Status'],
        ],
    },
    ubah_aset: {
        label: 'Ubah Aset',
        tone: 'blue',
        fields: [
            ['kode', 'Kode Aset'],
            ['nama', 'Nama Aset'],
            ['kategori', 'Kategori'],
            ['merk', 'Merk'],
            ['lokasi', 'Lokasi'],
            ['penanggung_jawab', 'Penanggung Jawab'],
            ['kondisi', 'Kondisi'],
            ['status', 'Status'],
        ],
    },
    hapus_aset: {
        label: 'Hapus Aset',
        tone: 'red',
        fields: [
            ['kode', 'Kode Aset'],
            ['nama', 'Nama Aset'],
        ],
    },
    tambah_lokasi: {
        label: 'Tambah Lokasi',
        tone: 'green',
        fields: [
            ['nama', 'Nama Lokasi'],
            ['keterangan', 'Keterangan'],
            ['penanggung_jawab', 'Penanggung Jawab'],
        ],
    },
    ubah_lokasi: {
        label: 'Ubah Lokasi',
        tone: 'blue',
        fields: [
            ['nama', 'Nama Lokasi'],
            ['keterangan', 'Keterangan'],
            ['penanggung_jawab', 'Penanggung Jawab'],
        ],
    },
    hapus_lokasi: {
        label: 'Hapus Lokasi',
        tone: 'red',
        fields: [['nama', 'Nama Lokasi']],
    },
    tambah_pengguna: {
        label: 'Tambah Pengguna',
        tone: 'green',
        fields: [
            ['nama', 'Nama'],
            ['email', 'Email'],
            ['role', 'Role'],
        ],
    },
    ubah_pengguna: {
        label: 'Ubah Pengguna',
        tone: 'blue',
        fields: [
            ['nama', 'Nama'],
            ['email', 'Email'],
            ['role', 'Role'],
        ],
    },
    hapus_pengguna: {
        label: 'Hapus Pengguna',
        tone: 'red',
        fields: [
            ['nama', 'Nama'],
            ['email', 'Email'],
        ],
    },
};

function buildRows(activity) {
    const props = activity.properties ?? {};
    const meta = TYPE_META[props.type];

    if (!meta) {
        return Object.entries(props)
            .filter(([key]) => key !== 'type')
            .map(([key, value]) => ({ label: key, value }));
    }

    return meta.fields
        .map(([key, label]) => {
            let value = props[key];

            if (key === 'jumlah' && value != null && value !== '') {
                value = `${value}${props.satuan ? ` ${props.satuan}` : ''}`;
            }

            return { label, value };
        })
        .filter((row) => row.value !== null && row.value !== undefined && row.value !== '');
}

export default function AktivitasIndex({ activities, filters }) {
    const [selected, setSelected] = useState(null);

    function search(e) {
        if (e.key !== 'Enter') return;
        router.get(route('aktivitas.index'), { search: e.target.value || undefined }, {
            preserveState: true,
            replace: true,
        });
    }

    const meta = selected ? TYPE_META[selected.properties?.type] : null;
    const rows = selected ? buildRows(selected) : [];

    return (
        <AuthenticatedLayout>
            <Head title="Aktivitas" />

            <PageHeader title="Aktivitas" description="Riwayat seluruh aktivitas pada sistem (audit trail)." />

            <div className="mb-4 max-w-md">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        defaultValue={filters.search}
                        onKeyDown={search}
                        placeholder="Cari aktivitas..."
                        className="h-11 w-full rounded-btn border border-line bg-white pl-10 pr-3.5 text-sm focus:border-primary focus:outline-none"
                    />
                </div>
            </div>

            {activities.data.length === 0 ? (
                <EmptyState description="Belum ada aktivitas yang tercatat." />
            ) : (
                <>
                    <Card>
                        <ul className="divide-y divide-line">
                            {activities.data.map((activity) => (
                                <li key={activity.id}>
                                    <button
                                        type="button"
                                        onClick={() => setSelected(activity)}
                                        className="flex w-full items-start gap-3 rounded-btn px-2 py-3.5 text-left transition hover:bg-surface"
                                    >
                                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-primary-soft">
                                            <History className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-ink">{activity.description}</p>
                                            <p className="mt-0.5 text-xs text-muted">
                                                {activity.causer ?? 'Sistem'} · {activity.created_at}
                                            </p>
                                        </div>
                                        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Pagination links={activities.links} />
                </>
            )}

            <Modal open={!!selected} onClose={() => setSelected(null)} title="Detail Aktivitas">
                {selected && (
                    <div>
                        <Badge tone={meta?.tone ?? 'gray'}>{meta?.label ?? 'Aktivitas'}</Badge>

                        <p className="mt-3 text-sm text-ink">{selected.description}</p>
                        <p className="mt-1 text-xs text-muted">
                            {selected.causer ?? 'Sistem'} · {selected.created_at}
                        </p>

                        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                            {rows.map((row) => (
                                <div key={row.label}>
                                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">{row.label}</dt>
                                    <dd className="mt-1 text-sm font-medium text-ink">{row.value || '-'}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
