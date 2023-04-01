<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return view('products.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'price' => 'nullable',
            'availability' => 'nullable',
        ]);

        $input = $request->all();

        Product::create($input);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    public function edit(Product $product)
    {
        return view('products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'price' => 'nullable',
            'availability' => 'nullable',
        ]);

        $input = $request->all();

        $product->update($input);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully');
    }

    public function search(Request $request)
    {
        $key = $request->key;

        if ($key) {
            $products = Product::where(
                [
                    ['title', 'LIKE', "%". $key ."%"],
                    ['availability', '1']
                ]
            )
            ->orWhere(
                [
                    ['description', 'LIKE', "%". $key ."%"],
                    ['availability', '1']
                ]
            )
            ->get();
            $flashMessage = '"'. count($products) .'" products found';
        } else {
            $products = Product::all();
            $flashMessage = false;
        }

        return Inertia::render('Welcome', [
            'searchKeyword' => $key,
            'flash_message' => $flashMessage,
            'products' => $products,
            'wishlistedProducts' => Wishlist::where("user_id", "=", Auth::id())->orderby('id', 'asc')->paginate(100),
        ]);
    }
}
