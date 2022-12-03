<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Carbon\Carbon;

use Illuminate\Support\Facades\Mail;
use App\Mail\LoginCredentials;


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

/**
 * Get response from external websites
 * used for web hook from payment gateway
 */
Route::get('/authorize', function(Request $request) {
    
    // Store token
    $storeUrl = $request->input('store_url');
    $storeName = Arr::first(explode('.', $storeUrl));
    if(empty($storeName)) {
        echo "Unauthenticated";
        return false;
    }
    
    /**
     * When create the app on the zucandu.com, you can get the client_id 
     * and client_secret from the app dashboard
     */
    $clientId = config('app.client_id');
    $clientSecret = config('app.client_secret');
    
    // Verify the signature
    $payload = base64_encode(json_encode(['code' => $request->input('code'), 'store_url' => $storeUrl]));
    $hmac = hash_hmac('sha256', $payload, $clientSecret);
    if ($request->input('hmac') != $hmac) {
        echo "Invalid signature";
        return false;
    }

    $response = Http::asForm()->post("https://{$storeUrl}/api/v1/oauth/token", [
        'grant_type' => 'authorization_code',
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'code' => $request->input('code'),
    ]);
    
    $jsonData = $response->json();

    if(isset($jsonData['access_token']) && !empty($jsonData['access_token'])) {

        // Save the token
        Storage::disk('local')->put("stores/{$storeUrl}", $jsonData['access_token']);

        // Verify the store/token
        $response = Http::withToken($jsonData['access_token'])->get("https://{$storeUrl}/api/v1/app/store-owner");
        $json = $response->json();

        // Add a new user to mcfeede and auto login
        if(!empty($json)) {
            
            $password = Str::random(8);
            $createdAt = Carbon::now();
            DB::table('users')->updateOrInsert(
				['email' => $json['email'], 'store_url' => $json['domain']],
				[
					'name' => $json['name'],
					'password' => bcrypt($password),
					'created_at' => $createdAt
				]
			);
            
            // Send the email
            Mail::to($json['email'])->send(new LoginCredentials([
                'store_url' => $json['domain'],
                'password' => $password,
            ]));

            // Add webhooks here
            $appUrl = config('app.url');
            Http::withToken($jsonData['access_token'])->post("https://{$storeUrl}/api/v1/app/webhook/create", [
                'url' => "{$appUrl}/api/v1/add-product-to-cart",
                'event' => 'cart.add_product_to_cart',
            ]);

            return redirect("/login?msg=We just sent you an email with your login details.");
        }

    }

});

/**
 * App vue component
 */
Route::get('/{any}', function() {

    return view('app');

})->where('any', '.*');

