<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
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
        /* $schedule->call(function () {
			$schedules = DB::table('schedules')->get();
            foreach($schedules as $schedule) {
                Http::accept('application/json')->get($schedule->url);
                if($resp->failed()) {
                    Log::error("Console: {$schedule->url} - cannot create a backup.");
                }
            }
		})->daily(); */
        $schedule->call(function () {
            
            DB::table('products')->where([
                ['started_at', '>=', Carbon::now()->format('Y-m-d')],
                'push_status' => 0
            ])->limit(20)->get();

            // Http update product here


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
