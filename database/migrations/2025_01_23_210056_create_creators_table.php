<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('creators', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Create default creator
        DB::table('creators')->insert([
            'name' => 'Default Creator',
            'slug' => 'default-creator',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Add creator_id to products table
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('creator_id')->after('name')->nullable()->constrained();
        });

        // Link existing products to default creator
        DB::table('products')->update(['creator_id' => 1]);

        // Make creator_id required
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('creator_id')->nullable(false)->change();
        });

        // Remove old creator column
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('creator');
        });
    }

    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('creator')->after('name');
            $table->dropForeign(['creator_id']);
            $table->dropColumn('creator_id');
        });

        Schema::dropIfExists('creators');
    }
};
