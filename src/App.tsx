import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import PaidTestPage from './pages/PaidTestPage';
import MyPurchasePage from './pages/MyPurchasePage';
import AIPage from './pages/AIPage';
import LivePage from './pages/LivePage';
import PlaceholderPage from './pages/PlaceholderPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BottomNav from './components/BottomNav';
import { useAuth } from './contexts/AuthContext';

type Page = 'home' | 'paid-test' | 'free-quiz' | 'current-affairs' | 'notes-pdf' | 'about' | 'my-purchase' | 'ai' | 'live';
type AuthPage = 'login' | 'register';

const bottomNavPages: Page[] = ['home', 'my-purchase', 'ai', 'live'];

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleNavigate = (newPage: string) => {
    setPage(newPage as Page);
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setPage('home');
    window.scrollTo(0, 0);
  };

  const showBottomNav = bottomNavPages.includes(page);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">MENTORA</h1>
          <p className="text-yellow-300 font-semibold">TEXT BOOK</p>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-12 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in - show auth pages
  if (!user) {
    if (authPage === 'login') {
      return <LoginPage onSwitchToRegister={() => setAuthPage('register')} />;
    }
    return <RegisterPage onSwitchToLogin={() => setAuthPage('login')} />;
  }

  // Logged in - show app pages
  if (page === 'home') {
    return (
      <HomePage
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onNavigate={handleNavigate}
      />
    );
  }

  if (page === 'my-purchase') {
    return (
      <>
        <MyPurchasePage />
        <BottomNav activeTab="my-purchase" onTabChange={handleNavigate} />
      </>
    );
  }

  if (page === 'ai') {
    return (
      <>
        <AIPage />
        <BottomNav activeTab="ai" onTabChange={handleNavigate} />
      </>
    );
  }

  if (page === 'live') {
    return (
      <>
        <LivePage />
        <BottomNav activeTab="live" onTabChange={handleNavigate} />
      </>
    );
  }

  if (page === 'paid-test') {
    return <PaidTestPage onBack={goHome} />;
  }

  const titleMap: Record<string, string> = {
    'free-quiz': 'Free Quiz',
    'current-affairs': 'Current Affairs',
    'notes-pdf': 'Notes PDF',
    'about': 'About App',
  };

  return <PlaceholderPage title={titleMap[page] || 'Page'} onBack={goHome} />;
}
