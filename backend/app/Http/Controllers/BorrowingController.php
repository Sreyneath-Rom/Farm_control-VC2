<?php

namespace App\Http\Controllers\Api;
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    public function index()
    {
        $borrowings = Borrowing::with(['material', 'staff'])->get();

        return response()->json($borrowings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
            'purpose' => 'required|string|max:255',
            'borrowed_date' => 'required|date',
            'returned_date' => 'nullable|date|after_or_equal:borrowed_date',
            'material_id' => 'required|exists:materials,id',
            'staff_id' => 'required|exists:staff,id',
        ]);

        $borrow = Borrowing::create($validated);

        return response()->json([
            'message' => 'Borrow record created successfully',
            'borrow' => $borrow,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $borrow = Borrowing::findOrFail($id);
        $validated = $request->validate([
            'returned_date' => 'nullable|date|after_or_equal:borrowed_date',
        ]);

        $borrow->update($validated);

        return response()->json([
            'message' => 'Borrow record updated successfully',
            'borrow' => $borrow,
        ], 200);
    }

    public function destroy($id)
    {
        $borrow = Borrowing::findOrFail($id);
        $borrow->delete();

        return response()->json(['message' => 'Borrow record deleted successfully'], 200);
    }
}