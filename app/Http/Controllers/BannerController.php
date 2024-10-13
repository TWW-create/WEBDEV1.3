<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Validator;

class BannerController extends Controller
{
    private const BANNER_NOT_FOUND_ERROR = 'Banner not found';

    public function index()
    {
        $banners = Banner::all();

        return response()->json([
            'message' => 'All banners retrieved',
            'data' => $banners,
            'count' => count($banners),
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:40960',
            'location' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = $request->file('image')->store('banners', 'public');

        $banner = Banner::create([
            'title' => $request->title,
            'content' => $request->content,
            'image_path' => $imagePath,
            'location' => $request->location,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json($banner, 201);
    }

    public function show($id)
    {
        try {
            return Banner::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => self::BANNER_NOT_FOUND_ERROR], 404);
        }
    }

    public function update(Request $request, $id)
    { 
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string|max:1000',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:40960',
            'location' => 'sometimes|string|max:255',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'is_active' => 'sometimes|boolean',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $banner = Banner::findOrFail($id);
    
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($banner->image_path);
            $imagePath = $request->file('image')->store('banners', 'public');
            $banner->image_path = $imagePath;
        }
    
        $banner->fill($request->except('image'));
        $banner->save(); 
        return response()->json(['message' => 'Banner updated successfully', 'data' => $banner], 200);
    }    

    public function destroy($id)
    {
        $banner = Banner::find($id);
    
        if (!$banner) {
            return response()->json(['message' => self::BANNER_NOT_FOUND_ERROR], 404);
        }
    
        Storage::disk('public')->delete($banner->image_path);
        $banner->delete();
    
        return response()->json(['message' => 'Banner successfully deleted'], 200);
    }
    
}
