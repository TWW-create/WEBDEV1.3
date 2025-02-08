<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderStatusUpdate extends Notification
{
    protected $order;
    protected $status;

    public function __construct($order, $status)
    {
        $this->order = $order;
        $this->status = $status;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $statusMessages = [
            'processing' => 'Your order is being processed',
            'in_route' => 'Your order is out for delivery',
            'delivered' => 'Your order has been delivered',
            'cancelled' => 'Your order has been cancelled'
        ];

        return (new MailMessage)
            ->subject('Order Status Update - #' . $this->order->order_number)
            ->line($statusMessages[$this->status] ?? 'Your order status has been updated')
            ->line('Order Number: ' . $this->order->order_number)
            ->action('View Order Details', 'https://baraweb.waltanforte.com/orders/' . $this->order->id)
            ->line('Thank you for shopping with Bara!');
    }
}
