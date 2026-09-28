import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from './RoleBadge';
import {
  Bell,
  Search,
  Sparkles,
  Smartphone,
  Monitor,
  UserCheck,
  Bookmark
} from 'lucide-react';
import { CampusBeacon } from './CampusBeacon';

export const Header: React.FC = () => {
  const { currentUser, role } = useAuth();
  const {
    setCurrentTab,
    deviceMode,
    setDeviceMode,
    unreadNotificationsCount,
    setIsNotificationCenterOpen,
    setIsRoleSwitcherOpen,
    setIsAIAssistantOpen,
    bookmarks
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md">
      {/* Top institution bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Brand / Crest */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 flex items-center justify-center p-1.5 border border-amber-400/40 shadow-inner group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-full h-full text-amber-400 fill-current">
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
              <path d="M4 10.77V16c0 2.76 3.58 5 8 5s8-2.24 8-5v-5.23l-8 3.64-8-3.64z" className="text-white fill-current opacity-90" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1">
                <span>Campus</span>
                <span className="text-amber-400">One</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300">
                IPS UOA
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate max-w-[160px] sm:max-w-none">
              Institute of Professional Studies • Univ. of Allahabad
            </p>
          </div>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Global Search trigger */}
          <button
            onClick={() => setCurrentTab('search')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Global Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* AI Campus Assistant trigger */}
          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="hidden xs:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-blue-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 hover:bg-amber-500/30 transition-all text-xs font-semibold"
            title="Campus AI Assistant Preview"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Bookmarks shortcut */}
          <button
            onClick={() => setCurrentTab('bookmarks')}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Saved Bookmarks"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
            {bookmarks.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          {/* Notification bell */}
          <button
            onClick={() => setIsNotificationCenterOpen(true)}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-red-600 rounded-full px-1 border-2 border-slate-900">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Presentation Role Switcher Pill */}
          <button
            onClick={() => setIsRoleSwitcherOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer ring-2 ring-amber-400/20"
            title="Switch Demo Role for Evaluators"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Role:</span>
            <span className="truncate max-w-[70px] sm:max-w-none">
              {role === 'DEPARTMENT_ADMIN' ? 'HOD' : role === 'COLLEGE_ADMIN' ? 'Admin' : role === 'FACULTY' ? 'Faculty' : 'Student'}
            </span>
          </button>

          {/* Device Frame View Toggle (Desktop only) */}
          <button
            onClick={() => setDeviceMode(deviceMode === 'fluid' ? 'mobile-frame' : 'fluid')}
            className="hidden lg:flex items-center gap-1 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 text-xs"
            title={deviceMode === 'fluid' ? 'Preview as Mobile App Frame' : 'Switch to Full Screen View'}
          >
            {deviceMode === 'fluid' ? (
              <Smartphone className="w-4 h-4 text-blue-400" />
            ) : (
              <Monitor className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* User Profile avatar pill */}
          <button
            onClick={() => setCurrentTab('profile')}
            className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all ml-1"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={currentUser?.name || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-slate-600"
            />
          </button>
        </div>
      </div>

      {/* Subheader bar with user department badge */}
      {currentUser && (
        <div className="bg-slate-950/60 border-t border-slate-800/80 px-3 sm:px-6 py-1.5 text-xs flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <span className="text-slate-400 hidden sm:inline">Signed in as:</span>
            <span className="font-semibold text-white truncate">{currentUser.name}</span>
            <RoleBadge role={role} size="sm" />
            {currentUser.departmentCode && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-300 font-mono text-[11px] font-medium border border-slate-700">
                {currentUser.departmentCode}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="hidden sm:inline">Session 2026-27</span>
            <CampusBeacon />
          </div>
        </div>
      )}
    </header>
  );
};
