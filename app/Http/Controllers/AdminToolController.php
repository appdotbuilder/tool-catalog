<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreToolRequest;
use App\Http\Requests\UpdateToolRequest;
use App\Models\Tool;
use App\Models\ToolCategory;
use Inertia\Inertia;

class AdminToolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tools = Tool::with('category')
            ->ordered()
            ->paginate(20);

        return Inertia::render('admin/tools/index', [
            'tools' => $tools,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = ToolCategory::active()->ordered()->get();

        return Inertia::render('admin/tools/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToolRequest $request)
    {
        $tool = Tool::create($request->validated());

        return redirect()->route('admin.tools.show', $tool)
            ->with('success', 'Tool created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tool $tool)
    {
        $tool->load('category');

        return Inertia::render('admin/tools/show', [
            'tool' => $tool,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tool $tool)
    {
        $categories = ToolCategory::active()->ordered()->get();

        return Inertia::render('admin/tools/edit', [
            'tool' => $tool,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateToolRequest $request, Tool $tool)
    {
        $tool->update($request->validated());

        return redirect()->route('admin.tools.show', $tool)
            ->with('success', 'Tool updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tool $tool)
    {
        $tool->delete();

        return redirect()->route('admin.tools.index')
            ->with('success', 'Tool deleted successfully.');
    }
}