import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';
import Toast from '@/Components/Toast';

export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-surface">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="lg:pl-[250px]">
                <Topbar onOpenSidebar={() => setSidebarOpen(true)} />
                <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
            </div>
            <Toast />
        </div>
    );
}
