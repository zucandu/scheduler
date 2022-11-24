<?php

namespace App\Http\Controllers\V1\Storefront;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use DB;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Get product ids from keyword
        $userId = auth()->user()->id;
        $query = DB::table('promotions')->where('user_id', $userId);

        // Search
        /* $keyword = $request->input('keyword');
        if(!empty($keyword)) {
            $query->where('products.id', $keyword)
                    ->orWhere('products_description.name', 'like', "%{$keyword}%")
                    ->orWhere('products.sku', 'like', "%{$keyword}%");
        } */

        // Sort 
        $sortBy = ['col' => 'created_at', 'direction' => 'desc'];
        /* switch($request->input('sort')) {
            case 'created_date':
                $sortBy = ['col' => 'products.created_at', 'direction' => 'desc'];
            break;
            case 'a_z':
                $sortBy = ['col' => 'products_description.name', 'direction' => 'asc'];
            break;
            case 'z_a':
                $sortBy = ['col' => 'products_description.name', 'direction' => 'desc'];
            break;
            default:
                $sortBy = ['col' => 'created_at', 'direction' => 'desc'];
            break;
        } */
        $paginator = $query->orderBy($sortBy['col'], $sortBy['direction'])->paginate(20);

        return response()->json(['paginator' => $paginator]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'products' => 'required|array',
            'products.*' => 'numeric',
            'id' => 'required|exists:promotions,id'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        if(!DB::table('promotions')->where(['user_id' => auth()->user()->id, 'id' => $request->input('id')])->exists()) {
            return response()->json(['message' => "Permission denied!"], 422);
        }

        // Remove products
        DB::table('promotion_freegifts')->where('promotion_id', $request->input('id'))->delete();

        // Insert
        $inserts = [];
        foreach($request->input('products') as $pid) {
            $inserts[] = [
                'promotion_id' => $request->input('id'),
                'product_id' => $pid,
                'created_at' => Carbon::now()
            ];
        }

        return DB::table('promotion_freegifts')->insert($inserts);
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
            'title' => 'required',
            'group_id' => 'integer|nullable',
            'store_product_id' => 'integer',
            'promotion_type' => 'required|in:bogo,fg',
            'discount_type' => 'required|in:p,f',
            'discount_value' => 'required|numeric',
            'subtotal' => 'numeric',
            'limited_quantity' => 'integer',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        return DB::table('promotions')->insert(array_merge($request->all(), ['user_id' => auth()->user()->id]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!DB::table('promotions')->where(['user_id' => auth()->user()->id, 'id' => $id])->exists()) {
            return response()->json(['message' => "Permission denied"], 422);
        }

        $promotion = DB::table('promotions')->where(['user_id' => auth()->user()->id, 'id' => $id])->first();
        $promotion->products = DB::table('promotion_freegifts')->where('promotion_id', $id)->pluck('product_id')->toArray();

        return response()->json(['promotion' => $promotion]);
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
            'title' => 'required',
            'group_id' => 'integer|nullable',
            'store_product_id' => 'integer',
            'promotion_type' => 'required|in:bogo,fg',
            'discount_type' => 'required|in:p,f',
            'discount_value' => 'required|numeric',
            'subtotal' => 'numeric',
            'limited_quantity' => 'integer'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        if(!DB::table('promotions')->where(['id' => $request->input('id'), 'user_id' => auth()->user()->id])->exists()) {
            return response()->json(['message' => "Permission denied!"], 422);
        }

        $updateData = $request->all();
        switch($updateData['promotion_type']) {
            case 'fg':
                $updateData['store_product_id'] = $updateData['quantity'] = null;
                break;
            case 'bogo':
                $updateData['subtotal'] = null;
                break;
        }

        return DB::table('promotions')->where(['id' => $request->input('id'), 'user_id' => auth()->user()->id])->update($updateData);
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
            'id' => 'required|exists:promotions,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        return DB::table('promotions')->where([
            'id' => $id,
            'user_id' => auth()->user()->id
        ])->delete();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function promotions(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'store' => 'required|exists:users,store_url',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => "Zucandu Freegifts App - Permission denied."], 422);
        }

        $userId = DB::table('users')->where('store_url', $request->input('store'))->value('id');

        $promotions = DB::table('promotions')->where([
            'user_id' => $userId,
            'status' => 1
        ])->select('id', 'title', 'promotion_type', 'store_product_id', 'subtotal', 'quantity', 'discount_type', 'discount_value')->get();
        $promotions->map(function($item) {
            $item->products = DB::table('products')->whereIn('id', 
                DB::table('promotion_freegifts')->where('promotion_id', $item->id)->pluck('product_id')->toArray()
            )->pluck('store_product_id')->toArray();
        });

        return response()->json(['promotions' => $promotions]);
    }



}
