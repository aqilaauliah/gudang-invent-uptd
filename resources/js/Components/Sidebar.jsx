import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Package,
    Boxes,
    PackagePlus,
    PackageMinus,
    ArrowLeftRight,
    MonitorSmartphone,
    MapPin,
    FileText,
    Users,
    History,
    Settings,
} from 'lucide-react';

const navigation = [
    {
        label: 'MAIN',
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, match: '/dashboard' },
        ],
    },
    {
        label: 'INVENTORY',
        items: [
            { label: 'Data Barang', href: '/barang', icon: Package, match: '/barang' },
            { label: 'Persediaan', href: '/persediaan', icon: Boxes, match: '/persediaan' },
            { label: 'Barang Masuk', href: '/barang-masuk', icon: PackagePlus, match: '/barang-masuk' },
            { label: 'Barang Keluar', href: '/barang-keluar', icon: PackageMinus, match: '/barang-keluar' },
            { label: 'Mutasi Barang', href: '/mutasi', icon: ArrowLeftRight, match: '/mutasi' },
        ],
    },
    {
        label: 'ASSET',
        items: [
            { label: 'Inventaris / Aset', href: '/aset', icon: MonitorSmartphone, match: '/aset' },
            { label: 'Lokasi', href: '/lokasi', icon: MapPin, match: '/lokasi' },
        ],
    },
    {
        label: 'REPORT',
        items: [{ label: 'Laporan', href: '/laporan', icon: FileText, match: '/laporan' }],
    },
    {
        label: 'SYSTEM',
        items: [
            { label: 'Pengguna', href: '/pengguna', icon: Users, match: '/pengguna' },
            { label: 'Aktivitas', href: '/aktivitas', icon: History, match: '/aktivitas' },
            { label: 'Pengaturan', href: '/profile', icon: Settings, match: '/profile' },
        ],
    },
];

export default function Sidebar({ open, onClose }) {
    const { url } = usePage();

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col bg-navy transition-transform duration-200 lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
                    <img
                        src="/image/logo-disnakertrans.png"
                        alt="Logo DISNAKERTRANS"
                        className="h-11 w-11 shrink-0 object-contain"
                    />
                    <div className="min-w-0">
                        <p className="font-display text-lg font-bold leading-tight text-white">SIGUDIN</p>
                        <p className="truncate text-[11px] leading-tight text-white/60">
                            Sistem Informasi Gudang dan Inventaris
                        </p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    {navigation.map((group) => (
                        <div key={group.label} className="mb-5">
                            <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-white/40">
                                {group.label}
                            </p>
                            <ul className="space-y-0.5">
                                {group.items.map((item) => {
                                    const active =
                                        item.match === '/dashboard'
                                            ? url.startsWith('/dashboard')
                                            : url.startsWith(item.match);

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={onClose}
                                                className={`group relative flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition ${
                                                    active
                                                        ? 'bg-navy-2 text-white'
                                                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                                                }`}
                                            >
                                                {active && (
                                                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gold" />
                                                )}
                                                <item.icon
                                                    className={`h-5 w-5 shrink-0 ${
                                                        active ? 'text-gold' : 'text-white/50 group-hover:text-white/80'
                                                    }`}
                                                />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="border-t border-white/10 px-5 py-4">
                    <p className="text-[11px] leading-relaxed text-white/40">
                        UPTD Pengawasan Ketenagakerjaan
                        <br />
                        Wilayah II Karawang
                    </p>
                </div>
            </aside>
        </>
    );
}
