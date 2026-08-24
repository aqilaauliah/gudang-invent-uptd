import { useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeftRight, ArrowDown, AlertTriangle } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import FormTextarea from '@/Components/FormTextarea';

export default function Mutasi({ nomor, items, locations }) {
    const form = useForm({
        tanggal: new Date().toISOString().slice(0, 10),
        item_id: '',
        location_from_id: '',
        location_to_id: '',
        jumlah: '',
        keterangan: '',
    });

    const item = items.find((i) => String(i.id) === String(form.data.item_id));
    const fromLocation = locations.find((l) => String(l.id) === String(form.data.location_from_id));
    const toLocation = locations.find((l) => String(l.id) === String(form.data.location_to_id));

    const stockAt = (locationId) => {
        if (!item || !locationId) return null;
        const s = item.stocks.find((x) => String(x.location_id) === String(locationId));
        return s ? s.jumlah : 0;
    };

    const fromStock = stockAt(form.data.location_from_id);
    const toStock = stockAt(form.data.location_to_id);
    const jumlah = Number(form.data.jumlah) || 0;

    const overStock = fromStock !== null && jumlah > fromStock;
    const sameLocation =
        form.data.location_from_id &&
        form.data.location_to_id &&
        form.data.location_from_id === form.data.location_to_id;

    function submit(e) {
        e.preventDefault();
        form.post(route('mutasi.store'), {
            onSuccess: () => {
                form.reset('jumlah', 'keterangan');
                form.setData('tanggal', new Date().toISOString().slice(0, 10));
            },
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Mutasi Barang" />

            <PageHeader title="Mutasi Barang" description="Pindahkan stok antar lokasi penyimpanan." />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormInput label="Tanggal" type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} error={form.errors.tanggal} />
                            <FormInput label="Nomor Transaksi" value={nomor} disabled hint="Nomor dibuat otomatis." />
                        </div>

                        <FormSelect label="Barang" value={form.data.item_id} onChange={(e) => form.setData('item_id', e.target.value)} error={form.errors.item_id} placeholder="Pilih barang">
                            {items.map((i) => (
                                <option key={i.id} value={i.id}>{i.nama} ({i.kode})</option>
                            ))}
                        </FormSelect>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormSelect label="Lokasi Asal" value={form.data.location_from_id} onChange={(e) => form.setData('location_from_id', e.target.value)} error={form.errors.location_from_id} placeholder="Pilih lokasi asal">
                                {locations.map((l) => (
                                    <option key={l.id} value={l.id}>{l.nama}</option>
                                ))}
                            </FormSelect>
                            <FormSelect label="Lokasi Tujuan" value={form.data.location_to_id} onChange={(e) => form.setData('location_to_id', e.target.value)} error={form.errors.location_to_id} placeholder="Pilih lokasi tujuan">
                                {locations.map((l) => (
                                    <option key={l.id} value={l.id}>{l.nama}</option>
                                ))}
                            </FormSelect>
                        </div>

                        <FormInput label="Jumlah" type="number" min="1" value={form.data.jumlah} onChange={(e) => form.setData('jumlah', e.target.value)} error={form.errors.jumlah} />

                        {sameLocation && (
                            <p className="flex items-center gap-2 text-sm font-medium text-danger">
                                <AlertTriangle className="h-4 w-4" />
                                Lokasi asal dan tujuan tidak boleh sama.
                            </p>
                        )}
                        {overStock && (
                            <p className="flex items-center gap-2 text-sm font-medium text-danger">
                                <AlertTriangle className="h-4 w-4" />
                                Stok tidak mencukupi.
                            </p>
                        )}

                        <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan pemindahan (opsional)" />

                        <div className="flex flex-col [&>*]:w-full sm:flex-row sm:justify-end sm:[&>*]:w-auto">
                            <Button type="submit" size="lg" disabled={form.processing}>
                                <ArrowLeftRight className="h-4 w-4" />
                                {form.processing ? 'Memproses...' : 'Proses Mutasi'}
                            </Button>
                        </div>
                    </form>
                </Card>

                <Card title="Pratinjau Transfer">
                    {!item || !fromLocation || !toLocation ? (
                        <p className="py-10 text-center text-sm text-muted">
                            Pilih barang, lokasi asal, dan tujuan untuk melihat pratinjau.
                        </p>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-full rounded-card border border-line bg-surface p-4">
                                <p className="text-xs font-medium text-muted">Lokasi Asal</p>
                                <p className="font-display text-lg font-semibold text-ink">{fromLocation.nama}</p>
                                <p className="mt-1 text-sm text-ink">
                                    {fromStock} {item.satuan}
                                    {jumlah > 0 && (
                                        <span className="text-muted"> → <span className="font-semibold text-ink">{Math.max(0, fromStock - jumlah)} {item.satuan}</span></span>
                                    )}
                                </p>
                            </div>

                            <div className="my-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                <ArrowDown className="h-5 w-5" />
                            </div>

                            <div className="w-full rounded-card border border-line bg-surface p-4">
                                <p className="text-xs font-medium text-muted">Lokasi Tujuan</p>
                                <p className="font-display text-lg font-semibold text-ink">{toLocation.nama}</p>
                                <p className="mt-1 text-sm text-ink">
                                    {toStock} {item.satuan}
                                    {jumlah > 0 && (
                                        <span className="text-muted"> → <span className="font-semibold text-success">{toStock + jumlah} {item.satuan}</span></span>
                                    )}
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
