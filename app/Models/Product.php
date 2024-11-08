<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'creator', 'description', 'sizes', 'colors', 
        'qty', 'price', 'category_id', 'sub_category_id', 
        'product_type_id', 'featured_image', 'rank', 'status','slug','view_count','composition',
        'shipping_details'
    ];

    protected $casts = [
        'sizes' => 'array',
        'colors' => 'array',
        'shipping_details' => 'array',
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

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($product) {
            $product->slug = Str::slug($product->name);
        });
        static::updating(function ($product) {
            if ($product->isDirty('name')) {
                $product->slug = Str::slug($product->name);
            }
        });
    }
    

    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }
    
}
