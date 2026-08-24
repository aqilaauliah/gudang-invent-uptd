export default function Card({ title, action, children, className = '' }) {
    return (
        <div className={`rounded-card border border-line bg-white shadow-card ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    {title && <h3 className="font-display text-base font-semibold text-ink">{title}</h3>}
                    {action}
                </div>
            )}
            <div className="p-5">{children}</div>
        </div>
    );
}
