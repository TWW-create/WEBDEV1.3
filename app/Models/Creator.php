<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Http\Controllers\BlogController;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;

class Creator extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($creator) {
            $creator->slug = Str::slug($creator->name);
        });

        static::created(function ($creator) {
            $blogController = new BlogController();
            
            $request = new Request([
                'title' => $creator->name,
                'content' => $creator->description ?? 'Welcome to ' . $creator->name . '\'s blog',
            ]);
    
            if ($creator->image) {
                $request->files->add([
                    'media' => [
                        UploadedFile::createFromPath(storage_path('app/public/' . $creator->image))
                    ]
                ]);
            }
    
            $blogController->store($request);
        });

        static::updating(function ($creator) {
            if ($creator->isDirty('name')) {
                $creator->slug = Str::slug($creator->name);
            }
        });
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}
