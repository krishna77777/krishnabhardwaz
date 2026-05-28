import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  onBack: () => void;
}

export default function PlaceholderPage({ title, onBack }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-800 transition-colors" aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="bg-red-100 text-red-600 p-5 rounded-full mb-4">
          <Construction size={36} strokeWidth={1.8} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Coming Soon</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          The {title} section is being prepared. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}
