<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'sub_category_id', 'slug'];

    const SPECIAL_TYPES = ['view all', 'new in'];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($productType) {
            $subCategory = SubCategory::find($productType->sub_category_id);
            $category = Category::find($subCategory->category_id);
            
            $categorySlug = Str::slug($category->name);
            $subCategorySlug = Str::slug($subCategory->name);
            $baseSlug = Str::slug($productType->name);
            
            $productType->slug = "{$categorySlug}-{$subCategorySlug}-{$baseSlug}";
        });
    }

    public function subcategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    public function products()
    {
        if ($this->name === 'view all') {
            return $this->hasMany(Product::class, 'sub_category_id', 'sub_category_id');
        }
        
        if ($this->name === 'new in') {
            return $this->hasMany(Product::class, 'sub_category_id', 'sub_category_id')
                ->orderBy('created_at', 'desc')
                ->where('created_at', '>=', now()->subDays(30));
        }

        return $this->hasMany(Product::class);
    }
}
