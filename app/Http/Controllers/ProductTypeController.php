<?php

namespace App\Http\Controllers;

use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductTypeController extends Controller
{
    public function index()
    {
        $productTypes = ProductType::with(['subcategory.category', 'products'])->get();
        
        $formattedProductTypes = $productTypes->map(function ($productType) {
            return [
                'id' => $productType->id,
                'name' => $productType->name,
                'slug' => $productType->slug,
                'subcategory' => $productType->subcategory ? [
                    'id' => $productType->subcategory->id,
                    'name' => $productType->subcategory->name,
                    'slug' => $productType->subcategory->slug,
                    'category' => $productType->subcategory->category ? [
                        'id' => $productType->subcategory->category->id,
                        'name' => $productType->subcategory->category->name,
                        'slug' => $productType->subcategory->category->slug
                    ] : null,
                ] : null,
                'products' => $productType->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'creator' => $product->creator,
                        'price' => $product->price,
                        'featured_image' => $product->featured_image,
                        'status' => $product->status,
                    ];
                }),
            ];
        });
    
        return response()->json([
            'status' => 'success',
            'data' => $formattedProductTypes,
            'count' => $formattedProductTypes->count()
        ]);
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'sub_category_id' => 'required|exists:sub_categories,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $productType = ProductType::create($validator->validated());
        return response()->json([
            'status' => 'success',
            'data' => $productType->load('subcategory.category')
        ], 201);
    }
    
    public function show($identifier)
    {
        $productType = ProductType::with(['subcategory.category'])
            ->where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();
    
        $products = $productType->products()
            ->with(['variants.images'])
            ->when($productType->name === 'new in', function($query) {
                return $query->orderBy('created_at', 'desc');
            })
            ->get();
    
        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $productType->id,
                'name' => $productType->name,
                'slug' => $productType->slug,
                'subcategory' => $productType->subcategory ? [
                    'id' => $productType->subcategory->id,
                    'name' => $productType->subcategory->name,
                    'slug' => $productType->subcategory->slug,
                    'category' => $productType->subcategory->category ? [
                        'id' => $productType->subcategory->category->id,
                        'name' => $productType->subcategory->category->name,
                        'slug' => $productType->subcategory->category->slug
                    ] : null
                ] : null,
                'products' => $products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'creator' => $product->creator,
                        'description' => $product->description,
                        'price' => $product->price,
                        'featured_image' => $product->featured_image,
                        'status' => $product->status,
                        'variants' => $product->variants->map(function ($variant) {
                            return [
                                'color' => $variant->color,
                                'sizes' => $variant->sizes,
                                'stock' => $variant->stock,
                                'images' => $variant->images
                            ];
                        })
                    ];
                })
            ]
        ]);
    }
    
    
    public function update(Request $request, $identifier)
    {
        $productType = ProductType::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();
    
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'sub_category_id' => 'required|exists:sub_categories,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $productType->update($validator->validated());
        return response()->json([
            'status' => 'success',
            'data' => $productType->load('subcategory.category')
        ]);
    }
    
    public function destroy($identifier)
    {
        $productType = ProductType::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();
    
        $productType->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Product type deleted successfully'
        ]);
    }
    
}
