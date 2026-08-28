import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
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

            <div className="rounded-2xl border border-line bg-white p-8 shadow-sm sm:p-10">
                <div className="mb-8 flex flex-col items-center text-center">
    <img src="/image/logo-disnakertrans.png" alt="Logo" className="h-30 w-30 object-contain" />
    <p className="mt-1.5 font-display text-lg font-bold text-ink">INVENTRA</p>
    <p className="text-xs text-muted">Inventory & Asset Management System</p>
</div>

                <h2 className="font-display text-xl font-bold text-ink">Masuk ke akun Anda</h2>
                <p className="mt-1 text-sm text-muted">Kelola persediaan dan inventaris di sini.</p>

                {status && (
                    <div className="mt-5 rounded-btn border border-success/30 bg-success-soft px-4 py-3 text-sm text-success">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-7 space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocimgus
                            onChange={(e) => setData('email', e.target.value)}
                            className={`block h-11 w-full rounded-btn border bg-white px-3.5 text-sm text-ink transition focus:outline-none ${
                                errors.email ? 'border-danger' : 'border-line focus:border-primary'
                            }`}
                            placeholder="nama@uptd.go.id"
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className={`block h-11 w-full rounded-btn border bg-white px-3.5 text-sm text-ink transition focus:outline-none ${
                                errors.password ? 'border-danger' : 'border-line focus:border-primary'
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="mt-1.5 text-xs text-danger">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <label className="flex items-center gap-2 text-sm text-muted">
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
                        {processing ? 'Memproses...' : 'Masuk'}
                    </Button>
                </form>
            </div>
        </GuestLayout>
    );
}