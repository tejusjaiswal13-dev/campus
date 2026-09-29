import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  BellRing,
  CalendarDays,
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
  Building2,
  Bookmark,
  ShieldCheck,
  ExternalLink,
  PlusCircle,
  FileCheck,
  BookOpen,
  Send,
  Clock
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const { currentTab, setCurrentTab, getPendingApprovals, setIsCreateNoticeOpen, setIsCreateEventOpen } = useApp();
  const { role, currentUser } = useAuth();

  const pendingCount = getPendingApprovals().notices.length + getPendingApprovals().events.length;

  const getNavLinks = () => {
    switch (role) {
      case 'FACULTY':
        return [
          { id: 'home', label: 'Faculty Dashboard', icon: Home },
          { id: 'classes', label: 'My Teaching Schedule', icon: BookOpen },
          { id: 'class-notices', label: 'Direct Class Notices', icon: Send },
          { id: 'students', label: 'Enrolled Students', icon: Users },
          { id: 'faculty-dash', label: 'Official Submissions', icon: FileCheck }
        ];

      case 'DEPARTMENT_ADMIN':
        return [
          { id: 'home', label: 'HOD Overview', icon: Home },
          { id: 'approvals', label: 'Approvals Desk', icon: FileCheck, badge: pendingCount > 0 ? pendingCount : undefined },
          { id: 'notices', label: 'Dept Circulars', icon: BellRing },
          { id: 'faculty', label: 'Faculty Directory', icon: Users },
          { id: 'dept-admin', label: 'HOD Operations Desk', icon: Building2 }
        ];

      case 'COLLEGE_ADMIN':
        return [
          { id: 'home', label: 'Executive Dashboard', icon: ShieldCheck },
          { id: 'users', label: 'User Accounts', icon: Users },
          { id: 'departments', label: '5 IPS Centers', icon: Building2 },
          { id: 'notices', label: 'Central Directives', icon: BellRing },
          { id: 'events', label: 'Campus Events', icon: CalendarDays },
          { id: 'college-admin', label: 'Admin Operations', icon: ShieldCheck }
        ];

      case 'STUDENT':
      default:
        return [
          { id: 'home', label: 'Student Home', icon: Home },
          { id: 'notices', label: 'Campus Notices', icon: BellRing },
          { id: 'timetable', label: 'Smart Timetable', icon: Clock },
          { id: 'events', label: 'Events & Seminars', icon: CalendarDays },
          { id: 'exams', label: 'Exams & Datesheets', icon: GraduationCap },
          { id: 'career', label: 'Placements & Career', icon: Briefcase },
          { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark }
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200 shrink-0 h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto">
      {/* Role Indicator Banner */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {role.replace('_', ' ')} PORTAL
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 font-mono text-[10px] font-bold">
            {currentUser?.departmentCode || 'IPS'}
          </span>
        </div>
        <p className="text-xs font-bold text-slate-800 truncate mt-1">
          {currentUser?.name}
        </p>
      </div>

      {/* Quick Action Buttons for staff */}
      {(role === 'FACULTY' || role === 'DEPARTMENT_ADMIN' || role === 'COLLEGE_ADMIN') && (
        <div className="p-3 border-b border-slate-100 space-y-2">
          {role === 'FACULTY' && (
            <button
              onClick={() => setCurrentTab('class-notices')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Send Direct Class Notice</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsCreateNoticeOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              title="Submit notice for HOD approval"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Notice</span>
            </button>
            <button
              onClick={() => setIsCreateEventOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Event</span>
            </button>
          </div>
        </div>
      )}

      {/* Role specific links */}
      <div className="flex-1 p-3 space-y-1">
        <p className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Navigation
        </p>
        {navLinks.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                isActive
                  ? 'bg-indigo-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* University Portals footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="space-y-1 text-xs text-slate-600">
          <a
            href="https://allduniv.ac.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-indigo-900 text-[11px]"
          >
            <span>UoA Central Portal</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </aside>
  );
};
