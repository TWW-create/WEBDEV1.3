<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('media')->latest()->paginate(10);
        return response()->json($blogs);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'media.*' => 'required|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:40960', // 20MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $blog = Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);

        Log::info('Request has file: ' . $request->hasFile('media'));

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $index => $mediaFile) {
                Log::info('Processing file ' . $index);
                Log::info('File mime type: ' . $mediaFile->getMimeType());
                Log::info('File size: ' . $mediaFile->getSize());
    
                $path = $mediaFile->store('blog_media', 'public');
                Log::info('File stored at: ' . $path);
    
                $fileType = substr($mediaFile->getMimeType(), 0, 5) == 'image' ? 'image' : 'video';
    
                $media = Media::create([
                    'blog_id' => $blog->id,
                    'file_path' => $path,
                    'file_type' => $fileType,
                ]);
    
                Log::info('Media created: ' . $media->id);
            }
        }

        return response()->json(['message' => 'Blog created successfully', 'blog' => $blog->load('media')], 201);
    }

    public function show($id)
    {
        $blog = Blog::with('media')->findOrFail($id);
        return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'media.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:40960', // 20MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $blog->update([
            'title' => $request->title,
            'content' => $request->content,
        ]);

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

        return response()->json(['message' => 'Blog updated successfully', 'blog' => $blog->load('media')]);
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        
        // Delete associated media files
        foreach ($blog->media as $media) {
            Storage::disk('public')->delete($media->file_path);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully']);
    }

    public function deleteMedia($id)
    {
        $media = Media::findOrFail($id);
        Storage::disk('public')->delete($media->file_path);
        $media->delete();

        return response()->json(['message' => 'Media deleted successfully']);
    }
}
