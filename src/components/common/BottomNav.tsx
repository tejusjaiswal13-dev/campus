import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  BellRing,
  CalendarDays,
  Clock,
  User,
  BookOpen,
  Send,
  Users,
  Building2,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, getPendingApprovals } = useApp();
  const { role } = useAuth();

  const pendingApprovalsCount = getPendingApprovals().notices.length + getPendingApprovals().events.length;

  // Strict role-based navigation tabs
  const getTabsForRole = () => {
    switch (role) {
      case 'FACULTY':
        return [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'classes', label: 'My Classes', icon: BookOpen },
          { id: 'class-notices', label: 'Direct Notices', icon: Send },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'profile', label: 'Profile', icon: User }
        ];

      case 'DEPARTMENT_ADMIN':
        return [
          { id: 'home', label: 'HOD Home', icon: Building2 },
          {
            id: 'approvals',
            label: 'Approvals',
            icon: FileCheck,
            badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined
          },
          { id: 'notices', label: 'Dept Circulars', icon: BellRing },
          { id: 'faculty', label: 'Faculty', icon: Users },
          { id: 'profile', label: 'Profile', icon: User }
        ];

      case 'COLLEGE_ADMIN':
        return [
          { id: 'home', label: 'Admin Dash', icon: ShieldCheck },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'departments', label: '5 Centers', icon: Building2 },
          { id: 'notices', label: 'Directives', icon: BellRing },
          { id: 'profile', label: 'Profile', icon: User }
        ];

      case 'STUDENT':
      default:
        return [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'notices', label: 'Notices', icon: BellRing },
          { id: 'timetable', label: 'Timetable', icon: Clock },
          { id: 'events', label: 'Events', icon: CalendarDays },
          { id: 'profile', label: 'Profile', icon: User }
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl py-1 md:hidden max-w-md mx-auto">
      <div className="flex items-center justify-around px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all duration-150 select-none cursor-pointer active:scale-90 ${
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
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-rose-600 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 animate-pulse border border-white">
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
