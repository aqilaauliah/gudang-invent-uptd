export function Skeleton({ className = '' }) {
    return <div className={`animate-pulse rounded-card bg-line/70 ${className}`} />;
}

export function StatCardSkeleton() {
    return (
        <div className="rounded-card border border-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-11 rounded-card" />
            </div>
            <Skeleton className="mt-4 h-8 w-20" />
        </div>
    );
}

export function TableSkeleton({ rows = 5 }) {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
    );
}

export function ChartSkeleton() {
    return <Skeleton className="h-64 w-full" />;
}
