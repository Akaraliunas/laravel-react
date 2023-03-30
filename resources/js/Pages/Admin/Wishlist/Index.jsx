import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function WishlistIndex({ auth, user, wishlistedProducts, flash_message }) {
    const {
        data,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        userId: '',
        wishlistId: '',
    });

    const wishlistRemove = (userId, wishlistId) => (e) => {
        e.preventDefault();

        data.userId = userId;
        data.wishlistId = wishlistId;

        destroy(route('wishlist.destroy'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Wishlisted products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash_message ? (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        {flash_message}
                    </div>
                    ) : (
                        <></>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        {wishlistedProducts &&
                                wishlistedProducts.map(
                                    ({
                                        product,
                                        wishlist,
                                    }) => (
                                        <div className="mb-3" key={wishlist.id}>
                                            <div className="flex flex-col items-center justify-between sm:flex-row">
                                                <div className="flex items-center">

                                                    <div className="max-w-[10%] bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-xl overflow-hidden mr-6">
                                                        <img
                                                            src="https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h2 className="text-xl font-semibold text-gray-900 ">
                                                        {product.title}
                                                    </h2>
                                                </div>

                                                <div className="flex items-center">
                                                    <div className="flex mr-6 text-xl font-bold text-gray-900">
                                                        {product.price}&nbsp;€
                                                    </div>

                                                    <div className="flex gap-2">

                                                        <form onSubmit={wishlistRemove(auth.user.id, wishlist.id)}>
                                                            <TextInput
                                                                id="wishlistId"
                                                                type="hidden"
                                                                name="wishlistId"
                                                                value={wishlist.id}
                                                            />
                                                            <InputError message={errors.wishlistId} className="mt-2" />

                                                            <button>
                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clipRule="evenodd"></path>
                                                                </svg>
                                                            </button>
                                                        </form>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
