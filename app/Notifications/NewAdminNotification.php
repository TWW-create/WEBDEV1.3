<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class NewAdminNotification extends Notification
{
    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Administrator Access Granted')
            ->line('You have been granted administrator access to Bara.')
            ->line('You now have access to the admin dashboard and additional management features.')
            ->line('KINDLY LOGIN TO VIEW')
            ->action('Access Admin Dashboard', 'https://baraweb.waltanforte.com/admin/dashboard')
            ->line('With great power comes great responsibility!');
    }
}
