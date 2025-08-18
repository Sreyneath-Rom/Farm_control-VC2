<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return Sale::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        $validated = $request->validated();
        $sale = Sale::create($validated);
        return response()->json([
            'message' => 'Sale created successfully!',
            'data' => $sale
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        return response()->json([
            'data' => $sale
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        $validated = $request->validated();
        $sale->update($validated);

        return response()->json([
            'message' => 'Sale updated successfully!',
            'data' => $sale
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();

        return response()->json([
            'message' => 'Sale deleted successfully!'
        ]);
    }
}
