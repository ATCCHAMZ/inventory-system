<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,       // users must exist first
            CategorySeeder::class,   // categories
            SupplierSeeder::class,   // suppliers
            ProductSeeder::class,    // products
            PurchaseSeeder::class,   // purchases depend on products + suppliers + users
            SaleSeeder::class,       // sales depend on products + users
        ]);
    }
}
