<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'sometimes|in:admin,staff'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Check if password_confirmation matches password
        if ($request->password !== $request->password_confirmation) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => ['password' => ['The password confirmation does not match.']]
            ], 422);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        
        // Set default role if not provided
        if (!isset($input['role'])) {
            $input['role'] = 'staff';
        }
        
        $user = User::create($input);
        
        // Create token
        $token = $user->createToken('InventoryApp')->plainTextToken;
        
        return response()->json([
            'success' => true,
            'message' => 'User registered successfully.',
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role
                ]
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('InventoryApp')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User logged in successfully.',
                'data' => [
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role
                    ]
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
                'errors' => ['email' => ['These credentials do not match our records.']]
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        // Check if user is authenticated before trying to delete token
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully.'
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'No authenticated user found.'
        ], 401);
    }
}