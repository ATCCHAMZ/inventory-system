<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Supplier;

class SupplierSeeder extends Seeder
{
    public function run()
    {
        $suppliers = [
            ['name' => 'Tech Supplies Inc.', 'contact_name' => 'John Doe', 'email' => 'john@techsupplies.com', 'phone' => '1234567890', 'address' => '123 Tech Street'],
            ['name' => 'Global Books Ltd.', 'contact_name' => 'Sarah Lee', 'email' => 'sarah@globalbooks.com', 'phone' => '9876543210', 'address' => '45 Book Lane'],
            ['name' => 'Fresh Foods Co.', 'contact_name' => 'Peter Smith', 'email' => 'peter@freshfoods.com', 'phone' => '1112223333', 'address' => '78 Market Road'],
            ['name' => 'FurniWorld', 'contact_name' => 'Alice Brown', 'email' => 'alice@furniworld.com', 'phone' => '2223334444', 'address' => '12 Furniture Ave'],
            ['name' => 'ShoeMart', 'contact_name' => 'Robert Wilson', 'email' => 'robert@shoemart.com', 'phone' => '3334445555', 'address' => '56 Shoe Street'],
            ['name' => 'BeautyPlus', 'contact_name' => 'Linda Green', 'email' => 'linda@beautyplus.com', 'phone' => '4445556666', 'address' => '89 Beauty Plaza'],
            ['name' => 'ToyLand', 'contact_name' => 'James White', 'email' => 'james@toyland.com', 'phone' => '5556667777', 'address' => '34 Toy Avenue'],
            ['name' => 'Sportify', 'contact_name' => 'Maria Johnson', 'email' => 'maria@sportify.com', 'phone' => '6667778888', 'address' => '90 Sports Road'],
            ['name' => 'OfficeSupplies Ltd.', 'contact_name' => 'David Clark', 'email' => 'david@officesupplies.com', 'phone' => '7778889999', 'address' => '23 Office Street'],
            ['name' => 'Clothify', 'contact_name' => 'Emma Davis', 'email' => 'emma@clothify.com', 'phone' => '8889990000', 'address' => '67 Fashion Blvd'],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
