import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Mail, CheckCircle2, Lock } from 'lucide-react';

export const ForgotPasswordView: React.FC = () => {
  const { setCurrentTab, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    showToast('Recovery verification link sent to official student inbox! 📩', 'success');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 text-left">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-6 sm:p-8 space-y-4">
        <button
          onClick={() => setCurrentTab('login')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900">Reset Campus Password</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your official university email to receive secure recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Password Reset Dispatched</span>
            </div>
            <p className="leading-relaxed">
              We have dispatched a reset link to <strong>{email}</strong>. Please follow the instructions to set up a new password.
            </p>
            <button
              onClick={() => setCurrentTab('login')}
              className="mt-3 w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Enrolled University Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="aarav.sharma@ips.allduniv.ac.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Send Password Reset Instructions
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
