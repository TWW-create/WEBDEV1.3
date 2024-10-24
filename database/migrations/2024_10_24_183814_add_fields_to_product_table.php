<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('creator')->after('name');
            $table->json('sizes')->after('description');
            $table->json('colors')->after('sizes');
            $table->index(['creator', 'status']);
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['creator', 'sizes', 'colors']);
            $table->dropIndex(['creator', 'status']);
        });
    }
};
