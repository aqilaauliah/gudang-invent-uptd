<?php

namespace Tests\Feature;

use App\Mail\EmailChangeCode;
use App\Mail\EmailChangedNotification;
use App\Models\EmailChangeCode as EmailChangeCodeModel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class EmailChangeTest extends TestCase
{
    use RefreshDatabase;

    public function test_otp_is_sent_to_old_email(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $newEmail = 'new.email@example.com';

        $this->actingAs($user)
            ->post('/profile/email', ['new_email' => $newEmail])
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $code = null;
        Mail::assertSent(EmailChangeCode::class, function ($mail) use ($user, &$code) {
            $code = $mail->code;

            return $mail->hasTo($user->email);
        });

        $record = EmailChangeCodeModel::where('user_id', $user->id)->first();

        $this->assertNotNull($record);
        $this->assertSame($newEmail, $record->new_email);
        $this->assertNotSame($code, $record->code_hash);
        $this->assertTrue(Hash::check($code, $record->code_hash));
    }

    public function test_email_is_changed_with_valid_code(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $oldEmail = $user->email;
        $newEmail = 'new.email@example.com';

        $this->actingAs($user)->post('/profile/email', ['new_email' => $newEmail]);

        $code = null;
        Mail::assertSent(EmailChangeCode::class, function ($mail) use (&$code) {
            $code = $mail->code;

            return true;
        });

        $this->actingAs($user)
            ->post('/profile/email/verify', ['code' => $code])
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $this->assertSame($newEmail, $user->fresh()->email);

        Mail::assertSent(EmailChangedNotification::class, function ($mail) use ($oldEmail) {
            return $mail->hasTo($oldEmail) && $mail->newEmail === 'new.email@example.com';
        });

        $record = EmailChangeCodeModel::where('user_id', $user->id)->first();

        $this->assertNotNull($record->used_at);
    }

    public function test_wrong_code_is_rejected_and_attempts_are_limited(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $this->actingAs($user)->post('/profile/email', ['new_email' => 'new.email@example.com']);

        $code = null;
        Mail::assertSent(EmailChangeCode::class, function ($mail) use (&$code) {
            $code = $mail->code;

            return true;
        });

        for ($i = 0; $i < 5; $i++) {
            $this->actingAs($user)
                ->post('/profile/email/verify', ['code' => '000000'])
                ->assertSessionHasErrors('code');
        }

        $record = EmailChangeCodeModel::where('user_id', $user->id)->first();

        $this->assertSame(5, $record->attempts);

        $this->actingAs($user)
            ->post('/profile/email/verify', ['code' => $code])
            ->assertSessionHasErrors('code');

        $this->assertSame($user->email, $user->fresh()->email);
    }

    public function test_expired_code_is_rejected(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $this->actingAs($user)->post('/profile/email', ['new_email' => 'new.email@example.com']);

        $code = null;
        Mail::assertSent(EmailChangeCode::class, function ($mail) use (&$code) {
            $code = $mail->code;

            return true;
        });

        $this->travel(61)->seconds();

        $this->actingAs($user)
            ->post('/profile/email/verify', ['code' => $code])
            ->assertSessionHasErrors('code');

        $this->assertNotSame('new.email@example.com', $user->fresh()->email);
    }

    public function test_resend_is_rate_limited(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/profile/email', ['new_email' => 'new.email@example.com'])
            ->assertSessionHasNoErrors();

        $this->actingAs($user)
            ->post('/profile/email', ['new_email' => 'new.email@example.com'])
            ->assertSessionHasErrors('new_email');
    }

    public function test_new_email_must_be_unique_and_different_from_current(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($user)
            ->post('/profile/email', ['new_email' => $user->email])
            ->assertSessionHasErrors('new_email');

        $this->actingAs($user)
            ->post('/profile/email', ['new_email' => $other->email])
            ->assertSessionHasErrors('new_email');
    }
}
