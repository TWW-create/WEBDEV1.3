<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'subCategory', 'productType', 'tags', 'images'])->paginate(15);
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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
        $product = Product::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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
                    return $query->where('sub_category_id', $request->subcategory_id);
                }),
            ],
            'featured_image' => 'nullable|image|max:2048',
            'images.*' => 'nullable|image|max:2048',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product->update($validator->validated());

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
            'message' => 'Product updated successfully',
            'product' => $product->load(['category', 'subCategory', 'productType', 'tags', 'images']),
        ]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
