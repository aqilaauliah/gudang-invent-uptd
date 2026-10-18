import { useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeftRight, AlertTriangle } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import FormTextarea from '@/Components/FormTextarea';

export default function AssetMutationForm({ assets, locations }) {
    const form = useForm({ asset_id: '', to_location_id: '', tanggal: new Date().toISOString().slice(0, 10), pj_baru: '', keterangan: '' });
    const asset = useMemo(() => assets.find((item) => String(item.id) === String(form.data.asset_id)), [assets, form.data.asset_id]);
    const sameLocation = asset && String(asset.location_id) === String(form.data.to_location_id);

    function submit(e) {
        e.preventDefault();
        form.post(route('aset.mutasi.store', form.data.asset_id), { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Mutasi Aset" />
            <PageHeader title="Mutasi Aset" description="Pindahkan aset ke lokasi lain." />
            <Card className="max-w-3xl">
                <form onSubmit={submit} className="space-y-5">
                    <FormSelect label="Aset" value={form.data.asset_id} onChange={(e) => form.setData('asset_id', e.target.value)} error={form.errors.asset_id} placeholder="Pilih aset">
                        {assets.map((item) => <option key={item.id} value={item.id}>{item.nama} ({item.kode})</option>)}
                    </FormSelect>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Lokasi Asal" value={asset?.location?.nama ?? '-'} readOnly />
                        <FormSelect label="Lokasi Tujuan" value={form.data.to_location_id} onChange={(e) => form.setData('to_location_id', e.target.value)} error={form.errors.to_location_id} placeholder="Pilih lokasi tujuan">
                            {locations.map((location) => <option key={location.id} value={location.id}>{location.nama}</option>)}
                        </FormSelect>
                    </div>
                    {sameLocation && <p className="flex items-center gap-2 text-sm font-medium text-danger"><AlertTriangle className="h-4 w-4" /> Lokasi tujuan harus berbeda dari lokasi asal.</p>}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormInput label="Tanggal" type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} error={form.errors.tanggal} />
                        <FormInput label="Penanggung Jawab Baru" value={form.data.pj_baru} onChange={(e) => form.setData('pj_baru', e.target.value)} error={form.errors.pj_baru} placeholder="Opsional" />
                    </div>
                    <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan (opsional)" />
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end"><Button href={route('aset.mutasi.index')} variant="secondary">Batal</Button><Button type="submit" disabled={form.processing || !asset || sameLocation}><ArrowLeftRight className="h-4 w-4" /> {form.processing ? 'Memproses...' : 'Simpan Mutasi'}</Button></div>
                </form>
            </Card>
        </AuthenticatedLayout>
    );
}
