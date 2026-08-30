<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailChangedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $newEmail,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Email Akun Anda Telah Diubah - INVENTRA',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.email-changed',
        );
    }
}
