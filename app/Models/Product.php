<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'creator', 'description', 'sizes', 'colors', 
        'qty', 'price', 'category_id', 'sub_category_id', 
        'product_type_id', 'featured_image', 'rank', 'status',
    ];

    protected $casts = [
        'sizes' => 'array',
        'colors' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tags');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function updateAttribute($key, $value)
    {
        try {
            if (in_array($key, ['sizes', 'colors']) && isset($value['index'])) {
                $current = $this->$key;
                $current[$value['index']] = $value['value'];
                $this->$key = $current;
            } else {
                $this->$key = $value;
            }
            $this->save();
            
            Log::info("Product attribute updated", [
                'product_id' => $this->id,
                'attribute' => $key,
                'value' => $value
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error("Failed to update product attribute", [
                'product_id' => $this->id,
                'attribute' => $key,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }
}
