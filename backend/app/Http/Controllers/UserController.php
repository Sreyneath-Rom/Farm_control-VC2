<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json([
            'data' => $users
        ], 200);
    }
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:auth', // Use 'auth' table
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'User created successfully',
        'token' => $token,
        'user' => $user
    ], 201);
}
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logout successful',
        ], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    public function update(Request $request)
    {
        $user = $request->user(); // Get the authenticated user

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:6',
        ]);

        $data = $request->only(['name', 'email', 'password']);
        $updateData = [];

        if (!empty(array_filter($data))) {
            if (isset($data['password'])) {
                $updateData['password'] = Hash::make($data['password']);
            }
            $updateData = array_merge($updateData, array_filter($data, function ($value) {
                return $value !== null && $value !== '';
            }));

            $user->update($updateData);

            return response()->json([
                'message' => 'Update successful',
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'No valid data provided for update',
        ], 400);
    }
}
