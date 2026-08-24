import { Head, useForm, usePage } from '@inertiajs/react';
import { User, KeyRound } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import FormInput from '@/Components/FormInput';

export default function ProfileEdit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;

    const profile = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const password = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function updateProfile(e) {
        e.preventDefault();
        profile.patch(route('profile.update'));
    }

    function updatePassword(e) {
        e.preventDefault();
        password.put(route('password.update'), {
            onSuccess: () => password.reset(),
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan" />

            <PageHeader title="Pengaturan" description="Kelola informasi profil dan keamanan akun." />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card title="Informasi Profil">
                    <form onSubmit={updateProfile} className="space-y-4">
                        <FormInput label="Nama" value={profile.data.name} onChange={(e) => profile.setData('name', e.target.value)} error={profile.errors.name} />
                        <FormInput label="Email" type="email" value={profile.data.email} onChange={(e) => profile.setData('email', e.target.value)} error={profile.errors.email} />
                        <div className="flex flex-col [&>*]:w-full sm:flex-row sm:justify-end sm:[&>*]:w-auto">
                            <Button type="submit" disabled={profile.processing}>
                                {profile.processing ? 'Menyimpan...' : 'Simpan Profil'}
                            </Button>
                        </div>
                    </form>
                </Card>

                <Card title="Ubah Kata Sandi">
                    <form onSubmit={updatePassword} className="space-y-4">
                        <FormInput label="Kata Sandi Saat Ini" type="password" value={password.data.current_password} onChange={(e) => password.setData('current_password', e.target.value)} error={password.errors.current_password} autoComplete="current-password" />
                        <FormInput label="Kata Sandi Baru" type="password" value={password.data.password} onChange={(e) => password.setData('password', e.target.value)} error={password.errors.password} autoComplete="new-password" />
                        <FormInput label="Konfirmasi Kata Sandi Baru" type="password" value={password.data.password_confirmation} onChange={(e) => password.setData('password_confirmation', e.target.value)} error={password.errors.password_confirmation} autoComplete="new-password" />
                        <div className="flex flex-col [&>*]:w-full sm:flex-row sm:justify-end sm:[&>*]:w-auto">
                            <Button type="submit" disabled={password.processing}>
                                {password.processing ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
