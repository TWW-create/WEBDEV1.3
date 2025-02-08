<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class LowStockAlert extends Notification
{
    protected $product;
    protected $variant;

    public function __construct($product, $variant)
    {
        $this->product = $product;
        $this->variant = $variant;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Low Stock Alert - ' . $this->product->name)
            ->line('Product stock is running low!')
            ->line('Product: ' . $this->product->name)
            ->line('Variant: ' . $this->variant->color)
            ->line('Current Stock: ' . $this->variant->stock)
            ->line('KINDLY LOGIN TO VIEW')
            ->action('Manage Product', 'https://baraweb.waltanforte.com/admin/products/' . $this->product->id)
            ->line('Please restock soon to avoid stockouts.');
    }
}
