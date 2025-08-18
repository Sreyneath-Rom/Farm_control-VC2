<?php

namespace App\Http\Controllers;

use App\Models\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // 🔐 Register
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:auth,name',
            'password' => 'required|string|confirmed', // ensures password_confirmation is present and matches
        ]);

        $auth = Auth::create([
            'name' => $validated['name'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $auth->createToken('apptoken')->plainTextToken;

        return response()->json([
            'auth' => $auth,
            'token' => $token,
        ], 201);
    }

    // 🔐 Login
    public function login(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $auth = Auth::where('name', $fields['name'])->first();

        if (!$auth || !Hash::check($fields['password'], $auth->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $auth->createToken('apptoken')->plainTextToken;

        return response()->json([
            'auth' => $auth,
            'token' => $token,
        ]);
    }

    // 🔐 Logout (requires Sanctum token)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    // 🔄 Update name and/or password
    public function update(Request $request)
    {
        $auth = $request->user();

        $fields = $request->validate([
            'name' => 'sometimes|string|unique:auth,name,' . $auth->id,
            'password' => 'sometimes|string|confirmed',
        ]);

        if (isset($fields['name'])) {
            $auth->name = $fields['name'];
        }

        if (isset($fields['password'])) {
            $auth->password = Hash::make($fields['password']);
        }

        $auth->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'auth' => $auth,
        ]);
    }
}
