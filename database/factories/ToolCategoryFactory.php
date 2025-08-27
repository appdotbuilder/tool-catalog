<?php

namespace Database\Factories;

use App\Models\ToolCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ToolCategory>
 */
class ToolCategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ToolCategory>
     */
    protected $model = ToolCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Development', 'description' => 'Code editors, testing tools, deployment platforms'],
            ['name' => 'Design', 'description' => 'UI/UX tools, graphics, prototyping'],
            ['name' => 'Analytics', 'description' => 'Data analysis, reporting, metrics'],
            ['name' => 'Marketing', 'description' => 'SEO tools, social media, email marketing'],
            ['name' => 'Productivity', 'description' => 'Project management, time tracking, collaboration'],
            ['name' => 'Communication', 'description' => 'Chat, video conferencing, team communication'],
            ['name' => 'Finance', 'description' => 'Invoicing, accounting, expense tracking'],
            ['name' => 'Security', 'description' => 'Password management, security auditing, VPN'],
        ];

        $category = $this->faker->randomElement($categories);
        $name = $category['name'];

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $category['description'],
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
        ];
    }
}