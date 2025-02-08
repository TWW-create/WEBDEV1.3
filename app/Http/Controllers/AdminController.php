<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin');
    }

    public function dashboard()
    {
        // Basic Metrics
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total');
        
        // Order Statistics
        $recentOrders = Order::with(['user', 'orderItems.product', 'orderItems.variant.images'])
            ->latest()
            ->take(10)
            ->get();

        // Product Performance
        $topSellingProducts = Product::withCount(['orders as total_orders', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->orderBy('total_orders', 'desc')
            ->take(10)
            ->get();

        // Sales Analytics
        $monthlySales = Order::where('payment_status', 'paid')
            ->whereYear('created_at', now()->year)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as order_count, SUM(total) as revenue')
            ->groupBy('month')
            ->get();

        // Inventory Management
        $lowStockProducts = Product::whereHas('variants', function($query) {
            $query->where('stock', '<=', 10);
        })->with(['variants', 'variants.images'])->get();

        // Customer Analytics
        $topCustomers = User::withCount('orders')
            ->withSum(['orders' => function($query) {
                $query->where('payment_status', 'paid');
            }], 'total')
            ->orderBy('orders_sum_total', 'desc')
            ->take(10)
            ->get();

        // Order Status Distribution
        $orderStatusDistribution = Order::selectRaw('status as order_status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        // Payment Method Analytics
        $paymentMethodStats = Transaction::selectRaw('payment_method, COUNT(*) as count, SUM(amount) as total')
            ->where('status', 'success')
            ->groupBy('payment_method')
            ->get();

        // Daily Revenue Trend
        $dailyRevenue = Order::where('payment_status', 'paid')
            ->whereBetween('created_at', [now()->subDays(30), now()])
            ->selectRaw('DATE(created_at) as date, SUM(total) as revenue')
            ->groupBy('date')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'metrics' => [
                    'total_users' => $totalUsers,
                    'total_products' => $totalProducts,
                    'total_orders' => $totalOrders,
                    'total_revenue' => $totalRevenue,
                ],
                'recent_orders' => $recentOrders,
                'top_selling_products' => $topSellingProducts,
                'monthly_sales' => $monthlySales,
                'low_stock_alerts' => $lowStockProducts,
                'top_customers' => $topCustomers,
                'order_status_distribution' => $orderStatusDistribution,
                'payment_method_stats' => $paymentMethodStats,
                'daily_revenue_trend' => $dailyRevenue
            ]
        ], 200);
    }

    public function getAllUsers()
    {
        $users = User::with(['profile'])->get();
        return response()->json([
            'status' => 'success',
            'data' => $users
        ], 200);
    }
    

    public function makeAdmin($id)
    {
        $user = User::findOrFail($id);
        $user->is_admin = true;
        $user->save();
        return response()->json(['message' => 'User is now an admin']);
    }
}
