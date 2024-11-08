<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
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
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', 'completed')->sum('total');
        
        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();
    
        $topSellingProducts = Product::withCount('orders')
            ->orderBy('orders_count', 'desc')
            ->take(5)
            ->get();
    
        $monthlySales = Order::where('status', 'completed')
            ->whereYear('created_at', now()->year)
            ->selectRaw('MONTH(created_at) as month, sum(total) as revenue')
            ->groupBy('month')
            ->get();
    
        $stockAlerts = Product::where('qty', '<=', 10)->get();
    
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
                'stock_alerts' => $stockAlerts
            ]
        ]);
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
