<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{
    /**
     * Display a listing of the suppliers.
     */
    public function index()
    {
        $suppliers = Supplier::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Suppliers retrieved successfully.',
            'data' => $suppliers
        ]);
    }

    /**
     * Store a newly created supplier.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        $supplier = Supplier::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Supplier created successfully.',
            'data' => $supplier
        ], 201);
    }

    /**
     * Display the specified supplier.
     */
    public function show($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'success' => false,
                'message' => 'Supplier not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Supplier retrieved successfully.',
            'data' => $supplier
        ]);
    }

    /**
     * Update the specified supplier.
     */
    public function update(Request $request, $id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'success' => false,
                'message' => 'Supplier not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email,' . $id,
            'phone' => 'required|string|max:20',
            'address' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        $supplier->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Supplier updated successfully.',
            'data' => $supplier
        ]);
    }

    /**
     * Remove the specified supplier.
     */
    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'success' => false,
                'message' => 'Supplier not found.'
            ], 404);
        }

        // Check if supplier has associated products
        if ($supplier->products()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete supplier with associated products.'
            ], 422);
        }

        $supplier->delete();

        return response()->json([
            'success' => true,
            'message' => 'Supplier deleted successfully.'
        ]);
    }
}