<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Test route to verify API is working
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Add your authentication routes
Route::post('/register', [App\Http\Controllers\API\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // API resource routes
    Route::apiResource('categories', App\Http\Controllers\API\CategoryController::class);
    Route::apiResource('products', App\Http\Controllers\API\ProductController::class);
    Route::apiResource('suppliers', App\Http\Controllers\API\SupplierController::class);
    Route::apiResource('purchases', App\Http\Controllers\API\PurchaseController::class);
    Route::apiResource('sales', App\Http\Controllers\API\SaleController::class);
    // Add other resource routes as needed
});