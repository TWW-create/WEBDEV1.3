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
                'subcategory' => $productType->subcategory ? [
                    'id' => $productType->subcategory->id,
                    'name' => $productType->subcategory->name,
                    'category' => $productType->subcategory->category ? [
                        'id' => $productType->subcategory->category->id,
                        'name' => $productType->subcategory->category->name,
                    ] : null,
                ] : null,
                'products' => $productType->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'creator' => $product->creator,
                        'price' => $product->price,
                        'featured_image' => $product->featured_image,
                        'status' => $product->status,
                    ];
                }),
            ];
        });

        return response()->json([
            'message' => 'Product types retrieved successfully',
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
        return response()->json($productType->load('subcategory.category'), 201);
    }

    public function show($id)
    {
        $productType = ProductType::with(['subcategory.category', 'products'])->find($id);

        if (!$productType) {
            return response()->json(['message' => 'Product type not found'], 404);
        }

        return response()->json([
            'id' => $productType->id,
            'name' => $productType->name,
            'subcategory' => $productType->subcategory ? [
                'id' => $productType->subcategory->id,
                'name' => $productType->subcategory->name,
                'category' => $productType->subcategory->category ? [
                    'id' => $productType->subcategory->category->id,
                    'name' => $productType->subcategory->category->name,
                ] : null,
            ] : null,
            'products' => $productType->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'creator' => $product->creator,
                    'description' => $product->description,
                    'price' => $product->price,
                    'qty' => $product->qty,
                    'featured_image' => $product->featured_image,
                    'status' => $product->status,
                    'sizes' => $product->sizes,
                    'colors' => $product->colors,
                ];
            }),
        ]);
    }

    public function update(Request $request, $id)
    {
        $productType = ProductType::find($id);

        if (!$productType) {
            return response()->json(['message' => 'Product type not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'sub_category_id' => 'required|exists:sub_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $productType->update($validator->validated());
        return response()->json($productType->load('subcategory.category'));
    }

    public function destroy($id)
    {
        $productType = ProductType::find($id);

        if (!$productType) {
            return response()->json(['message' => 'Product type not found'], 404);
        }

        $productType->delete();
        return response()->json(['message' => 'Product type deleted successfully'], 200);
    }
}
