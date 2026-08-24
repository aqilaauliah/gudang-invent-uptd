import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
    useEffect(() => {
        if (!open) return;

        const handler = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
            <div className="fixed inset-0 bg-navy/50 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative z-10 mt-8 w-full ${sizes[size]} rounded-card bg-white shadow-card`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between border-b border-line px-6 py-4">
                    <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-btn p-1.5 text-muted transition hover:bg-surface hover:text-ink"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="px-6 py-5">{children}</div>
            </div>
        </div>,
        document.body,
    );
}
