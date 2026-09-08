import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../common/RoleBadge';
import {
  User,
  Mail,
  GraduationCap,
  Building2,
  Phone,
  Bookmark,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  Edit3,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const { currentUser, role, logout, updateProfile } = useAuth();
  const { setCurrentTab, setIsNotificationCenterOpen, setIsRoleSwitcherOpen, showToast } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editSemester, setEditSemester] = useState(currentUser?.semester || 4);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSaveProfile = () => {
    updateProfile({
      name: editName,
      phone: editPhone,
      semester: Number(editSemester)
    });
    setIsEditModalOpen(false);
    showToast('Profile updated successfully! ✨', 'success');
  };

  return (
    <div className="space-y-5 pb-16 md:pb-6 text-left max-w-2xl mx-auto">
      {/* Profile Card Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs text-center relative overflow-hidden">
        {/* Background gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950" />

        <div className="relative pt-6">
          <div className="relative inline-block mb-3">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser?.name || 'User'}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
            />
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-1 right-1 p-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-transform active:scale-95"
              title="Edit Profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <h2 className="text-xl font-black text-slate-900">{currentUser?.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1.5 flex-wrap">
            <RoleBadge role={role} size="md" />
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              ID: {currentUser?.studentOrEmpId}
            </span>
          </div>

          <p className="text-xs font-semibold text-blue-900 mt-2">
            {currentUser?.course || currentUser?.designation || 'Academic Scholar'}
          </p>
          <p className="text-xs text-slate-500">
            Center of {currentUser?.departmentName} ({currentUser?.departmentCode})
          </p>
        </div>

        {/* Academic detail pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Department</span>
            <span className="font-bold text-slate-800 text-xs truncate block">{currentUser?.departmentCode}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
            <span className="font-bold text-emerald-700 text-xs block">
              {currentUser?.semester ? `Semester ${currentUser.semester}` : 'Active Staff'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Academic Term</span>
            <span className="font-bold text-slate-800 text-xs block">Odd Sem 2026</span>
          </div>
        </div>
      </div>

      {/* Student credentials & Contacts list */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Account & Contact Information
        </h3>

        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-900" />
              <span>Official Email</span>
            </div>
            <span className="font-semibold text-slate-900">{currentUser?.email}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-900" />
              <span>Contact Number</span>
            </div>
            <span className="font-semibold text-slate-900">{currentUser?.phone || '+91 98765 43210'}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-blue-900" />
              <span>Host Institute</span>
            </div>
            <span className="font-semibold text-slate-900">IPS, University of Allahabad</span>
          </div>
        </div>
      </div>

      {/* Actions & Settings Menu */}
      <div className="bg-white rounded-3xl p-2.5 border border-slate-200 shadow-xs divide-y divide-slate-100 text-xs font-semibold text-slate-700">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Edit3 className="w-4 h-4 text-slate-500" />
            <span>Edit Profile & Phone</span>
          </div>
          <span className="text-slate-400">›</span>
        </button>

        <button
          onClick={() => setIsNotificationCenterOpen(true)}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-slate-500" />
            <span>Notification Preferences</span>
          </div>
          <span className="text-slate-400">›</span>
        </button>

        <button
          onClick={() => setCurrentTab('bookmarks')}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span>Saved Circulars & Bookmarks</span>
          </div>
          <span className="text-slate-400">›</span>
        </button>

        <button
          onClick={() => setIsRoleSwitcherOpen(true)}
          className="w-full flex items-center justify-between p-3 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer text-amber-900"
        >
          <div className="flex items-center gap-3">
            <UserCheck className="w-4 h-4 text-amber-600" />
            <span>Switch Role for Evaluation Demo</span>
          </div>
          <span className="text-amber-600 font-bold text-[11px] bg-amber-100 px-2 py-0.5 rounded">
            Evaluator Mode
          </span>
        </button>

        <button
          onClick={() => setShowHelpModal(true)}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Student Helpdesk & Grievances</span>
          </div>
          <span className="text-slate-400">›</span>
        </button>

        <button
          onClick={() => setShowAboutModal(true)}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Info className="w-4 h-4 text-slate-500" />
            <span>About IPS UOA Portal & Minor Project</span>
          </div>
          <span className="text-slate-400">›</span>
        </button>

        <button
          onClick={() => {
            logout();
            setCurrentTab('auth');
          }}
          className="w-full flex items-center justify-between p-3 hover:bg-rose-50 text-rose-600 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Sign Out from Campus Portal</span>
          </div>
          <span className="text-rose-400">›</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 text-left">
            <h3 className="text-base font-bold text-slate-900">Update Profile Details</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Current Semester</label>
                <select
                  value={editSemester}
                  onChange={e => setEditSemester(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 cursor-pointer"
                >
                  <option value={1}>Semester I</option>
                  <option value={2}>Semester II</option>
                  <option value={3}>Semester III</option>
                  <option value={4}>Semester IV</option>
                  <option value={5}>Semester V</option>
                  <option value={6}>Semester VI</option>
                </select>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px]">
                Note: Department and Role changes require official verification by College Administration.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 text-left">
            <h3 className="text-base font-bold text-slate-900">About IPS UOA Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>IPS UOA</strong> is a centralized college campus management and information system developed as an authentic college minor project for the Institute of Professional Studies, University of Allahabad.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed around a <strong>Department-Aware Architecture</strong> with 4-tier role-based access (Student, Faculty, Department Admin / HOD, College Admin), solving information fragmentation across WhatsApp, physical notice boards, and disparate web portals.
            </p>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-950 font-medium">
              "One Campus. One Platform. All Information."
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAboutModal(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-900 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 text-left">
            <h3 className="text-base font-bold text-slate-900">Student Welfare & Helpdesk</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>IPS Single Window Desk:</strong> Room 104, Directorate Building</p>
              <p><strong>Helpdesk Email:</strong> helpdesk.ips@allduniv.ac.in</p>
              <p><strong>Student Grievance Cell:</strong> grievance.ips@allduniv.ac.in</p>
              <p><strong>Office Hours:</strong> 10:00 AM - 04:30 PM (Mon-Fri)</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-900 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
