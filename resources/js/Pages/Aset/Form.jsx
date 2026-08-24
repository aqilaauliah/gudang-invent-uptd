import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MonitorSmartphone, Upload, X } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
import FormTextarea from '@/Components/FormTextarea';

export default function AsetForm({ asset = null, locations, options }) {
    const [fotoPreview, setFotoPreview] = useState(asset?.foto ? `/storage/${asset.foto}` : null);

    const form = useForm({
        kode: asset?.kode ?? '',
        nama: asset?.nama ?? '',
        kategori: asset?.kategori ?? '',
        merk: asset?.merk ?? '',
        tipe_model: asset?.tipe_model ?? '',
        no_seri: asset?.no_seri ?? '',
        tahun_perolehan: asset?.tahun_perolehan ?? '',
        sumber_perolehan: asset?.sumber_perolehan ?? '',
        nilai_perolehan: asset?.nilai_perolehan ?? '',
        location_id: asset?.location_id ?? '',
        penanggung_jawab: asset?.penanggung_jawab ?? '',
        kondisi: asset?.kondisi ?? 'Baik',
        status: asset?.status ?? 'Digunakan',
        foto: null,
        keterangan: asset?.keterangan ?? '',
    });

    function handleFoto(e) {
        const file = e.target.files[0];
        if (!file) return;
        form.setData('foto', file);
        setFotoPreview(URL.createObjectURL(file));
    }

    function submit(e) {
        e.preventDefault();
        if (asset) {
            form.post(route('aset.update', asset.id), {
                forceFormData: true,
                preserveScroll: true,
            });
        } else {
            form.post(route('aset.store'), {
                forceFormData: true,
                preserveScroll: true,
            });
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title={asset ? 'Edit Aset' : 'Tambah Aset'} />

            <PageHeader
                title={asset ? 'Edit Aset' : 'Tambah Aset'}
                description="Lengkapi data inventaris/aset kantor."
            />

            <form onSubmit={submit}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card title="Foto Aset" className="lg:col-span-1 h-fit">
                        <div className="flex flex-col items-center">
                            {fotoPreview ? (
                                <div className="relative">
                                    <img src={fotoPreview} alt="Foto aset" className="h-44 w-44 rounded-card border border-line object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => { setFotoPreview(null); form.setData('foto', null); }}
                                        className="absolute -right-2 -top-2 rounded-full bg-danger p-1 text-white"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex h-44 w-44 items-center justify-center rounded-card border border-dashed border-line bg-surface">
                                    <MonitorSmartphone className="h-12 w-12 text-muted" />
                                </div>
                            )}
                            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-btn border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface">
                                <Upload className="h-4 w-4" />
                                Unggah Foto
                                <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
                            </label>
                            {form.errors.foto && <p className="mt-2 text-xs text-danger">{form.errors.foto}</p>}
                        </div>
                    </Card>

                    <div className="lg:col-span-2 space-y-6">
                        <Card title="Informasi Aset">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormInput label="Kode Inventaris" value={form.data.kode} onChange={(e) => form.setData('kode', e.target.value)} error={form.errors.kode} placeholder="INV-001" />
                                    <FormInput label="Nama Aset" value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} error={form.errors.nama} placeholder="Laptop Lenovo" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormSelect label="Kategori" value={form.data.kategori} onChange={(e) => form.setData('kategori', e.target.value)} error={form.errors.kategori} placeholder="Pilih kategori">
                                        {options.assetCategories.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </FormSelect>
                                    <FormInput label="Merk" value={form.data.merk} onChange={(e) => form.setData('merk', e.target.value)} error={form.errors.merk} placeholder="Lenovo" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormInput label="Tipe / Model" value={form.data.tipe_model} onChange={(e) => form.setData('tipe_model', e.target.value)} error={form.errors.tipe_model} placeholder="ThinkPad E14" />
                                    <FormInput label="Nomor Seri" value={form.data.no_seri} onChange={(e) => form.setData('no_seri', e.target.value)} error={form.errors.no_seri} placeholder="XXXXX" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <FormInput label="Tahun Perolehan" type="number" value={form.data.tahun_perolehan} onChange={(e) => form.setData('tahun_perolehan', e.target.value)} error={form.errors.tahun_perolehan} placeholder="2026" />
                                    <FormInput label="Nilai Perolehan" type="number" value={form.data.nilai_perolehan} onChange={(e) => form.setData('nilai_perolehan', e.target.value)} error={form.errors.nilai_perolehan} placeholder="0" />
                                    <FormInput label="Sumber Perolehan" value={form.data.sumber_perolehan} onChange={(e) => form.setData('sumber_perolehan', e.target.value)} error={form.errors.sumber_perolehan} placeholder="APBD" />
                                </div>
                            </div>
                        </Card>

                        <Card title="Lokasi & Kondisi">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormSelect label="Lokasi" value={form.data.location_id} onChange={(e) => form.setData('location_id', e.target.value)} error={form.errors.location_id} placeholder="Pilih lokasi">
                                        {locations.map((l) => (
                                            <option key={l.id} value={l.id}>{l.nama}</option>
                                        ))}
                                    </FormSelect>
                                    <FormInput label="Penanggung Jawab" value={form.data.penanggung_jawab} onChange={(e) => form.setData('penanggung_jawab', e.target.value)} error={form.errors.penanggung_jawab} placeholder="Nama penanggung jawab" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormSelect label="Kondisi" value={form.data.kondisi} onChange={(e) => form.setData('kondisi', e.target.value)} error={form.errors.kondisi}>
                                        {options.kondisis.map((k) => (
                                            <option key={k} value={k}>{k}</option>
                                        ))}
                                    </FormSelect>
                                    <FormSelect label="Status" value={form.data.status} onChange={(e) => form.setData('status', e.target.value)} error={form.errors.status}>
                                        {options.assetStatuses.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <FormTextarea label="Keterangan" value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} error={form.errors.keterangan} placeholder="Keterangan tambahan (opsional)" />
                            </div>
                        </Card>

                        <div className="flex justify-end gap-3">
                            <Button href="/aset" variant="secondary">
                                Batal
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Menyimpan...' : 'Simpan Aset'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
