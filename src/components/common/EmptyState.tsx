import React from 'react';
import { LucideIcon, Inbox, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryTip?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
  secondaryTip
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-3xl border-2 border-dashed border-slate-200/80 bg-gradient-to-b from-white to-slate-50/60 shadow-2xs my-4">
      {/* Icon with layered soft rings */}
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
          <Icon className="w-8 h-8 stroke-[1.75]" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-black shadow-xs">
          ✦
        </div>
      </div>

      <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-1.5">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4 leading-relaxed">
        {description}
      </p>

      {secondaryTip && (
        <div className="mb-4 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-medium max-w-xs">
          💡 {secondaryTip}
        </div>
      )}

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <span>{actionText}</span>
          <span className="text-amber-400 font-black">→</span>
        </button>
      )}
    </div>
  );
};
