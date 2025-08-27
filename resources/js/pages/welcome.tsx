import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Navigation */}
                <nav className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🛠️</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ToolHub
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('login')}
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link href={route('register')}>
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            🚀 Your Curated Collection of 
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                                Professional Tools
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Discover, organize, and access the best external tools for your workflow. 
                            Carefully curated by experts, categorized for easy discovery.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('register')}>
                                <Button 
                                    size="lg" 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                                >
                                    🎯 Start Exploring Tools
                                </Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="text-lg px-8 py-4 border-2 hover:bg-gray-50"
                                >
                                    👋 Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">📚</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Curated Collection</h3>
                            <p className="text-gray-600">
                                Hand-picked tools by industry experts. No more endless searching - 
                                find the right tool for your needs instantly.
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🗂️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Categories</h3>
                            <p className="text-gray-600">
                                Tools organized by purpose and industry. Browse by category 
                                or search to find exactly what you need.
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Access</h3>
                            <p className="text-gray-600">
                                Direct links to external tools. No downloads, no setup - 
                                click and start using professional tools immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🎭 Sample Tool Categories
                        </h2>
                        <p className="text-lg text-gray-600">
                            Get a glimpse of the organized tool collection waiting for you
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                            <div className="text-2xl mb-3">💻</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Development</h4>
                            <p className="text-sm text-gray-600">Code editors, testing tools, deployment platforms</p>
                        </div>
                        
                        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                            <div className="text-2xl mb-3">🎨</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Design</h4>
                            <p className="text-sm text-gray-600">UI/UX tools, graphics, prototyping</p>
                        </div>
                        
                        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                            <div className="text-2xl mb-3">📊</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
                            <p className="text-sm text-gray-600">Data analysis, reporting, metrics</p>
                        </div>
                        
                        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                            <div className="text-2xl mb-3">📈</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Marketing</h4>
                            <p className="text-sm text-gray-600">SEO tools, social media, email marketing</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            🎯 Ready to Boost Your Productivity?
                        </h2>
                        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals who have streamlined their workflow 
                            with our curated tool collection.
                        </p>
                        <Link href={route('register')}>
                            <Button 
                                size="lg" 
                                variant="outline"
                                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 border-0"
                            >
                                🚀 Get Started Free
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100">
                    <div className="text-center text-gray-600">
                        <p>© 2024 ToolHub. Your gateway to professional tools.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}