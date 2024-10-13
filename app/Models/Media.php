<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = ['blog_id', 'file_path', 'file_type'];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
