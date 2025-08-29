<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth; // ← ADD THIS IMPORT

class SaleController extends Controller
{
    /**
     * Display a listing of the sales.
     */
    public function index()
    {
        $sales = Sale::with(['product', 'creator'])
                    ->orderBy('sale_date', 'desc')
                    ->get();

        return response()->json([
            'success' => true,
            'message' => 'Sales retrieved successfully.',
            'data' => $sales
        ]);
    }

    /**
     * Store a newly created sale.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity_sold' => 'required|integer|min:1',
            'sale_price' => 'required|numeric|min:0',
            'sale_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if enough stock is available
        $product = Product::find($request->product_id);
        if ($product->quantity_in_stock < $request->quantity_sold) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient stock available.',
                'errors' => ['quantity_sold' => ['Not enough stock available. Only ' . $product->quantity_in_stock . ' units in stock.']]
            ], 422);
        }

        try {
            // Create sale - FIXED THIS LINE
            $sale = Sale::create([
                'product_id' => $request->product_id,
                'quantity_sold' => $request->quantity_sold,
                'sale_price' => $request->sale_price,
                'sale_date' => $request->sale_date,
                'created_by' => Auth::id(), // ← FIXED: Use Auth::id() instead of auth()->id()
            ]);

            // Update product stock (decrease)
            $product->quantity_in_stock -= $request->quantity_sold;
            $product->save();

            $sale->load(['product', 'creator']);

            return response()->json([
                'success' => true,
                'message' => 'Sale created successfully.',
                'data' => $sale
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create sale.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ... rest of your controller methods remain the same
}