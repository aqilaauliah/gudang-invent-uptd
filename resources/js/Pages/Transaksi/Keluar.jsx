import { useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PackageMinus, AlertTriangle } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import FormTextarea from '@/Components/FormTextarea';

export default function Keluar({ nomor, items, locations }) {
    const form = useForm({
        tanggal: new Date().toISOString().slice(0, 10),
        item_id: '',
        location_id: '',
        jumlah: '',
        nama_pengambil: '',
        keperluan: '',
        keterangan: '',
    });

    const item = items.find((i) => String(i.id) === String(form.data.item_id));

    const available = useMemo(() => {
        if (!item || !form.data.location_id) return null;
        const stock = item.stocks.find((s) => String(s.location_id) === String(form.data.location_id));
        return stock ? stock.jumlah : 0;
    }, [item, form.data.location_id]);

    const overStock = available !== null && Number(form.data.jumlah) > available;

    function submit(e) {
        e.preventDefault();
        form.post(route('barang-keluar.store'), {
            onSuccess: () => {
                form.reset('jumlah', 'nama_pengambil', 'keperluan', 'keterangan');
                form.setData('tanggal', new Date().toISOString().slice(0, 10));
            },
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Barang Keluar" />

            <PageHeader title="Barang Keluar" description="Catat pengambilan barang tanpa perlu pengajuan." />

            <Card className="max-w-3xl">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Tanggal" type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} error={form.errors.tanggal} />
                        <FormInput label="Nomor Transaksi" value={nomor} disabled hint="Nomor dibuat otomatis oleh sistem." />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormSelect label="Barang" value={form.data.item_id} onChange={(e) => form.setData('item_id', e.target.value)} error={form.errors.item_id} placeholder="Pilih barang">
                            {items.map((i) => (
                                <option key={i.id} value={i.id}>{i.nama} ({i.kode})</option>
                            ))}
                        </FormSelect>
                        <FormSelect label="Lokasi Asal" value={form.data.location_id} onChange={(e) => form.setData('location_id', e.target.value)} error={form.errors.location_id} placeholder="Pilih lokasi">
                            {locations.map((l) => (
                                <option key={l.id} value={l.id}>{l.nama}</option>
                            ))}
                        </FormSelect>
                    </div>

                    {available !== null && (
                        <div
                            className={`flex items-center gap-2 rounded-btn px-4 py-3 text-sm font-medium ${
                                available <= 0 ? 'bg-danger-soft text-danger' : 'bg-primary-soft text-primary'
                            }`}
                        >
                            {available <= 0 ? (
                                <AlertTriangle className="h-4 w-4" />
                            ) : (
                                <PackageMinus className="h-4 w-4" />
                            )}
                            Stok tersedia: {available} {item?.satuan}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Jumlah" type="number" min="1" value={form.data.jumlah} onChange={(e) => form.setData('jumlah', e.target.value)} error={form.errors.jumlah} />
                        <FormInput label="Pengambil" value={form.data.nama_pengambil} onChange={(e) => form.setData('nama_pengambil', e.target.value)} error={form.errors.nama_pengambil} placeholder="Nama pengambil" />
                    </div>

                    {overStock && (
                        <p className="flex items-center gap-2 text-sm font-medium text-danger">
                            <AlertTriangle className="h-4 w-4" />
                            Stok tidak mencukupi.
                        </p>
                    )}

                    <FormInput label="Keperluan" value={form.data.keperluan} onChange={(e) => form.setData('keperluan', e.target.value)} error={form.errors.keperluan} placeholder="Keperluan pengambilan" />
                    <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan tambahan (opsional)" />

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={form.processing}>
                            <PackageMinus className="h-4 w-4" />
                            {form.processing ? 'Menyimpan...' : 'Simpan Barang Keluar'}
                        </Button>
                    </div>
                </form>
            </Card>
        </AuthenticatedLayout>
    );
}
