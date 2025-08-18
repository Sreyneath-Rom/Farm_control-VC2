<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentMaintenanceRequest;
use App\Http\Requests\UpdateEquipmentMaintenanceRequest;
use App\Models\EquipmentMaintenance;
use Illuminate\Http\Request;

class EquipmentMaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentMaintenanceRequest $request)
   {
        $validated = $request->validated();

        $maintenance = EquipmentMaintenance::create($validated);

        return response()->json([
            'message' => 'Maintenance record created successfully',
            'data' => $maintenance
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EquipmentMaintenance $equipmentMaintenance)
    {
      return response()->json([
            'message' => 'Maintenance record detail',
            'data' => $equipmentMaintenance
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentMaintenanceRequest $request, EquipmentMaintenance $equipmentMaintenance)
    {
        $equipmentMaintenance->update($request->validated());

        return response()->json([
            'message' => 'Maintenance record updated',
            'data' => $equipmentMaintenance
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EquipmentMaintenance $equipmentMaintenance)
    {
         $equipmentMaintenance->delete();

        return response()->json([
            'message' => 'Maintenance record deleted'
        ]);
    }
}
