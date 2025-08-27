<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ToolCategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tool> $tools
 * @property-read int|null $tools_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory active()
 * @method static \Illuminate\Database\Eloquent\Builder|ToolCategory ordered()
 * @method static \Database\Factories\ToolCategoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ToolCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'sort_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the tools that belong to this category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tools(): HasMany
    {
        return $this->hasMany(Tool::class, 'category_id');
    }

    /**
     * Get active tools in this category, ordered by sort_order.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function activeTools(): HasMany
    {
        return $this->tools()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name');
    }

    /**
     * Scope a query to only include active categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order categories by sort_order.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}