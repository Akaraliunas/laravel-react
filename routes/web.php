<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\WishlistController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Wishlist;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('admin/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('admin.dashboard.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/admin/products', [ProductsController::class, 'index'])->name('admin.products.index');

    Route::post('/', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::get('/admin/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::delete('/admin/wishlist', [WishlistController::class, 'destroy'])->name('wishlist.destroy');
});

Route::get('/', [ProductsController::class, 'search'])->name('products.filter');

require __DIR__.'/auth.php';
