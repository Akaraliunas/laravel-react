import { Link, Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import TextInput from '@/Components/TextInput';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [products, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data, post, processing, errors, reset } = useForm({
        user_id: '',
        product_id: '',
    });

    useEffect(() => {
        fetch("http://laravel-react.test/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => {
                setData(actualData);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const wishlistStore = (userId, id) => (e) => {
        e.preventDefault();

        post(route('wishlist.store', {'id': id}));
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-gray-100 bg-center sm:flex sm:justify-center sm:items-center bg-dots-darker dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="p-6 text-right sm:fixed sm:top-0 sm:right-0">
                    {auth.user ? (
                        <Link
                            href={route("admin.dashboard.index")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="p-6 mx-auto max-w-7xl lg:p-8">
                    <h2 className="mb-5 text-xl font-semibold leading-tight text-gray-900 dark:text-white">Products</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                        {products &&
                            products.map(
                                ({id, title, price, description, availability}) =>
                                    availability === 1 ? (
                                        <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500" key={id}>
                                            <div className="flex flex-col items-center sm:flex-row">
                                                <div className="max-w-[30%] bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-xl overflow-hidden mr-6">
                                                    <img src="https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png" alt="" />
                                                </div>
                                                <div className="">
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {title}
                                                    </h2>
                                                    <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                                        {description}
                                                    </p>
                                                    <div className="flex items-end justify-between mt-6">

                                                        <div className="text-base font-bold text-gray-900 dark:text-white">{price} €</div>

                                                        <form onSubmit={wishlistStore(auth.user.id ,id)}>
                                                            <TextInput
                                                                id="user_id"
                                                                type="hidden"
                                                                name="user_id"
                                                                value={auth.user.id}
                                                                onChange={(e) => setData('user_id', e.target.value)}
                                                            />
                                                            <TextInput
                                                                id="product_id"
                                                                type="hidden"
                                                                name="product_id"
                                                                value={id}
                                                                onChange={(e) => setData('product_id', e.target.value)}
                                                            />

                                                            <button  className="w-5 h-5 scale-100 motion-safe:hover:scale-[1.2] transition-all duration-250">
                                                                <svg className="w-full h-full" version="1.1" id="Layer_1" viewBox="0 0 512.003 512.003">
                                                                    <g>
                                                                        <path fill="white" active="#E8594B" d="M256.001,105.69c19.535-49.77,61.325-87.79,113.231-87.79c43.705,0,80.225,22.572,108.871,54.44   c39.186,43.591,56.497,139.193-15.863,209.24c-37.129,35.946-205.815,212.524-205.815,212.524S88.171,317.084,50.619,281.579   C-22.447,212.495-6.01,116.919,34.756,72.339c28.919-31.629,65.165-54.44,108.871-54.44   C195.532,17.899,236.466,55.92,256.001,105.69"></path>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </form>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                            )
                        }
                    </div>

                    <div className="flex justify-center px-6 mt-16 sm:items-center sm:justify-between">
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400 sm:text-left">
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://github.com/sponsors/taylorotwell"
                                    className="inline-flex items-center group hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        className="w-5 h-5 mr-1 -mt-px stroke-gray-400 dark:stroke-gray-600 group-hover:stroke-gray-600 dark:group-hover:stroke-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                    Sponsor
                                </a>
                            </div>
                        </div>

                        <div className="ml-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
