import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted">
                Menampilkan data tabel
            </p>
            <div className="flex items-center gap-1">
                {links.map((link, i) => {
                    if (link.label.includes('Sebelumnya') || link.label.includes('Previous')) {
                        return (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                preserveScroll
                                className={`flex h-8 w-8 items-center justify-center rounded-btn border text-sm ${
                                    link.url
                                        ? 'border-line bg-white text-muted hover:bg-surface'
                                        : 'pointer-events-none border-line bg-surface text-muted/40'
                                }`}
                                dangerouslySetInnerHTML={{ __html: '‹' }}
                            />
                        );
                    }

                    if (link.label.includes('Berikutnya') || link.label.includes('Next')) {
                        return (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                preserveScroll
                                className={`flex h-8 w-8 items-center justify-center rounded-btn border text-sm ${
                                    link.url
                                        ? 'border-line bg-white text-muted hover:bg-surface'
                                        : 'pointer-events-none border-line bg-surface text-muted/40'
                                }`}
                                dangerouslySetInnerHTML={{ __html: '›' }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            preserveScroll
                            className={`flex h-8 min-w-8 items-center justify-center rounded-btn border px-2 text-sm ${
                                link.active
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-line bg-white text-muted hover:bg-surface'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </nav>
    );
}
