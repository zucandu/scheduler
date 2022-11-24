<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
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
            
			$orders = DB::table('orders')->whereNull('tracking_number')->get();
			foreach($orders as $order) {
				
				$user = DB::table('users')->where('id', $order->user_id)->first();
				
				// Shipstation key/secret
				$apiKey = $user->api_key;
				$apiSecret = $user->api_secret;

				$response = Http::withHeaders([
					'Content-Type' => 'application/json',
					'Authorization' => 'Basic ' . base64_encode($apiKey . ':' . $apiSecret)
				])->get('https://ssapi.shipstation.com/shipments?orderId=' . $order->shipstation_order_id);
				
				$json = $response->json();
				if(isset($json['shipments']) && count($json['shipments']) > 0) {
					foreach($json['shipments'] as $shipment) {
						if(isset($shipment['trackingNumber']) && !empty($shipment['trackingNumber'])) {
							
							DB::table('orders')->where([
								'user_id' => $order->user_id,
								'shipstation_order_id' => $order->shipstation_order_id
							])->update(['tracking_number' => $shipment['trackingNumber']]);
							
							// Send data to store
							$token = Storage::disk('local')->get("stores/{$user->store_url}");
							if(empty($token)) {
								return response()->json(['message' => 'Token not found!'], 422);
							}
							
							$tmp = json_decode($order->order_data, true);
							$serviceCode = explode('_', $tmp['serviceCode']);
							$courier = $serviceCode[0];
							$trackingNumber = $shipment['trackingNumber'];
							$orderData = [
								'order_notes' => [
									'order_id' => $order->store_order_id,
									'order_status_id' => 4, //'Shipped'
									'courier' => $courier,
									'tracking_number' => $trackingNumber,
									'note' => "Order #{$order->store_order_id} was shipped by {$courier}. The tracking number is #: {$trackingNumber}."
								],
								'notify' => 'email'
							];
							$response = Http::withToken($token)->accept('application/json')->post("https://{$user->store_url}/api/v1/app/update-order-status", $orderData);
							
						}
					}
				}
			}
			
        })->hourly();
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
