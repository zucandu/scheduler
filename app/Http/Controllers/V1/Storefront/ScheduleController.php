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
            'minute' => $request->input('minute', NULL)
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

        $resp = Http::withToken($token)->accept('application/json')->post("https://{$storeUrl}/api/v1/app/create-backup", [
            'description' => "Zucandu Scheduler - " . Carbon::now()->format('M d, Y h:ia')
        ]);
        if($resp->failed()) {
            Log::error("{$storeUrl} - cannot create a backup.");
        }
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
            'minute' => $request->input('minute', NULL)
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
        $schedules = DB::table('schedule_sales_price')->get();
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

        DB::table('schedule_sales_price')->where('id', $request->input('id'))->update([
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
    public function destroySalesPrice($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|exists:schedule_sales_price,id'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        DB::table('products')->where('schedule_sale_price_id', $id)->update([
            'sale_price' => NULL,
            'started_at' => NULL,
            'expired_at' => NULL,
            'schedule_sale_price_id' => 0
        ]);

        return DB::table('schedule_sales_price')->where('id', $id)->delete();
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

        $productIds = $request->input('product_ids');
        $schedule = DB::table('schedule_sales_price')->where('id', $request->input('sales_price_id'))->first();
        $startedAt = $expiredAt = NULL;
        if($schedule->started_at) {
            $startedAt = Carbon::parse($schedule->started_at)->format('Y-m-d');
        }
        if($schedule->expired_at) {
            $expiredAt = Carbon::parse($schedule->expired_at)->format('Y-m-d');
        }
        foreach($productIds as $id) {
            DB::table('products')->where('id', $id)->update([
                'started_at' => $startedAt,
                'expired_at' => $expiredAt,
                'schedule_sale_price_id' => $request->input('sales_price_id')
            ]);
        }

        return true;
    }

}
