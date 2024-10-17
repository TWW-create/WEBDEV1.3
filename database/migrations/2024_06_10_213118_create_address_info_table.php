<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('address_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('address_1');
            $table->text('address_2')->nullable();
            $table->string('country');
            $table->string('state_province');
            $table->string('city');
            $table->string('zipcode');
            $table->text('delivery_address');
            $table->string('contact_number');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('address_infos');
    }
};
