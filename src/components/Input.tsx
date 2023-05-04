import React from 'react'
interface InputProps {
    value: string;
    onChange: any;
    type?: string;
    placeholder?: string;
    label: string;
}
function Input({
    value, onChange, type, label
}: InputProps): JSX.Element {
    return (
        <div className="relative">
            <input value={value} onChange={onChange} type={type} id="floating_filled" className="bg-gray-400 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 peer" placeholder=" " />
            <label className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{label}</label>
        </div>
    )
}

export default Input