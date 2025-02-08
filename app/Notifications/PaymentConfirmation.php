<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PaymentConfirmation extends Notification
{
    protected $order;
    protected $transaction;

    public function __construct($order, $transaction)
    {
        $this->order = $order;
        $this->transaction = $transaction;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Payment Confirmation - #' . $this->order->order_number)
            ->line('Your payment has been successfully processed!')
            ->line('Order Details:')
            ->line('Order Number: ' . $this->order->order_number)
            ->line('Amount Paid: $' . number_format($this->transaction->amount, 2))
            ->line('Payment Reference: ' . $this->transaction->payment_ref)
            ->action('View Order', 'https://baraweb.waltanforte.com/orders/' . $this->order->id)
            ->line('Thank you for shopping with Bara!');
    }
}
