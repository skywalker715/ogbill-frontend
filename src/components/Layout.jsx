import React from 'react';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden min-h-[100dvh]">
            <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
                <h1 className="text-xl font-bold text-center text-gray-900">Bill Splitter</h1>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
