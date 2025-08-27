import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Tool {
    id: number;
    name: string;
    description: string | null;
    url: string;
    image_url: string | null;
    is_active: boolean;
    is_featured: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    };
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
    [key: string]: unknown;
}

export default function AdminToolsIndex({ tools }: Props) {
    const handleDelete = (tool: Tool) => {
        if (confirm(`Are you sure you want to delete "${tool.name}"?`)) {
            router.delete(route('admin.tools.destroy', tool.id));
        }
    };



    return (
        <AppShell>
            <Head title="Manage Tools - Admin" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            🛠️ Manage Tools
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Add, edit, and organize your tool collection
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('admin.categories.index')}>
                            <Button variant="outline">
                                📂 Manage Categories
                            </Button>
                        </Link>
                        <Link href={route('admin.tools.create')}>
                            <Button>
                                ➕ Add Tool
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="p-4">
                        <div className="text-2xl font-bold text-blue-600">{tools.total}</div>
                        <div className="text-sm text-gray-600">Total Tools</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {tools.data.filter(t => t.is_active).length}
                        </div>
                        <div className="text-sm text-gray-600">Active Tools</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {tools.data.filter(t => t.is_featured).length}
                        </div>
                        <div className="text-sm text-gray-600">Featured Tools</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-2xl font-bold text-gray-600">
                            {tools.data.filter(t => !t.is_active).length}
                        </div>
                        <div className="text-sm text-gray-600">Inactive Tools</div>
                    </Card>
                </div>

                {/* Tools Table */}
                {tools.data.length > 0 ? (
                    <Card className="overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tool
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Featured
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tools.data.map((tool) => (
                                        <tr key={tool.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {tool.image_url ? (
                                                        <img 
                                                            className="h-10 w-10 rounded-lg object-cover" 
                                                            src={tool.image_url} 
                                                            alt={tool.name}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                            <span className="text-sm">🛠️</span>
                                                        </div>
                                                    )}
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {tool.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                                            {tool.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {tool.category.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        tool.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {tool.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        tool.is_featured
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {tool.is_featured ? '⭐ Featured' : 'Standard'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <a
                                                        href={tool.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button variant="outline" size="sm">
                                                            🌐 Open
                                                        </Button>
                                                    </a>
                                                    <Link href={route('admin.tools.show', tool.id)}>
                                                        <Button variant="outline" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.tools.edit', tool.id)}>
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(tool)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        {tools.last_page > 1 && (
                            <div className="flex justify-center py-4 border-t border-gray-200">
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
                    </Card>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛠️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No tools yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Start building your tool collection by adding the first tool.
                        </p>
                        <Link href={route('admin.tools.create')}>
                            <Button>
                                ➕ Add First Tool
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}