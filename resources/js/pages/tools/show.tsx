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

interface Props {
    tool: Tool;
    relatedTools: Tool[];
    [key: string]: unknown;
}

export default function ToolShow({ tool, relatedTools }: Props) {
    return (
        <AppShell>
            <Head title={`${tool.name} - ToolHub`} />
            
            <div className="p-6 space-y-8">
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-gray-600">
                    <Link href={route('home')} className="hover:text-blue-600">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href={route('tools.index')} className="hover:text-blue-600">
                        Tools
                    </Link>
                    <span className="mx-2">/</span>
                    <Link 
                        href={route('tools.index', { category: tool.category.slug })}
                        className="hover:text-blue-600"
                    >
                        {tool.category.name}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{tool.name}</span>
                </div>

                {/* Tool Details */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Info */}
                        <div className="flex items-start gap-6">
                            {tool.image_url ? (
                                <img 
                                    src={tool.image_url} 
                                    alt={tool.name}
                                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                    <span className="text-3xl">🛠️</span>
                                </div>
                            )}
                            
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {tool.name}
                                </h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <Link
                                        href={route('tools.index', { category: tool.category.slug })}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                                    >
                                        {tool.category.name}
                                    </Link>
                                </div>
                                
                                <div className="flex gap-3">
                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                                            🚀 Open {tool.name}
                                        </Button>
                                    </a>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => navigator.clipboard.writeText(tool.url)}
                                    >
                                        📋 Copy Link
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {tool.description && (
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                    About {tool.name}
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {tool.description}
                                </p>
                            </Card>
                        )}

                        {/* Tool Details */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Tool Information
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Category</span>
                                    <Link
                                        href={route('tools.index', { category: tool.category.slug })}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        {tool.category.name}
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Website</span>
                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 truncate max-w-xs"
                                    >
                                        {new URL(tool.url).hostname}
                                    </a>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600">Type</span>
                                    <span className="text-gray-900">External Tool</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <a
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button className="w-full justify-start">
                                        🌐 Visit Website
                                    </Button>
                                </a>
                                <Link href={route('tools.index')}>
                                    <Button variant="outline" className="w-full justify-start">
                                        ⬅️ Back to Tools
                                    </Button>
                                </Link>
                                <Link href={route('tools.index', { category: tool.category.slug })}>
                                    <Button variant="outline" className="w-full justify-start">
                                        📂 View Category
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        {/* Related Tools */}
                        {relatedTools.length > 0 && (
                            <Card className="p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    More in {tool.category.name}
                                </h3>
                                <div className="space-y-3">
                                    {relatedTools.map((relatedTool) => (
                                        <div key={relatedTool.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            {relatedTool.image_url ? (
                                                <img 
                                                    src={relatedTool.image_url} 
                                                    alt={relatedTool.name}
                                                    className="w-8 h-8 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                                    <span className="text-xs">🛠️</span>
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={route('tools.show', relatedTool.id)}
                                                    className="text-sm font-medium text-gray-900 hover:text-blue-600 block truncate"
                                                >
                                                    {relatedTool.name}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Link href={route('tools.index', { category: tool.category.slug })}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            View All →
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}