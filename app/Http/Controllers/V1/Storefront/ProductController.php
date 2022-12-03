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

        $response = Http::withToken($token)->accept('application/json')->get("http://localhost:8001/api/v1/app/products", [
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
