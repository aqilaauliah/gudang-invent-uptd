export default function PageHeader({ title, description, children }) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h1>
                {description && <p className="mt-1 text-sm text-muted">{description}</p>}
            </div>
            {children && (
                <div className="flex w-full shrink-0 flex-col gap-3 [&>*]:w-full sm:w-auto sm:flex-row sm:items-center sm:[&>*]:w-auto">
                    {children}
                </div>
            )}
        </div>
    );
}
