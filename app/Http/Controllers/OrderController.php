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
use Illuminate\Notifications\Notifiable;
use App\Notifications\PaymentConfirmation;
use App\Notifications\OrderStatusUpdate;


class OrderController extends Controller
{
    // TODO: for Admin only
    public function adminAllOrders()
    {
        $orders = Order::with('orderItems', 'transactions')
            ->latest('created_at')
            ->get();
    
        return response()->json([
            'message' => 'All orders retrieved',
            'data' => $orders,
            'count' => $orders->count(),
        ], 200);
    }    
    
    public function index()
    {
        $userId = Auth::id();
    
        $orders = Order::with([
            'orderItems.product:id,name', 
            'orderItems.variant:id,color', 
            'orderItems.variant.images',
            'transactions'
        ])
            ->where('user_id', $userId)
            ->latest('created_at') 
            ->get()
            ->map(function ($order) {
                $order->orderItems->transform(function ($item) {
                    $item['product_name'] = $item->product->name;
                    $item['color'] = $item->variant->color;
                    $item['variant_images'] = $item->variant->images;
                    unset($item->product);
                    unset($item->variant);
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
                    'shipping_details' => array_merge(
                        json_decode($order->shipping_address, true),
                        [
                            'phone_no' => $order->phone,
                            'email' => $order->email
                        ]
                    ),
                    'items' => $order->orderItems->map(function($item) {
                        return [
                            'product_name' => $item->product->name,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'total' => $item->total_amount,
                            'color' => $item->variant->color,
                            'variant_image' => $item->variant->images,
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
            $order = Order::with('orderItems.variant')->findOrFail($request->order_id);
            
            // Track products that need stock check
            $productsToCheck = [];
            
            // Reduce stock for each ordered item
            foreach($order->orderItems as $item) {
                $variant = $item->variant;
                $variant->stock -= $item->quantity;
                $variant->save();
                
                $productsToCheck[$item->product_id] = true;
            }
            
            // Check and update product status if all variants are out of stock
            foreach(array_keys($productsToCheck) as $productId) {
                $product = Product::find($productId);
                $hasStock = $product->variants()->where('stock', '>', 0)->exists();
                
                if (!$hasStock) {
                    $product->update(['status' => 'out_of_stock']);
                }
            }
    
            $order->update([
                'payment_status' => 'paid',
                'order_status' => 'processing',
                'paystack_reference' => $request->payment_reference
            ]);
    
            Transaction::create([
                'order_id' => $order->id,
                'user_id' => $order->user_id,
                'payment_ref' => $request->payment_reference,
                'payment_method' => 'paystack',
                'amount' => $order->total,
                'status' => 'success'
            ]);
    
             // Send payment confirmation
            $order->user->notify(new PaymentConfirmation($order, $transaction));

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

    public function updateOrderStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'order_status' => 'required|string|in:pending,processing,in_route,delivered,cancelled'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $order = Order::findOrFail($id);
        $order->update([
            'status' => $request->order_status
        ]);
    
        $order->user->notify(new OrderStatusUpdate($order, $request->order_status));

        return response()->json([
            'message' => 'Order status updated successfully',
            'data' => $order
        ], 200);
    }
    
    
}
