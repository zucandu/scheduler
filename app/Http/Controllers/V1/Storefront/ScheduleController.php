<?php

namespace App\Http\Controllers\V1\Storefront;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Storage;
use Http;
use Log;
use DB;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $schedules = DB::table('schedules')->where('user_id', auth()->user()->id)->get();
        return response()->json(['schedules' => $schedules]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'work' => 'required|in:auto_backup',
            'common_setting' => 'numeric',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }
        $appURL = config('app.url');
        $url = NULL;
        switch($request->input('work')) {
            case 'auto_backup':
                $url = "{$appURL}/api/v1/storefront/auto-backup?user_id=" . auth()->user()->id;
                break;
        }

        return DB::table('schedules')->insert([
            'user_id' => auth()->user()->id,
            'name' => $request->input('name'),
            'url' => $url,
            'common_setting' => $request->input('common_setting', 0),
            'weekday' => $request->input('weekday', NULL),
            'month' => $request->input('month', NULL),
            'day' => $request->input('day', NULL),
            'hour' => $request->input('hour', NULL),
            'minute' => $request->input('minute', NULL),
            'work' => $request->input('work', NULL),
            'created_at' => Carbon::now()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function autoBackup(Request $request)
    {

        $storeUrl = DB::table('users')->where('id', $request->input('user_id'))->value('store_url');
        $token = Storage::disk('local')->get("/stores/{$storeUrl}");

        // Get current backup and max daily backup
        $user = DB::table('users')->where('id', $request->input('user_id'))->first();
        $currentBackup = $user->current_backup;
        if($currentBackup < $user->max_daily_backup) {
            $currentBackup++;
        } else {
            $currentBackup = 1;
        }

        $resp = Http::withToken($token)->accept('application/json')->post("https://{$storeUrl}/api/v1/app/create-backup", [
            'name' => "Zucandu_Scheduler_{$currentBackup}",
            'description' => "Zucandu Scheduler {$currentBackup} - " . Carbon::now()->format('M d, Y h:ia')
        ]);
        if($resp->failed()) {
            Log::error("{$storeUrl} - cannot create a backup.");
        }
        
        // Update
        DB::table('users')->where('id', $user->id)->update(['current_backup' => $currentBackup]);

        // Updated scheduler
        DB::table('schedules')->where(['user_id' => $user->id, 'work' => 'auto_backup'])->update(['created_at' => Carbon::now()]);

        return true;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:schedules,id',
            'name' => 'required',
            'common_setting' => 'numeric',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        return DB::table('schedules')->where(['id' => $request->input('id'), 'user_id' => auth()->user()->id])->update([
            'name' => $request->input('name'),
            'url' => $request->input('url', NULL),
            'common_setting' => $request->input('common_setting', 0),
            'weekday' => $request->input('weekday', NULL),
            'month' => $request->input('month', NULL),
            'day' => $request->input('day', NULL),
            'hour' => $request->input('hour', NULL),
            'minute' => $request->input('minute', NULL),
            'created_at' => Carbon::now()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|exists:schedules,id'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        return DB::table('schedules')->where('id', $id)->delete();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allSalesPrice()
    {
        return response()->json(['schedule_sales_price' => $this->showSalesPrice()]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showSalesPrice()
    {
        $schedules = DB::table('schedule_sales_price')->where(['user_id' => auth()->user()->id, 'deleted_status' => 0])->get();
        $schedules->map(function($item) {
            $item->product_ids = DB::table('products')->where('schedule_sale_price_id', $item->id)->pluck('id')->toArray();
        });
        return $schedules;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createSalesPrice(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'discount_amount' => 'required|min:1',
            'started_at' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $startedAt = Carbon::parse($request->input('started_at'))->format('Y-m-d H:i:s');
        $expiredAt = NULL;
        if($request->input('expired_at')) {
            $expiredAt = Carbon::parse($request->input('expired_at'))->format('Y-m-d H:i:s');;
        }

        DB::table('schedule_sales_price')->insert([
            'user_id' => auth()->user()->id,
            'name' => $request->input('name'),
            'discount_amount' => $request->input('discount_amount'),
            'started_at' => $startedAt,
            'expired_at' => $expiredAt
        ]);

        return response()->json(['schedule_sales_price' => $this->showSalesPrice()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateSalesPrice(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:schedule_sales_price,id',
            'name' => 'required',
            'discount_amount' => 'required|min:1',
            'started_at' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $startedAt = Carbon::parse($request->input('started_at'))->format('Y-m-d H:i:s');
        $expiredAt = NULL;
        if($request->input('expired_at')) {
            $expiredAt = Carbon::parse($request->input('expired_at'))->format('Y-m-d H:i:s');;
        }

        DB::table('schedule_sales_price')->where(['id' => $request->input('id'), 'user_id' => auth()->user()->id, 'deleted_status' => 0])->update([
            'name' => $request->input('name'),
            'discount_amount' => $request->input('discount_amount'),
            'started_at' => $startedAt,
            'expired_at' => $expiredAt
        ]);

        // Update products
        $this->_addProductsToSalesPrice($request->input('id'), DB::table('products')->where('schedule_sale_price_id', $request->input('id'))->pluck('id')->toArray());
         

        return response()->json(['schedule_sales_price' => $this->showSalesPrice()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroySalesPrice($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|exists:schedule_sales_price,id'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Remove by updating the deleted_status = 1
        DB::table('schedule_sales_price')->where(['id' => $id, 'user_id' => auth()->user()->id])->update([
            'deleted_status' => 1,
            'expired_at' => Carbon::now()->subDay()->format('Y-m-d')
        ]);

        // Update products
        $this->_addProductsToSalesPrice($id, DB::table('products')->where('schedule_sale_price_id', $id)->pluck('id')->toArray());

        return true;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addProducts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sales_price_id' => 'required|exists:schedule_sales_price,id',
            'product_ids' => 'required|array',
            'product_ids.*' => 'integer'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Update products
        $this->_addProductsToSalesPrice($request->input('sales_price_id'), $request->input('product_ids'));

        return true;
    }

    /**
     * Add Product to sales price
     */
    public function _addProductsToSalesPrice($salesPriceId, $productIds)
    {

        $schedule = DB::table('schedule_sales_price')->where(['id' => $salesPriceId, 'user_id' => auth()->user()->id])->first();
        $startedAt = $expiredAt = NULL;
        if($schedule->started_at) {
            $startedAt = Carbon::parse($schedule->started_at)->format('Y-m-d');
        }
        if($schedule->expired_at) {
            $expiredAt = Carbon::parse($schedule->expired_at)->format('Y-m-d');
        }

        // Reset products if products does not exists in array
        DB::table('products')->where([
            'schedule_sale_price_id' => $salesPriceId,
            'user_id' => auth()->user()->id
        ])->whereNotIn('id', $productIds)->update([
            'sale_price' => NULL,
            'started_at' => NULL,
            'expired_at' => NULL,
            'schedule_sale_price_id' => 0
        ]);

        // Add
        foreach($productIds as $id) {

            $productQuery = DB::table('products')->where('id', $id)->first();
            $discountAmount = $schedule->discount_amount;
            if(strpos($discountAmount, '%') !== false) {
                $discountAmount = str_replace('%', '', $discountAmount);
                $salePrice = $productQuery->price - $productQuery->price*$discountAmount/100;
            } else {
                $salePrice = $productQuery->price - $discountAmount;
                if($salePrice < 0) {
                    $salePrice = 0;
                }
            }

            DB::table('products')->where('id', $id)->update([
                'sale_price' => $salePrice,
                'started_at' => $startedAt,
                'expired_at' => $expiredAt,
                'schedule_sale_price_id' => $salesPriceId,
                'push_status' => 0
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function salesCountdownTimerFromProductId($store, $productId)
    {
        
        $user = DB::table('users')->where('store_url', $store)->first();
        if(!$user) {
            return response()->json(['status' => 'ERROR', 'message' => "Your store not found!"], 422);
        }

        $salesDetails = DB::table('schedule_sales_price')->where('id', DB::table('products')->where([
            'store_product_id' => $productId,
            'user_id' => $user->id
        ])->value('schedule_sale_price_id'))->first();
        if(!$salesDetails) {
            return response()->json(['status' => 'ERROR', 'message' => "Sales price not found"], 422);
        }
        
        $salesDetails->date_countdown = Carbon::parse($salesDetails->expired_at)->format('F d, Y');

        return response()->json(['sales_details' => $salesDetails]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function productsOnSale($store)
    {
        
        $user = DB::table('users')->where('store_url', $store)->first();
        if(!$user) {
            return response()->json(['status' => 'ERROR', 'message' => "Your store not found!"], 422);
        }

        // 
        $productIds = DB::table('products')->where([
            ['started_at', '<=', Carbon::now()->format('Y-m-d')],
            ['expired_at', '>', Carbon::now()->format('Y-m-d')]
        ])->pluck('store_product_id')->toArray();

        return response()->json(['product_ids' => $productIds]);
    }

}
