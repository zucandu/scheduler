<?php

namespace App\Http\Controllers\V1\Storefront;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\Models\User;
use Carbon\Carbon;
use Str;
use DB;


class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function accountLogin(Request $request)
    {
        
        // Validation
        $validator = Validator::make($request->all(), [
            'store_url' => 'required',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);    
        }
 
        if (auth()->attempt($request->all())) {
            $token = auth()->user()->createToken('jwt_user')->accessToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['message' => 'Your store url or password was incorrect. Please try again.'], 401);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function accountRegister(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:4',
            'email' => 'required|email:rfc,dns',
            'password' => 'required|min:8',
            'store_url' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);    
        }

        $customer = User::create(array_merge($request->all(), [
            'password' => bcrypt($request->input('password')),
            'created_at' => Carbon::now()
        ]));
        

        return response()->json([
            'token' => $customer->createToken('jwt_user')->accessToken,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function accountForgotPassword(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'store_url' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);    
        }

        $customer = User::where('store_url', $request->input('store_url'))->first();

        if (!$customer) {
            return response()->json([
                'message' => "Your account doesn't exist. Please enter a different account and try again!"
            ], 404);
        }
        
        // The first indicates the conditions for a match and second is used to specify which fields to update.
        $passwordReset = PasswordReset::updateOrCreate([
            'email' => $customer->email
        ],[
            'token' => Str::random(60),
            'store_url' => $customer->store_url
        ]);

        if ($customer && $passwordReset) {
            $customer->notify(
                new PasswordResetRequest($passwordReset->token)
            );
        }

        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function accountResetPassword(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'token' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);    
        }

        $passwordReset = DB::table('password_resets')->where('token', $request->input('token'))->first();//PasswordReset::where('token', $request->input('token'))->first();
        if (!$passwordReset) {
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);
        }

        // There's built-in Carbon method isPast so you can use
        // to determine if date is in past or not
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            DB::table('password_resets')->where('token', $request->input('token'))->delete();
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);
        }

        $customer = User::where(['email' => $passwordReset->email, 'store_url' => $passwordReset->store_url])->first();
        if (!$customer) {
            return response()->json([
                'message' => "We can't find a user with that e-mail address."
            ], 404);
        }

        $customer->password = bcrypt($request->input('password'));
        $customer->save();
        DB::table('password_resets')->where('token', $request->input('token'))->delete();
        
        $customer->notify(new PasswordResetSuccess($passwordReset));

        return response()->json($customer);
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
