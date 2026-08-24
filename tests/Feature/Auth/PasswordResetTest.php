<?php

namespace Tests\Feature\Auth;

use App\Mail\ResetPasswordCode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_forgot_password_screen_can_be_rendered(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
    }

    public function test_reset_code_can_be_requested(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email])
            ->assertRedirect(route('password.reset'));

        Mail::assertSent(ResetPasswordCode::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }

    public function test_reset_password_screen_can_be_rendered(): void
    {
        $response = $this->get('/reset-password');

        $response->assertStatus(200);
    }

    public function test_password_can_be_reset_with_valid_code(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        $code = null;
        Mail::assertSent(ResetPasswordCode::class, function ($mail) use (&$code) {
            $code = $mail->code;

            return true;
        });

        $this->post('/reset-password/verify', [
            'email' => $user->email,
            'code' => $code,
        ])->assertRedirect(route('password.reset'));

        $this->post('/reset-password', [
            'email' => $user->email,
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('login'));
    }

    public function test_password_cannot_be_reset_without_verification(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        $this->post('/reset-password', [
            'email' => $user->email,
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ])->assertSessionHasErrors();
    }
}
