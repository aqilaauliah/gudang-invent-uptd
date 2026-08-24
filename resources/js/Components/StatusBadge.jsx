const tones = {
    green: 'bg-success-soft text-success',
    yellow: 'bg-gold-soft text-amber-600',
    red: 'bg-danger-soft text-danger',
    blue: 'bg-primary-soft text-primary',
    gray: 'bg-surface text-muted',
    navy: 'bg-navy text-white',
};

export function Badge({ tone = 'gray', className = '', children }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
        >
            {children}
        </span>
    );
}

const stockTones = {
    aman: 'green',
    menipis: 'yellow',
    habis: 'red',
};

const stockLabels = {
    aman: 'AMAN',
    menipis: 'MENIPIS',
    habis: 'HABIS',
};

export function StatusBadge({ status }) {
    const tone = stockTones[status] ?? 'gray';
    const label = stockLabels[status] ?? status;

    return (
        <Badge tone={tone}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {label}
        </Badge>
    );
}

export function KondisiBadge({ kondisi }) {
    const tone =
        kondisi === 'Baik' ? 'green' : kondisi === 'Rusak Ringan' ? 'yellow' : 'red';

    return (
        <Badge tone={tone}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {kondisi}
        </Badge>
    );
}

export function ItemStatusBadge({ status }) {
    return status === 'aktif' ? (
        <Badge tone="green">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Aktif
        </Badge>
    ) : (
        <Badge tone="gray">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Nonaktif
        </Badge>
    );
}

export default Badge;
