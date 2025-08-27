<?php

use App\Http\Controllers\AdminToolController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ToolCategoryController;
use App\Http\Controllers\ToolController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - shows welcome to guests, tools to authenticated users
Route::get('/', [HomeController::class, 'index'])->name('home');

// Public tool routes for authenticated users
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Tools browsing for all authenticated users
    Route::get('/tools', [ToolController::class, 'index'])->name('tools.index');
    Route::get('/tools/{tool}', [ToolController::class, 'show'])->name('tools.show');

    // Admin-only routes  
    Route::middleware(['auth', 'verified', App\Http\Middleware\AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
        
        // Tool Categories Management
        Route::resource('categories', ToolCategoryController::class, [
            'parameters' => ['categories' => 'tool_category']
        ]);

        // Tools Management
        Route::resource('tools', AdminToolController::class)->except(['index', 'show']);
        Route::get('/tools', [AdminToolController::class, 'index'])->name('tools.index');
        Route::get('/tools/{tool}', [AdminToolController::class, 'show'])->name('tools.show');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';