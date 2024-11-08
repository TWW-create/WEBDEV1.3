<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\ProductType;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateSlugs extends Command
{
    protected $signature = 'generate:slugs';
    protected $description = 'Generate hierarchical slugs for all models';

    public function handle()
    {
        // Generate Category slugs first
        Category::whereNull('slug')->each(function ($category) {
            $category->slug = Str::slug($category->name);
            $category->save();
        });

        // Generate SubCategory slugs with category prefix
        SubCategory::whereNull('slug')->each(function ($subcategory) {
            $categorySlug = Str::slug($subcategory->category->name);
            $subcategory->slug = "{$categorySlug}-" . Str::slug($subcategory->name);
            $subcategory->save();
        });

        // Generate ProductType slugs with category and subcategory prefix
        ProductType::whereNull('slug')->each(function ($productType) {
            $categorySlug = Str::slug($productType->subcategory->category->name);
            $subcategorySlug = Str::slug($productType->subcategory->name);
            $productType->slug = "{$categorySlug}-{$subcategorySlug}-" . Str::slug($productType->name);
            $productType->save();
        });

        // Generate Product slugs
        Product::whereNull('slug')->each(function ($product) {
            $product->slug = Str::slug($product->name);
            $product->save();
        });

        $this->info('All slugs generated successfully in hierarchical order!');
    }
}
