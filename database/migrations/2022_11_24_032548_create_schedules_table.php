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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('url')->nullable();
            $table->string('weekday', 32)->nullable();
            $table->string('month', 32)->nullable();
            $table->string('day', 32)->nullable();
            $table->string('hour', 32)->nullable();
            $table->string('minute', 32)->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'url']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedules');
    }
};
