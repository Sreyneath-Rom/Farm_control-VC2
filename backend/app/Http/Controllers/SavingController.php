<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSavingRequest;
use App\Http\Requests\UpdateSavingRequest;
use App\Models\Saving;
use Illuminate\Http\Request;

class SavingController extends Controller
{
    /**
     * Display a listing of all savings.
     */
    public function index()
    {
        return response()->json(Saving::with('user')->get());
    }

    /**
     * Store a newly created saving record.
     */
    public function store(StoreSavingRequest $request)
    {
        $validated = $request->validated();

        $saving = Saving::create($validated);

        return response()->json([
            'message' => 'Saving record created successfully.',
            'data' => $saving
        ], 201);
    }

    /**
     * Display a specific saving record.
     */
    public function show(Saving $saving)
    {
        return response()->json($saving);
    }

    /**
     * Update the specified saving record.
     */
    public function update(UpdateSavingRequest $request, Saving $saving)
    {
        $validated = $request->validated();

        $saving->update($validated);

        return response()->json([
            'message' => 'Saving record updated.',
            'data' => $saving
        ]);
    }

    /**
     * Remove the specified saving record.
     */
    public function destroy(Saving $saving)
    {
        $saving->delete();

        return response()->json([
            'message' => 'Saving record deleted.'
        ]);
    }
}
