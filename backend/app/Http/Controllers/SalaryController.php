<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSalaryRequest;
use App\Http\Requests\UpdateSalaryRequest;
use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class SalaryController extends Controller
{
    public function index()
    {
        $salaries = Salary::with('user')->latest()->get();
        return response()->json([
            'message' => $salaries->isEmpty() ? 'No salary records found.' : 'Salary records retrieved successfully.',
            'data' => $salaries
        ], 200);
    }

    public function store(StoreSalaryRequest $request)
    {
        try {
            $validated = $request->validated();
            $validated['paid_amount'] = $validated['paid_amount'] ?? 0;
            $validated['salary_month'] = $validated['salary_month'] ?? now()->format('Y-m'); // Default to current month
            $validated['status'] = $validated['status'] ?? (
                $validated['paid_amount'] >= $validated['base_salary'] ? 'paid' :
                ($validated['paid_amount'] > 0 ? 'pending' : 'unpaid')
            );

            $salary = Salary::create($validated);
            return response()->json([
                'message' => 'Salary record created successfully.',
                'data' => $salary->load('user')
            ], 201);
        } catch (QueryException $e) {
            Log::error('Database error in SalaryController@store: ' . $e->getMessage(), [
                'exception' => $e,
                'validated_data' => $validated ?? $request->all(),
            ]);
            return response()->json([
                'message' => 'Failed to create salary record: Invalid data or database constraint.',
                'error' => $e->getMessage()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error in SalaryController@store: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all(),
            ]);
            return response()->json([
                'message' => 'Failed to create salary record due to an internal server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Salary $salary)
    {
        return response()->json([
            'message' => 'Salary details retrieved successfully.',
            'data' => $salary->load('user')
        ], 200);
    }

    public function update(UpdateSalaryRequest $request, Salary $salary)
    {
        try {
            $validated = $request->validated();
            $salary->fill($validated);
            if (isset($validated['paid_amount']) || isset($validated['base_salary'])) {
                $salary->status = $salary->paid_amount >= $salary->base_salary ? 'paid' :
                    ($salary->paid_amount > 0 ? 'pending' : 'unpaid');
            }
            $salary->save();

            return response()->json([
                'message' => 'Salary updated successfully.',
                'data' => $salary->load('user')
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error in SalaryController@update: ' . $e->getMessage(), [
                'exception' => $e,
                'validated_data' => $validated,
            ]);
            return response()->json([
                'message' => 'Failed to update salary record.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Salary $salary)
    {
        try {
            $salary->delete();
            return response()->json([
                'message' => 'Salary deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error in SalaryController@destroy: ' . $e->getMessage(), [
                'exception' => $e,
            ]);
            return response()->json([
                'message' => 'Failed to delete salary record.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function pay(Request $request, Salary $salary)
    {
        try {
            $validated = $request->validate([
                'amount' => 'required|numeric|min:0.01',
            ]);

            $salary->paid_amount += $validated['amount'];
            $salary->status = $salary->paid_amount >= $salary->base_salary ? 'paid' :
                ($salary->paid_amount > 0 ? 'pending' : 'unpaid');
            $salary->save();

            return response()->json([
                'message' => 'Salary payment processed successfully.',
                'data' => $salary->load('user')
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error in SalaryController@pay: ' . $e->getMessage(), [
                'exception' => $e,
                'validated_data' => $validated,
            ]);
            return response()->json([
                'message' => 'Failed to process salary payment.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}