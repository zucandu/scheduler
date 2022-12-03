<?php

namespace App\Http\Controllers\V1\Storefront;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
Use Storage;
use Http;
use DB;

class ProductController extends Controller
{

    private $locale = 'en';
    private $numberOfQueries = 20;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addProductToCart(Request $request)
    {
        
        // Validate
        $validator = Validator::make($request->input('data'), [
            'id' => 'required|integer',
            'cart_quantity' => 'required|integer',
            'current_cart_total' => 'required|numeric',
            'current_cart_items' => 'required|array'
        ]);
        if($validator->fails()) {
            return response()->json(['status' => 'ERROR', 'message' => $validator->errors()->first()], 422);
        }

        $clientId = strtolower(config('app.client_id'));
        $clientSecret = config('app.client_secret');
    
        // Verify the signature
        $payload = base64_encode(json_encode($request->input('data')));
        $hmac = hash_hmac('sha256', $payload, $clientSecret);

        if($request->header('X-Zucandu-Webhook-Signature') !== $hmac) {
            return response()->json(['status' => 'ERROR', 'message' => 'Invalid signature'], 422);
        }

        $userId = DB::table('users')->where('store_url', $request->header('x-zucandu-store-url'))->value('id');
        $storeProductId = $request->input('data.id');
        $product = DB::table('products')->where(['user_id' => $userId, 'store_product_id' => $storeProductId])->first();
        $subtotal = $request->input('data.current_cart_total');
        $numberOfCartItems = $request->input('data.current_cart_items');
        $cartQty = $request->input('data.cart_quantity');
        $handledProduct = [];

        // Check free gifts condition
        $promotions = DB::table('promotions')->where([
            'user_id' => $userId,
            'promotion_type' => 'fg',
            'status' => 1,
            ['subtotal', '<=', $subtotal]
        ])->get();

        foreach($promotions as $fg) {
            $freeGiftIds = DB::table('promotion_freegifts')->where('promotion_id', $fg->id)->pluck('product_id')->toArray();
            if(in_array($product->id, $freeGiftIds)) {

                // Check if the gift has been used.
                $availableGift = true;
                foreach($numberOfCartItems as $cartItem) {
                    $clientIdFromProduct = explode('!', $cartItem['id']);
                    if(isset($clientIdFromProduct[1]) && !empty($clientIdFromProduct[1]) && $clientIdFromProduct[1] === $clientId) {
                        /* $groupId = DB::table('promotions')->where('id', DB::table('promotion_freegifts')->where([
                            'promotion_id' => $fg->id,
                            'product_id' => $product->id
                        ])->value('promotion_id'))->value('group_id'); */
                        if(isset($cartItem['conditions']['unique_id']) && $cartItem['conditions']['unique_id'] === $fg->group_id && (int)$fg->group_id > 0) {
                            $availableGift = false;
                        }
                    }
                }

                // Gift is available to use
                if($availableGift) {

                    // product_hash is used to identify product between the online store and app
                    // to update/remove data
                    $handledProduct['product_hash'] = $clientId;

                    // Set max quantity
                    $handledProduct['product_limit'] = $fg->limited_quantity;
                    
                    // Use to re-check condition on the online store
                    $handledProduct['conditions'] = ['subtotal' => $fg->subtotal, 'unique_id' => $fg->group_id];

                    // Display data for users on the online store
                    $handledProduct['meta'] = $fg->title;

                    switch($fg->discount_type) {
                        case 'p':
                            $handledProduct['override_price'] = $product->price - ($product->price * $fg->discount_value/100);
                            break;
                        case 'f';
                            $v = $product->price - $fg->discount_value;
                            $v = $v < 0 ? 0 : $v;
                            $handledProduct['override_price'] = $v;
                            break;
                    }
                }
            }
        }

        // Start BOGO
        // Get total quantity of product
        $key = array_search($storeProductId, array_column($numberOfCartItems, 'id'));
        $totalQty = $numberOfCartItems[$key]['qty'];

        // Query bogo
        $bogoPromo = DB::table('promotions')->where([
            'user_id' => $userId,
            'promotion_type' => 'bogo',
            'status' => 1,
            'store_product_id' => $storeProductId,
            ['quantity', '<=', $totalQty]
        ])->orderByDesc('quantity')->first();

        if($bogoPromo) {
            
            $bogoIds = DB::table('promotion_freegifts')->where('promotion_id', $bogoPromo->id)->pluck('product_id')->toArray();

            // Check if the gift has been used.
            $availableBogo = true;
            
            if(in_array($product->id, $bogoIds)) {
                foreach($numberOfCartItems as $cartItem) {
                    $clientIdFromProduct = explode('!', $cartItem['id']);
                    if(isset($clientIdFromProduct[1]) && !empty($clientIdFromProduct[1]) && $clientIdFromProduct[1] === $clientId) {
                        if(isset($cartItem['conditions']['unique_id']) && $cartItem['conditions']['unique_id'] === $bogoPromo->group_id && (int)$bogoPromo->group_id > 0) {
                            $availableBogo = false;
                        }
                    }
                }
            }
            
            if($availableBogo) {

                // product_hash is used to identify product between the online store and app
                // to update/remove data
                $handledProduct['product_hash'] = $clientId;

                // Set max quantity
                $handledProduct['product_limit'] = $bogoPromo->limited_quantity;

                // Use to re-check condition on the online store
                $handledProduct['conditions'] = ['product_id' => $bogoPromo->store_product_id, 'quantity' => $bogoPromo->quantity, 'unique_id' => $bogoPromo->group_id];

                // Display data for users on the online store
                $handledProduct['meta'] = $bogoPromo->title;
                
                switch($bogoPromo->discount_type) {
                    case 'p':
                        $handledProduct['override_price'] = $product->price - ($product->price * $bogoPromo->discount_value/100);
                        break;
                    case 'f';
                        $v = $product->price - $bogoPromo->discount_value;
                        $v = $v < 0 ? 0 : $v;
                        $handledProduct['override_price'] = $v;
                        break;
                }
            }
        }
        
        return response()->json(['cart.add_product_to_cart' => $handledProduct]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function removeCartProduct(Request $request)
    {
        return response()->json(['cart.remove_cart_product' => $request->all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function products(Request $request)
    {
        // Get product ids from keyword
        $userId = auth()->user()->id;
        $query = DB::table('products')->join('products_description', 'products.id', '=', 'products_description.product_id')->where('user_id', $userId);

        // Search
        $keyword = $request->input('keyword');
        if(!empty($keyword)) {
            $query->where('products.id', $keyword)
                    ->orWhere('products_description.name', 'like', "%{$keyword}%")
                    ->orWhere('products.sku', 'like', "%{$keyword}%")
                    ->orWhere('products.store_product_id', 'like', "%{$keyword}%");
        }

        // Sort by
        switch($request->input('sort')) {
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
                $sortBy = ['col' => 'products.created_at', 'direction' => 'desc'];
            break;
        }
        $paginator = $query->orderBy($sortBy['col'], $sortBy['direction'])->paginate($this->numberOfQueries);

        return response()->json(['paginator' => $paginator]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function downloadProducts(Request $request)
    {
        $page = $request->input('page', 1);
        $storeUrl = DB::table('users')->where('id', auth()->user()->id)->value('store_url');
        $token = Storage::disk('local')->get("/stores/{$storeUrl}");
        if(empty($token)) {
            return response()->json(['message' => 'Token not found!'], 422);
        }

        $response = Http::withToken($token)->accept('application/json')->get("https://{$storeUrl}/api/v1/app/products", [
            'page' => $page,
			'number_of_query_limit' => 10
        ]);

        $jsonData = $response->json();
        
        // Error
        if(isset($jsonData['message']) && !empty($jsonData['message'])) {
            return response()->json(['message' => $jsonData['message']], 422);
        }

        if(isset($jsonData['paginator']['data']) && count($jsonData['paginator']['data'])) {
            foreach($jsonData['paginator']['data'] as $product) {
				$productId = DB::table('products')->where(['user_id' => auth()->user()->id, 'store_product_id' => $product['id']])->value('id');
                if(!$productId) {

                    $productId = DB::table('products')->insertGetId([
                        'user_id' => auth()->user()->id,
                        'store_product_id' => $product['id'],
                        'type' => $product['type'],
                        'sku' => $product['sku'],
                        'price' => $product['price'],
                        'sale_price' => $product['sale_price'],
                        'quantity' => $product['quantity'],
                        'weight' => $product['weight'],
                        'width' => $product['width'],
                        'height' => $product['height'],
                        'length' => $product['length'],
                        'visibility' => $product['visibility'],
                        'created_at' => Carbon::now()
                    ]);

                    $nameK = array_search($this->locale, array_column($product['translations'], 'locale'));
                    DB::table('products_description')->insert([
                        'product_id' => $productId,
                        'locale' => $this->locale,
                        'name' => $product['translations'][$nameK]['name'],
                        'slug' => $product['translations'][$nameK]['slug'],
                        'created_at' => Carbon::now()
                    ]);

                } else {
                    $productId = DB::table('products')->where(['user_id' => auth()->user()->id, 'store_product_id' => $product['id']])->value('id');
                    DB::table('products')->where('id', $productId)->update([
                        'type' => $product['type'],
                        'sku' => $product['sku'],
                        'price' => $product['price'],
                        'sale_price' => $product['sale_price'],
                        'quantity' => $product['quantity'],
                        'weight' => $product['weight'],
                        'width' => $product['width'],
                        'height' => $product['height'],
                        'length' => $product['length'],
                        'visibility' => $product['visibility'],
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]);

                    $nameK = array_search($this->locale, array_column($product['translations'], 'locale'));
                    DB::table('products_description')->where(['id' => $productId, 'locale' => $this->locale])->update([
                        'name' => $product['translations'][$nameK]['name'],
                        'slug' => $product['translations'][$nameK]['slug'],
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]);
                }
            }
            
            // Avoid "Too Many Attempts."
		    sleep(2);

            return response()->json(['total' => $jsonData['paginator']['total'], 'current' => $jsonData['paginator']['current_page']*$jsonData['paginator']['per_page']]);
        }

        return response()->json(['message' => 'Your sync data cannot complete at the moment. Please try again!'], 422);
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
