<?php

namespace Database\Seeders;

use App\Models\AddressInfo;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\SubCategory;
use App\Models\Tag;
use App\Models\Transaction;
use App\Models\User;
use App\Models\View;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call the AdminUserSeeder
        $this->call(AdminUserSeeder::class);
        
               
    }
}
