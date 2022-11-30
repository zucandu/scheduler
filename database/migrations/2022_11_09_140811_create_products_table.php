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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('store_product_id');
            $table->string('type', 100)->comment('simple,configurable')->default('simple')->index();
            $table->string('sku')->nullable()->index();
            $table->decimal('price', 15, 4)->default(0);
            $table->decimal('sale_price', 15, 4)->default(0)->nullable();
            $table->integer('quantity')->default(0)->nullable();
            $table->float('weight')->nullable();
            $table->float('width')->nullable();
            $table->float('height')->nullable();
            $table->float('length')->nullable();
            $table->unsignedTinyInteger('visibility')->default(1);
            $table->timestamps();

            $table->unique(['user_id', 'store_product_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
