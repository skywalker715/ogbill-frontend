import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Card({ className, children, ...props }) {
    return (
        <div className={twMerge('bg-white p-4 rounded-xl shadow-sm border border-gray-100', className)} {...props}>
            {children}
        </div>
    );
}
