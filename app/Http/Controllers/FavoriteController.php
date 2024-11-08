<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @OA\Get(
     *     path="/api/favorites",
     *     tags={"Favorites"},
     *     summary="Get user favorites",
     *     security={{"sanctum": {}}},
     *     @OA\Response(response=200, description="Success")
     * )
     */
    public function index()
    {
        $favorites = Auth::user()->favorites()->with('product')->get();
        return response()->json([
            'status' => 'success',
            'data' => $favorites
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/favorites",
     *     tags={"Favorites"},
     *     summary="Add to favorites",
     *     security={{"sanctum": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_id"},
     *             @OA\Property(property="product_id", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Added to favorites")
     * )
     */
    public function store(Request $request)
    {
        $request->validate(['product_id' => 'required|exists:products,id']);

        $favorite = Favorite::firstOrCreate([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Added to favorites',
            'data' => $favorite
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/favorites/{id}",
     *     tags={"Favorites"},
     *     summary="Remove from favorites",
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Removed from favorites")
     * )
     */
    public function destroy($id)
    {
        $favorite = Favorite::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->firstOrFail();
            
        $favorite->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Removed from favorites'
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/favorites/check/{productId}",
     *     tags={"Favorites"},
     *     summary="Check if product is in favorites",
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(name="productId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Check result")
     * )
     */
    public function check($productId)
    {
        $exists = Favorite::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->exists();

        return response()->json([
            'status' => 'success',
            'is_favorite' => $exists
        ]);
    }
}
