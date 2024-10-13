<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('qty');
            $table->decimal('price', 8, 2);
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('sub_category_id')->constrained('sub_categories')->onDelete('cascade');
            $table->foreignId('product_type_id')->constrained()->onDelete('cascade');
            $table->string('featured_image')->nullable();
            $table->integer('rank')->default(0);
            $table->string('status')->default('available');
            $table->timestamps();
            $table->index(['category_id', 'subcategory_id', 'product_type_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
