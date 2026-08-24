import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ title = 'Belum Ada Data', description, action, actionLabel, actionHref }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-white px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-card bg-primary-soft">
                <PackageOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
            {description && <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p>}
            {(actionLabel && (action || actionHref)) && (
                <div className="mt-5">
                    <Button href={actionHref} onClick={action}>
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}
