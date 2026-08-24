export default function FormSelect({
    label,
    name,
    error,
    hint,
    className = '',
    children,
    placeholder,
    ...props
}) {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
                    {label}
                </label>
            )}
            <select
                id={name}
                name={name}
                className={`block h-11 w-full rounded-btn border bg-white px-3.5 text-sm text-ink transition focus:outline-none focus:ring-0 ${
                    error ? 'border-danger focus:border-danger' : 'border-line focus:border-primary'
                }`}
                {...props}
            >
                {placeholder !== undefined && <option value="">{placeholder}</option>}
                {children}
            </select>
            {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
            {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
        </div>
    );
}
