<?php

namespace App\Http\Controllers;

use App\Models\ProductType;
use Illuminate\Http\Request;
use Validator;

class ProductTypeController extends Controller
{
    public function index()
    {
        $productTypes = ProductType::with('subcategory')->get();
        return response()->json($productTypes);
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

        return response()->json($productType, 201);
    }

    public function show($id)
    {
        $productType = ProductType::with('subcategory')->findOrFail($id);
        return response()->json($productType);
    }

    public function update(Request $request, $id)
    {
        $productType = ProductType::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'sub_category_id' => 'required|exists:sub_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $productType->update($validator->validated());

        return response()->json($productType);
    }

    public function destroy($id)
    {
        $productType = ProductType::findOrFail($id);
        $productType->delete();

        return response()->json(null, 204);
    }
}
