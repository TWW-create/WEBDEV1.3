<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    private const BANNER_NOT_FOUND_ERROR = 'Banner not found';

    public function index()
    {
        try {
            $banners = Banner::all()->map(function ($banner) {
                $banner->image_url = url(Storage::url($banner->image_path));
                return $banner;
            });
            return response()->json([
                'message' => 'All banners retrieved successfully',
                'data' => $banners,
                'count' => $banners->count(),
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving banners: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while retrieving banners'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'string|max:1000',
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

            $banner->image_url = url(Storage::url($banner->image_path));

            return response()->json([
                'message' => 'Banner created successfully',
                'data' => $banner
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating banner: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while creating the banner'], 500);
        }
    }

    public function show($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            $banner->image_url = url(Storage::url($banner->image_path));
            return response()->json([
                'message' => 'Banner retrieved successfully',
                'data' => $banner
            ], 200);
        } catch (ModelNotFoundException $e) {
            Log::error('Banner not found: ' . $e->getMessage());
            return response()->json(['message' => self::BANNER_NOT_FOUND_ERROR], 404);
        } catch (\Exception $e) {
            Log::error('Error retrieving banner: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while retrieving the banner'], 500);
        }
    }

    public function update(Request $request, $id)
    { 
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|string|max:255',
                'content' => 'string|max:1000',
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
            $banner->image_url = url(Storage::url($banner->image_path));
            return response()->json([
                'message' => 'Banner updated successfully',
                'data' => $banner
            ], 200);
        } catch (ModelNotFoundException $e) {
            Log::error('Banner not found for update: ' . $e->getMessage());
            return response()->json(['message' => self::BANNER_NOT_FOUND_ERROR], 404);
        } catch (\Exception $e) {
            Log::error('Error updating banner: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while updating the banner'], 500);
        }
    }    

    public function destroy($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            Storage::disk('public')->delete($banner->image_path);
            $banner->delete();
            return response()->json(['message' => 'Banner deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            Log::error('Banner not found for deletion: ' . $e->getMessage());
            return response()->json(['message' => self::BANNER_NOT_FOUND_ERROR], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting banner: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while deleting the banner'], 500);
        }
    }
}
