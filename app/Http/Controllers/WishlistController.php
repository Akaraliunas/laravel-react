<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $wishlist = Wishlist::where("user_id", "=", $user->id)->orderby('id', 'asc')->paginate(10);

        $wishlistedProducts = [];

        foreach ($wishlist as $wishlistItem ) {
            $wishlistedProducts[] = [
                'product' => $wishlistItem->product,
                'wishlist' => $wishlistItem,
            ];
        }

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
        $products = Product::all();
        $status = Wishlist::where('user_id', Auth::user()->id)
        ->where('product_id', $request->product_id)
        ->first();

        if (isset($status->user_id) && isset($request->product_id)) {
            return Inertia::render('Welcome', [
                'flash_message_warn' => 'Product is already in your wishlist!',
                'products' => $products,
            ]);
        } else {
            $wishlist = new Wishlist;
            $wishlist->user_id = $request->user_id;
            $wishlist->product_id = $request->product_id;
            $wishlist->save();

            return Inertia::render('Welcome', [
                'flash_message' => '"'. $wishlist->product->title.'" added to your wishlist.',
                'products' => $products,
            ]);
        }
    }

    public function destroy(Request $request)
    {

        $wishlist = Wishlist::findOrFail($request->wishlistId);
        $wishlist->delete();

        $wishlistProducts = Wishlist::where("user_id", "=", $request->userId)->orderby('id', 'asc')->paginate(10);
        $wishlistedProducts = [];

        foreach ($wishlistProducts as $wishlistProduct ) {
            $wishlistedProducts[] = [
                'product' => $wishlistProduct->product,
                'wishlist' => $wishlistProduct,
            ];
        }

        return Inertia::render('Admin/Wishlist/Index', [
            'flash_message' => '"'. $wishlist->product->title.'" successfully deleted',
            'wishlistedProducts' => $wishlistedProducts
        ]);

        // return redirect()->route('wishlist.index')
        //     ->with(
        //         'flash_message',
        //         'Product successfully deleted'
        //     );
    }
}
