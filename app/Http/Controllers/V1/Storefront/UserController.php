<?php

namespace App\Http\Controllers\V1\Storefront;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['user' => $this->getProfile()]);
    }

    public function getProfile()
    {
        $user = DB::table('users')->where('id', auth()->user()->id)->first();
        $user->password = null;
        return $user;
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
        //
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
    public function feedPath()
    {
        $user = $this->getProfile();
        $strtotime = strtotime($user->created_at);
        return "/tokens/{$strtotime}";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:256',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);    
        }

        $updateData = [
            'name' => $request->input('name'),
            'redeem_ratio' => $request->input('redeem_ratio', 0.01),
            'earn_ratio' => $request->input('earn_ratio', 1),
        ];

        if($request->input('password')) {
            $validator = Validator::make($request->all(), [
                "password" => 'required|confirmed|min:8',
            ]);
            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors()->first()], 422);    
            }
            $updateData['password'] = bcrypt($request->input('password'));
        }

        DB::table('users')->where('id', auth()->user()->id)->update($updateData);

        return response()->json(['user' => $this->getProfile()]);
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
