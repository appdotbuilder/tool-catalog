<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use App\Models\ToolCategory;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with tools for members or welcome page for guests.
     */
    public function index()
    {
        // If user is not authenticated, show welcome page
        if (!auth()->check()) {
            return Inertia::render('welcome');
        }

        // Load featured tools for authenticated users
        $featuredTools = Tool::with('category')
            ->active()
            ->featured()
            ->ordered()
            ->limit(6)
            ->get();

        // Load all categories with their tools
        $categoriesWithTools = ToolCategory::with(['activeTools' => function ($query) {
            $query->limit(4); // Show only first 4 tools per category on home page
        }])
            ->active()
            ->ordered()
            ->get();

        return Inertia::render('home', [
            'featuredTools' => $featuredTools,
            'categoriesWithTools' => $categoriesWithTools,
            'isAdmin' => auth()->user()->isAdmin(),
        ]);
    }
}