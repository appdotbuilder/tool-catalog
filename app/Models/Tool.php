<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Tool
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $url
 * @property string|null $image_url
 * @property int $category_id
 * @property int $sort_order
 * @property bool $is_active
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ToolCategory $category
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Tool newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tool newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tool query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tool active()
 * @method static \Illuminate\Database\Eloquent\Builder|Tool featured()
 * @method static \Illuminate\Database\Eloquent\Builder|Tool ordered()
 * @method static \Database\Factories\ToolFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Tool extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'url',
        'image_url',
        'category_id',
        'sort_order',
        'is_active',
        'is_featured',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
        'category_id' => 'integer',
    ];

    /**
     * Get the category that owns the tool.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ToolCategory::class);
    }

    /**
     * Scope a query to only include active tools.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include featured tools.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to order tools by sort_order.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}