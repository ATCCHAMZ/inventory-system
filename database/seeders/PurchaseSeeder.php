<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Purchase;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;

class PurchaseSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();
        $suppliers = Supplier::all();
        $users = User::all();

        for ($i = 1; $i <= 10; $i++) {
            Purchase::create([
                'product_id' => $products->random()->id,
                'supplier_id' => $suppliers->random()->id,
                'quantity' => rand(5, 50),
                'purchase_price' => rand(50, 500),
                'purchase_date' => now()->subDays(rand(1, 30)),
                'created_by' => $users->random()->id,
            ]);
        }
    }
}
