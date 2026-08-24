import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PackagePlus } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import FormTextarea from '@/Components/FormTextarea';

export default function Masuk({ nomor, items, locations }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const form = useForm({
        tanggal: new Date().toISOString().slice(0, 10),
        item_id: '',
        location_id: '',
        jumlah: '',
        sumber_supplier: '',
        no_dokumen: '',
        keterangan: '',
    });

    const item = items.find((i) => String(i.id) === String(form.data.item_id));

    function submit(e) {
        e.preventDefault();
        form.post(route('barang-masuk.store'), {
            onSuccess: () => {
                form.reset('jumlah', 'sumber_supplier', 'no_dokumen', 'keterangan');
                form.setData('tanggal', new Date().toISOString().slice(0, 10));
            },
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Barang Masuk" />

            <PageHeader title="Barang Masuk" description="Catat barang yang masuk ke gudang." />

            <Card className="max-w-3xl">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Tanggal" type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} error={form.errors.tanggal} />
                        <FormInput label="Nomor Transaksi" value={nomor} disabled hint="Nomor dibuat otomatis oleh sistem." />
                    </div>

                    <FormSelect label="Barang" value={form.data.item_id} onChange={(e) => { form.setData('item_id', e.target.value); setSelectedItem(e.target.value); }} error={form.errors.item_id} placeholder="Pilih barang">
                        {items.map((i) => (
                            <option key={i.id} value={i.id}>{i.nama} ({i.kode})</option>
                        ))}
                    </FormSelect>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormInput label="Jumlah" type="number" min="1" value={form.data.jumlah} onChange={(e) => form.setData('jumlah', e.target.value)} error={form.errors.jumlah} />
                        <FormInput label="Satuan" value={item?.satuan ?? '-'} disabled />
                        <FormSelect label="Lokasi Tujuan" value={form.data.location_id} onChange={(e) => form.setData('location_id', e.target.value)} error={form.errors.location_id} placeholder="Pilih lokasi">
                            {locations.map((l) => (
                                <option key={l.id} value={l.id}>{l.nama}</option>
                            ))}
                        </FormSelect>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Sumber / Supplier" value={form.data.sumber_supplier} onChange={(e) => form.setData('sumber_supplier', e.target.value)} error={form.errors.sumber_supplier} placeholder="Nama supplier" />
                        <FormInput label="Nomor Dokumen" value={form.data.no_dokumen} onChange={(e) => form.setData('no_dokumen', e.target.value)} error={form.errors.no_dokumen} placeholder="No. surat / SPB" />
                    </div>

                    <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan tambahan (opsional)" />

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={form.processing}>
                            <PackagePlus className="h-4 w-4" />
                            {form.processing ? 'Menyimpan...' : 'Simpan Barang Masuk'}
                        </Button>
                    </div>
                </form>
            </Card>
        </AuthenticatedLayout>
    );
}
