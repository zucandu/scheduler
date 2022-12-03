<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Carbon\Carbon;
use Storage;
use Http;
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
                ['expired_at', '<', Carbon::now()->format('Y-m-d')],
                'push_status' => 1
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
                    'push_status' > 0
                ]);

                if($response->failed()) {
                    if(isset($response->json()['message'])) {
                        Log::debug("Error #105032: " . $response->json()['message']);
                        return response()->json(['message' => $response->json()['message']], 422);
                    }
                }

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
