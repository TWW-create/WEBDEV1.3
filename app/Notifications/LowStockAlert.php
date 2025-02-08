<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class LowStockAlert extends Notification
{
    protected $lowStockItems;

    public function __construct($lowStockItems)
    {
        $this->lowStockItems = $lowStockItems;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $mailMessage = (new MailMessage)
            ->subject('Low Stock Alert - Multiple Products')
            ->line('The following products are running low on stock:')
            ->line('-------------------------------------------');

        foreach ($this->lowStockItems as $item) {
            $mailMessage->line('Product: ' . $item['product']->name)
                       ->line('Variant: ' . $item['variant']->color)
                       ->line('Current Stock: ' . $item['variant']->stock)
                       ->line('-------------------------------------------');
        }

        return $mailMessage
            ->action('Manage Products', 'https://baraweb.waltanforte.com/admin/products')
            ->line('Please restock soon to avoid stockouts.');
    }
}
