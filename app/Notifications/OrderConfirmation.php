<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderConfirmation extends Notification
{
    protected $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Order Confirmation - #' . $this->order->order_number)
            ->line('Thank you for your order!')
            ->line('Order Details:')
            ->line('Order Number: ' . $this->order->order_number)
            ->line('Total Amount: $' . number_format($this->order->total, 2))
            ->action('View Order', 'https://baraweb.waltanforte.com/orders/' . $this->order->id)
            ->line('We will notify you when your order ships.');
    }
}
