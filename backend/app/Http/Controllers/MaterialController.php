<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Material::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialRequest $request)
    {
        $validated = $request->validated();

        $material = Material::create($validated);

        return response()->json([
            'message' => 'Material created successfully!',
            'data' => $material
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        return response()->json([
            'data' => $material
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        
        $validated = $request->validated();
        $material->update($validated); // 👈 Not ->updated()

        return response()->json([
            'message' => 'Material updated successfully.',
            'material' => $material
        ]);
    }





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        $material->delete();

        return response()->json([
            'message' => 'delete successfully!'
        ], 200);
    }

    public function decreaseStock(Request $request, $id)
    {
        $material = Material::findOrFail($id);

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($material->currentStock < $request->quantity) {
            return response()->json(['message' => 'Not enough stock available'], 400);
        }

        $material->currentStock -= $request->quantity;

        $material->value = $material->currentStock * $material->pricePerUnit;

        if ($material->currentStock <= 0) {
            $material->status = 'critical';
        } elseif ($material->currentStock <= $material->minStock) {
            $material->status = 'low';
        } else {
            $material->status = 'ok';
        }

        $material->save();

        return response()->json([
            'message' => 'Stock updated successfully',
            'material' => $material
        ]);
    }


}
