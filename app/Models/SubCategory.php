<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'category_id'];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($subCategory) {
            $category = Category::find($subCategory->category_id);
            $baseSlug = Str::slug($subCategory->name);
            $categorySlug = Str::slug($category->name);
            $subCategory->slug = "{$categorySlug}-{$baseSlug}";
        });
    
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'sub_category_id');
    }
    public function productTypes()
    {
        return $this->hasMany(ProductType::class, 'sub_category_id');
    }
    
}
