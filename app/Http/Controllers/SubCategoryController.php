<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class SubCategoryController extends Controller
{
    public function index()
    {
        $subcategories = SubCategory::with(['category', 'productTypes', 'products'])->get();
    
        $formattedSubcategories = $subcategories->map(function ($subcategory) {
            return [
                'id' => $subcategory->id,
                'name' => $subcategory->name,
                'slug' => $subcategory->slug,
                'category' => [
                    'id' => $subcategory->category->id,
                    'name' => $subcategory->category->name,
                    'slug' => $subcategory->category->slug
                ],
                'product_types' => $subcategory->productTypes->map(function ($productType) {
                    return [
                        'id' => $productType->id,
                        'name' => $productType->name,
                    ];
                }),
                'products' => $subcategory->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'price' => $product->price,
                        'featured_image' => $product->featured_image,
                    ];
                }),
            ];
        });
    
        return response()->json([
            'message' => 'All subcategories retrieved with product types and products',
            'data' => $formattedSubcategories,
            'count' => count($formattedSubcategories),
        ], 200);
    }
    


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $subCategory = SubCategory::create($validator->validated());
    
        return response()->json($subCategory, 201);
    }

    public function show($id)
    {
        try {
            $subcategory = SubCategory::with(['category', 'productTypes'])->findOrFail($id);
            return response()->json([
                'id' => $subcategory->id,
                'name' => $subcategory->name,
                'slug' => $subcategory->slug,
                'category' => [
                    'id' => $subcategory->category->id,
                    'name' => $subcategory->category->name,
                    'slug' => $subcategory->category->slug
                ],
                'product_types' => $subcategory->productTypes->map(function ($productType) {
                    return [
                        'id' => $productType->id,
                        'name' => $productType->name,
                    ];
                }),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'SubCategory not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $subCategory = SubCategory::findOrFail($id);
        $subCategory->update($request->all());

        return response()->json($subCategory, 200);
    }
    
    public function destroy($identifier)
    {
        $subCategory = SubCategory::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();

        $subCategory->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Subcategory deleted successfully'
        ], 200);
    }
    
}
