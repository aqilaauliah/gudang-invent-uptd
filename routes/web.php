<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\BarangKeluarController;
use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailChangeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\KioskController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MutasiController;
use App\Http\Controllers\PersediaanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(auth()->check() ? route('dashboard') : route('login'));
});

Route::prefix('ambil-barang')->name('kiosk.')->group(function () {
    Route::get('/', [KioskController::class, 'create'])->name('index');
    Route::post('/', [KioskController::class, 'store'])->name('store');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware('can:view-stocks')
        ->name('dashboard');

    Route::middleware('can:view-items')->group(function () {
        Route::get('/barang', [ItemController::class, 'index'])->name('barang.index');
    });
    Route::middleware('can:manage-items')->group(function () {
        Route::post('/barang', [ItemController::class, 'store'])->name('barang.store');
        Route::put('/barang/{item}', [ItemController::class, 'update'])->name('barang.update');
        Route::delete('/barang/{item}', [ItemController::class, 'destroy'])->name('barang.destroy');
    });

    Route::get('/persediaan', [PersediaanController::class, 'index'])
        ->middleware('can:view-stocks')
        ->name('persediaan.index');

    Route::middleware('can:manage-transactions')->group(function () {
        Route::get('/barang-masuk', [BarangMasukController::class, 'create'])->name('barang-masuk.create');
        Route::post('/barang-masuk', [BarangMasukController::class, 'store'])->name('barang-masuk.store');

        Route::get('/barang-keluar', [BarangKeluarController::class, 'create'])->name('barang-keluar.create');
        Route::post('/barang-keluar', [BarangKeluarController::class, 'store'])->name('barang-keluar.store');

        Route::get('/mutasi', [MutasiController::class, 'create'])->name('mutasi.create');
        Route::post('/mutasi', [MutasiController::class, 'store'])->name('mutasi.store');
    });

    Route::middleware('can:manage-assets')->group(function () {
        Route::get('/aset/create', [AssetController::class, 'create'])->name('aset.create');
        Route::post('/aset', [AssetController::class, 'store'])->name('aset.store');
        Route::get('/aset/{asset}/edit', [AssetController::class, 'edit'])->name('aset.edit');
        Route::put('/aset/{asset}', [AssetController::class, 'update'])->name('aset.update');
        Route::delete('/aset/{asset}', [AssetController::class, 'destroy'])->name('aset.destroy');
    });
    Route::middleware('can:view-assets')->group(function () {
        Route::get('/aset', [AssetController::class, 'index'])->name('aset.index');
        Route::get('/aset/{asset}', [AssetController::class, 'show'])->name('aset.show');
    });

    Route::middleware('can:view-locations')->group(function () {
        Route::get('/lokasi', [LocationController::class, 'index'])->name('lokasi.index');
        Route::get('/lokasi/{location}', [LocationController::class, 'show'])->name('lokasi.show');
    });
    Route::middleware('can:manage-locations')->group(function () {
        Route::post('/lokasi', [LocationController::class, 'store'])->name('lokasi.store');
        Route::put('/lokasi/{location}', [LocationController::class, 'update'])->name('lokasi.update');
        Route::delete('/lokasi/{location}', [LocationController::class, 'destroy'])->name('lokasi.destroy');
    });

    Route::get('/laporan', [ReportController::class, 'index'])
        ->middleware('can:view-reports')
        ->name('laporan.index');
    Route::get('/laporan/export/{format}', [ReportController::class, 'export'])
        ->middleware('can:export-reports')
        ->name('laporan.export');

    Route::middleware('can:manage-users')->group(function () {
        Route::get('/pengguna', [UserController::class, 'index'])->name('pengguna.index');
        Route::post('/pengguna', [UserController::class, 'store'])->name('pengguna.store');
        Route::put('/pengguna/{user}', [UserController::class, 'update'])->name('pengguna.update');
        Route::delete('/pengguna/{user}', [UserController::class, 'destroy'])->name('pengguna.destroy');
    });

    Route::get('/aktivitas', [ActivityController::class, 'index'])
        ->middleware('can:view-activities')
        ->name('aktivitas.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/profile/email', [EmailChangeController::class, 'send'])->name('profile.email.send');
    Route::post('/profile/email/verify', [EmailChangeController::class, 'verify'])->name('profile.email.verify');
});

require __DIR__.'/auth.php';
