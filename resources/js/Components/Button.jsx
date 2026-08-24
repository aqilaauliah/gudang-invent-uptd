import { Link } from '@inertiajs/react';

const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus-visible:ring-primary/40',
    secondary: 'bg-white text-ink border border-line hover:bg-surface focus-visible:ring-line',
    warning: 'bg-gold text-navy hover:bg-yellow-500 focus-visible:ring-gold/40',
    danger: 'bg-danger text-white hover:bg-red-700 focus-visible:ring-danger/40',
    ghost: 'bg-transparent text-muted hover:bg-surface hover:text-ink',
    soft: 'bg-primary-soft text-primary hover:bg-blue-100',
};

const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 px-5 text-sm gap-2',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    href,
    className = '',
    type = 'button',
    children,
    ...props
}) {
    const classes = [
        'inline-flex items-center justify-center rounded-btn font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
        variants[variant],
        sizes[size],
        className,
    ].join(' ');

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
}
