<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'subCategory', 'productType', 'tags', 'images']);

        if ($request->name) {
            $query->where('name', 'like', "%{$request->name}%");
        }
        if ($request->creator) {
            $query->where('creator', 'like', "%{$request->creator}%");
        }
        if ($request->category_slug) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category_slug);
            });
        }
        
        if ($request->subcategory_slug) {
            $query->whereHas('subCategory', function($q) use ($request) {
                $q->where('slug', $request->subcategory_slug);
            });
        }
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->sub_category_id) {
            $query->where('sub_category_id', $request->sub_category_id);
        }
        // New product type name filter
        if ($request->product_type) {
            $query->whereHas('productType', function($q) use ($request) {
                $q->where('name', 'like', "%{$request->product_type}%");
            });
        }        
        if ($request->product_type_id) {
            $query->where('product_type_id', $request->product_type_id);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->size) {
            $query->whereJsonContains('sizes', $request->size);
        }
        if ($request->color) {
            $query->whereJsonContains('colors', $request->color);
        }

        $sortBy = $request->get('sort_by', 'created_at');
        $direction = $request->get('direction', 'desc');
        
        $products = $query->orderBy($sortBy, $direction)->paginate(15); 
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'creator' => 'required|string|max:255',
            'description' => 'nullable|string',
            'composition' => 'nullable|string',
            'shipping_details' => 'nullable|array',
            'sizes' => 'required|array',
            'sizes.*' => 'string',
            'colors' => 'required|array',
            'colors.*' => 'string',
            'qty' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => [
                'required',
                'exists:sub_categories,id',
                Rule::exists('sub_categories', 'id')->where(function ($query) use ($request) {
                    return $query->where('category_id', $request->category_id);
                }),
            ],
            'product_type_id' => [
                'required',
                'exists:product_types,id',
                Rule::exists('product_types', 'id')->where(function ($query) use ($request) {
                    return $query->where('sub_category_id', $request->sub_category_id);
                }),
            ],
            'featured_image' => 'nullable|image|max:2048',
            'images.*' => 'nullable|image|max:2048',
            'status' => 'string|in:available,out_of_stock,discontinued',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::create($validator->validated());

        if ($request->hasFile('featured_image')) {
            $product->featured_image = $request->file('featured_image')->store('products', 'public');
            $product->save();
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $image->store('products', 'public'),
                ]);
            }
        }

        if ($request->has('tags')) {
            $product->tags()->sync($request->tags);
        }

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product->load(['category', 'subCategory', 'productType', 'tags', 'images']),
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/products/{slug}",
     *     tags={"Products"},
     *     summary="Get product details by slug",
     *     @OA\Parameter(name="slug", in="path", required=true, @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Success"),
     *     @OA\Response(response=404, description="Product not found")
     * )
     */
    public function show($identifier)
    {
        $product = Product::with([
            'category',
            'subCategory',
            'productType',
            'tags',
            'images'
        ])
        ->where('id', $identifier)
        ->orWhere('slug', $identifier)
        ->firstOrFail();
        
        $product->incrementViewCount();
        
        $relatedProducts = Product::where('sub_category_id', $product->sub_category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'product' => $product,
                'related_products' => $relatedProducts
            ]
        ]);
    }
    



    public function update(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            try {
                // Validate the request first
                $validator = Validator::make($request->all(), [
                    'name' => 'sometimes|string|max:255',
                    'creator' => 'sometimes|string|max:255',
                    'description' => 'sometimes|nullable|string',
                    'sizes' => 'sometimes|array',
                    'sizes.*' => 'string',
                    'colors' => 'sometimes|array',
                    'colors.*' => 'string',
                    'qty' => 'sometimes|integer|min:0',
                    'price' => 'sometimes|numeric|min:0',
                    'category_id' => 'sometimes|exists:categories,id',
                    'sub_category_id' => [
                        'sometimes',
                        'exists:sub_categories,id',
                        Rule::exists('sub_categories', 'id')->where(function ($query) use ($request) {
                            return $query->where('category_id', $request->category_id);
                        }),
                    ],
                    'product_type_id' => [
                        'sometimes',
                        'exists:product_types,id',
                        Rule::exists('product_types', 'id')->where(function ($query) use ($request) {
                            return $query->where('sub_category_id', $request->sub_category_id);
                        }),
                    ],
                    'featured_image' => 'sometimes|nullable|image|max:2048',
                    'images.*' => 'sometimes|nullable|image|max:2048',
                    'status' => 'sometimes|string|in:available,out_of_stock,discontinued',
                ]);
    
                if ($validator->fails()) {
                    return response()->json([
                        'message' => 'Validation failed',
                        'errors' => $validator->errors()
                    ], 422);
                }
    
                $product = Product::findOrFail($id);
                
                \Log::info('Update request received', [
                    'request' => $request->all(),
                    'files' => $request->allFiles()
                ]);
    
                if ($request->hasFile('featured_image')) {
                    // Delete old featured image if exists
                    if ($product->featured_image) {
                        Storage::disk('public')->delete($product->featured_image);
                    }
                    $product->featured_image = $request->file('featured_image')->store('products', 'public');
                    $product->save();
                }
    
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        ProductImage::create([
                            'product_id' => $product->id,
                            'image_path' => $image->store('products', 'public'),
                        ]);
                    }
                }
    
                $updateData = $request->except(['featured_image', 'images']);
                if (!empty($updateData)) {
                    $product->update($updateData);
                }
    
                return response()->json([
                    'message' => 'Product updated successfully',
                    'product' => $product->load(['category', 'subCategory', 'productType', 'tags', 'images']),
                ]);
    
            } catch (\Exception $e) {
                \Log::error('Update failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'request' => $request->all()
                ]);
    
                return response()->json([
                    'message' => 'Failed to update product',
                    'error' => $e->getMessage(),
                    'debug_info' => config('app.debug') ? [
                        'trace' => $e->getTraceAsString(),
                        'request' => $request->all()
                    ] : null
                ], 400);
            }
        });
    }
    
    
    public function deleteImage($id)
    {
        return DB::transaction(function () use ($id) {
            try {
                $image = ProductImage::findOrFail($id);
                
                // Delete file from storage
                Storage::disk('public')->delete($image->image_path);
                
                // Delete record from database
                $image->delete();
                
                \Log::info('Product image deleted', ['image_id' => $id]);
    
                return response()->json([
                    'message' => 'Product image deleted successfully'
                ]);
    
            } catch (\Exception $e) {
                \Log::error('Failed to delete product image', [
                    'image_id' => $id,
                    'error' => $e->getMessage()
                ]);
                throw $e;
            }
        });
    }
    
    
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function getTrendingProducts()
    {
        $trendingProducts = Product::with(['category', 'subCategory'])
            ->orderBy('view_count', 'desc')
            ->take(6)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'featured_image' => $product->featured_image,
                    'view_count' => $product->view_count,
                    'category' => [
                        'name' => $product->category->name,
                        'slug' => $product->category->slug
                    ],
                    'sub_category' => [
                        'name' => $product->subCategory->name,
                        'slug' => $product->subCategory->slug
                    ]
                ];
            });
    
        return response()->json([
            'status' => 'success',
            'data' => $trendingProducts
        ]);
    }
    
}
