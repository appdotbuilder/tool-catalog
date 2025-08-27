<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tool_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Category name');
            $table->string('slug')->unique()->comment('URL-friendly category identifier');
            $table->text('description')->nullable()->comment('Category description');
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->boolean('is_active')->default(true)->comment('Whether the category is active');
            $table->timestamps();
            
            $table->index('slug');
            $table->index(['is_active', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tool_categories');
    }
};