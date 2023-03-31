<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Wishlist;

class WishlistController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $wishlistedProducts = $this->getUserProducts($user->id);

        return Inertia::render('Admin/Wishlist/Index', [
            'user' => $user,
            'wishlistedProducts' => $wishlistedProducts,
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request,
            array(
                'user_id'=>'required',
                'product_id' =>'required',
            )
        );

        $user = $request->user();

        $status = Wishlist::where('user_id', $user->id)
        ->where('product_id', $request->product_id)
        ->first();

        if (isset($status->user_id) && isset($request->product_id)) {
            $message = 'Product is already in your wishlist!';
        } else {
            $wishlist = new Wishlist;
            $wishlist->user_id = $request->user_id;
            $wishlist->product_id = $request->product_id;
            $wishlist->save();

            $message = '"'. $wishlist->product->title.'" added to your wishlist.';
        }

        $products = Product::all();
        $wishlistedProducts = Wishlist::where("user_id", "=", $user->id)->orderby('id', 'asc')->paginate(100);


        return Inertia::render('Welcome', [
            'flash_message' => $message,
            'products' => $products,
            'wishlistedProducts' => $wishlistedProducts,
        ]);
    }

    public function destroy(Request $request)
    {

        $wishlist = Wishlist::findOrFail($request->wishlistId);
        $wishlist->delete();

        $wishlistedProducts = $this->getUserProducts($request->userId);

        return Inertia::render('Admin/Wishlist/Index', [
            'flash_message' => '"'. $wishlist->product->title.'" successfully deleted',
            'wishlistedProducts' => $wishlistedProducts
        ]);
    }

    public function getUserProducts($userId)
    {
        $wishlist = Wishlist::where("user_id", "=", $userId)->orderby('id', 'asc')->paginate(100);
        $wishlistedProducts = [];

        foreach ($wishlist as $wishlistItem ) {
            $wishlistedProducts[] = [
                'product' => $wishlistItem->product,
                'wishlist' => $wishlistItem,
            ];
        }

        return $wishlistedProducts;
    }
}
