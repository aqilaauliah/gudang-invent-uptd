import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const configs = {
    success: { icon: CheckCircle2, iconColor: 'text-success' },
    warning: { icon: AlertTriangle, iconColor: 'text-amber-500' },
    critical: { icon: XCircle, iconColor: 'text-danger' },
    info: { icon: Info, iconColor: 'text-primary' },
};

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!flash?.message || !visible) return null;

    const config = configs[flash.type] ?? configs.info;
    const Icon = config.icon;

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
            <div className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-card border border-line bg-white p-4 shadow-card">
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconColor}`} />
                <p className="flex-1 text-sm font-medium leading-6 text-ink">{flash.message}</p>
                <button
                    onClick={() => setVisible(false)}
                    className="shrink-0 rounded-btn p-1 text-muted transition hover:bg-surface hover:text-ink"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
