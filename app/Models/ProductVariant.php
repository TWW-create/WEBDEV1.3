<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = ['color', 'sizes', 'stock', 'sku'];

    protected $casts = [
        'sizes' => 'array'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function images()
    {
        return $this->hasMany(VariantImage::class)->orderBy('sort_order');
    }
}
