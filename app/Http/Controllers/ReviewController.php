<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string'
        ]);

        $review = Review::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'comment' => $request->comment
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Review added successfully',
            'data' => $review->load('user')
        ], 201);
    }

    public function index($productId)
    {
        $reviews = Review::where('product_id', $productId)
            ->with('user:id,first_name,last_name')
            ->latest()
            ->paginate(10);
    
        return response()->json([
            'status' => 'success',
            'data' => $reviews
        ]);
    }
    
    public function userReviews()
    {
        $reviews = Review::where('user_id', auth()->id())
            ->with(['product:id,name,slug'])
            ->latest()
            ->paginate(10);
    
        return response()->json([
            'status' => 'success',
            'data' => $reviews
        ]);
    }

    public function getProductReviews($identifier)
    {
        $product = Product::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();
    
        $reviews = Review::where('product_id', $product->id)
            ->with('user:id,first_name,last_name')
            ->latest()
            ->paginate(10);
    
        return response()->json([
            'status' => 'success',
            'data' => $reviews
        ]);
    }
    
    public function destroy($id)
    {
        $review = Review::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
    
        $review->delete();
    
        return response()->json([
            'status' => 'success',
            'message' => 'Review deleted successfully'
        ]);
    }
    
    
}
