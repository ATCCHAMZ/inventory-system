<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'sku', 'category_id', 'supplier_id', 
        'description', 'price', 'cost_price', 
        'quantity_in_stock', 'reorder_level'
    ];

    // A product belongs to a category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // A product belongs to a supplier
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    // A product has many purchases
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    // A product has many sales
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}