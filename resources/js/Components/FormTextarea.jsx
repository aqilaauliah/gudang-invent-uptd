export default function FormTextarea({
    label,
    name,
    error,
    hint,
    rows = 3,
    className = '',
    ...props
}) {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
                    {label}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                rows={rows}
                className={`block w-full rounded-btn border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition focus:outline-none focus:ring-0 ${
                    error ? 'border-danger focus:border-danger' : 'border-line focus:border-primary'
                }`}
                {...props}
            />
            {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
            {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
        </div>
    );
}
