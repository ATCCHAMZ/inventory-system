<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the purchases.
     */
    public function index()
    {
        $purchases = Purchase::with(['product', 'supplier', 'creator'])
                            ->orderBy('purchase_date', 'desc')
                            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Purchases retrieved successfully.',
            'data' => $purchases
        ]);
    }

    /**
     * Store a newly created purchase.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'quantity' => 'required|integer|min:1',
            'purchase_price' => 'required|numeric|min:0',
            'purchase_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create purchase
            $purchase = Purchase::create([
                'product_id' => $request->product_id,
                'supplier_id' => $request->supplier_id,
                'quantity' => $request->quantity,
                'purchase_price' => $request->purchase_price,
                'purchase_date' => $request->purchase_date,
                'created_by' => auth()->id(),
            ]);

            // Update product stock
            $product = Product::find($request->product_id);
            $product->quantity_in_stock += $request->quantity;
            $product->save();

            $purchase->load(['product', 'supplier', 'creator']);

            return response()->json([
                'success' => true,
                'message' => 'Purchase created successfully.',
                'data' => $purchase
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create purchase.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified purchase.
     */
    public function show($id)
    {
        $purchase = Purchase::with(['product', 'supplier', 'creator'])->find($id);

        if (!$purchase) {
            return response()->json([
                'success' => false,
                'message' => 'Purchase not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Purchase retrieved successfully.',
            'data' => $purchase
        ]);
    }

    /**
     * Update the specified purchase.
     */
    public function update(Request $request, $id)
    {
        $purchase = Purchase::find($id);

        if (!$purchase) {
            return response()->json([
                'success' => false,
                'message' => 'Purchase not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'quantity' => 'required|integer|min:1',
            'purchase_price' => 'required|numeric|min:0',
            'purchase_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Reverse old stock
            $oldProduct = Product::find($purchase->product_id);
            $oldProduct->quantity_in_stock -= $purchase->quantity;
            $oldProduct->save();

            // Update purchase
            $purchase->update([
                'product_id' => $request->product_id,
                'supplier_id' => $request->supplier_id,
                'quantity' => $request->quantity,
                'purchase_price' => $request->purchase_price,
                'purchase_date' => $request->purchase_date,
            ]);

            // Update new stock
            $newProduct = Product::find($request->product_id);
            $newProduct->quantity_in_stock += $request->quantity;
            $newProduct->save();

            $purchase->load(['product', 'supplier', 'creator']);

            return response()->json([
                'success' => true,
                'message' => 'Purchase updated successfully.',
                'data' => $purchase
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update purchase.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified purchase.
     */
    public function destroy($id)
    {
        $purchase = Purchase::find($id);

        if (!$purchase) {
            return response()->json([
                'success' => false,
                'message' => 'Purchase not found.'
            ], 404);
        }

        try {
            // Reverse stock
            $product = Product::find($purchase->product_id);
            $product->quantity_in_stock -= $purchase->quantity;
            $product->save();

            // Delete purchase
            $purchase->delete();

            return response()->json([
                'success' => true,
                'message' => 'Purchase deleted successfully.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete purchase.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}