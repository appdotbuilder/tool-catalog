<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreToolCategoryRequest;
use App\Http\Requests\UpdateToolCategoryRequest;
use App\Models\ToolCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = ToolCategory::withCount('tools')
            ->ordered()
            ->paginate(20);

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToolCategoryRequest $request)
    {
        $category = ToolCategory::create($request->validated());

        return redirect()->route('admin.categories.show', $category)
            ->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ToolCategory $toolCategory)
    {
        $toolCategory->load(['tools' => function ($query) {
            $query->ordered();
        }]);

        return Inertia::render('admin/categories/show', [
            'category' => $toolCategory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ToolCategory $toolCategory)
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $toolCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateToolCategoryRequest $request, ToolCategory $toolCategory)
    {
        $toolCategory->update($request->validated());

        return redirect()->route('admin.categories.show', $toolCategory)
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ToolCategory $toolCategory)
    {
        $toolCategory->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}