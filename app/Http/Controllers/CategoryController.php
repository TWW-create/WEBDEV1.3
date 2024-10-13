<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Validator;
use App\Models\ProductType;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with(['subCategories.productTypes', 'products'])->get();
    
        $formattedCategories = $categories->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'sub_categories' => $category->subCategories->map(function ($subCategory) {
                    return [
                        'id' => $subCategory->id,
                        'name' => $subCategory->name,
                        'product_types' => $subCategory->productTypes->map(function ($productType) {
                            return [
                                'id' => $productType->id,
                                'name' => $productType->name,
                            ];
                        }),
                    ];
                }),
                'products_count' => $category->products->count(),
            ];
        });
    
        return response()->json([
            'message' => 'All categories retrieved with sub-categories and product types',
            'data' => $formattedCategories,
            'count' => count($formattedCategories),
        ], 200);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // check if the category name exists before
        if (Category::where('name', $request->name)->exists()) {
            return response()->json(['error' => 'Category name already exists'], 422);
        }

        $product = Category::create($validator->validated());

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return Category::with('subCategories', 'products')->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::findOrFail($id);
        $category->update($request->all());

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);

        if (! $category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(null, 204);
    }
}
