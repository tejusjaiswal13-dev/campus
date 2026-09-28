import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, BellRing, CalendarDays, Search, User, ShieldCheck, Building2, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, getPendingApprovals } = useApp();
  const { role } = useAuth();

  const pendingCount = getPendingApprovals().notices.length + getPendingApprovals().events.length;

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home
    },
    {
      id: 'notices',
      label: 'Notices',
      icon: BellRing
    },
    {
      id: 'events',
      label: 'Events',
      icon: CalendarDays
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search
    },
    {
      id: role === 'COLLEGE_ADMIN' ? 'college-admin' : role === 'DEPARTMENT_ADMIN' ? 'dept-admin' : role === 'FACULTY' ? 'faculty-dash' : 'profile',
      label: role === 'COLLEGE_ADMIN' ? 'Admin' : role === 'DEPARTMENT_ADMIN' ? 'HOD' : role === 'FACULTY' ? 'Faculty' : 'Profile',
      icon: role === 'COLLEGE_ADMIN' ? ShieldCheck : role === 'DEPARTMENT_ADMIN' ? Building2 : role === 'FACULTY' ? Briefcase : User,
      badge: (role === 'DEPARTMENT_ADMIN' || role === 'COLLEGE_ADMIN') && pendingCount > 0 ? pendingCount : undefined
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl py-1.5 md:hidden max-w-md mx-auto">
      <div className="flex items-center justify-around px-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-3 rounded-2xl transition-all duration-150 select-none cursor-pointer active:scale-90 ${
                isActive
                  ? 'text-indigo-950 font-black'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-indigo-50 text-indigo-900' : ''}`}>
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'stroke-[2.5px] scale-105 text-indigo-900' : 'stroke-2'
                    }`}
                  />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center px-1 animate-pulse border border-white">
                      {tab.badge}
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-indigo-950' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-indigo-900 mt-0.5 animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
