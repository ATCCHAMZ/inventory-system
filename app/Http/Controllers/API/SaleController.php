<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    /**
     * Display a listing of the sales.
     */
    public function index()
    {
        $sales = Sale::with(['product', 'creator'])->get();
        
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
            'sale_date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check product availability
        $product = Product::find($request->product_id);
        if ($product->quantity_in_stock < $request->quantity_sold) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient stock.',
                'errors' => [
                    'quantity_sold' => ['Only ' . $product->quantity_in_stock . ' items available in stock.']
                ]
            ], 422);
        }

        // Use transaction to ensure data consistency
        $sale = DB::transaction(function () use ($request, $product) {
            // Create the sale
            $sale = Sale::create([
                'product_id' => $request->product_id,
                'quantity_sold' => $request->quantity_sold,
                'sale_price' => $request->sale_price,
                'sale_date' => $request->sale_date,
                'created_by' => auth()->id()
            ]);

            // Update product stock
            $product->quantity_in_stock -= $request->quantity_sold;
            $product->save();

            return $sale;
        });

        // Load relationships for response
        $sale->load(['product', 'creator']);

        return response()->json([
            'success' => true,
            'message' => 'Sale created successfully.',
            'data' => $sale
        ], 201);
    }

    /**
     * Display the specified sale.
     */
    public function show($id)
    {
        $sale = Sale::with(['product', 'creator'])->find($id);

        if (!$sale) {
            return response()->json([
                'success' => false,
                'message' => 'Sale not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Sale retrieved successfully.',
            'data' => $sale
        ]);
    }

    /**
     * Update the specified sale.
     */
    public function update(Request $request, $id)
    {
        $sale = Sale::find($id);

        if (!$sale) {
            return response()->json([
                'success' => false,
                'message' => 'Sale not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity_sold' => 'required|integer|min:1',
            'sale_price' => 'required|numeric|min:0',
            'sale_date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check product availability (considering the old sale quantity)
        $product = Product::find($request->product_id);
        $availableStock = $product->quantity_in_stock + $sale->quantity_sold;
        
        if ($availableStock < $request->quantity_sold) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient stock.',
                'errors' => [
                    'quantity_sold' => ['Only ' . $availableStock . ' items available.']
                ]
            ], 422);
        }

        // Use transaction for data consistency
        DB::transaction(function () use ($request, $sale, $product) {
            // Reverse old stock adjustment
            $product->quantity_in_stock += $sale->quantity_sold;
            
            // Update sale
            $sale->update([
                'product_id' => $request->product_id,
                'quantity_sold' => $request->quantity_sold,
                'sale_price' => $request->sale_price,
                'sale_date' => $request->sale_date
            ]);

            // Apply new stock adjustment
            $product->quantity_in_stock -= $request->quantity_sold;
            $product->save();
        });

        // Load relationships for response
        $sale->load(['product', 'creator']);

        return response()->json([
            'success' => true,
            'message' => 'Sale updated successfully.',
            'data' => $sale
        ]);
    }

    /**
     * Remove the specified sale.
     */
    public function destroy($id)
    {
        $sale = Sale::find($id);

        if (!$sale) {
            return response()->json([
                'success' => false,
                'message' => 'Sale not found.'
            ], 404);
        }

        // Use transaction for data consistency
        DB::transaction(function () use ($sale) {
            // Reverse stock adjustment
            $product = Product::find($sale->product_id);
            $product->quantity_in_stock += $sale->quantity_sold;
            $product->save();

            // Delete sale
            $sale->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Sale deleted successfully.'
        ]);
    }
}