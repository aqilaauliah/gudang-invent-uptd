import { Head, Link, useForm } from '@inertiajs/react';
import { Lock, KeyRound, KeySquare, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';

export default function ResetPassword({ email, status, verified }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: email ?? '',
        code: '',
        password: '',
        password_confirmation: '',
    });

    function verifyCode(e) {
        e.preventDefault();
        post(route('password.verify'), {
            onSuccess: () => reset('code'),
        });
    }

    function submit(e) {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('code', 'password', 'password_confirmation'),
        });
    }

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <div className="w-full max-w-sm">
                <div className="mb-8 lg:hidden">
                    <div className="flex items-center gap-3">
                        <img src="/image/logo-disnakertrans.png" alt="Logo" className="h-12 w-12 object-contain" />
                        <div>
                            <p className="font-display text-xl font-bold text-ink">SIGUDIN</p>
                            <p className="text-xs text-muted">Sistem Informasi Gudang dan Inventaris</p>
                        </div>
                    </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-ink">Reset Password</h2>
                <p className="mt-1.5 text-sm text-muted">
                    {verified
                        ? 'Kode terverifikasi. Sekarang buat kata sandi baru untuk akun Anda.'
                        : 'Masukkan kode reset yang dikirim ke email Anda untuk verifikasi.'}
                </p>

                <div className="mt-5 flex items-center gap-2">
                    <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            verified ? 'bg-success text-white' : 'bg-primary text-white'
                        }`}
                    >
                        {verified ? <CheckCircle2 className="h-4 w-4" /> : '1'}
                    </div>
                    <span className={`text-sm font-medium ${verified ? 'text-success' : 'text-ink'}`}>
                        Verifikasi Kode
                    </span>
                    <div className="mx-1 h-px flex-1 bg-line" />
                    <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            verified ? 'bg-primary text-white' : 'bg-surface text-muted'
                        }`}
                    >
                        2
                    </div>
                    <span className={`text-sm font-medium ${verified ? 'text-ink' : 'text-muted'}`}>
                        Kata Sandi Baru
                    </span>
                </div>

                {status && (
                    <div className="mt-4 rounded-btn border border-success/30 bg-success-soft px-4 py-3 text-sm text-success">
                        {status}
                    </div>
                )}

                {!verified ? (
                    <form onSubmit={verifyCode} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                readOnly
                                className="block h-12 w-full rounded-btn border border-line bg-surface px-3.5 text-sm text-muted"
                            />
                        </div>

                        <div>
                            <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-ink">
                                Kode Reset
                            </label>
                            <div className="relative">
                                <KeySquare className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                                <input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={data.code}
                                    autoComplete="one-time-code"
                                    autoFocus
                                    onChange={(e) => setData('code', e.target.value.replace(/[^0-9]/g, ''))}
                                    className={`block h-12 w-full rounded-btn border bg-white pl-11 pr-3.5 text-center text-lg font-semibold tracking-[0.5em] text-ink transition focus:outline-none ${
                                        errors.code ? 'border-danger' : 'border-line focus:border-primary'
                                    }`}
                                    placeholder="000000"
                                />
                            </div>
                            {errors.code && <p className="mt-1.5 text-xs text-danger">{errors.code}</p>}
                        </div>

                        <Button type="submit" disabled={processing} className="w-full" size="lg">
                            <ShieldCheck className="h-4 w-4" />
                            {processing ? 'Memverifikasi...' : 'Verifikasi Kode'}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={submit} className="mt-6 space-y-5">
                        <div className="flex items-center gap-2 rounded-btn border border-success/30 bg-success-soft px-4 py-3">
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                            <p className="text-sm text-success">Kode berhasil diverifikasi untuk {data.email}.</p>
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                                Kata Sandi Baru
                            </label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    autoFocus
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`block h-12 w-full rounded-btn border bg-white pl-11 pr-3.5 text-sm text-ink transition focus:outline-none ${
                                        errors.password ? 'border-danger' : 'border-line focus:border-primary'
                                    }`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="mt-1.5 text-xs text-danger">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="mb-1.5 block text-sm font-medium text-ink">
                                Konfirmasi Kata Sandi
                            </label>
                            <div className="relative">
                                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={`block h-12 w-full rounded-btn border bg-white pl-11 pr-3.5 text-sm text-ink transition focus:outline-none ${
                                        errors.password_confirmation
                                            ? 'border-danger'
                                            : 'border-line focus:border-primary'
                                    }`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1.5 text-xs text-danger">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <Button type="submit" disabled={processing} className="w-full" size="lg">
                            {processing ? 'Menyimpan...' : 'Reset Password'}
                        </Button>
                    </form>
                )}

                <Link
                    href={route('password.request')}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Minta kode baru
                </Link>
            </div>
        </GuestLayout>
    );
}
