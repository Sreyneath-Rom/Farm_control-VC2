<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplireRequest;
use App\Http\Requests\UpdateSupplireRequest;
use App\Models\Supplire;
use Illuminate\Http\Request;

class SupplireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Supplire::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplireRequest $request)
    {
        $validated = $request->validated();

        $supplire = Supplire::create($validated);
        return response()->json([
            'message'=>'supplier create successfully!',
            'data'=> $supplire
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplire $supplire)
    {
        return response()->json([
            'data'=>$supplire
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplireRequest $request, Supplire $supplire)
    {
        
        $validated = $request->validated();
        $supplire->update($validated);

        return response()->json([
            'message'=> 'supplier update successfully.!',
            'data'=>$supplire
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplire $supplire)
    {
        $supplire->delete();
        return response()->json([
            'message'=> 'delete Success.!'
        ], 200);
    }
}
