<?php

namespace Database\Seeders;

use App\Models\Tool;
use App\Models\ToolCategory;
use Illuminate\Database\Seeder;

class ToolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create specific categories with tools
        $categories = [
            [
                'name' => 'Development',
                'slug' => 'development',
                'description' => 'Code editors, testing tools, deployment platforms',
                'tools' => [
                    ['name' => 'GitHub', 'url' => 'https://github.com', 'description' => 'Version control and collaboration platform', 'featured' => true],
                    ['name' => 'Visual Studio Code', 'url' => 'https://code.visualstudio.com', 'description' => 'Powerful code editor', 'featured' => true],
                    ['name' => 'Postman', 'url' => 'https://www.postman.com', 'description' => 'API development and testing'],
                    ['name' => 'Vercel', 'url' => 'https://vercel.com', 'description' => 'Frontend deployment platform'],
                    ['name' => 'Netlify', 'url' => 'https://netlify.com', 'description' => 'Web development platform'],
                ]
            ],
            [
                'name' => 'Design',
                'slug' => 'design',
                'description' => 'UI/UX tools, graphics, prototyping',
                'tools' => [
                    ['name' => 'Figma', 'url' => 'https://figma.com', 'description' => 'Collaborative interface design tool', 'featured' => true],
                    ['name' => 'Canva', 'url' => 'https://canva.com', 'description' => 'Graphic design platform'],
                    ['name' => 'Adobe Creative Cloud', 'url' => 'https://adobe.com', 'description' => 'Creative software suite'],
                    ['name' => 'Unsplash', 'url' => 'https://unsplash.com', 'description' => 'Free stock photography'],
                    ['name' => 'Dribbble', 'url' => 'https://dribbble.com', 'description' => 'Design inspiration community'],
                ]
            ],
            [
                'name' => 'Analytics',
                'slug' => 'analytics',
                'description' => 'Data analysis, reporting, metrics',
                'tools' => [
                    ['name' => 'Google Analytics', 'url' => 'https://analytics.google.com', 'description' => 'Web analytics platform', 'featured' => true],
                    ['name' => 'Hotjar', 'url' => 'https://hotjar.com', 'description' => 'User behavior analytics'],
                    ['name' => 'Mixpanel', 'url' => 'https://mixpanel.com', 'description' => 'Product analytics platform'],
                    ['name' => 'Amplitude', 'url' => 'https://amplitude.com', 'description' => 'Digital analytics platform'],
                ]
            ],
            [
                'name' => 'Marketing',
                'slug' => 'marketing',
                'description' => 'SEO tools, social media, email marketing',
                'tools' => [
                    ['name' => 'Mailchimp', 'url' => 'https://mailchimp.com', 'description' => 'Email marketing platform', 'featured' => true],
                    ['name' => 'SEMrush', 'url' => 'https://semrush.com', 'description' => 'SEO and marketing toolkit'],
                    ['name' => 'Buffer', 'url' => 'https://buffer.com', 'description' => 'Social media management'],
                    ['name' => 'Hootsuite', 'url' => 'https://hootsuite.com', 'description' => 'Social media management platform'],
                ]
            ],
            [
                'name' => 'Productivity',
                'slug' => 'productivity',
                'description' => 'Project management, time tracking, collaboration',
                'tools' => [
                    ['name' => 'Notion', 'url' => 'https://notion.so', 'description' => 'All-in-one workspace', 'featured' => true],
                    ['name' => 'Trello', 'url' => 'https://trello.com', 'description' => 'Project management boards'],
                    ['name' => 'Asana', 'url' => 'https://asana.com', 'description' => 'Team project management'],
                    ['name' => 'Todoist', 'url' => 'https://todoist.com', 'description' => 'Task management app'],
                ]
            ],
            [
                'name' => 'Communication',
                'slug' => 'communication',
                'description' => 'Chat, video conferencing, team communication',
                'tools' => [
                    ['name' => 'Slack', 'url' => 'https://slack.com', 'description' => 'Team communication platform', 'featured' => true],
                    ['name' => 'Zoom', 'url' => 'https://zoom.us', 'description' => 'Video conferencing platform'],
                    ['name' => 'Discord', 'url' => 'https://discord.com', 'description' => 'Voice and text chat'],
                    ['name' => 'Microsoft Teams', 'url' => 'https://teams.microsoft.com', 'description' => 'Collaboration platform'],
                ]
            ]
        ];

        foreach ($categories as $index => $categoryData) {
            $category = ToolCategory::create([
                'name' => $categoryData['name'],
                'slug' => $categoryData['slug'],
                'description' => $categoryData['description'],
                'sort_order' => $index * 10,
                'is_active' => true,
            ]);

            foreach ($categoryData['tools'] as $toolIndex => $toolData) {
                Tool::create([
                    'name' => $toolData['name'],
                    'description' => $toolData['description'],
                    'url' => $toolData['url'],
                    'image_url' => null, // We'll leave images null for simplicity
                    'category_id' => $category->id,
                    'sort_order' => $toolIndex * 10,
                    'is_active' => true,
                    'is_featured' => $toolData['featured'] ?? false,
                ]);
            }
        }
    }
}