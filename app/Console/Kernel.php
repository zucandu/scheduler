<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Carbon\Carbon;
use Storage;
use Http;
use Log;
use DB;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        
        $schedule->call(function () {

            /**
             * UPDATE SALE/SPECIALS PRICE
             */
            $products = DB::table('products')->where([
                ['started_at', '<=', Carbon::now()->format('Y-m-d')],
                ['expired_at', '>', Carbon::now()->format('Y-m-d')],
                'push_status' => 0
            ])->limit(20)->get();

            // Http update product here
            foreach($products as $product) {

                $storeURL = DB::table('users')->where('id', $product->user_id)->value('store_url');
                $token = Storage::disk('local')->get("/stores/{$storeURL}");
                if(empty($token)) {
                    Log::debug("Error #105011: Token not found!");
                    return response()->json(['message' => 'Token not found!'], 422);
                }
                $response = Http::withToken($token)->accept('application/json')->post("https://{$storeURL}/api/v1/app/update-product", [
                    'id' => $product->store_product_id,
                    'sale_price' => $product->sale_price,
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'meta' => [
                        'schedule_sale_price_id' => $product->schedule_sale_price_id
                    ]
                ]);

                // Updated push status
                DB::table('products')->where('id', $product->id)->update(['push_status' => 1]);

                if($response->failed()) {
                    if(isset($response->json()['message'])) {
                        Log::debug("Error #105032: " . $response->json()['message']);
                        return response()->json(['message' => $response->json()['message']], 422);
                    }
                }

            }

            /**
             * REMOVE SALE PRODUCTS WHEN EXPIRED
             */
            $products = DB::table('products')->where([
                ['expired_at', '<', Carbon::now()->format('Y-m-d')]
            ])->limit(20)->get();

            // Http update product here
            foreach($products as $product) {

                $storeURL = DB::table('users')->where('id', $product->user_id)->value('store_url');
                $token = Storage::disk('local')->get("/stores/{$storeURL}");
                if(empty($token)) {
                    Log::debug("Error #105011: Token not found!");
                    return response()->json(['message' => 'Token not found!'], 422);
                }
                $response = Http::withToken($token)->accept('application/json')->post("https://{$storeURL}/api/v1/app/update-product", [
                    'id' => $product->store_product_id,
                    'sale_price' => 0,
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ]);

                // Updated push status
                DB::table('products')->where('id', $product->id)->update([
                    'sale_price' => NULL,
                    'started_at' => NULL,
                    'expired_at' => NULL,
                    'schedule_sale_price_id' => 0,
                    'push_status' => 0
                ]);

                if($response->failed()) {
                    if(isset($response->json()['message'])) {
                        Log::debug("Error #105032: " . $response->json()['message']);
                        return response()->json(['message' => $response->json()['message']], 422);
                    }
                }

            }

            // Run backup
            $schedules = DB::table('schedules')->where([
                ['created_at', '<', Carbon::now()->format('Y-m-d')]
            ])->limit(5)->get();
            foreach($schedules as $schedule) {
                $resp = Http::accept('application/json')->get($schedule->url);
                if($resp->failed()) {
                    Log::error("Console: {$schedule->url} - cannot create a backup.");
                }
            }

            // Enable banners
            $enableBanners = DB::table('banners')->where([
                ['started_at', '<=', Carbon::now()->format('Y-m-d H:i')],
                'status' => 0
            ])->limit(5)->get();
            foreach($enableBanners as $banner) {
                $storeURL = DB::table('users')->where('id', $banner->user_id)->value('store_url');
                $token = Storage::disk('local')->get("/stores/{$storeURL}");
                if(empty($token)) {
                    Log::debug("Error #105032: Token not found!");
                    return response()->json(['message' => 'Token not found!'], 422);
                }
                $response = Http::withToken($token)->accept('application/json')->post("https://{$storeURL}/api/v1/app/update-banner-status", [
                    'id' => $banner->store_banner_id,
                    'status' => 1
                ]);

                // Updated push status
                DB::table('banners')->where('id', $banner->id)->update(['status' => 1]);
            }

            // Disable banners
            $disableBanners = DB::table('banners')->where([
                ['expired_at', '<=', Carbon::now()->format('Y-m-d H:i')],
                'status' => 1
            ])->limit(5)->get();
            foreach($disableBanners as $banner) {
                $storeURL = DB::table('users')->where('id', $banner->user_id)->value('store_url');
                $token = Storage::disk('local')->get("/stores/{$storeURL}");
                if(empty($token)) {
                    Log::debug("Error #105032: Token not found!");
                    return response()->json(['message' => 'Token not found!'], 422);
                }
                $response = Http::withToken($token)->accept('application/json')->post("https://{$storeURL}/api/v1/app/update-banner-status", [
                    'id' => $banner->store_banner_id,
                    'status' => 0
                ]);

                // Updated push status
                DB::table('banners')->where('id', $banner->id)->update(['status' => 2]);
            }

		})->everyMinute();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
