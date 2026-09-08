import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionTab?: string;
  actionLabel?: string;
}

export const CampusAIAssistantModal: React.FC = () => {
  const { isAIAssistantOpen, setIsAIAssistantOpen, exams, events, notices, facilities, career, setCurrentTab } = useApp();
  const { currentUser } = useAuth();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Hello ${currentUser?.name || 'Student'}! 👋 I am the **IPS UOA Smart Assistant**. How can I assist your campus life today? You can ask about exams, seminars, internships, or campus facilities.`
    }
  ]);

  if (!isAIAssistantOpen) return null;

  const quickPrompts = [
    'When is my next exam?',
    'Show me CCET department notices',
    'Are there any upcoming seminars or workshops?',
    'Find internships for BCA students',
    'Where is the Central Library located?'
  ];

  const handleSend = (text: string) => {
    const query = text.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Generate grounded knowledge response based on campus dataset
    setTimeout(() => {
      let botResponse = '';
      let tabTarget: string | undefined = undefined;
      let tabLabel: string | undefined = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('exam') || lower.includes('date sheet') || lower.includes('timetable')) {
        const studentExams = exams.filter(e => e.departmentCode === (currentUser?.departmentCode || 'CCET'));
        if (studentExams.length > 0) {
          const first = studentExams[0];
          botResponse = `Your upcoming **${first.examType}** starts on **${first.date}** with *${first.subjectName} (${first.subjectCode})* at **${first.room}** during the **${first.shift}**. Be sure to carry your college ID and fee verification receipt.`;
          tabTarget = 'exams';
          tabLabel = 'View Full Exam Timetable';
        } else {
          botResponse = 'Examinations for the Odd Semester 2026 commence on September 21. Check the examination portal for complete datesheets.';
          tabTarget = 'exams';
          tabLabel = 'Open Exams Tab';
        }
      } else if (lower.includes('notice') || lower.includes('announcement') || lower.includes('ccet') || lower.includes('circular')) {
        const matchingNotices = notices.filter(n => n.departmentCode === 'CCET' || n.category === 'Examination');
        botResponse = `Here are active notices for your center:\n\n• **${matchingNotices[0]?.title || 'Examination Form Submission'}** (Deadline: ${matchingNotices[0]?.deadline || 'Sep 18'})\n• **${matchingNotices[1]?.title || 'AI Workshop Announcement'}**\n\nAll official notices are stamped with publisher verification.`;
        tabTarget = 'notices';
        tabLabel = 'Open Campus Notices';
      } else if (lower.includes('seminar') || lower.includes('workshop') || lower.includes('event') || lower.includes('hackathon')) {
        const upcoming = events.filter(e => e.status === 'APPROVED');
        botResponse = `We have **${upcoming.length} upcoming events**! Highly recommended:\n\n1. **${upcoming[0]?.title}** on ${upcoming[0]?.date} at ${upcoming[0]?.venue}.\n2. **HackIPS 2026 24-Hour Hackathon** on September 28 at the Central Auditorium.\n\nYou can reserve your seat directly with 1-click in the Events section!`;
        tabTarget = 'events';
        tabLabel = 'Explore & Register for Events';
      } else if (lower.includes('internship') || lower.includes('job') || lower.includes('placement') || lower.includes('career') || lower.includes('bca')) {
        const jobs = career.filter(c => c.departmentCodes.includes('CCET') || c.departmentCodes.includes('ALL'));
        botResponse = `Great opportunities for BCA/MCA students:\n\n• **${jobs[0]?.company}**: ${jobs[0]?.role} (Stipend: ${jobs[0]?.stipendOrSalary})\n• **${jobs[1]?.company}**: ${jobs[1]?.role} (Stipend: ${jobs[1]?.stipendOrSalary})\n\nApplication deadlines are approaching between Sep 18 - 25.`;
        tabTarget = 'career';
        tabLabel = 'Visit Placement & Career Hub';
      } else if (lower.includes('library') || lower.includes('lab') || lower.includes('facility') || lower.includes('canteen') || lower.includes('hostel')) {
        const lib = facilities.find(f => f.category === 'Library') || facilities[0];
        botResponse = `The **${lib.name}** is located at **${lib.location}**. Timings are **${lib.timings}**. Incharge: ${lib.incharge}. Extended night reading hours are currently active for exam preparation!`;
        tabTarget = 'campus';
        tabLabel = 'View Campus Facility Guide';
      } else {
        botResponse = `I understand you are asking about "${query}". IPS UOA integrates all campus notices, seminar schedules, exam timetables, and department circulars into this unified platform. Let me take you to the main dashboard!`;
        tabTarget = 'home';
        tabLabel = 'Go to Home Dashboard';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        actionTab: tabTarget,
        actionLabel: tabLabel
      };
      setMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-4.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm">IPS Campus AI Assistant</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-400/20 border border-amber-400/40 text-amber-300 rounded">
                  AI Preview
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Context-aware student advisor for University of Allahabad
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-900 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                {msg.actionTab && (
                  <button
                    onClick={() => {
                      setIsAIAssistantOpen(false);
                      if (msg.actionTab) setCurrentTab(msg.actionTab);
                    }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-lg font-bold text-[11px] border border-blue-200 transition-colors"
                  >
                    <span>{msg.actionLabel || 'Go to Section'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick prompt chips */}
        <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 whitespace-nowrap hide-scrollbar">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend(inputQuery);
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Ask about notices, exams, events, library..."
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:bg-white transition-all text-slate-800"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
