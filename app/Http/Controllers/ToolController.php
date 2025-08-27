<?php

namespace App\Http\Controllers;


use App\Models\Tool;
use App\Models\ToolCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Public view for all authenticated users
        $query = Tool::with('category')
            ->active();

        // Filter by category if provided
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search functionality
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $tools = $query->ordered()->paginate(12);
        $categories = ToolCategory::active()->ordered()->get();

        return Inertia::render('tools/index', [
            'tools' => $tools,
            'categories' => $categories,
            'currentCategory' => $request->category,
            'search' => $request->search,
        ]);
    }





    /**
     * Display the specified resource.
     */
    public function show(Tool $tool)
    {
        // Public view - only show active tools to non-admins
        if (!$tool->is_active && !auth()->user()->isAdmin()) {
            abort(404);
        }

        $tool->load('category');

        // Get related tools from the same category
        $relatedTools = Tool::with('category')
            ->where('category_id', $tool->category_id)
            ->where('id', '!=', $tool->id)
            ->active()
            ->ordered()
            ->limit(4)
            ->get();

        return Inertia::render('tools/show', [
            'tool' => $tool,
            'relatedTools' => $relatedTools,
        ]);
    }




}