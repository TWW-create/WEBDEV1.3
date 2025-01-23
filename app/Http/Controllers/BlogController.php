<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Media;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'media.*' => 'required|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:40960',
            'product_slugs' => 'nullable|array',
            'product_slugs.*' => 'exists:products,slug'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $blog = Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);

        // Handle media files
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $mediaFile) {
                $path = $mediaFile->store('blog_media', 'public');
                $fileType = substr($mediaFile->getMimeType(), 0, 5) == 'image' ? 'image' : 'video';
                
                Media::create([
                    'blog_id' => $blog->id,
                    'file_path' => $path,
                    'file_type' => $fileType,
                ]);
            }
        }

        // Link products to blog
        if ($request->has('product_slugs')) {
            $products = Product::whereIn('slug', $request->product_slugs)->get();
            $blog->products()->attach($products->pluck('id'));
        }

        return response()->json([
            'message' => 'Blog created successfully', 
            'blog' => $blog->load(['media', 'products'])
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'media.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:40960',
            'product_slugs' => 'nullable|array',
            'product_slugs.*' => 'exists:products,slug'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $blog->update([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        // Handle media files
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $mediaFile) {
                $path = $mediaFile->store('blog_media', 'public');
                $fileType = substr($mediaFile->getMimeType(), 0, 5) == 'image' ? 'image' : 'video';

                Media::create([
                    'blog_id' => $blog->id,
                    'file_path' => $path,
                    'file_type' => $fileType,
                ]);
            }
        }

        // Update linked products
        if ($request->has('product_slugs')) {
            $products = Product::whereIn('slug', $request->product_slugs)->get();
            $blog->products()->sync($products->pluck('id'));
        }

        return response()->json([
            'message' => 'Blog updated successfully', 
            'blog' => $blog->load(['media', 'products'])
        ]);
    }

    public function show($id)
    {
        $blog = Blog::with(['media', 'products'])->findOrFail($id);
        return response()->json($blog);
    }
    public function index(Request $request)
    {
        $query = Blog::with(['media', 'products']);
        
        if ($request->creator) {
            $query->where('title', 'like', "%{$request->creator}%");
        }
        
        $blogs = $query->latest()->paginate(10);
        return response()->json($blogs);
    }    
}