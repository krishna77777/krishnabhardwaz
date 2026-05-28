import React from 'react';

export default function MyPurchasePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-center px-4 h-14">
          <h1 className="text-lg font-bold">My Purchase</h1>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="bg-red-100 text-red-600 p-5 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Purchases Yet</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Your purchased test series and courses will appear here.
        </p>
      </div>
    </div>
  );
}
