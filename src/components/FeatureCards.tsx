import React from 'react';
import { BookOpen, Brain, Newspaper, FileText, Clock, Award, Target } from 'lucide-react';

interface FeatureCardsProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    id: 'paid-test',
    title: 'Paid Test Series',
    description: 'Premium tests with detailed solutions',
    icon: BookOpen,
    color: 'bg-gradient-to-br from-red-50 to-red-100 text-red-700',
    iconBg: 'bg-red-200',
    border: 'border-red-200',
  },
  {
    id: 'free-test',
    title: 'Free Test Series',
    description: 'Practice with free tests',
    icon: Brain,
    color: 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700',
    iconBg: 'bg-emerald-200',
    border: 'border-emerald-200',
  },
  {
    id: 'current-affairs',
    title: 'Current Affairs',
    description: 'Stay updated with latest news',
    icon: Newspaper,
    color: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700',
    iconBg: 'bg-blue-200',
    border: 'border-blue-200',
  },
  {
    id: 'notes-pdf',
    title: 'Notes PDF',
    description: 'Download study materials',
    icon: FileText,
    color: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700',
    iconBg: 'bg-purple-200',
    border: 'border-purple-200',
  },
];

const quickFeatures = [
  {
    id: 'mock-test',
    title: 'Mock Tests',
    icon: Clock,
    color: 'bg-orange-50 text-orange-600',
    iconBg: 'bg-orange-100',
  },
  {
    id: 'practice-set',
    title: 'Practice Sets',
    icon: Target,
    color: 'bg-indigo-50 text-indigo-600',
    iconBg: 'bg-indigo-100',
  },
  {
    id: 'previous-year',
    title: 'Previous Year',
    icon: Award,
    color: 'bg-teal-50 text-teal-600',
    iconBg: 'bg-teal-100',
  },
];

export default function FeatureCards({ onNavigate }: FeatureCardsProps) {
  return (
    <div className="px-4 py-4 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen size={16} />
          Test Series
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className={`${feature.color} ${feature.border} rounded-2xl p-4 flex flex-col items-start gap-2 hover:shadow-lg active:scale-[0.97] transition-all text-left border-2`}
              >
                <div className={`${feature.iconBg} p-2.5 rounded-xl`}>
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-sm font-bold block leading-tight">{feature.title}</span>
                  <span className="text-xs opacity-70 block mt-0.5 leading-tight">{feature.description}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Target size={16} />
          Quick Practice
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {quickFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className={`${feature.color} rounded-2xl p-3 flex flex-col items-center gap-2 hover:shadow-md active:scale-[0.97] transition-all text-center`}
              >
                <div className={`${feature.iconBg} p-2 rounded-xl`}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <span className="text-xs font-semibold leading-tight">{feature.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
