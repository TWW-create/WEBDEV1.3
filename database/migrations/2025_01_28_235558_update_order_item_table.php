<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::dropIfExists('order_items');

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->uuid('order_id');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('variant_id')->constrained('product_variants');
            $table->unsignedInteger('quantity');
            $table->decimal('price', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
            $table->index(['order_id', 'product_id']);
        });
    }

    public function down() {
        Schema::dropIfExists('order_items');
    }
};
