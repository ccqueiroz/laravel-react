<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', [ControllerUser::class, 'list'])->name('list');
Route::get('/edit/{id}', [ControllerUser::class, 'show'])->name('list');
Route::put('/edit/{id}', [ControllerUser::class, 'edit'])->name('listPut');
Route::post('/create', [ControllerUser::class, 'create'])->name('create');
Route::delete('/delete/{id}', [ControllerUser::class, 'delete'])->name('delete');

Route::fallback([ControllerUser::class, 'fallback']);