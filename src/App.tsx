import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DesktopSidebar } from './components/common/DesktopSidebar';
import { Toast } from './components/common/Toast';

import { StudentHome } from './components/student/StudentHome';
import { NoticeList } from './components/notices/NoticeList';
import { EventList } from './components/events/EventList';
import { AcademicCalendarView } from './components/calendar/AcademicCalendarView';
import { ExamScheduleView } from './components/exams/ExamScheduleView';
import { CareerPortalView } from './components/career/CareerPortalView';
import { FacultyDirectoryView } from './components/faculty/FacultyDirectoryView';
import { DepartmentDirectoryView } from './components/departments/DepartmentDirectoryView';
import { CampusGuideView } from './components/campus/CampusGuideView';
import { BookmarksView } from './components/profile/BookmarksView';
import { GlobalSearchView } from './components/search/GlobalSearchView';
import { UserProfileView } from './components/profile/UserProfileView';
import { FacultyDashboard } from './components/faculty/FacultyDashboard';
import { DeptAdminDashboard } from './components/admin/DeptAdminDashboard';
import { CollegeAdminDashboard } from './components/admin/CollegeAdminDashboard';

import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { ForgotPasswordView } from './components/auth/ForgotPasswordView';
import { RoleSwitcherDrawer } from './components/auth/RoleSwitcherDrawer';
import { NotificationCenterModal } from './components/notifications/NotificationCenterModal';
import { CampusAIAssistantModal } from './components/ai/CampusAIAssistantModal';
import { CreateNoticeModal } from './components/notices/CreateNoticeModal';
import { CreateEventModal } from './components/events/CreateEventModal';

const AppContent: React.FC = () => {
  const { currentTab, deviceMode, setDeviceMode } = useApp();
  const { isAuthenticated } = useAuth();

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <StudentHome />;
      case 'notices':
        return <NoticeList />;
      case 'events':
        return <EventList />;
      case 'calendar':
        return <AcademicCalendarView />;
      case 'exams':
        return <ExamScheduleView />;
      case 'career':
        return <CareerPortalView />;
      case 'faculty':
        return <FacultyDirectoryView />;
      case 'departments':
        return <DepartmentDirectoryView />;
      case 'campus':
        return <CampusGuideView />;
      case 'bookmarks':
        return <BookmarksView />;
      case 'search':
        return <GlobalSearchView />;
      case 'profile':
        return <UserProfileView />;
      case 'faculty-dash':
        return <FacultyDashboard />;
      case 'dept-admin':
        return <DeptAdminDashboard />;
      case 'college-admin':
        return <CollegeAdminDashboard />;
      case 'auth':
      case 'login':
        return <LoginView />;
      case 'register':
        return <RegisterView />;
      case 'forgot-password':
        return <ForgotPasswordView />;
      default:
        return <StudentHome />;
    }
  };

  // If mobile frame preview is toggled on desktop
  if (deviceMode === 'mobile-frame') {
    return (
      <div className="min-h-screen bg-slate-900 py-6 px-4 flex flex-col items-center justify-center font-sans">
        {/* Device toggle banner */}
        <div className="mb-4 flex items-center justify-between w-full max-w-sm text-xs text-slate-400 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <span className="font-semibold text-white">📱 Mobile Preview Frame</span>
          <button
            onClick={() => setDeviceMode('fluid')}
            className="text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
          >
            Switch to Full Width
          </button>
        </div>

        {/* Smartphone Bezel */}
        <div className="w-full max-w-md h-[880px] bg-black rounded-[52px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col relative overflow-hidden">
          {/* Speaker Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-800 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-2 border border-slate-800" />
          </div>

          {/* Screen area */}
          <div className="flex-1 bg-slate-50 rounded-[44px] overflow-hidden flex flex-col relative border border-slate-800">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 pb-20">
              {renderActiveView()}
            </main>
            <BottomNav />
          </div>
        </div>

        {/* Global Modals */}
        <RoleSwitcherDrawer />
        <NotificationCenterModal />
        <CampusAIAssistantModal />
        <CreateNoticeModal />
        <CreateEventModal />
        <Toast />
      </div>
    );
  }

  // Standard responsive layout (Mobile bottom-nav, Desktop left sidebar)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Desktop Sidebar */}
        <DesktopSidebar />

        {/* Main Content Pane */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Interactive Modals */}
      <RoleSwitcherDrawer />
      <NotificationCenterModal />
      <CampusAIAssistantModal />
      <CreateNoticeModal />
      <CreateEventModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
