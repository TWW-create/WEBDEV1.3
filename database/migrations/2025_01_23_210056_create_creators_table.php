<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('creators')) {
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
                'name' => 'Bara ashion',
                'slug' => 'bara-fashion',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        if (Schema::hasTable('products')) {
            if (Schema::hasColumn('products', 'creator')) {
                // Add creator_id to products table if it doesn't exist
                if (!Schema::hasColumn('products', 'creator_id')) {
                    Schema::table('products', function (Blueprint $table) {
                        $table->foreignId('creator_id')->after('name')->nullable()->constrained();
                    });
                }

                // Link existing products to default creator if any exist
                if (DB::table('products')->count() > 0) {
                    DB::table('products')->whereNull('creator_id')->update(['creator_id' => 1]);
                }

                // Make creator_id required
                Schema::table('products', function (Blueprint $table) {
                    $table->foreignId('creator_id')->nullable(false)->change();
                });

                // Remove old creator column
                Schema::table('products', function (Blueprint $table) {
                    $table->dropColumn('creator');
                });
            }
        }
    }

    public function down()
    {
        if (Schema::hasTable('products')) {
            Schema::table('products', function (Blueprint $table) {
                if (!Schema::hasColumn('products', 'creator')) {
                    $table->string('creator')->after('name');
                }
                if (Schema::hasColumn('products', 'creator_id')) {
                    $table->dropForeign(['creator_id']);
                    $table->dropColumn('creator_id');
                }
            });
        }

        Schema::dropIfExists('creators');
    }
};
