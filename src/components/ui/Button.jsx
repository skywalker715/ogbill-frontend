import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Button({ className, variant = 'primary', ...props }) {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border-2 border-primary text-primary hover:bg-blue-50',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    };

    return (
        <button
            className={twMerge(
                'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
