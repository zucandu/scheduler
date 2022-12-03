<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->integer('group_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->string('promotion_type')->comment('bogo, fg')->default('fg');
            // if it's buy one get one, we can use discount 100% here too.
            
            $table->unsignedBigInteger('store_product_id')->nullable();
            $table->unsignedBigInteger('quantity')->default(0)->nullable();
            $table->decimal('subtotal', 15, 4)->nullable();
            $table->char('discount_type', 2)->default('p')->comment('percenttage, fixed_amount');
            $table->float('discount_value');
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotions');
    }
};
