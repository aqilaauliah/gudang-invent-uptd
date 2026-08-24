export default function FormInput({
    label,
    name,
    error,
    hint,
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
            <input
                id={name}
                name={name}
                className={`block w-full rounded-btn border bg-white px-3.5 text-sm text-ink placeholder:text-muted/70 transition focus:outline-none focus:ring-0 ${
                    error
                        ? 'border-danger focus:border-danger'
                        : 'border-line focus:border-primary'
                } h-11`}
                {...props}
            />
            {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
            {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
        </div>
    );
}
