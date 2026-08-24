const tones = {
    navy: 'bg-navy/10 text-navy',
    blue: 'bg-primary-soft text-primary',
    green: 'bg-success-soft text-success',
    yellow: 'bg-gold-soft text-amber-500',
    red: 'bg-danger-soft text-danger',
};

export default function StatCard({ icon: Icon, label, value, tone = 'blue', footer }) {
    return (
        <div className="rounded-card border border-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">{label}</span>
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-card ${tones[tone]}`}
                >
                    <Icon className="h-5.5 w-5.5" strokeWidth={2} />
                </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">{value}</p>
            {footer && <p className="mt-1.5 text-xs text-muted">{footer}</p>}
        </div>
    );
}
