import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ProductsIndex({ auth, products }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {products &&
                                products.map(
                                    ({
                                        id,
                                        title,
                                        price,
                                        description,
                                        availability,
                                    }) => (
                                            <div className="mb-3" key={id}>
                                                <div className="flex flex-col items-center justify-between sm:flex-row">
                                                    <div className="flex items-center">

                                                        <div className="max-w-[10%] bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-xl overflow-hidden mr-6">
                                                            <img
                                                                src="https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <h2 className="text-xl font-semibold text-gray-900 ">
                                                            {title}
                                                        </h2>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <div className="flex mr-6 text-xl font-bold text-gray-900">
                                                            {price}&nbsp;€
                                                        </div>

                                                        <div className="flex gap-2">

                                                            <button>
                                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor"><path d="M 15 5 C 6.081703 5 0.32098813 14.21118 0.21679688 14.378906 A 1 1 0 0 0 0 15 A 1 1 0 0 0 0.16210938 15.544922 A 1 1 0 0 0 0.16601562 15.550781 C 0.18320928 15.586261 5.0188313 25 15 25 C 24.938822 25 29.767326 15.678741 29.826172 15.564453 A 1 1 0 0 0 29.837891 15.544922 A 1 1 0 0 0 30 15 A 1 1 0 0 0 29.785156 14.380859 A 1 1 0 0 0 29.783203 14.378906 C 29.679012 14.21118 23.918297 5 15 5 z M 15 8 C 18.866 8 22 11.134 22 15 C 22 18.866 18.866 22 15 22 C 11.134 22 8 18.866 8 15 C 8 11.134 11.134 8 15 8 z M 15 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 18 A 3 3 0 0 0 18 15 A 3 3 0 0 0 15 12 z" fill="currentColor"/></svg>
                                                            </button>

                                                            <button>
                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                                                    </path>
                                                                </svg>
                                                            </button>

                                                           <button>
                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clipRule="evenodd"></path>
                                                                </svg>
                                                           </button>
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
