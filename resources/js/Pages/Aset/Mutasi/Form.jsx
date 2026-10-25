import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { ArrowDown, ArrowLeftRight, AlertTriangle } from 'lucide-react';
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
    const fromLocation = asset?.location?.nama ?? '-';
    const toLocation = locations.find((location) => String(location.id) === String(form.data.to_location_id));

    function submit(e) {
        e.preventDefault();
        form.post(route('aset.mutasi.store', form.data.asset_id), { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Mutasi Aset" />
            <PageHeader title="Mutasi Aset" description="Pindahkan aset ke lokasi lain.">
                <Button href={route('aset.mutasi.index')} variant="secondary">
                    Riwayat Mutasi
                </Button>
            </PageHeader>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormInput label="Tanggal" type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} error={form.errors.tanggal} />
                            <FormInput label="Kode Aset" value={asset?.kode ?? '-'} disabled hint="Kode aset mengikuti data aset." />
                        </div>

                        <FormSelect label="Aset" value={form.data.asset_id} onChange={(e) => form.setData('asset_id', e.target.value)} error={form.errors.asset_id} placeholder="Pilih aset">
                            {assets.map((item) => <option key={item.id} value={item.id}>{item.nama} ({item.kode})</option>)}
                        </FormSelect>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormInput label="Lokasi Asal" value={fromLocation} readOnly />
                            <FormSelect label="Lokasi Tujuan" value={form.data.to_location_id} onChange={(e) => form.setData('to_location_id', e.target.value)} error={form.errors.to_location_id} placeholder="Pilih lokasi tujuan">
                                {locations.map((location) => <option key={location.id} value={location.id}>{location.nama}</option>)}
                            </FormSelect>
                        </div>

                        {sameLocation && (
                            <p className="flex items-center gap-2 text-sm font-medium text-danger">
                                <AlertTriangle className="h-4 w-4" />
                                Lokasi tujuan harus berbeda dari lokasi asal.
                            </p>
                        )}

                        <FormInput label="Penanggung Jawab Baru" value={form.data.pj_baru} onChange={(e) => form.setData('pj_baru', e.target.value)} error={form.errors.pj_baru} placeholder="Opsional" />

                        <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan pemindahan (opsional)" />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={form.processing || !asset || sameLocation}>
                                <ArrowLeftRight className="h-4 w-4" />
                                {form.processing ? 'Memproses...' : 'Proses Mutasi'}
                            </Button>
                        </div>
                    </form>
                </Card>

                <Card title="Pratinjau Transfer">
                    {!asset || !toLocation ? (
                        <p className="py-10 text-center text-sm text-muted">
                            Pilih aset dan lokasi tujuan untuk melihat pratinjau.
                        </p>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-full rounded-card border border-line bg-surface p-4">
                                <p className="text-xs font-medium text-muted">Aset</p>
                                <p className="font-display text-lg font-semibold text-ink">{asset.nama}</p>
                                <p className="mt-1 text-sm text-muted">{asset.kode}</p>
                            </div>

                            <div className="my-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                <ArrowDown className="h-5 w-5" />
                            </div>

                            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="rounded-card border border-line bg-surface p-4">
                                    <p className="text-xs font-medium text-muted">Lokasi Asal</p>
                                    <p className="font-display text-lg font-semibold text-ink">{fromLocation}</p>
                                </div>
                                <div className="rounded-card border border-line bg-surface p-4">
                                    <p className="text-xs font-medium text-muted">Lokasi Tujuan</p>
                                    <p className="font-display text-lg font-semibold text-success">{toLocation.nama}</p>
                                </div>
                            </div>

                            {form.data.pj_baru && (
                                <p className="mt-4 w-full text-sm text-muted">
                                    Penanggung jawab baru: <span className="font-semibold text-ink">{form.data.pj_baru}</span>
                                </p>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
