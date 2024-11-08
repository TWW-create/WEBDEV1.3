<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up()
    // {
    //     Schema::table('products', function (Blueprint $table) {
    //         $table->string('slug')->nullable();
    //         $table->integer('view_count')->default(0);
    //         $table->text('composition')->nullable();
    //         $table->json('shipping_details')->nullable();
    //     });
    
    //     // Generate slugs for existing products
    //     DB::table('products')->orderBy('id')->each(function ($product) {
    //         DB::table('products')
    //             ->where('id', $product->id)
    //             ->update(['slug' => Str::slug($product->name)]);
    //     });
    
    //     // Now add the unique constraint
    //     Schema::table('products', function (Blueprint $table) {
    //         $table->unique('slug');
    //     });
    // }
    

    // /**
    //  * Reverse the migrations.
    //  */
    // public function down(): void
    // {
    //     //
    // }
};
