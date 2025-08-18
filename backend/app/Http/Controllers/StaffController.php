<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    /**
     * Display a listing of the staff.
     */
    public function index()
    {
        return response()->json(Staff::all(), 200);
    }

    /**
     * Store a newly created staff member.
     */
    public function store(StoreStaffRequest $request)
    {
        $validated = $request->validated();

        // if (!empty($validated['phone'])) {
        //     $validated['phone'] = Hash::make($validated['phone']);
        // }

        $staff = Staff::create($validated);

        return response()->json([
            'message' => 'Staff created successfully!',
            'data' => $staff
        ], 201);
    }

    /**
     * Display the specified staff member.
     */
    public function show(Staff $staff)
    {
        return response()->json([
            'message' => 'Staff found!',
            'data' => $staff
        ], 200);
    }

    /**
     * Update the specified staff member.
     */
    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        $validated = $request->validated();

        // if (isset($validated['phone']) && !empty($validated['phone'])) {
        //     $validated['phone'] = Hash::make($validated['phone']);
        // }

        $staff->update($validated);

        return response()->json([
            'message' => 'Staff updated successfully!',
            'data' => $staff
        ], 200);
    }

    /**
     * Remove the specified staff member.
     */
    // public function destroy(Staff $staff)
    // {
    //     $staff->delete();

    //     return response()->json([
    //         'message' => 'Staff deleted successfully.'
    //     ], 200);
    // }

    public function destroy($id)
    {
        $staff = Staff::find($id);
        if (!$staff) {
            return response()->json(['message' => 'Staff not found'], 404);
        }
        $staff->delete();
        return response()->json(['message' => 'Staff deleted successfully']);
    }
}
