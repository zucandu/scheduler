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

Route::group(['prefix' => 'v1'], function() {

    /**
     * Frontend
     */
    Route::group(['prefix' => 'storefront', 'middleware' => ['throttle:60,1']], function() {

        Route::post('login', 'V1\Storefront\AuthController@accountLogin');
        Route::post('register', 'V1\Storefront\AuthController@accountRegister');
        Route::post('forgot-password', 'V1\Storefront\AuthController@accountForgotPassword');
        Route::post('reset-password', 'V1\Storefront\AuthController@accountResetPassword');
        Route::get('promotions', 'V1\Storefront\PromotionController@promotions');

        Route::group(['prefix' => 'user', 'middleware' => ['auth:api']], function() {
            Route::get('profile', 'V1\Storefront\UserController@index');
            Route::post('update-profile', 'V1\Storefront\UserController@update');
            Route::get('products', 'V1\Storefront\ProductController@products');
            Route::get('download-products', 'V1\Storefront\ProductController@downloadProducts');
            Route::group(['prefix' => 'promotion'], function() {
                Route::get('all', 'V1\Storefront\PromotionController@index');
                Route::post('create', 'V1\Storefront\PromotionController@store');
                Route::post('update', 'V1\Storefront\PromotionController@update');
                Route::get('delete/{id}', 'V1\Storefront\PromotionController@destroy');
                Route::get('{id}', 'V1\Storefront\PromotionController@show');
                Route::post('add-products', 'V1\Storefront\PromotionController@create');
            });
        });

    });

    Route::post('add-product-to-cart', 'V1\Storefront\ProductController@addProductToCart');
    Route::post('remove-cart-product', 'V1\Storefront\ProductController@removeCartProduct');

    
});