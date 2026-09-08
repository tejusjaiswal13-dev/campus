import React from 'react';
import { Notice } from '../../types';
import { useApp } from '../../context/AppContext';
import { Calendar, AlertCircle, Paperclip, Bookmark, Eye, Building2, Globe } from 'lucide-react';

interface NoticeCardProps {
  notice: Notice;
  onClick: () => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onClick }) => {
  const { handleToggleBookmark, isItemBookmarked } = useApp();
  const bookmarked = isItemBookmarked(notice.id);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Urgent':
      case 'Examination':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Academic':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Placement':
      case 'Internship':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Scholarship':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Seminar':
      case 'Workshop':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

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
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-left ${
        notice.isUrgent
          ? 'border-rose-300 ring-1 ring-rose-300/40 bg-gradient-to-br from-white via-white to-rose-50/30'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top badges row */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Urgent tag */}
          {notice.isUrgent && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
              <AlertCircle className="w-3 h-3" />
              <span>Urgent</span>
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
                <Globe className="w-3 h-3" />
                <span>College-Wide</span>
              </>
            ) : (
              <>
                <Building2 className="w-3 h-3" />
                <span>{notice.departmentCode} Department</span>
              </>
            )}
          </span>

          {/* Category */}
          <span
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${getCategoryColor(
              notice.category
            )}`}
          >
            {notice.category}
          </span>
        </div>

        {/* Bookmark action */}
        <button
          onClick={handleBookmarkClick}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            bookmarked
              ? 'text-amber-500 bg-amber-50'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Save Notice'}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Notice Title */}
      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-900 transition-colors line-clamp-2 mb-2">
        {notice.title}
      </h3>

      {/* Description Snippet */}
      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
        {notice.description}
      </p>

      {/* Bottom meta row */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
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
            <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
              Deadline: {notice.deadline}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          {notice.attachmentName && (
            <span className="flex items-center gap-0.5 text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded text-[10px] font-medium">
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
