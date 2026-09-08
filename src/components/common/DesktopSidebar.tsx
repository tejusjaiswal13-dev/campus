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
  MapPin,
  Bookmark,
  ShieldCheck,
  ExternalLink,
  PlusCircle,
  FileCheck
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const { currentTab, setCurrentTab, getPendingApprovals, setIsCreateNoticeOpen, setIsCreateEventOpen } = useApp();
  const { role, currentUser } = useAuth();

  const pendingCount = getPendingApprovals().notices.length + getPendingApprovals().events.length;

  const mainNav = [
    { id: 'home', label: 'Student Home', icon: Home },
    { id: 'notices', label: 'Campus Notices', icon: BellRing },
    { id: 'events', label: 'Events & Seminars', icon: CalendarDays },
    { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
    { id: 'exams', label: 'Exams & Timetables', icon: GraduationCap },
    { id: 'career', label: 'Placements & Career', icon: Briefcase },
    { id: 'faculty', label: 'Faculty Directory', icon: Users },
    { id: 'departments', label: 'IPS Departments (5)', icon: Building2 },
    { id: 'campus', label: 'Campus Facilities', icon: MapPin },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200 shrink-0 h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto">
      {/* Quick Action Buttons for staff */}
      {(role === 'FACULTY' || role === 'DEPARTMENT_ADMIN' || role === 'COLLEGE_ADMIN') && (
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 space-y-2">
          <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Quick Publishing
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsCreateNoticeOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Notice</span>
            </button>
            <button
              onClick={() => setIsCreateEventOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Event</span>
            </button>
          </div>
        </div>
      )}

      {/* Role specific section */}
      <div className="p-3 border-b border-slate-100">
        <p className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Management & Access
        </p>
        <div className="space-y-1 mt-1">
          {role === 'COLLEGE_ADMIN' && (
            <button
              onClick={() => setCurrentTab('college-admin')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'college-admin'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>College Admin Desk</span>
              </div>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          )}

          {role === 'DEPARTMENT_ADMIN' && (
            <button
              onClick={() => setCurrentTab('dept-admin')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'dept-admin'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-amber-700" />
                <span>{currentUser?.departmentCode} HOD Desk</span>
              </div>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          )}

          {role === 'FACULTY' && (
            <button
              onClick={() => setCurrentTab('faculty-dash')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'faculty-dash'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-purple-700" />
                <span>My Submissions & Approvals</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation links */}
      <div className="flex-1 p-3 space-y-1">
        <p className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Campus Navigation
        </p>
        {mainNav.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                isActive
                  ? 'bg-blue-900 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* University Complementary Portals (Minor project integration placeholders) */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <p className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          University Portals
        </p>
        <div className="space-y-1 mt-1 text-xs text-slate-600">
          <a
            href="https://allduniv.ac.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-blue-900 text-[11px]"
          >
            <span>UoA Main Portal</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://allduniv.ac.in/examination"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-blue-900 text-[11px]"
          >
            <span>Samarth ERP Portal</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a
            href="https://swayam.gov.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-blue-900 text-[11px]"
          >
            <span>SWAYAM / NPTEL</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </aside>
  );
};
