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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'description' => "Zucandu Scheduler"
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
}
