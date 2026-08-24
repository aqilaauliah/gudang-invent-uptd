<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordCode;
use App\Models\PasswordResetCode;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetController extends Controller
{
    /**
     * Display the password reset request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * Send a password reset code to the user's email.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            PasswordResetCode::where('email', $user->email)->delete();

            PasswordResetCode::create([
                'email' => $user->email,
                'code' => Hash::make($code),
                'expires_at' => now()->addMinutes(15),
                'attempts' => 0,
            ]);

            Mail::to($user->email)->send(new ResetPasswordCode($code, $user->name));
        }

        $request->session()->put('password_reset_email', $request->email);
        $request->session()->forget('password_reset_verified');

        return redirect()->route('password.reset')->with('status', 'Kode reset telah dikirim ke email Anda.');
    }

    /**
     * Display the code verification / password reset form.
     */
    public function showResetForm(Request $request): Response
    {
        $email = $request->session()->get('password_reset_email');

        return Inertia::render('Auth/ResetPassword', [
            'email' => $email,
            'status' => $request->session()->get('status'),
            'verified' => $email !== null
                && $request->session()->get('password_reset_verified') === $email,
        ]);
    }

    /**
     * Verify the reset code before allowing a password reset.
     *
     * @throws ValidationException
     */
    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $record = PasswordResetCode::where('email', $request->email)->latest()->first();

        if (! $record) {
            throw ValidationException::withMessages([
                'code' => 'Kode tidak valid. Silakan minta kode baru.',
            ]);
        }

        if ($record->expires_at->isPast()) {
            $record->delete();

            throw ValidationException::withMessages([
                'code' => 'Kode sudah kedaluwarsa. Silakan minta kode baru.',
            ]);
        }

        if ($record->attempts >= 5) {
            throw ValidationException::withMessages([
                'code' => 'Terlalu banyak percobaan. Silakan minta kode baru.',
            ]);
        }

        if (! Hash::check($request->code, $record->code)) {
            $record->increment('attempts');

            throw ValidationException::withMessages([
                'code' => 'Kode tidak valid.',
            ]);
        }

        $request->session()->put('password_reset_verified', $request->email);

        return redirect()->route('password.reset');
    }

    /**
     * Reset the user's password after the code has been verified.
     *
     * @throws ValidationException
     */
    public function reset(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($request->session()->get('password_reset_verified') !== $request->email) {
            throw ValidationException::withMessages([
                'email' => 'Verifikasi kode terlebih dahulu.',
            ]);
        }

        $record = PasswordResetCode::where('email', $request->email)->latest()->first();

        if (! $record) {
            throw ValidationException::withMessages([
                'email' => 'Kode tidak valid. Silakan minta kode baru.',
            ]);
        }

        if ($record->expires_at->isPast()) {
            $record->delete();

            throw ValidationException::withMessages([
                'email' => 'Kode sudah kedaluwarsa. Silakan minta kode baru.',
            ]);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => 'Pengguna tidak ditemukan.',
            ]);
        }

        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        $record->delete();
        $request->session()->forget(['password_reset_email', 'password_reset_verified']);

        return redirect()->route('login')->with('status', 'Kata sandi berhasil direset. Silakan masuk dengan kata sandi baru.');
    }
}
