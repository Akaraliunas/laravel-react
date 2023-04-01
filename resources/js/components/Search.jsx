import { useForm } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Search({ keyword }) {
    const { data, setData, get, errors } = useForm({
        key: '',
    });

    const filterProducts = (e) => {
        e.preventDefault();
        get(route('products.filter'));
    };

    return (
        <>
            <form className="flex items-center justify-start mb-4" onSubmit={filterProducts}>
                <TextInput
                    id="key"
                    type="text"
                    name="key"
                    value={data.key}
                    placeholder={keyword}
                    onChange={(e) => setData('key', e.target.value)}
                />
                <InputError message={errors.key} className="mt-2" />

                <button className="w-6 h-6 scale-100 motion-safe:hover:scale-[1.2] transition-all duration-250 ml-2">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                        <path fill="white" d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"/>
                    </svg>
                </button>
            </form>
        </>
    );
}
