<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sale;
use App\Models\Product;
use App\Models\User;

class SaleSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();
        $users = User::all();

        for ($i = 1; $i <= 10; $i++) {
            Sale::create([
                'product_id' => $products->random()->id,
                'quantity_sold' => rand(1, 10),
                'sale_price' => rand(100, 1000),
                'sale_date' => now()->subDays(rand(1, 30)),
                'created_by' => $users->random()->id,
            ]);
        }
    }
}
