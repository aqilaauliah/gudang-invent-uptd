import { Head, router } from '@inertiajs/react';
import { Search, History } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';
import EmptyState from '@/Components/EmptyState';

export default function AktivitasIndex({ activities, filters }) {
    function search(e) {
        if (e.key !== 'Enter') return;
        router.get(route('aktivitas.index'), { search: e.target.value || undefined }, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Aktivitas" />

            <PageHeader title="Aktivitas" description="Riwayat seluruh aktivitas pada sistem (audit trail)." />

            <div className="mb-4 max-w-md">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        defaultValue={filters.search}
                        onKeyDown={search}
                        placeholder="Cari aktivitas..."
                        className="h-11 w-full rounded-btn border border-line bg-white pl-10 pr-3.5 text-sm focus:border-primary focus:outline-none"
                    />
                </div>
            </div>

            {activities.data.length === 0 ? (
                <EmptyState description="Belum ada aktivitas yang tercatat." />
            ) : (
                <>
                    <Card>
                        <ul className="divide-y divide-line">
                            {activities.data.map((activity) => (
                                <li key={activity.id} className="flex items-start gap-3 py-3.5">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-primary-soft">
                                        <History className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-ink">{activity.description}</p>
                                        <p className="mt-0.5 text-xs text-muted">
                                            {activity.causer ?? 'Sistem'} · {activity.created_at}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Pagination links={activities.links} />
                </>
            )}
        </AuthenticatedLayout>
    );
}
