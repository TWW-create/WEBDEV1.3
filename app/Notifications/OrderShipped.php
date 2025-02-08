<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderShipped extends Notification
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
            ->subject('Your Order Has Shipped - #' . $this->order->order_number)
            ->line('Great news! Your order has been shipped.')
            ->line('Order Number: ' . $this->order->order_number)
            ->line('KINDLY LOGIN TO VIEW')
            ->action('View Order', 'https://baraweb.waltanforte.com/orders/' . $this->order->id)
            ->line('Thank you for shopping with Bara!');
    }
}
