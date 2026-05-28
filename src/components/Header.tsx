import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
      <div className="flex items-center justify-between px-4 h-14">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-blue-800 active:bg-blue-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="flex flex-col items-center gap-0">
          <h1 className="text-lg font-bold tracking-wide">MENTORA</h1>
          <p className="text-[10px] text-yellow-300 font-semibold tracking-wider">TEXT BOOK</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-blue-800 active:bg-blue-800 transition-colors"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
}
