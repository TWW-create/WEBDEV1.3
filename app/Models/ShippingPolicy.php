<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingPolicy extends Model
{
    protected $fillable = ['content', 'status'];
}
