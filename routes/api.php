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
            Route::group(['prefix' => 'cron'], function() {
                Route::get('all', 'V1\Storefront\ScheduleController@index');
                Route::post('create', 'V1\Storefront\ScheduleController@store');
                Route::post('update', 'V1\Storefront\ScheduleController@update');
                Route::get('delete/{id}', 'V1\Storefront\ScheduleController@destroy');
            });
            Route::group(['prefix' => 'schedule'], function() {
                Route::get('all-sales-price', 'V1\Storefront\ScheduleController@allSalesPrice');
                Route::post('create-sales-price', 'V1\Storefront\ScheduleController@createSalesPrice');
                Route::post('update-sales-price', 'V1\Storefront\ScheduleController@updateSalesPrice');
                Route::get('delete/{id}', 'V1\Storefront\ScheduleController@destroySalesPrice');
                Route::post('add-products', 'V1\Storefront\ScheduleController@addProducts');
            });
        });

        Route::get('auto-backup', 'V1\Storefront\ScheduleController@autoBackup');

    });
    
});