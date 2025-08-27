import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
    active_tools: Tool[];
    [key: string]: unknown;
}

interface Props {
    featuredTools: Tool[];
    categoriesWithTools: ToolCategory[];
    isAdmin: boolean;
    [key: string]: unknown;
}

export default function Home({ featuredTools, categoriesWithTools, isAdmin }: Props) {
    return (
        <AppShell>
            <Head title="ToolHub - Your Curated Tools" />
            
            <div className="p-6 space-y-8">
                {/* Welcome Header */}
                <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🎯 Welcome to ToolHub
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Discover and access your curated collection of professional tools, 
                        organized by category for maximum productivity.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href={route('tools.index')}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                🔍 Browse All Tools
                            </Button>
                        </Link>
                        {isAdmin && (
                            <Link href={route('admin.tools.index')}>
                                <Button size="lg" variant="outline">
                                    ⚙️ Admin Panel
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Featured Tools */}
                {featuredTools.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                ⭐ Featured Tools
                            </h2>
                            <Link 
                                href={route('tools.index')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View all →
                            </Link>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredTools.map((tool) => (
                                <Card key={tool.id} className="group hover:shadow-lg transition-shadow duration-200">
                                    <div className="p-6">
                                        <div className="flex items-start gap-4">
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
                                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {tool.name}
                                                </h3>
                                                <p className="text-sm text-blue-600 mb-2">
                                                    {tool.category.name}
                                                </p>
                                                {tool.description && (
                                                    <p className="text-sm text-gray-600 line-clamp-2">
                                                        {tool.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex gap-2">
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
                    </section>
                )}

                {/* Categories with Tools */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        🗂️ Tool Categories
                    </h2>
                    
                    <div className="space-y-8">
                        {categoriesWithTools.map((category) => (
                            <div key={category.id} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {category.name}
                                        </h3>
                                        {category.description && (
                                            <p className="text-gray-600 text-sm mt-1">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                    <Link
                                        href={route('tools.index', { category: category.slug })}
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                    >
                                        View all in {category.name} →
                                    </Link>
                                </div>

                                {category.active_tools.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {category.active_tools.map((tool) => (
                                            <Card key={tool.id} className="group hover:shadow-md transition-shadow">
                                                <div className="p-4">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        {tool.image_url ? (
                                                            <img 
                                                                src={tool.image_url} 
                                                                alt={tool.name}
                                                                className="w-8 h-8 rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                                                <span className="text-sm">🛠️</span>
                                                            </div>
                                                        )}
                                                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                                                            {tool.name}
                                                        </h4>
                                                    </div>
                                                    <a
                                                        href={tool.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button className="w-full" size="sm">
                                                            Open
                                                        </Button>
                                                    </a>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No tools available in this category yet.</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {categoriesWithTools.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🛠️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No tools available yet
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Tools will appear here once administrators add them to the collection.
                                </p>
                                {isAdmin && (
                                    <Link href={route('admin.tools.create')}>
                                        <Button>
                                            ➕ Add First Tool
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}