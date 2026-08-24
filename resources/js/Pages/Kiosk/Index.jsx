import { useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PackageMinus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Toast from '@/Components/Toast';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import FormTextarea from '@/Components/FormTextarea';

export default function KioskIndex({ nomor, items, locations }) {
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
        const s = item.stocks.find((x) => String(x.location_id) === String(form.data.location_id));
        return s ? s.jumlah : 0;
    }, [item, form.data.location_id]);

    const overStock = available !== null && Number(form.data.jumlah) > available;

    function submit(e) {
        e.preventDefault();
        form.post(route('kiosk.store'), {
            onSuccess: () => {
                form.reset('item_id', 'location_id', 'jumlah', 'nama_pengambil', 'keperluan', 'keterangan');
                form.setData('tanggal', new Date().toISOString().slice(0, 10));
            },
        });
    }

    return (
        <div className="min-h-screen bg-surface">
            <Head title="Ambil Barang" />

            <header className="bg-navy px-6 py-6">
                <div className="mx-auto flex max-w-2xl items-center gap-3">
                    <img src="/image/logo-disnakertrans.png" alt="Logo" className="h-12 w-12 object-contain" />
                    <div>
                        <p className="font-display text-xl font-bold text-white">SIGUDIN</p>
                        <p className="text-xs text-white/60">Ambil Barang Mandiri</p>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-8">
                <div className="mb-6 text-center">
                    <h1 className="font-display text-2xl font-bold text-ink">Formulir Pengambilan Barang</h1>
                    <p className="mt-1.5 text-sm text-muted">
                        Isi formulir berikut untuk mencatat pengambilan barang secara mandiri.
                    </p>
                </div>

                <div className="rounded-card border border-line bg-white p-6 shadow-card">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormInput label="Tanggal" type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} error={form.errors.tanggal} />
                            <FormInput label="Nomor Transaksi" value={nomor} disabled hint="Nomor dibuat otomatis." />
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
                                <PackageMinus className="h-4 w-4" />
                                Stok tersedia: {available} {item?.satuan}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormInput label="Jumlah" type="number" min="1" value={form.data.jumlah} onChange={(e) => form.setData('jumlah', e.target.value)} error={form.errors.jumlah} />
                            <FormInput label="Nama Pengambil" value={form.data.nama_pengambil} onChange={(e) => form.setData('nama_pengambil', e.target.value)} error={form.errors.nama_pengambil} placeholder="Nama Anda" />
                        </div>

                        {overStock && (
                            <p className="flex items-center gap-2 text-sm font-medium text-danger">
                                <AlertTriangle className="h-4 w-4" />
                                Stok tidak mencukupi.
                            </p>
                        )}

                        <FormInput label="Keperluan" value={form.data.keperluan} onChange={(e) => form.setData('keperluan', e.target.value)} error={form.errors.keperluan} placeholder="Keperluan pengambilan" />
                        <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan tambahan (opsional)" />

                        <Button type="submit" size="lg" className="w-full" disabled={form.processing}>
                            <CheckCircle2 className="h-5 w-5" />
                            {form.processing ? 'Menyimpan...' : 'Simpan Pengambilan'}
                        </Button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-muted">
                    UPTD Pengawasan Ketenagakerjaan Wilayah II Karawang
                </p>
            </main>

            <Toast />
        </div>
    );
}
