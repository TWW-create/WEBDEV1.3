<?php

use App\Http\Controllers\AddressInfoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', function () {
    return 'bara web test';
});
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('menu', [MenuController::class, 'index']);

Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::get('subcategories', [SubCategoryController::class, 'index']);
Route::get('subcategories/{id}', [SubCategoryController::class, 'show']);
Route::get('product-types', [ProductTypeController::class, 'index']);
Route::get('product-types/{id}', [ProductTypeController::class, 'show']);
Route::get('tags', [TagController::class, 'index']);
Route::get('tags/{id}', [TagController::class, 'show']);

Route::get('/banners', [BannerController::class, 'index']);
Route::get('/banners/{id}', [BannerController::class, 'show']);

// Authenticated routes
Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
    Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])
        ->middleware('throttle:6,1')
        ->name('verification.resend');

    Route::get('address-infos', [AddressInfoController::class, 'index']);
    Route::post('address-infos', [AddressInfoController::class, 'store']);
    Route::get('address-infos/{id}', [AddressInfoController::class, 'show']);
    Route::put('address-infos/{id}', [AddressInfoController::class, 'update']);
    Route::delete('address-infos/{id}', [AddressInfoController::class, 'destroy']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::put('orders/{id}', [OrderController::class, 'update']);
    Route::delete('orders/{id}', [OrderController::class, 'destroy']);

    Route::get('order-items', [OrderItemController::class, 'index']);
    Route::post('order-items', [OrderItemController::class, 'store']);
    Route::get('order-items/{id}', [OrderItemController::class, 'show']);
    Route::put('order-items/{id}', [OrderItemController::class, 'update']);
    Route::delete('order-items/{id}', [OrderItemController::class, 'destroy']);

    Route::get('transactions', [TransactionController::class, 'index']);
    Route::post('transactions', [TransactionController::class, 'store']);
    Route::get('transactions/{id}', [TransactionController::class, 'show']);
    Route::put('transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('transactions/{id}', [TransactionController::class, 'destroy']);

    Route::get('views', [ViewController::class, 'index']);
    Route::post('views', [ViewController::class, 'store']);
    Route::get('views/{id}', [ViewController::class, 'show']);
    Route::put('views/{id}', [ViewController::class, 'update']);
    Route::delete('views/{id}', [ViewController::class, 'destroy']);
});

// Admin routes
Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/users', [AdminController::class, 'getAllUsers']);
    Route::post('/make-admin/{id}', [AdminController::class, 'makeAdmin']);

    Route::post('/banners', [BannerController::class, 'store']);
    Route::put('/banners/{id}', [BannerController::class, 'update']);
    Route::delete('/banners/{id}', [BannerController::class, 'destroy']);

    Route::get('/newsletter/subscribers', [NewsletterController::class, 'index']);

    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
    Route::delete('/blogs/media/{id}', [BlogController::class, 'deleteMedia']);

    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('subcategories', [SubCategoryController::class, 'store']);
    Route::put('subcategories/{id}', [SubCategoryController::class, 'update']);
    Route::delete('subcategories/{id}', [SubCategoryController::class, 'destroy']);

    Route::post('product-types', [ProductTypeController::class, 'store']);
    Route::put('product-types/{id}', [ProductTypeController::class, 'update']);
    Route::delete('product-types/{id}', [ProductTypeController::class, 'destroy']);

    Route::post('tags', [TagController::class, 'store']);
    Route::put('tags/{id}', [TagController::class, 'update']);
    Route::delete('tags/{id}', [TagController::class, 'destroy']);

    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
});
