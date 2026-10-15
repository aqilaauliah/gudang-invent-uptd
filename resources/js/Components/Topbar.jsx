import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Bell, ChevronDown, LogOut } from 'lucide-react';

const titles = {
    '/dashboard': 'Dashboard',
    '/barang': 'Data Barang',
    '/persediaan': 'Persediaan',
    '/barang-masuk': 'Barang Masuk',
    '/barang-keluar': 'Barang Keluar',
    '/mutasi': 'Mutasi Barang',
    '/aset': 'Inventaris / Aset',
    '/lokasi': 'Lokasi',
    '/laporan': 'Laporan',
    '/pengguna': 'Pengguna',
    '/aktivitas': 'Aktivitas',
    '/profile': 'Pengaturan',
};

export default function Topbar({ onOpenSidebar }) {
    const { auth, lowStockCount } = usePage().props;
    const { url } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);

    const pageTitle = Object.entries(titles).find(([path]) => url.startsWith(path))?.[1] ?? 'Dashboard';

    return (
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-line bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenSidebar}
                    className="rounded-btn p-2 text-muted transition hover:bg-surface md:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div>
                    <p className="text-xs text-muted">INVENTRA</p>
                    <h2 className="font-display text-lg font-semibold leading-tight text-ink">{pageTitle}</h2>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Link
                    href="/persediaan"
                    className="relative rounded-btn p-2 text-muted transition hover:bg-surface"
                >
                    <Bell className="h-5 w-5" />
                    {lowStockCount > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-badge bg-gold px-1 text-[10px] font-bold text-navy">
                            {lowStockCount}
                        </span>
                    )}
                </Link>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="flex items-center gap-2.5 rounded-btn py-1.5 pl-1.5 pr-2 transition hover:bg-surface"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-card bg-navy font-display text-sm font-semibold text-white">
                            {auth.user?.name?.charAt(0) ?? 'A'}
                        </span>
                        <span className="hidden text-left sm:block">
                            <span className="block text-sm font-medium leading-tight text-ink">
                                {auth.user?.name}
                            </span>
                            <span className="block text-xs text-muted">
                                {auth.user?.roles?.[0]?.name ?? 'Petugas Gudang'}
                            </span>
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted" />
                    </button>

                    {menuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                            <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-card border border-line bg-white py-1.5 shadow-card">
                                <div className="border-b border-line px-4 py-2.5">
                                    <p className="text-sm font-medium text-ink">{auth.user?.name}</p>
                                    <p className="truncate text-xs text-muted">{auth.user?.email}</p>
                                </div>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-danger transition hover:bg-danger-soft"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Keluar
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
