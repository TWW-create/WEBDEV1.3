<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VariantImage extends Model
{
    protected $fillable = ['image_path', 'sort_order'];

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
