<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWithdrawalRequest;
use App\Http\Requests\UpdateWithdrawalRequest;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class WithdrawalController extends Controller
{
    /**
     * Display a listing of the withdrawals.
     */
    public function index()
    {
        return response()->json(Withdrawal::with(['user', 'approver'])->latest()->get(), 200);
    }

    /**
     * Store a newly created withdrawal request.
     */
    public function store(StoreWithdrawalRequest $request)
    {
        $validated = $request->validated();

        $validated['approval_status'] = 'pending';

        $withdrawal = Withdrawal::create($validated);

        return response()->json([
            'message' => 'Withdrawal request submitted!',
            'data' => $withdrawal
        ], 201);
    }

    /**
     * Display the specified withdrawal.
     */
    public function show(Withdrawal $withdrawal)
    {
        return response()->json([
            'message' => 'Withdrawal found!',
            'data' => $withdrawal->load(['user', 'approver'])
        ], 200);
    }

    /**
     * Update the specified withdrawal.
     * Usually used by admin/manager to approve or reject.
     */
    public function update(UpdateWithdrawalRequest $request, Withdrawal $withdrawal)
    {
        $validated = $request->validated();

        $validated['approved_at'] = $validated['approved_at'] ?? now();

        $withdrawal->update($validated);

        return response()->json([
            'message' => 'Withdrawal updated successfully!',
            'data' => $withdrawal
        ], 200);
    }

    /**
     * Remove the specified withdrawal from storage.
     */
    public function destroy(Withdrawal $withdrawal)
    {
        $withdrawal->delete();

        return response()->json([
            'message' => 'Withdrawal deleted successfully.'
        ], 200);
    }
}
