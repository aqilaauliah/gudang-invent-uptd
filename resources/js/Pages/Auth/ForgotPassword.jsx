import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/Button';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('password.email'));
    }

    return (
        <GuestLayout>
            <Head title="Lupa Password" />
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

                <h2 className="font-display text-2xl font-bold text-ink">Lupa Password</h2>
                <p className="mt-1.5 text-sm text-muted">
                    Masukkan email Anda dan kami akan mengirimkan kode reset kata sandi.
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

                    <Button type="submit" disabled={processing} className="w-full" size="lg">
                        <Send className="h-4 w-4" />
                        {processing ? 'Mengirim...' : 'Kirim Kode Reset'}
                    </Button>
                </form>

                <Link
                    href={route('login')}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke login
                </Link>
            </div>
        </GuestLayout>
    );
}
