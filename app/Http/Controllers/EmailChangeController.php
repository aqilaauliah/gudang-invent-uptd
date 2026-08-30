<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Mail\EmailChangeCode as EmailChangeCodeMail;
use App\Mail\EmailChangedNotification;
use App\Models\EmailChangeCode;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EmailChangeController extends Controller
{
    use FlashesMessages;

    /**
     * Generate and send an email-change verification code to the user's
     * current (old) email address.
     */
    public function send(Request $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'new_email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class, 'email'),
                function (string $attribute, mixed $value, \Closure $fail) use ($user): void {
                    if ($value === $user->email) {
                        $fail('Email baru harus berbeda dari email lama.');
                    }
                },
            ],
        ]);

        $latest = EmailChangeCode::where('user_id', $user->id)->latest()->first();

        if ($latest && $latest->created_at->gt(now()->subSeconds(60))) {
            $retryIn = max(1, (int) ceil(now()->diffInSeconds($latest->created_at->addSeconds(60))));

            throw ValidationException::withMessages([
                'new_email' => "Terlalu sering mengirim kode. Coba lagi dalam {$retryIn} detik.",
            ]);
        }

        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        EmailChangeCode::where('user_id', $user->id)->delete();

        EmailChangeCode::create([
            'user_id' => $user->id,
            'code_hash' => Hash::make($code),
            'new_email' => strtolower($request->new_email),
            'expires_at' => now()->addSeconds(60),
            'attempts' => 0,
        ]);

        Mail::to($user->email)->send(new EmailChangeCodeMail($code, $user->name));

        $this->flash('success', 'Kode verifikasi telah dikirim ke email lama Anda.');

        return Redirect::route('profile.edit');
    }

    /**
     * Verify the code and change the user's email address.
     */
    public function verify(Request $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $record = EmailChangeCode::where('user_id', $user->id)->latest()->first();

        if (! $record) {
            throw ValidationException::withMessages([
                'code' => 'Kode tidak valid. Silakan minta kode baru.',
            ]);
        }

        if ($record->used_at !== null) {
            throw ValidationException::withMessages([
                'code' => 'Kode sudah digunakan. Silakan minta kode baru.',
            ]);
        }

        if ($record->expires_at->isPast()) {
            throw ValidationException::withMessages([
                'code' => 'Kode sudah kedaluwarsa. Silakan minta kode baru.',
            ]);
        }

        if ($record->attempts >= 5) {
            throw ValidationException::withMessages([
                'code' => 'Terlalu banyak percobaan. Silakan minta kode baru.',
            ]);
        }

        if (! Hash::check($request->code, $record->code_hash)) {
            $record->increment('attempts');

            throw ValidationException::withMessages([
                'code' => 'Kode tidak valid.',
            ]);
        }

        $oldEmail = $user->email;
        $newEmail = $record->new_email;

        $user->forceFill([
            'email' => $newEmail,
            'email_verified_at' => null,
        ])->save();

        $record->update(['used_at' => now()]);

        EmailChangeCode::where('user_id', $user->id)
            ->whereKeyNot($record->id)
            ->delete();

        Mail::to($oldEmail)->send(new EmailChangedNotification($user->name, $newEmail));

        $this->flash('success', 'Email berhasil diubah.');

        return Redirect::route('profile.edit');
    }
}
