<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            // Remove old columns that will be handled by variants
            $table->dropColumn(['sizes', 'colors', 'qty']);
        });

        // Create the variants table
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('color');
            $table->json('sizes');
            $table->integer('stock');
            $table->string('sku')->unique();
            $table->timestamps();
        });

        // Create the variant images table
        Schema::create('variant_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variant_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            $table->index(['product_variant_id', 'sort_order']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('variant_images');
        Schema::dropIfExists('product_variants');

        Schema::table('products', function (Blueprint $table) {
            $table->json('sizes');
            $table->json('colors');
            $table->integer('qty');
        });
    }
};
