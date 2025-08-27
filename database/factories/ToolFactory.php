<?php

namespace Database\Factories;

use App\Models\Tool;
use App\Models\ToolCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tool>
 */
class ToolFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Tool>
     */
    protected $model = Tool::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tools = [
            // Development
            ['name' => 'GitHub', 'url' => 'https://github.com', 'description' => 'Version control and collaboration platform'],
            ['name' => 'Visual Studio Code', 'url' => 'https://code.visualstudio.com', 'description' => 'Powerful code editor'],
            ['name' => 'Postman', 'url' => 'https://www.postman.com', 'description' => 'API development and testing'],
            ['name' => 'Vercel', 'url' => 'https://vercel.com', 'description' => 'Frontend deployment platform'],
            
            // Design
            ['name' => 'Figma', 'url' => 'https://figma.com', 'description' => 'Collaborative interface design tool'],
            ['name' => 'Canva', 'url' => 'https://canva.com', 'description' => 'Graphic design platform'],
            ['name' => 'Adobe Creative Cloud', 'url' => 'https://adobe.com', 'description' => 'Creative software suite'],
            ['name' => 'Unsplash', 'url' => 'https://unsplash.com', 'description' => 'Free stock photography'],
            
            // Analytics
            ['name' => 'Google Analytics', 'url' => 'https://analytics.google.com', 'description' => 'Web analytics platform'],
            ['name' => 'Hotjar', 'url' => 'https://hotjar.com', 'description' => 'User behavior analytics'],
            ['name' => 'Mixpanel', 'url' => 'https://mixpanel.com', 'description' => 'Product analytics platform'],
            
            // Marketing
            ['name' => 'Mailchimp', 'url' => 'https://mailchimp.com', 'description' => 'Email marketing platform'],
            ['name' => 'SEMrush', 'url' => 'https://semrush.com', 'description' => 'SEO and marketing toolkit'],
            ['name' => 'Buffer', 'url' => 'https://buffer.com', 'description' => 'Social media management'],
            
            // Productivity
            ['name' => 'Notion', 'url' => 'https://notion.so', 'description' => 'All-in-one workspace'],
            ['name' => 'Trello', 'url' => 'https://trello.com', 'description' => 'Project management boards'],
            ['name' => 'Slack', 'url' => 'https://slack.com', 'description' => 'Team communication platform'],
            
            // Communication
            ['name' => 'Zoom', 'url' => 'https://zoom.us', 'description' => 'Video conferencing platform'],
            ['name' => 'Discord', 'url' => 'https://discord.com', 'description' => 'Voice and text chat'],
            
            // Finance
            ['name' => 'Stripe', 'url' => 'https://stripe.com', 'description' => 'Online payment processing'],
            ['name' => 'QuickBooks', 'url' => 'https://quickbooks.intuit.com', 'description' => 'Accounting software'],
        ];

        $tool = $this->faker->randomElement($tools);

        return [
            'name' => $tool['name'],
            'description' => $tool['description'],
            'url' => $tool['url'],
            'image_url' => $this->faker->optional(0.7)->imageUrl(100, 100, 'business'),
            'category_id' => ToolCategory::factory(),
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => $this->faker->boolean(90), // 90% active
            'is_featured' => $this->faker->boolean(20), // 20% featured
        ];
    }
}