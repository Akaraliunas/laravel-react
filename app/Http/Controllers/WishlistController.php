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
        $wishlist = Wishlist::where("user_id", "=", $user->id)->orderby('id', 'desc')->paginate(10);

        return Inertia::render('Admin/Wishlist/Index', [
            'user' => $user,
            'wishlist' => $wishlist,
        ]);
    }

    public function store(Request $request)
    {
        //Validating title and body field
        // $this->validate($request, array(
        //     'user_id' => 'required',
        //     'product_id' => 'required',
        // ));

        $wishlist = new Wishlist();

        $wishlist->user_id = $request->user_id;
        $wishlist->product_id = $request->product_id;

        $wishlist->save();

        return redirect()->back()->with(
            'flash_message',
            'Item, '. $wishlist->product->title.' Added to your wishlist.'
        );
    }

    public function destroy($id)
    {
        $wishlist = Wishlist::findOrFail($id);
        $wishlist->delete();

        return redirect()->route('wishlist.index')
            ->with(
                'flash_message',
                'Item successfully deleted'
            );
    }
}
