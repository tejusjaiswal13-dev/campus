import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../common/RoleBadge';
import { Globe, Lock, Mail, Sparkles, UserCheck, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginView: React.FC = () => {
  const { login, switchDemoRole } = useAuth();
  const { setCurrentTab, showToast } = useApp();

  const [email, setEmail] = useState('aarav.sharma@ips.allduniv.ac.in');
  const [password, setPassword] = useState('campus@2026');
  const [error, setError] = useState<string | null>(null);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = login(email);
    if (res.success) {
      showToast('Welcome back to IPS UOA Portal! 👋', 'success');
      setCurrentTab('home');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleFastDemoSelect = (role: UserRole, deptCode?: string) => {
    switchDemoRole(role, deptCode);
    showToast(`Logged in under ${role} demo profile`, 'success');
    if (role === 'COLLEGE_ADMIN') setCurrentTab('college-admin');
    else if (role === 'DEPARTMENT_ADMIN') setCurrentTab('dept-admin');
    else if (role === 'FACULTY') setCurrentTab('faculty-dash');
    else setCurrentTab('home');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 text-left">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Crest Header */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-md">
            <Globe className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
            University of Allahabad
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
            Institute of Professional Studies (IPS)
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
            Centralized Campus Management & Academic Information System
          </p>
        </div>

        {/* Demo Fast-Login Roster for Evaluators */}
        <div className="p-5 bg-amber-50/70 border-b border-amber-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Project Evaluator 1-Click Fast Login:</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleFastDemoSelect('STUDENT', 'CCET')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-blue-900 hover:shadow-xs transition-all text-left"
            >
              <span className="font-bold text-slate-900 block truncate">Aarav Sharma</span>
              <span className="text-[10px] text-blue-900 font-semibold block">Student (BCA • CCET)</span>
            </button>

            <button
              onClick={() => handleFastDemoSelect('STUDENT', 'CFT')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-blue-900 hover:shadow-xs transition-all text-left"
            >
              <span className="font-bold text-slate-900 block truncate">Priya Patel</span>
              <span className="text-[10px] text-emerald-800 font-semibold block">Student (Food Tech • CFT)</span>
            </button>

            <button
              onClick={() => handleFastDemoSelect('FACULTY', 'CCET')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-blue-900 hover:shadow-xs transition-all text-left"
            >
              <span className="font-bold text-slate-900 block truncate">Dr. Pradeep Kumar</span>
              <span className="text-[10px] text-purple-800 font-semibold block">Faculty (Asst. Prof)</span>
            </button>

            <button
              onClick={() => handleFastDemoSelect('DEPARTMENT_ADMIN', 'CCET')}
              className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-blue-900 hover:shadow-xs transition-all text-left"
            >
              <span className="font-bold text-slate-900 block truncate">Prof. R. S. Yadav</span>
              <span className="text-[10px] text-amber-800 font-bold block">HOD (CCET Admin)</span>
            </button>

            <button
              onClick={() => handleFastDemoSelect('COLLEGE_ADMIN')}
              className="col-span-2 p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all text-left flex items-center justify-between"
            >
              <div>
                <span className="font-bold block text-white text-xs">Dr. Neha Srivastava</span>
                <span className="text-[10px] text-amber-300">College Admin (Joint Director Office)</span>
              </div>
              <RoleBadge role="COLLEGE_ADMIN" size="sm" />
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <form onSubmit={handleCustomLogin} className="p-6 sm:p-7 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Campus Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your.name@ips.allduniv.ac.in"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setCurrentTab('forgot-password')}
                className="text-blue-900 hover:underline text-[11px] font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Sign In to Campus Portal</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <div className="text-center pt-3 border-t border-slate-100 text-slate-500">
            <span>Don't have an enrolled account? </span>
            <button
              type="button"
              onClick={() => setCurrentTab('register')}
              className="text-blue-900 font-bold hover:underline ml-1"
            >
              New Student Setup →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
