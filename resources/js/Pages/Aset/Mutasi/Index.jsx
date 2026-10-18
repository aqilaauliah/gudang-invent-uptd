import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';

export default function AssetMutationIndex({ mutations, filters = {} }) {
    function filter(key, value) {
        router.get(route('aset.mutasi.index'), { ...filters, [key]: value || undefined }, { preserveState: true, replace: true });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Mutasi Aset" />
            <PageHeader title="Mutasi Aset" description="Riwayat pemindahan lokasi aset.">
                <Button href={route('aset.mutasi.create')}><Plus className="h-4 w-4" /> Mutasi Aset</Button>
            </PageHeader>
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input type="date" value={filters.tanggal_dari ?? ''} onChange={(e) => filter('tanggal_dari', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm" aria-label="Tanggal dari" />
                <input type="date" value={filters.tanggal_sampai ?? ''} onChange={(e) => filter('tanggal_sampai', e.target.value)} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm" aria-label="Tanggal sampai" />
                <button type="button" onClick={() => router.get(route('aset.mutasi.index'))} className="h-11 rounded-btn border border-line bg-white px-3.5 text-sm font-medium text-muted hover:bg-surface">Reset Filter</button>
            </div>
            {mutations.data.length === 0 ? <EmptyState title="Belum Ada Mutasi" description="Belum ada riwayat mutasi aset." /> : (
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[680px] text-left text-sm">
                            <thead><tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted"><th className="px-5 py-3.5">Tanggal</th><th className="px-5 py-3.5">Aset</th><th className="px-5 py-3.5">Perpindahan</th><th className="px-5 py-3.5">PJ Baru</th><th className="px-5 py-3.5">Dicatat Oleh</th></tr></thead>
                            <tbody className="divide-y divide-line">{mutations.data.map((m) => <tr key={m.id}><td className="px-5 py-3.5 text-muted">{m.tanggal}</td><td className="px-5 py-3.5"><Link href={route('aset.show', m.asset.id)} className="font-medium text-primary hover:underline">{m.asset.nama}</Link><p className="text-xs text-muted">{m.asset.kode}</p></td><td className="px-5 py-3.5 text-muted">{m.from_location?.nama ?? '-'} → {m.to_location?.nama ?? '-'}</td><td className="px-5 py-3.5 text-muted">{m.pj_baru ?? '-'}</td><td className="px-5 py-3.5 text-muted">{m.recorder?.name ?? '-'}</td></tr>)}</tbody>
                        </table>
                    </div>
                </Card>
            )}
            <Pagination links={mutations.links} />
        </AuthenticatedLayout>
    );
}
