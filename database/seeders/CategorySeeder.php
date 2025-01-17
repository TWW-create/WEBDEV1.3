<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\ProductType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'women' => [
                'tailoring' => [
                    'Blazers', 'Tailored Pants', 'Jump Suit', 
                    'Waist Coat', 'Jackets', 'Dress'
                ],
                'ready to wear' => [
                    'Dress', 'Skirts', 'Shirts', 'Tops', 'Pants', 
                    'Hoodies', 'Jackets'
                ]
            ],
            'men' => [
                'ready to wear' => [
                    'shirt', 'suit', 'pants', 'Sleeveless', 'T-shirt', 
                    'dungarees', 'Hoodies'
                ],
                'tailoring' => [
                    'Blazers', 'Tailored Pant', 'Jump Suit', 'Waist Coat', 
                    'Jackets', 'Dungarees'
                ]
            ],
            'accessories' => [
                'women' => [
                    'Bags', 'Rings', 'Watches', 'Belts', 'Hats', 'Sunglasses'
                ],
                'men' => [
                    'Bags', 'Watches', 'Belts', 'Sun glasses', 'Rings', 'Socks'
                ]
            ],
            'sales' => [
                'men' => [
                    'Socks', 'Dress', 'Skirts', 'Blazzers', 'Pants', 
                    'Jackets', 'Jumpsuits'
                ],
                'women' => [
                    'Socks', 'Rings', 'Pants', 'Tops', 'Jackets'
                ]
            ]
        ];

        foreach ($categories as $categoryName => $subcategories) {
            $category = Category::create(['name' => $categoryName]);

            foreach ($subcategories as $subcategoryName => $productTypes) {
                $subcategory = SubCategory::create([
                    'name' => $subcategoryName,
                    'category_id' => $category->id
                ]);

                // Add 'view all' with unique identifier
                ProductType::create([
                    'name' => 'view all',
                    'sub_category_id' => $subcategory->id,
                    'slug' => Str::slug("{$category->name}-{$subcategory->name}-view-all-" . uniqid())
                ]);

                // Add 'new in' with unique identifier
                ProductType::create([
                    'name' => 'new in',
                    'sub_category_id' => $subcategory->id,
                    'slug' => Str::slug("{$category->name}-{$subcategory->name}-new-in-" . uniqid())
                ]);

                // Add other product types with unique identifiers
                foreach ($productTypes as $productType) {
                    ProductType::create([
                        'name' => $productType,
                        'sub_category_id' => $subcategory->id,
                        'slug' => Str::slug("{$category->name}-{$subcategory->name}-{$productType}-" . uniqid())
                    ]);
                }
            }
        }
    }
}
