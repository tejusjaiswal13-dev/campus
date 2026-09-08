import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { NoticeCard } from '../notices/NoticeCard';
import { EventCard } from '../events/EventCard';
import { NoticeDetailModal } from '../notices/NoticeDetailModal';
import { EventDetailModal } from '../events/EventDetailModal';
import { EventRegisterModal } from '../events/EventRegisterModal';
import {
  BellRing,
  CalendarDays,
  GraduationCap,
  Briefcase,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Building2,
  Calendar,
  Sparkles,
  Search,
  BookOpen,
  HelpCircle,
  Users
} from 'lucide-react';
import { CampusEvent } from '../../types';

export const StudentHome: React.FC = () => {
  const { currentUser, role } = useAuth();
  const {
    setCurrentTab,
    getStudentNotices,
    getStudentEvents,
    exams,
    career,
    calendar,
    setSelectedNotice,
    setSelectedEvent,
    selectedNotice,
    selectedEvent
  } = useApp();

  const [registeringEvent, setRegisteringEvent] = React.useState<CampusEvent | null>(null);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const studentNotices = getStudentNotices();
  const urgentNotices = studentNotices.filter(n => n.isUrgent);
  const departmentNotices = studentNotices.filter(n => n.scope === 'DEPARTMENT');
  const collegeNotices = studentNotices.filter(n => n.scope === 'COLLEGE' && !n.isUrgent);

  const studentEvents = getStudentEvents();
  const upcomingEvents = studentEvents.slice(0, 3);

  // Department-specific exams
  const studentExams = exams.filter(
    e => e.departmentCode === (currentUser?.departmentCode || 'CCET')
  ).slice(0, 2);

  // Top career opportunities
  const topJobs = career.filter(
    c => c.departmentCodes.includes(currentUser?.departmentCode || 'CCET') || c.departmentCodes.includes('ALL')
  ).slice(0, 2);

  return (
    <div className="space-y-6 pb-16 md:pb-8 text-left">
      {/* Personalized Greeting Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-medium text-amber-300">
                {getGreeting()}, {currentUser?.name || 'Student'} 👋
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-900/80 border border-blue-700 text-blue-200">
                {currentUser?.departmentCode || 'IPS'}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Your Campus Dashboard
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Showing official updates for{' '}
              <strong className="text-white font-bold">{currentUser?.departmentName || 'Computer Applications'}</strong> +{' '}
              <strong className="text-white font-bold">University of Allahabad Central Notices</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('search')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search Campus...</span>
            </button>
          </div>
        </div>
      </div>

      {/* Urgent Notice Carousel / Banner */}
      {urgentNotices.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
              <AlertCircle className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Important & Urgent Directives</span>
            </div>
            <button
              onClick={() => setCurrentTab('notices')}
              className="text-xs font-semibold text-rose-700 hover:text-rose-900"
            >
              View All ({urgentNotices.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {urgentNotices.slice(0, 2).map(notice => (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="bg-rose-50/80 border-2 border-rose-300/80 rounded-2xl p-4 transition-all hover:shadow-md cursor-pointer flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0 shadow-xs">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-600 text-white">
                      Action Required
                    </span>
                    {notice.deadline && (
                      <span className="text-[11px] font-bold text-rose-800">
                        Deadline: {notice.deadline}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {notice.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {[
          {
            label: 'Exams & Timetable',
            sub: 'Sessional & Finals',
            icon: GraduationCap,
            tab: 'exams',
            color: 'bg-red-50 text-red-700 border-red-200'
          },
          {
            label: 'Events & Seminars',
            sub: 'Reserve your seat',
            icon: CalendarDays,
            tab: 'events',
            color: 'bg-blue-50 text-blue-900 border-blue-200'
          },
          {
            label: 'Academic Calendar',
            sub: 'Month / Week / List',
            icon: Calendar,
            tab: 'calendar',
            color: 'bg-purple-50 text-purple-700 border-purple-200'
          },
          {
            label: 'Placements & Jobs',
            sub: 'TCS, Infosys & More',
            icon: Briefcase,
            tab: 'career',
            color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
          },
          {
            label: 'Campus Facilities',
            sub: 'Library, Labs, Studios',
            icon: Building2,
            tab: 'campus',
            color: 'bg-amber-50 text-amber-900 border-amber-200'
          }
        ].map((act, i) => {
          const Icon = act.icon;
          return (
            <button
              key={i}
              onClick={() => setCurrentTab(act.tab)}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer group"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${act.color} border shadow-2xs group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-tight">
                  {act.label}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{act.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Department & College Notices + Upcoming Events */}
        <div className="lg:col-span-8 space-y-6">
          {/* Department Highlights Section */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-xs font-black">
                  {currentUser?.departmentCode || 'CCET'}
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  {currentUser?.departmentName || 'Computer Applications'} Announcements
                </h2>
              </div>
              <button
                onClick={() => setCurrentTab('notices')}
                className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {departmentNotices.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No active announcements for {currentUser?.departmentCode} right now.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {departmentNotices.slice(0, 2).map(notice => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    onClick={() => setSelectedNotice(notice)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Seminars & Events */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Upcoming Seminars & Workshops
                </h2>
                <p className="text-xs text-slate-500">
                  Interactive workshops with seat reservation passes
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('events')}
                className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.slice(0, 2).map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                  onRegisterClick={e => {
                    e.stopPropagation();
                    setRegisteringEvent(event);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Institutional College-Wide Circulars */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                Institutional College-Wide Circulars
              </h2>
              <button
                onClick={() => setCurrentTab('notices')}
                className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>All Circulars</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {collegeNotices.slice(0, 3).map(notice => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        College-Wide
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {notice.publishedAt.slice(0, 10)}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {notice.title}
                    </h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Exams, Placements, Academic Deadlines, External Portals */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Examination Widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Your Upcoming Exams
                </h3>
              </div>
              <button
                onClick={() => setCurrentTab('exams')}
                className="text-[11px] font-semibold text-blue-900 hover:underline"
              >
                Datesheet →
              </button>
            </div>

            <div className="space-y-2.5">
              {studentExams.map(ex => (
                <div
                  key={ex.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[10px] text-blue-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {ex.subjectCode}
                    </span>
                    <span className="text-[11px] font-bold text-rose-600">
                      {ex.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{ex.subjectName}</h4>
                  <p className="text-[11px] text-slate-500">{ex.room} • {ex.shift.split('(')[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career & Internships Teaser */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Placement Drives
                </h3>
              </div>
              <button
                onClick={() => setCurrentTab('career')}
                className="text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                All Jobs →
              </button>
            </div>

            <div className="space-y-2.5">
              {topJobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => setCurrentTab('career')}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{job.company}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {job.stipendOrSalary}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{job.role}</p>
                  <p className="text-[10px] text-slate-400">Deadline: {job.applicationDeadline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Deadlines Timeline */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-purple-700" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Key Academic Deadlines
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Sep 18, 2026</span>
                  <p className="text-slate-500 text-[11px]">Odd Sem Exam Form Submission Deadline</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Sep 21, 2026</span>
                  <p className="text-slate-500 text-[11px]">First Sessional Examinations Begin</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Sep 30, 2026</span>
                  <p className="text-slate-500 text-[11px]">Major Project Synopsis Submission</p>
                </div>
              </div>
            </div>
          </div>

          {/* University Portals Quick Access */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300">
              University ERP & Portals
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fast links to external University of Allahabad academic services.
            </p>
            <div className="space-y-1.5 text-xs">
              <a
                href="https://allduniv.ac.in"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between text-white font-semibold transition-colors"
              >
                <span>Examination Portal & Admit Cards</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
              <a
                href="https://allduniv.ac.in"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between text-white font-semibold transition-colors"
              >
                <span>Online Fee Verification Desk</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
              <a
                href="https://allduniv.ac.in"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between text-white font-semibold transition-colors"
              >
                <span>University Semester Results</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenRegister={() => {
          if (selectedEvent) setRegisteringEvent(selectedEvent);
        }}
      />

      <EventRegisterModal
        event={registeringEvent}
        onClose={() => setRegisteringEvent(null)}
      />
    </div>
  );
};
