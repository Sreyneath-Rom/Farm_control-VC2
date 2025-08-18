<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EquipmentMaintenanceController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SavingController;
use App\Http\Controllers\SupplireController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WithdrawalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// authentication

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// Resources
Route::resource('users', UserController::class);
Route::resource('staff', StaffController::class);
Route::resource('materials', MaterialController::class);
Route::put('/materials/{id}/decrease-stock', [MaterialController::class, 'decreaseStock']);
Route::resource('supplires', SupplireController::class);
Route::apiResource('borrowings', BorrowingController::class);
Route::resource('equipment_maintenance', EquipmentMaintenanceController::class);
Route::resource('equipment', EquipmentController::class);
Route::resource('withdrawals', WithdrawalController::class);
Route::resource('savings', SavingController::class);
Route::resource('salaries', SalaryController::class);
Route::post('/salaries/{salary}/pay', [SalaryController::class, 'pay']);
Route::resource('sales', SaleController::class);
