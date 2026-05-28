import React from 'react';
import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Banner from '../components/Banner';
import FeatureCards from '../components/FeatureCards';
import BottomNav from '../components/BottomNav';
import MentorAI from '../components/MentorAI';

interface HomePageProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

export default function HomePage({ drawerOpen, setDrawerOpen, onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={onNavigate} />
      <Banner />
      <FeatureCards onNavigate={onNavigate} />
      <BottomNav activeTab="home" onTabChange={onNavigate} />
      <MentorAI />
    </div>
  );
}
