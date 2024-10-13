<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menu = Category::with(['subCategories.productTypes'])->get()->map(function ($category) {
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
            ];
        });

        return response()->json($menu);
    }
}
