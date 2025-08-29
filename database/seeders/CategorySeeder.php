<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear the table before inserting new rows
        Category::truncate();

        $categories = [
            ['name' => 'Electronics', 'description' => 'Electronic devices and gadgets'],
            ['name' => 'Clothing', 'description' => 'Men and Women clothes'],
            ['name' => 'Books', 'description' => 'Books and magazines'],
            ['name' => 'Groceries', 'description' => 'Food and beverages'],
            ['name' => 'Furniture', 'description' => 'Home and office furniture'],
            ['name' => 'Toys', 'description' => 'Children toys and games'],
            ['name' => 'Shoes', 'description' => 'Footwear for all ages'],
            ['name' => 'Sports', 'description' => 'Sports equipment'],
            ['name' => 'Beauty', 'description' => 'Cosmetics and beauty products'],
            ['name' => 'Stationery', 'description' => 'Office and school supplies'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
