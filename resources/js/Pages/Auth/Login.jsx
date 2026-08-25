import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn, Mail, Lock } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => reset('password'), []);

    function submit(e) {
        e.preventDefault();
        post(route('login'));
    }

    return (
        <GuestLayout>
            <Head title="Masuk" />
            <div className="w-full max-w-sm">
                <div className="mb-8 lg:hidden">
                    <div className="flex items-center gap-3">
                        <img src="/image/logo-disnakertrans.png" alt="Logo" className="h-12 w-12 object-contain" />
                        <div>
                            <p className="font-display text-xl font-bold text-ink">INVENTRA</p>
                            <p className="text-xs text-muted">Inventory & Asset Management System</p>
                        </div>
                    </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-ink">Masuk</h2>
                <p className="mt-1.5 text-sm text-muted">
                    Masuk untuk mengelola persediaan dan inventaris.
                </p>

                {status && (
                    <div className="mt-4 rounded-btn border border-success/30 bg-success-soft px-4 py-3 text-sm text-success">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                className={`block h-12 w-full rounded-btn border bg-white pl-11 pr-3.5 text-sm text-ink transition focus:outline-none ${
                                    errors.email ? 'border-danger' : 'border-line focus:border-primary'
                                }`}
                                placeholder="nama@uptd.go.id"
                            />
                        </div>
                        {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className={`block h-12 w-full rounded-btn border bg-white pl-11 pr-3.5 text-sm text-ink transition focus:outline-none ${
                                    errors.password ? 'border-danger' : 'border-line focus:border-primary'
                                }`}
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <p className="mt-1.5 text-xs text-danger">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <label className="flex items-center gap-2.5 text-sm text-muted">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-line text-primary focus:ring-primary"
                            />
                            Ingat saya
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    <Button type="submit" disabled={processing} className="w-full" size="lg">
                        <LogIn className="h-4 w-4" />
                        {processing ? 'Memproses...' : 'Masuk'}
                    </Button>
                </form>
            </div>
        </GuestLayout>
    );
}
