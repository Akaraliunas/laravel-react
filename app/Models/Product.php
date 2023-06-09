<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wishlist;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'availability'
    ];

    public function wishlist()
    {
        return $this->hasMany(Wishlist::class);
    }
}
