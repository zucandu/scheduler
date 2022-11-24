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
            $table->string('url')->nullable();
            $table->string('weekday')->nullable();
            $table->string('month')->nullable();
            $table->string('day')->nullable();
            $table->string('hour')->nullable();
            $table->string('minute')->nullable();
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
