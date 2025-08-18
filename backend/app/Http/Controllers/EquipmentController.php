<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Equipment::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentRequest $request)
    {
        $validated = $request->validated();

        $equipment = Equipment::create($validated);

        return response()->json([
            'message' => 'Equipment created successfully',
            'data' => $equipment
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipment $equipment)
    {
        return response()->json([
            'data'=>$equipment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, Equipment $equipment)
{
    $equipment->update($request->validated());

    return response()->json([
        'message' => 'Equipment updated successfully',
        'data' => $equipment
    ]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        $equipment->delete();
        return response()->json([
            'message'=>'Delete successfully..!'
        ], 200);
    }
}
