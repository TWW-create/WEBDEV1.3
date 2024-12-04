<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Transaction;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        // Create Order first
        $order = Order::create([
            'user_id' => auth()->id(),
            'subtotal' => $request->subtotal,
            'shipping_cost' => $request->shipping_cost,
            'total' => $request->total,
            'status' => 'pending',
            'payment_status' => 'pending'
        ]);

        // Create OrderItems
        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'order_qty' => $item['quantity'],
                'order_date' => now(),
                'total_amount' => $item['price'] * $item['quantity']
            ]);
        }

        $lineItems = collect($request->items)->map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item['name'],
                    ],
                    'unit_amount' => $item['price'] * 100,
                ],
                'quantity' => $item['quantity'],
            ];
        })->toArray();

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => config('app.frontend_url') . '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => config('app.frontend_url') . '/checkout/cancel',
            'metadata' => [
                'order_id' => $order->id
            ]
        ]);

        $order->update(['stripe_session_id' => $session->id]);

        return response()->json(['sessionId' => $session->id]);
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );

            if ($event->type === 'checkout.session.completed') {
                $session = $event->data->object;
                
                $order = Order::where('stripe_session_id', $session->id)->first();
                if ($order) {
                    $order->update([
                        'status' => 'processing',
                        'payment_status' => 'paid'
                    ]);

                    // Create transaction record
                    Transaction::create([
                        'order_id' => $order->id,
                        'payment_ref' => $session->payment_intent,
                        'payment_method' => 'stripe',
                        'amount' => $order->total,
                        'status' => 'completed'
                    ]);
                }
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function createPaymentIntent(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    
        try {
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $request->amount * 100, // Convert to cents
                'currency' => 'usd',
                'metadata' => [
                    'order_id' => $request->order_id
                ]
            ]);
    
            return response()->json([
                'clientSecret' => $paymentIntent->client_secret
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
}
