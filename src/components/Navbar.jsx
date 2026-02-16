import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Home, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NavItem = ({ to, icon: Icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${
        active
          ? 'text-blue-600 bg-blue-50'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      <Icon size={18} strokeWidth={2} />
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* LEFT: Brand */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
            <Bell size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[16px] font-bold text-slate-900 tracking-tight">
            PlaceComm
          </span>
        </Link>

        {/* CENTER: Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem
            to="/"
            icon={Home}
            label="Dashboard"
            active={path === '/'}
          />

          <NavItem
            to="/notifications"
            icon={Bell}
            label="Notifications"
            active={path === '/notifications'}
          />
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">

          {/* Notification Bell */}
          <button className="relative p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 group">
            <Bell size={20} strokeWidth={1.75} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200">
            <Settings size={20} strokeWidth={1.75} />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="ml-2 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold flex items-center justify-center hover:shadow-lg transition-all duration-200"
            >
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden animate-in fade-in duration-200">
                
                {/* User Info */}
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Logged in as</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1 capitalize">
                    {user?.username}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3 transition">
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3 transition">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-slate-100 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition rounded font-medium"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
