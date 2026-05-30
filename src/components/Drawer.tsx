import React from 'react';
import { X, Home, BookOpen, Brain, Newspaper, FileText, Info, ShoppingBag, Bot, Radio, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'my-purchase', label: 'My Purchase', icon: ShoppingBag },
  { id: 'ai', label: 'Mentor AI', icon: Bot },
  { id: 'live', label: 'Live Classes', icon: Radio },
  { id: 'paid-test', label: 'Paid Test Series', icon: BookOpen },
  { id: 'free-test', label: 'Free Test Series', icon: Brain },
  { id: 'current-affairs', label: 'Current Affairs', icon: Newspaper },
  { id: 'notes-pdf', label: 'Notes PDF', icon: FileText },
  { id: 'about', label: 'About App', icon: Info },
];

export default function Drawer({ isOpen, onClose, onNavigate }: DrawerProps) {
  const { logout, user } = useAuth();
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  const handleProfileClick = () => {
    onNavigate('profile');
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 drawer-overlay"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl drawer-panel transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-5 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950 font-bold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-bold leading-tight">{userName}</h2>
                <p className="text-xs text-blue-200 truncate">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-blue-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium"
          >
            <User size={18} />
            <span>View Profile</span>
          </button>
        </div>
        <nav className="py-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-gray-700 hover:bg-yellow-50 hover:text-blue-950 transition-colors text-left"
              >
                <Icon size={20} strokeWidth={1.8} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 mt-2 pt-3 px-5 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left font-semibold text-sm"
          >
            <LogOut size={20} strokeWidth={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
