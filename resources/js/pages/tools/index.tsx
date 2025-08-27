import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Tool {
    id: number;
    name: string;
    description: string | null;
    url: string;
    image_url: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    [key: string]: unknown;
}

interface ToolCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    [key: string]: unknown;
}

interface PaginatedTools {
    data: Tool[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    [key: string]: unknown;
}

interface Props {
    tools: PaginatedTools;
    categories: ToolCategory[];
    currentCategory?: string;
    search?: string;
    [key: string]: unknown;
}

export default function ToolsIndex({ tools, categories, currentCategory, search }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search') as string;
        
        router.get(route('tools.index'), {
            search: searchTerm || undefined,
            category: currentCategory || undefined,
        }, {
            preserveState: true,
        });
    };

    const handleCategoryFilter = (categorySlug?: string) => {
        router.get(route('tools.index'), {
            category: categorySlug || undefined,
            search: search || undefined,
        }, {
            preserveState: true,
        });
    };

    return (
        <AppShell>
            <Head title="Browse Tools - ToolHub" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            🔍 Browse Tools
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Discover tools from our curated collection
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            name="search"
                            type="search"
                            placeholder="Search tools..."
                            defaultValue={search || ''}
                            className="w-full md:w-80"
                        />
                        <Button type="submit">
                            Search
                        </Button>
                    </form>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={!currentCategory ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryFilter()}
                        >
                            All Categories
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={currentCategory === category.slug ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleCategoryFilter(category.slug)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Active Filters */}
                {(currentCategory || search) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Active filters:</span>
                        {currentCategory && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                                Category: {categories.find(c => c.slug === currentCategory)?.name}
                                <button
                                    onClick={() => handleCategoryFilter()}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {search && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                                Search: "{search}"
                                <button
                                    onClick={() => router.get(route('tools.index'), { category: currentCategory || undefined })}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                )}

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                    Showing {tools.data.length} of {tools.total} tools
                </div>

                {/* Tools Grid */}
                {tools.data.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tools.data.map((tool) => (
                            <Card key={tool.id} className="group hover:shadow-lg transition-shadow duration-200">
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        {tool.image_url ? (
                                            <img 
                                                src={tool.image_url} 
                                                alt={tool.name}
                                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                                <span className="text-lg">🛠️</span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                                {tool.name}
                                            </h3>
                                            <p className="text-sm text-blue-600 mb-2">
                                                {tool.category.name}
                                            </p>
                                        </div>
                                    </div>

                                    {tool.description && (
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {tool.description}
                                        </p>
                                    )}

                                    <div className="flex gap-2">
                                        <a
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <Button className="w-full" size="sm">
                                                🚀 Open Tool
                                            </Button>
                                        </a>
                                        <Link href={route('tools.show', tool.id)}>
                                            <Button variant="outline" size="sm">
                                                Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No tools found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {search || currentCategory 
                                ? "Try adjusting your search or filters to find what you're looking for."
                                : "No tools have been added to the collection yet."
                            }
                        </p>
                        {(search || currentCategory) && (
                            <Button
                                variant="outline"
                                onClick={() => router.get(route('tools.index'))}
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {tools.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex gap-1">
                            {tools.links.map((link, index) => {
                                if (!link.url) {
                                    return (
                                        <div
                                            key={index}
                                            className="px-3 py-2 text-gray-400 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}