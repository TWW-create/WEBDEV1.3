<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('paystack_reference')->nullable();
            // Removed payment_status since it already exists
            $table->enum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->json('shipping_address');
            $table->string('email');
            $table->string('phone');
        });
    }

    public function down() {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'paystack_reference',
                'order_status',
                'shipping_address',
                'email',
                'phone'
            ]);
        });
    }
};
