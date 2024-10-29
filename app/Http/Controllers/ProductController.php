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

        $products = $query->paginate(15);
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'creator' => 'required|string|max:255',
            'description' => 'nullable|string',
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

    public function show($id)
    {
        $product = Product::with(['category', 'subCategory', 'productType', 'tags', 'images'])->findOrFail($id);
        return response()->json($product);
    }


    public function update(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            try {
                $product = Product::findOrFail($id);
                
                \Log::info('Update request received', [
                    'request' => $request->all(),
                    'files' => $request->allFiles()
                ]);
    
                // Handle image updates first
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
    
                // Handle other field updates
                $updateData = $request->except(['featured_image', 'images']);
                if (!empty($updateData)) {
                    $product->update($updateData);
                }
    
                \Log::info('Update successful', ['product' => $product->toArray()]);
    
                return response()->json([
                    'message' => 'Product updated successfully',
                    'product' => $product->load(['category', 'subCategory', 'productType', 'tags', 'images']),
                ]);
    
            } catch (\Exception $e) {
                \Log::error('Update failed', [
                    'error' => $e->getMessage(),
                    'request' => $request->all()
                ]);
                throw $e;
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
}
