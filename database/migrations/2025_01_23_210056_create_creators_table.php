<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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

        // Modify products table to reference creators
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('creator'); // Remove old creator string column
            $table->foreignId('creator_id')->after('name')->constrained()->onDelete('restrict');
        });

        // Add creator_id to blogs table
        Schema::table('blogs', function (Blueprint $table) {
            $table->foreignId('creator_id')->after('user_id')->nullable()->constrained()->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropForeign(['creator_id']);
            $table->dropColumn('creator_id');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['creator_id']);
            $table->dropColumn('creator_id');
            $table->string('creator')->after('name'); // Restore old creator column
        });

        Schema::dropIfExists('creators');
    }
};
