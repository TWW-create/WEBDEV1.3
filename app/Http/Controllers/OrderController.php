<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
use App\Models\Transaction;
use App\Models\ProductVariant;
use Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Validator;


class OrderController extends Controller
{
    // TODO: for Admin only
    public function adminAllOrders()
    {
        $orders = Order::with('orderItems', 'transactions')->get();

        return response()->json([
            'message' => 'All orders retrieved',
            'data' => $orders,
            'count' => $orders->count(),
        ], 200);
    }
    
    public function index()
    {
        // Get the authenticated user's ID
        $userId = Auth::id();

    // Retrieve orders for the current user, including related orderItems and transactions
    $orders = Order::with(['orderItems.product', 'orderItems.variant', 'transactions'])
        ->where('user_id', $userId)
        ->get()
        ->map(function ($order) {
            $order->orderItems->transform(function ($item) {
                $item['product_name'] = $item->product->name;
                $item['color'] = $item->variant->color;
                return $item;
            });
            return $order;
        });

        return response()->json([
            'message' => 'Orders retrieved successfully',
            'data' => $orders,
            'count' => $orders->count(),
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subtotal' => 'required|string',
            'shipping_cost' => 'required|string',
            'total' => 'required|string',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the authenticated user's ID
        $userId = Auth::id();

        // Add the user ID to the validated data
        $validatedData = $validator->validated();
        $validatedData['user_id'] = $userId;

        $order = Order::create($validatedData);

        return response()->json($order, 201);
    }

    public function show($id)
    {
        try {
            $order = Order::with('orderItems.product', 'orderItems.variant', 'transactions')->findOrFail($id);
            
            return response()->json([
                'message' => 'Order retrieved successfully',
                'data' => [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'order_date' => $order->created_at->format('Y-m-d H:i:s'),
                    'subtotal' => $order->subtotal,
                    'shipping_cost' => $order->shipping_cost,
                    'total_amount' => $order->total,
                    'shipping_details' => json_decode($order->shipping_address, true),
                    'items' => $order->orderItems->map(function($item) {
                        return [
                            'product_name' => $item->product->name,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'total' => $item->total_amount,
                            'color' => $item->variant->color,
                            'size' => $item->size
                        ];
                    }),
                    'payment_status' => $order->payment_status,
                    'order_status' => $order->status
                ]
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }    

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'subtotal' => 'required|string',
            'shipping_cost' => 'required|string',
            'total' => 'required|string',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::findOrFail($id);
        $order->update($request->all());

        return response()->json($order, 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);

        if (! $order || $order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(null, 204);
    }

    public function createOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.size' => 'required|string',
            'shipping_address' => 'required|array',
            'shipping_address.first_name' => 'required|string',
            'shipping_address.last_name' => 'required|string',
            'shipping_address.street' => 'required|string',
            'shipping_address.optional' => 'nullable|string',
            'shipping_address.city' => 'required|string',
            'shipping_address.state' => 'required|string',
            'shipping_address.country' => 'required|string',
            'shipping_address.postal_code' => 'required|string',
            'shipping_cost' => 'required|numeric|min:0',
            'email' => 'required|email',
            'phone' => 'required|string'
        ]);
    
        return DB::transaction(function() use ($request) {
            $subtotal = 0;
            foreach($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                $subtotal += $product->price * $item['quantity'];
            }
    
            $total = $subtotal + $request->shipping_cost;
    
            $order = Order::create([
                'user_id' => Auth::check() ? Auth::id() : null,
                'subtotal' => $subtotal,
                'shipping_cost' => $request->shipping_cost,
                'total' => $total,
                'shipping_address' => json_encode($request->shipping_address),
                'email' => $request->email,
                'phone' => $request->phone,
                'status' => 'pending'
            ]);
    
            foreach($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'variant_id' => $item['variant_id'],
                    'quantity' => $item['quantity'],
                    'size' => $item['size'],
                    'price' => Product::find($item['product_id'])->price,
                    'total_amount' => Product::find($item['product_id'])->price * $item['quantity']
                ]);
            }
    
            $order->load('orderItems.product', 'orderItems.variant');
    
            return response()->json([
                'message' => 'Order created successfully',
                'data' => [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'order_date' => $order->created_at->format('Y-m-d H:i:s'),
                    'subtotal' => $subtotal,
                    'shipping_cost' => $request->shipping_cost,
                    'total_amount' => $total,
                    'shipping_details' => [
                        'first_name' => $request->shipping_address['first_name'],
                        'last_name' => $request->shipping_address['last_name'],
                        'street' => $request->shipping_address['street'],
                        'optional_address' => $request->shipping_address['optional'] ?? '',
                        'city' => $request->shipping_address['city'],
                        'state' => $request->shipping_address['state'],
                        'country' => $request->shipping_address['country'],
                        'postal_code' => $request->shipping_address['postal_code'],
                        'phone' => $request->phone
                    ],
                    'order_items' => $order->orderItems->map(function($item) {
                        return [
                            'product_name' => $item->product->name,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'total_amount' => $item->total_amount,
                            'color' => $item->variant->color,
                            'size' => $item->size
                        ];
                    }),
                    'payment_status' => $order->payment_status,
                    'order_status' => $order->status
                ]
            ]);
        });
    }    
        
    
    public function verifyPayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|uuid|exists:orders,id',
            'payment_reference' => 'required|string'
        ]);
    
        return DB::transaction(function() use ($request) {
            $order = Order::findOrFail($request->order_id);
            $order->update([
                'payment_status' => 'paid',
                'order_status' => 'processing',
                'paystack_reference' => $request->payment_reference
            ]);
    
            Transaction::create([
                'order_id' => $order->id,
                'user_id' => $order->user_id,  // Get user_id from the order
                'payment_ref' => $request->payment_reference,
                'payment_method' => 'paystack',
                'amount' => $order->total,
                'status' => 'success'
            ]);
    
            return response()->json([
                'message' => 'Payment verified successfully',
                'order' => $order->load('orderItems', 'transactions')
            ]);
        });
    }            
    
    public function paystackCallback(Request $request)
    {
        $paystack = new Paystack(config('services.paystack.secret_key'));
        $response = $paystack->transaction->verify($request->reference);
    
        if($response['data']['status'] === 'success') {
            $order = Order::find($request->reference);
            $order->update([
                'payment_status' => 'paid',
                'order_status' => 'processing'
            ]);
    
            Transaction::create([
                'order_id' => $order->id,
                'payment_ref' => $response['data']['reference'],
                'amount' => $response['data']['amount'] / 100,
                'status' => 'success'
            ]);
        }
    
        return redirect()->to('/order-confirmation');
    }
    
}
