import { Head, Link } from '@inertiajs/react';
import { MapPin, User, ArrowLeft, Package, MonitorSmartphone } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import { KondisiBadge, Badge } from '@/Components/StatusBadge';

export default function LokasiShow({ location, stocks, assets }) {
    return (
        <AuthenticatedLayout>
            <Head title={location.nama} />

            <Link href="/lokasi" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Lokasi
            </Link>

            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-card bg-primary-soft">
                    <MapPin className="h-7 w-7 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-2xl font-bold text-ink">{location.nama}</h1>
                    <p className="flex items-center gap-1 text-sm text-muted">
                        <User className="h-4 w-4" /> {location.penanggung_jawab ?? 'Tidak ada penanggung jawab'}
                    </p>
                </div>
            </div>

            {location.keterangan && (
                <div className="mb-6 max-w-2xl rounded-btn border border-line bg-white p-4 text-sm text-muted shadow-card">
                    {location.keterangan}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card title="Barang di Lokasi Ini" action={<span className="flex items-center gap-1.5 text-sm text-muted"><Package className="h-4 w-4" />{stocks.length} barang</span>}>
                    {stocks.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted">Belum ada stok barang di lokasi ini.</p>
                    ) : (
                        <div className="divide-y divide-line">
                            {stocks.map((s) => (
                                <div key={s.item_id} className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="text-sm font-medium text-ink">{s.nama}</p>
                                        <p className="text-xs text-muted">{s.kode} · {s.kategori}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-ink">
                                        {s.jumlah} <span className="font-normal text-muted">{s.satuan}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                <Card title="Inventaris di Lokasi Ini" action={<span className="flex items-center gap-1.5 text-sm text-muted"><MonitorSmartphone className="h-4 w-4" />{assets.length} aset</span>}>
                    {assets.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted">Belum ada inventaris di lokasi ini.</p>
                    ) : (
                        <div className="divide-y divide-line">
                            {assets.map((asset) => (
                                <Link key={asset.id} href={`/aset/${asset.id}`} className="flex items-center justify-between py-3 transition hover:bg-surface">
                                    <div className="flex items-center gap-3">
                                        {asset.foto ? (
                                            <img src={`/storage/${asset.foto}`} alt={asset.nama} className="h-9 w-9 rounded-btn object-cover" />
                                        ) : (
                                            <div className="flex h-9 w-9 items-center justify-center rounded-btn bg-primary-soft">
                                                <MonitorSmartphone className="h-4 w-4 text-primary" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-ink">{asset.nama}</p>
                                            <p className="text-xs text-muted">{asset.kode}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <KondisiBadge kondisi={asset.kondisi} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
