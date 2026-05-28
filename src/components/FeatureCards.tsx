import React from 'react';
import { BookOpen, Brain, Newspaper, FileText } from 'lucide-react';

interface FeatureCardsProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    id: 'paid-test',
    title: 'Paid Test Series',
    icon: BookOpen,
    color: 'bg-red-50 text-red-600',
    iconBg: 'bg-red-100',
  },
  {
    id: 'free-quiz',
    title: 'Free Quiz',
    icon: Brain,
    color: 'bg-yellow-50 text-yellow-700',
    iconBg: 'bg-yellow-100',
  },
  {
    id: 'current-affairs',
    title: 'Current Affairs',
    icon: Newspaper,
    color: 'bg-blue-50 text-blue-700',
    iconBg: 'bg-blue-100',
  },
  {
    id: 'notes-pdf',
    title: 'Notes PDF',
    icon: FileText,
    color: 'bg-emerald-50 text-emerald-700',
    iconBg: 'bg-emerald-100',
  },
];

export default function FeatureCards({ onNavigate }: FeatureCardsProps) {
  return (
    <div className="px-4 py-4">
      <h3 className="text-sm font-semibold text-blue-950 uppercase tracking-wider mb-3">
        Quick Access
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              className={`${feature.color} rounded-2xl p-4 flex flex-col items-center gap-2.5 hover:shadow-md active:scale-[0.97] transition-all text-center border-2 border-current border-opacity-10`}
            >
              <div className={`${feature.iconBg} p-3 rounded-xl`}>
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold leading-tight">{feature.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
