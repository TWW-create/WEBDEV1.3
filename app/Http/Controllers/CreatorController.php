<?php

namespace App\Http\Controllers;

use App\Models\Creator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CreatorController extends Controller
{
    public function index()
    {
        $creators = Creator::withCount(['products', 'blogs'])->get();
        return response()->json(['data' => $creators]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:creators',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $creator = new Creator($request->only(['name', 'description']));

        if ($request->hasFile('image')) {
            $creator->image = $request->file('image')->store('creators', 'public');
        }

        $creator->save();

        return response()->json([
            'message' => 'Creator created successfully',
            'data' => $creator
        ], 201);
    }

    public function show($identifier)
    {
        $creator = Creator::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();

        $products = $creator->products()->with(['variants.images'])->get();
        $blogs = $creator->blogs()->with(['media'])->get();

        return response()->json([
            'creator' => $creator,
            'products' => $products,
            'blogs' => $blogs
        ]);
    }

    public function update(Request $request, $identifier)
    {
        $creator = Creator::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:creators,name,' . $creator->id,
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $creator->fill($request->only(['name', 'description']));

        if ($request->hasFile('image')) {
            if ($creator->image) {
                Storage::disk('public')->delete($creator->image);
            }
            $creator->image = $request->file('image')->store('creators', 'public');
        }

        $creator->save();

        return response()->json([
            'message' => 'Creator updated successfully',
            'data' => $creator
        ]);
    }

    public function destroy($identifier)
    {
        $creator = Creator::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();

        if ($creator->products()->exists()) {
            return response()->json([
                'message' => 'Cannot delete creator with associated products'
            ], 422);
        }

        if ($creator->image) {
            Storage::disk('public')->delete($creator->image);
        }

        $creator->delete();

        return response()->json([
            'message' => 'Creator deleted successfully'
        ]);
    }
}
