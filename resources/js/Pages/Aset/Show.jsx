import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, MapPin, Calendar, History, MonitorSmartphone, Upload } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import { KondisiBadge, Badge } from '@/Components/StatusBadge';

export default function AsetShow({ asset, histories, mutations = [] }) {
    const { auth } = usePage().props;
    const canManageAssets = auth.permissions?.includes('manage-assets') ?? false;
    const canUpdateCondition = auth.permissions?.includes('update-asset-condition') ?? false;
    const [foto, setFoto] = useState(null);
    const conditionForm = useForm({ kondisi: asset.kondisi, foto: null });
    const fmt = (n) => (n ? Number(n).toLocaleString('id-ID') : null);
    function updateCondition(e) {
        e.preventDefault();
        conditionForm.patch(route('aset.condition.update', asset.id), { forceFormData: true, preserveScroll: true });
    }

    return (
        <AuthenticatedLayout>
            <Head title={asset.nama} />

            <PageHeader title="Detail Aset" description={asset.kode}>
                {canManageAssets && (
                    <Button href={`/aset/${asset.id}/edit`} variant="secondary">
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Button>
                )}
            </PageHeader>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="h-fit">
                    {asset.foto ? (
                        <img src={`/storage/${asset.foto}`} alt={asset.nama} className="aspect-square w-full rounded-btn object-cover" />
                    ) : (
                        <div className="flex aspect-square w-full items-center justify-center rounded-btn bg-primary-soft">
                            <MonitorSmartphone className="h-20 w-20 text-primary" />
                        </div>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <KondisiBadge kondisi={asset.kondisi} />
                        <Badge tone="gray">{asset.status}</Badge>
                    </div>
                    {canUpdateCondition && (
                        <form onSubmit={updateCondition} className="mt-5 space-y-3 border-t border-line pt-4">
                            <label className="block text-sm font-medium text-ink">Perbarui kondisi</label>
                            <select value={conditionForm.data.kondisi} onChange={(e) => conditionForm.setData('kondisi', e.target.value)} className="h-11 w-full rounded-btn border border-line bg-white px-3.5 text-sm">
                                {['Baik', 'Rusak Ringan', 'Rusak Berat'].map((value) => <option key={value}>{value}</option>)}
                            </select>
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                                <Upload className="h-4 w-4" /> Upload foto kondisi
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files[0]; setFoto(file?.name ?? null); conditionForm.setData('foto', file ?? null); }} />
                            </label>
                            {foto && <p className="text-xs text-muted">{foto}</p>}
                            <Button type="submit" size="sm" disabled={conditionForm.processing}>Simpan Kondisi</Button>
                        </form>
                    )}
                </Card>

                <div className="lg:col-span-2">
                    <Card title="Informasi Aset">
                        <h2 className="font-display text-xl font-bold text-ink">{asset.nama}</h2>
                        <p className="text-sm text-muted">{asset.kode} · {asset.kategori}</p>

                        <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                            <Info label="Merk" value={asset.merk} />
                            <Info label="Tipe / Model" value={asset.tipe_model} />
                            <Info label="Nomor Seri" value={asset.no_seri} />
                            <Info label="Tahun Perolehan" value={asset.tahun_perolehan} />
                            <Info label="Sumber Perolehan" value={asset.sumber_perolehan} />
                            <Info label="Nilai Perolehan" value={fmt(asset.nilai_perolehan) ? `Rp ${fmt(asset.nilai_perolehan)}` : null} />
                            <Info label="Lokasi" value={asset.location?.nama} />
                            <Info label="Penanggung Jawab" value={asset.penanggung_jawab} />
                        </dl>

                        {asset.keterangan && (
                            <div className="mt-5 rounded-btn bg-surface p-4">
                                <p className="text-xs font-medium text-muted">Keterangan</p>
                                <p className="mt-1 text-sm text-ink">{asset.keterangan}</p>
                            </div>
                        )}
                    </Card>

                    <Card title="Riwayat Inventaris" className="mt-6">
                        {histories.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted">Belum ada riwayat.</p>
                        ) : (
                            <ol className="relative border-l border-line pl-6">
                                {histories.map((h) => (
                                    <li key={h.id} className="mb-6 last:mb-0">
                                        <span className="absolute -left-1.5 mt-1 flex h-3 w-3 rounded-full bg-primary" />
                                        <p className="text-sm font-medium text-ink">{h.catatan}</p>
                                        <p className="mt-0.5 flex items-center gap-3 text-xs text-muted">
                                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{h.tanggal}</span>
                                            {h.lokasi && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{h.lokasi}</span>}
                                            {h.kondisi && <KondisiBadge kondisi={h.kondisi} />}
                                            {h.user && <span>oleh {h.user}</span>}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </Card>
                    <Card title="Riwayat Mutasi Aset" className="mt-6">
                        {mutations.length === 0 ? <p className="py-8 text-center text-sm text-muted">Belum ada mutasi aset.</p> : (
                            <ol className="relative border-l border-line pl-6">
                                {mutations.map((m) => <li key={m.id} className="mb-6 last:mb-0"><span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary" /><p className="text-sm font-medium text-ink">{m.dari || 'Tanpa lokasi'} → {m.ke}</p><p className="mt-1 text-xs text-muted">{m.tanggal}{m.pj_baru ? ` · PJ: ${m.pj_baru}` : ''}</p>{m.keterangan && <p className="mt-1 text-sm text-muted">{m.keterangan}</p>}</li>)}
                            </ol>
                        )}
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{value || '-'}</dd>
        </div>
    );
}
