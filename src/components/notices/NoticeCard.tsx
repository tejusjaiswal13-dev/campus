import React from 'react';
import { Notice } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  AlertCircle,
  Paperclip,
  Bookmark,
  Eye,
  Building2,
  Globe,
  GraduationCap,
  Briefcase,
  Sparkles,
  Trophy,
  FileText
} from 'lucide-react';

interface NoticeCardProps {
  notice: Notice;
  onClick: () => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onClick }) => {
  const { handleToggleBookmark, isItemBookmarked } = useApp();
  const bookmarked = isItemBookmarked(notice.id);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'Urgent':
      case 'Examination':
        return {
          pill: 'bg-rose-50 text-rose-700 border-rose-200',
          indicator: 'bg-rose-600',
          icon: FileText
        };
      case 'Academic':
        return {
          pill: 'bg-blue-50 text-blue-700 border-blue-200',
          indicator: 'bg-blue-600',
          icon: GraduationCap
        };
      case 'Placement':
      case 'Internship':
        return {
          pill: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          indicator: 'bg-emerald-600',
          icon: Briefcase
        };
      case 'Scholarship':
        return {
          pill: 'bg-amber-50 text-amber-900 border-amber-200',
          indicator: 'bg-amber-600',
          icon: Trophy
        };
      case 'Seminar':
      case 'Workshop':
      case 'Competition':
      case 'Guest Lecture':
        return {
          pill: 'bg-purple-50 text-purple-700 border-purple-200',
          indicator: 'bg-purple-600',
          icon: Sparkles
        };
      default:
        return {
          pill: 'bg-slate-100 text-slate-700 border-slate-200',
          indicator: 'bg-slate-400',
          icon: Building2
        };
    }
  };

  const config = getCategoryConfig(notice.category);
  const CategoryIcon = config.icon;

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleBookmark({
      itemType: 'NOTICE',
      itemId: notice.id,
      title: notice.title,
      subtitle: notice.deadline ? `Deadline: ${notice.deadline}` : `Published: ${notice.publishedAt.slice(0, 10)}`,
      category: notice.category,
      date: notice.deadline || notice.publishedAt.slice(0, 10)
    });
  };

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-left active:scale-[0.99] overflow-hidden ${
        notice.isUrgent
          ? 'border-rose-300 ring-2 ring-rose-500/10 bg-gradient-to-br from-white via-white to-rose-50/40 shadow-xs'
          : 'border-slate-200 hover:border-indigo-200 shadow-2xs'
      }`}
    >
      {/* Category indicator strip on the left edge */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1.5 ${
          notice.isUrgent ? 'bg-rose-500 animate-pulse' : config.indicator
        }`}
      />

      {/* Top badges row */}
      <div className="flex items-center justify-between gap-2 mb-2.5 pl-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Urgent tag */}
          {notice.isUrgent && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-2xs animate-pulse">
              <AlertCircle className="w-3 h-3" />
              <span>URGENT</span>
            </span>
          )}

          {/* Scope tag */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
              notice.scope === 'COLLEGE'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {notice.scope === 'COLLEGE' ? (
              <>
                <Globe className="w-3 h-3 text-indigo-500" />
                <span>Central Campus</span>
              </>
            ) : (
              <>
                <Building2 className="w-3 h-3 text-amber-600" />
                <span>{notice.departmentCode || 'Dept'} Center</span>
              </>
            )}
          </span>

          {/* Category */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${config.pill}`}
          >
            <CategoryIcon className="w-3 h-3" />
            <span>{notice.category}</span>
          </span>
        </div>

        {/* Bookmark action */}
        <button
          onClick={handleBookmarkClick}
          className={`p-1.5 rounded-xl transition-all cursor-pointer select-none active:scale-90 ${
            bookmarked
              ? 'text-amber-500 bg-amber-50 ring-1 ring-amber-300'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Save Notice'}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Notice Title */}
      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-950 transition-colors line-clamp-2 mb-2 pl-1.5">
        {notice.title}
      </h3>

      {/* Description Snippet */}
      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3 pl-1.5">
        {notice.description}
      </p>

      {/* Bottom meta row */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 pl-1.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {new Date(notice.publishedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </span>

          {notice.deadline && (
            <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Due: {notice.deadline}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          {notice.attachmentName && (
            <span className="flex items-center gap-0.5 text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-indigo-100">
              <Paperclip className="w-3 h-3" />
              <span>PDF</span>
            </span>
          )}
          <span className="flex items-center gap-0.5">
            <Eye className="w-3 h-3" />
            <span>{notice.viewsCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
