import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Mail, ShieldCheck, RefreshCw } from 'lucide-react';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';
import Modal from '@/Components/Modal';

export default function ChangeEmail({ maskedEmail }) {
    const [otpOpen, setOtpOpen] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const emailForm = useForm({ new_email: '' });
    const codeForm = useForm({ code: '' });

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    function sendCode() {
        emailForm.post(route('profile.email.send'), {
            onSuccess: () => {
                setOtpOpen(true);
                setCountdown(60);
            },
        });
    }

    function verifyCode(e) {
        e.preventDefault();
        codeForm.post(route('profile.email.verify'), {
            onSuccess: () => {
                codeForm.reset();
                setOtpOpen(false);
                setCountdown(0);
                emailForm.reset();
            },
        });
    }

    function resendCode() {
        emailForm.post(route('profile.email.send'), {
            preserveScroll: true,
            onSuccess: () => {
                setCountdown(60);
                codeForm.reset();
            },
        });
    }

    return (
        <Card title="Ganti Email">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendCode();
                }}
                className="space-y-4"
            >
                <FormInput
                    label="Email Saat Ini"
                    value={maskedEmail}
                    readOnly
                    hint="Kode verifikasi akan dikirim ke email ini."
                />
                <FormInput
                    label="Email Baru"
                    type="email"
                    value={emailForm.data.new_email}
                    onChange={(e) => emailForm.setData('new_email', e.target.value)}
                    error={emailForm.errors.new_email}
                    autoComplete="off"
                />
                <div className="flex flex-col [&>*]:w-full sm:flex-row sm:justify-end sm:[&>*]:w-auto">
                    <Button type="submit" disabled={emailForm.processing}>
                        {emailForm.processing ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
                    </Button>
                </div>
            </form>

            <Modal open={otpOpen} onClose={() => setOtpOpen(false)} title="Konfirmasi Kode OTP" size="sm">
                <form onSubmit={verifyCode} className="space-y-4">
                    <div className="flex items-center gap-2 rounded-btn border border-primary/30 bg-primary-soft px-4 py-3">
                        <Mail className="h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm text-primary">Kode dikirim ke {maskedEmail}</p>
                    </div>

                    <div>
                        <label htmlFor="otp-code" className="mb-1.5 block text-sm font-medium text-ink">
                            Kode OTP
                        </label>
                        <input
                            id="otp-code"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={codeForm.data.code}
                            autoComplete="one-time-code"
                            autoFocus
                            onChange={(e) => codeForm.setData('code', e.target.value.replace(/[^0-9]/g, ''))}
                            className={`block h-12 w-full rounded-btn border bg-white px-3.5 text-center text-lg font-semibold tracking-[0.5em] text-ink transition focus:outline-none ${
                                codeForm.errors.code ? 'border-danger' : 'border-line focus:border-primary'
                            }`}
                            placeholder="000000"
                        />
                        {codeForm.errors.code && <p className="mt-1.5 text-xs text-danger">{codeForm.errors.code}</p>}
                    </div>

                    <Button type="submit" disabled={codeForm.processing} className="w-full" size="lg">
                        <ShieldCheck className="h-4 w-4" />
                        {codeForm.processing ? 'Memverifikasi...' : 'Verifikasi & Ganti Email'}
                    </Button>

                    <button
                        type="button"
                        onClick={resendCode}
                        disabled={countdown > 0 || emailForm.processing}
                        className="inline-flex w-full items-center justify-center gap-1.5 text-sm font-medium text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
                    >
                        <RefreshCw className="h-4 w-4" />
                        {countdown > 0 ? `Kirim ulang dalam ${countdown}s` : 'Kirim ulang kode'}
                    </button>
                </form>
            </Modal>
        </Card>
    );
}
