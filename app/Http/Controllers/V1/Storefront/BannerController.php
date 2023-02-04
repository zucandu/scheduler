<?php

namespace App\Http\Controllers\V1\Storefront;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
Use Storage;
use Http;
use DB;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function download(Request $request)
    {
        $page = $request->input('page', 1);
        $storeUrl = DB::table('users')->where('id', auth()->user()->id)->value('store_url');
        $token = Storage::disk('local')->get("/stores/{$storeUrl}");
        if(empty($token)) {
            return response()->json(['message' => 'Token not found!'], 422);
        }

        $response = Http::withToken($token)->accept('application/json')->get("https://{$storeUrl}/api/v1/app/banners", [
            'page' => $page,
			'number_of_query_limit' => 10
        ]);

        $jsonData = $response->json();
        
        // Error
        if(isset($jsonData['message']) && !empty($jsonData['message'])) {
            return response()->json(['message' => $jsonData['message']], 422);
        }

        if(isset($jsonData['paginator']['data']) && count($jsonData['paginator']['data'])) {
            foreach($jsonData['paginator']['data'] as $banner) {
				DB::table('banners')->updateOrInsert(
                    ['user_id' => auth()->user()->id, 'store_banner_id' => $banner['id']],
                    [
                        'name' => $banner['translations'][0]['title'],
                        'created_at' => Carbon::now()
                    ]
                );
            }
            
            // Avoid "Too Many Attempts."
		    sleep(2);

            return response()->json(['total' => $jsonData['paginator']['total'], 'current' => $jsonData['paginator']['current_page']*$jsonData['paginator']['per_page']]);
        }

        return response()->json(['message' => 'Your sync data cannot complete at the moment. Please try again!'], 422);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function all(Request $request)
    {
        // Get product ids from keyword
        $userId = auth()->user()->id;
        $query = DB::table('banners')->where('user_id', $userId);
        $paginator = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json(['paginator' => $paginator]);
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
            'id' => 'required|exists:banners,id',
            'status' => 'required|in:0,1,2'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        DB::table('banners')->where(['id' => $request->input('id'), 'user_id' => $request->input('user_id')])->update([
            'started_at' => Carbon::parse($request->input('started_at'))->format('Y-m-d H:i'),
            'expired_at' => Carbon::parse($request->input('expired_at'))->format('Y-m-d H:i'),
            'status' => $request->input('status')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
