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
        Schema::create('schedule_sales_price', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('discount_amount');
            $table->dateTime('started_at', $precision = 0)->nullable();
            $table->dateTime('expired_at', $precision = 0)->nullable();
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
        Schema::dropIfExists('schedule_sales_price');
    }
};
