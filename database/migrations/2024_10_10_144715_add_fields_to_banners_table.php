<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->string('title');
            $table->string('image_path');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }
    
    public function down()
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn(['title', 'image_path', 'start_date', 'end_date', 'is_active']);
        });
    }
    
};
