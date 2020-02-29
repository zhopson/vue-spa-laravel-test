<?php

use Illuminate\Http\Request;

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


Route::prefix('auth')->group(function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');

    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');

        Route::namespace('Api')->group(function () {// server/api/
            Route::get('/users', 'UsersController@index')->middleware('isAdmin');
            Route::get('/users_all', 'UsersController@index_all')->middleware('isAdmin');
            Route::post('/users', 'UsersController@store')->middleware('isAdmin');
            Route::get('/users/{user}', 'UsersController@show')->middleware('isAdminOrSelf');
            Route::put('/users/{user}', 'UsersController@update')->middleware('isAdminOrSelf');
            Route::delete('/users/{user}', 'UsersController@destroy')->middleware('isAdminOrSelf');
        });
    });
});

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

// Route::get('/users', function () {
//     if (rand(1, 10) < 3) {
//         abort(500, 'We could not retrieve the users');
//     }
//     return factory('App\User', 10)->make();
// });

// Route::namespace('Api')->group(function () {
//     Route::get('/users', 'UsersController@index');
//     Route::get('/users_all', 'UsersController@index_all');
//     Route::post('/users', 'UsersController@store');
//     Route::get('/users/{user}', 'UsersController@show');
//     Route::put('/users/{user}', 'UsersController@update');
//     Route::delete('/users/{user}', 'UsersController@destroy');
// });

