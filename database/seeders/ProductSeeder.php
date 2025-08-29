<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['name' => 'Wireless Mouse', 'sku' => 'P001', 'category_id' => 1, 'supplier_id' => 1, 'description' => 'A high-quality wireless mouse', 'price' => 29.99, 'cost_price' => 15.50, 'quantity_in_stock' => 50, 'reorder_level' => 10],
            ['name' => 'Laptop', 'sku' => 'P002', 'category_id' => 1, 'supplier_id' => 1, 'description' => '14-inch laptop', 'price' => 650.00, 'cost_price' => 500.00, 'quantity_in_stock' => 20, 'reorder_level' => 5],
            ['name' => 'Novel Book', 'sku' => 'P003', 'category_id' => 3, 'supplier_id' => 2, 'description' => 'Fiction novel', 'price' => 12.99, 'cost_price' => 6.00, 'quantity_in_stock' => 100, 'reorder_level' => 15],
            ['name' => 'Office Chair', 'sku' => 'P004', 'category_id' => 5, 'supplier_id' => 4, 'description' => 'Ergonomic chair', 'price' => 120.00, 'cost_price' => 80.00, 'quantity_in_stock' => 30, 'reorder_level' => 5],
            ['name' => 'Soccer Ball', 'sku' => 'P005', 'category_id' => 8, 'supplier_id' => 8, 'description' => 'Official size soccer ball', 'price' => 25.00, 'cost_price' => 15.00, 'quantity_in_stock' => 60, 'reorder_level' => 10],
            ['name' => 'Running Shoes', 'sku' => 'P006', 'category_id' => 7, 'supplier_id' => 5, 'description' => 'Comfortable running shoes', 'price' => 75.00, 'cost_price' => 40.00, 'quantity_in_stock' => 40, 'reorder_level' => 8],
            ['name' => 'Doll Toy', 'sku' => 'P007', 'category_id' => 6, 'supplier_id' => 7, 'description' => 'Kids doll toy', 'price' => 15.00, 'cost_price' => 8.00, 'quantity_in_stock' => 70, 'reorder_level' => 12],
            ['name' => 'Perfume', 'sku' => 'P008', 'category_id' => 9, 'supplier_id' => 6, 'description' => 'Luxury perfume', 'price' => 55.00, 'cost_price' => 30.00, 'quantity_in_stock' => 25, 'reorder_level' => 5],
            ['name' => 'Notebook Pack', 'sku' => 'P009', 'category_id' => 10, 'supplier_id' => 9, 'description' => 'Pack of 5 notebooks', 'price' => 10.00, 'cost_price' => 5.00, 'quantity_in_stock' => 150, 'reorder_level' => 20],
            ['name' => 'T-shirt', 'sku' => 'P010', 'category_id' => 2, 'supplier_id' => 10, 'description' => 'Cotton t-shirt', 'price' => 20.00, 'cost_price' => 10.00, 'quantity_in_stock' => 80, 'reorder_level' => 15],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
