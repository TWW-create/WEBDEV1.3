<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\VariantImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Blog;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with([
            'category', 
            'subCategory', 
            'productType', 
            'tags', 
            'variants.images',
            'creator'
        ]);
    
        if ($request->name) {
            $query->where('name', 'like', "%{$request->name}%");
        }
        if ($request->creator) {
            $query->whereHas('creator', function($q) use ($request) {
                $q->where('id', $request->creator)
                  ->orWhere('slug', $request->creator);
            });
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
        if ($request->product_type) {
            $productType = urldecode($request->product_type);
            
            if ($productType === 'new in' || $productType === 'new_in') {
                $query->where('created_at', '>=', now()->subDays(30));
            } elseif ($productType === 'view all' || $productType === 'view_all') {
                // Show all products
            } else {
                $query->whereHas('productType', function($q) use ($productType) {
                    $q->where('name', 'like', "%{$productType}%");
                });
            }
        }
               
        if ($request->product_type_id) {
            $query->where('product_type_id', $request->product_type_id);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->color) {
            $query->whereHas('variants', function($q) use ($request) {
                $q->where('color', $request->color);
            });
        }
        if ($request->size) {
            $query->whereHas('variants', function($q) use ($request) {
                $q->whereJsonContains('sizes', $request->size);
            });
        }
    
        if ($request->sort_by) {
            switch ($request->sort_by) {
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'price_high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'price_low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'best_seller':
                    $query->orderBy('sales_count', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }
    
        $products = $query->paginate(15);
        return response()->json($products);
    }
    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'creator_id' => 'required|exists:creators,id',
            'description' => 'nullable|string',
            'composition' => 'nullable|string',
            'shipping_details' => 'nullable|array',
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
            'variants' => 'required|array',
            'variants.*.color' => 'required|string',
            'variants.*.sizes' => 'required|array',
            'variants.*.sizes.*' => 'string',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.images' => 'required|array',
            'variants.*.images.*' => 'image|max:2048',
            'status' => 'string|in:available,out_of_stock,discontinued',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        return DB::transaction(function () use ($request) {
            try {
                $productData = $request->only([
                    'name', 'creator_id', 'description', 'composition',
                    'shipping_details', 'price', 'category_id',
                    'sub_category_id', 'product_type_id', 'status'
                ]);
    
                $product = Product::create($productData);
    
                if ($request->hasFile('featured_image')) {
                    $product->featured_image = $request->file('featured_image')
                        ->store("products/{$product->id}", 'public');
                    $product->save();
                }
    
                foreach ($request->variants as $variantData) {
                    $variant = $product->variants()->create([
                        'color' => $variantData['color'],
                        'sizes' => $variantData['sizes'],
                        'stock' => $variantData['stock'],
                        'sku' => Str::uuid()
                    ]);
    
                    foreach ($variantData['images'] as $index => $image) {
                        $path = $image->store("products/{$product->id}/variants/{$variant->id}", 'public');
                        $variant->images()->create([
                            'image_path' => $path,
                            'sort_order' => $index
                        ]);
                    }
                }
    
                if ($request->has('tags')) {
                    $product->tags()->sync($request->tags);
                }
    
                $product->load(['category', 'subCategory', 'productType', 'tags', 'variants.images', 'creator']);
                $productData = $product->toArray();
                $productData['creator'] = array_merge(
                    $product->creator->toArray(),
                    [
                        'filter_links' => [
                            'products' => "/api/products?creator=" . $product->creator->slug,
                            'blogs' => Blog::where('title', $product->creator->name)->first()?->id
                        ]
                    ]
                );
    
                return response()->json([
                    'message' => 'Product created successfully',
                    'product' => $productData
                ], 201);
    
            } catch (\Exception $e) {
                Log::error('Product creation failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                throw $e;
            }
        });
    }
    

    public function show($identifier)
    {
        $product = Product::with([
            'category',
            'subCategory',
            'productType',
            'tags',
            'variants.images',
            'creator'
        ])
        ->where('id', $identifier)
        ->orWhere('slug', $identifier)
        ->firstOrFail();
        
        $product->incrementViewCount();
        
        $relatedProducts = Product::where('sub_category_id', $product->sub_category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();
    
        $productData = $product->toArray();
        $productData['creator'] = array_merge(
            $product->creator->toArray(),
            [
                'filter_links' => [
                    'products' => "/api/products?creator=" . $product->creator->slug,
                    'blogs' => Blog::where('title', $product->creator->name)->first()?->id
                ]
            ]
        );        
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'product' => $productData,
                'related_products' => $relatedProducts
            ]
        ]);
    }
    

    public function update(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            try {
                $validator = Validator::make($request->all(), [
                    'name' => 'sometimes|string|max:255',
                    'creator_id' => 'sometimes|exists:creators,id',
                    'description' => 'sometimes|nullable|string',
                    'price' => 'sometimes|numeric|min:0',
                    'category_id' => 'sometimes|exists:categories,id',
                    'sub_category_id' => 'sometimes|exists:sub_categories,id',
                    'product_type_id' => 'sometimes|exists:product_types,id',
                    'featured_image' => 'sometimes|nullable|image|max:2048',
                    'variants' => 'sometimes|array',
                    'variants.*.id' => 'sometimes|exists:product_variants,id',
                    'variants.*.color' => 'required_with:variants|string',
                    'variants.*.sizes' => 'required_with:variants|array',
                    'variants.*.sizes.*' => 'string',
                    'variants.*.stock' => 'required_with:variants|integer|min:0',
                    'variants.*.images' => 'sometimes|array',
                    'variants.*.images.*' => 'image|max:2048'
                ]);
    
                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }
    
                $product = Product::findOrFail($id);
    
                if ($request->has('variants')) {
                    foreach ($request->variants as $variantData) {
                        if (isset($variantData['id'])) {
                            $variant = $product->variants()->findOrFail($variantData['id']);
                            $variant->update([
                                'color' => $variantData['color'],
                                'sizes' => $variantData['sizes'],
                                'stock' => $variantData['stock']
                            ]);
                        } else {
                            $variant = $product->variants()->create([
                                'color' => $variantData['color'],
                                'sizes' => $variantData['sizes'],
                                'stock' => $variantData['stock'],
                                'sku' => Str::uuid()
                            ]);
                        }
    
                        if (isset($variantData['images'])) {
                            if (isset($variantData['id'])) {
                                foreach ($variant->images as $oldImage) {
                                    Storage::disk('public')->delete($oldImage->image_path);
                                    $oldImage->delete();
                                }
                            }
    
                            foreach ($variantData['images'] as $index => $image) {
                                $path = $image->store("products/{$product->id}/variants/{$variant->id}", 'public');
                                $variant->images()->create([
                                    'image_path' => $path,
                                    'sort_order' => $index
                                ]);
                            }
                        }
                    }
                }
    
                $updateData = $request->except(['variants', 'featured_image']);
                if (!empty($updateData)) {
                    $product->update($updateData);
                }
    
                $product->load(['category', 'subCategory', 'productType', 'tags', 'variants.images', 'creator']);
                $productData = $product->toArray();
                $productData['creator'] = array_merge(
                    $product->creator->toArray(),
                    [
                        'filter_links' => [
                            'products' => "/api/products?creator=" . $product->creator->slug,
                            'blogs' => Blog::where('title', $product->creator->name)->first()?->id
                        ]
                    ]
                );
    
                return response()->json([
                    'message' => 'Product updated successfully',
                    'product' => $productData
                ]);
    
            } catch (\Exception $e) {
                Log::error('Update failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                throw $e;
            }
        });
    }
    
    
    public function deleteImage($id)
    {
        return DB::transaction(function () use ($id) {
            try {
                $image = ProductVariant::findOrFail($id)->images()->firstOrFail();
                
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
                
                Log::info('Product variant image deleted', ['image_id' => $id]);
    
                return response()->json([
                    'message' => 'Product image deleted successfully'
                ]);
    
            } catch (\Exception $e) {
                Log::error('Failed to delete product image', [
                    'image_id' => $id,
                    'error' => $e->getMessage()
                ]);
                throw $e;
            }
        });
    }
    
    public function destroy($id)
    {
        return DB::transaction(function () use ($id) {
            try {
                $product = Product::findOrFail($id);
                
                // Delete all variant images from storage
                foreach ($product->variants as $variant) {
                    foreach ($variant->images as $image) {
                        Storage::disk('public')->delete($image->image_path);
                    }
                }
                
                // Delete featured image if exists
                if ($product->featured_image) {
                    Storage::disk('public')->delete($product->featured_image);
                }
                
                $product->delete();
                
                return response()->json(['message' => 'Product deleted successfully']);
                
            } catch (\Exception $e) {
                Log::error('Failed to delete product', [
                    'product_id' => $id,
                    'error' => $e->getMessage()
                ]);
                throw $e;
            }
        });
    }

    public function deleteVariant($id)
    {
        return DB::transaction(function () use ($id) {
            try {
                $variant = ProductVariant::findOrFail($id);
                
                foreach ($variant->images as $image) {
                    Storage::disk('public')->delete($image->image_path);
                }
                
                $variant->delete();
                
                return response()->json(['message' => 'Product variant deleted successfully']);
                
            } catch (\Exception $e) {
                Log::error('Failed to delete product variant', [
                    'variant_id' => $id,
                    'error' => $e->getMessage()
                ]);
                throw $e;
            }
        });
    }
    
    public function deleteVariantImage($id)
    {
        return DB::transaction(function () use ($id) {
            try {
                $image = VariantImage::findOrFail($id);
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
                
                return response()->json(['message' => 'Variant image deleted successfully']);
                
            } catch (\Exception $e) {
                Log::error('Failed to delete variant image', [
                    'image_id' => $id,
                    'error' => $e->getMessage()
                ]);
                throw $e;
            }
        });
    }
    

    public function getTrendingProducts()
    {
        $trendingProducts = Product::with(['category', 'subCategory', 'variants.images'])
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
                    'variants' => $product->variants->map(function ($variant) {
                        return [
                            'color' => $variant->color,
                            'sizes' => $variant->sizes,
                            'stock' => $variant->stock,
                            'images' => $variant->images
                        ];
                    }),
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

