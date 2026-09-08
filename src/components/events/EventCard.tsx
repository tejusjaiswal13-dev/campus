import React from 'react';
import { CampusEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, MapPin, Users, CheckCircle2, Bookmark } from 'lucide-react';

interface EventCardProps {
  event: CampusEvent;
  onClick: () => void;
  onRegisterClick: (e: React.MouseEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick, onRegisterClick }) => {
  const { currentUser } = useAuth();
  const { handleToggleBookmark, isItemBookmarked } = useApp();

  const isRegistered = currentUser && event.registeredUserIds.includes(currentUser.id);
  const isBookmarked = isItemBookmarked(event.id);
  const seatsPercentage = Math.round(((event.totalSeats - event.availableSeats) / event.totalSeats) * 100);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleBookmark({
      itemType: 'EVENT',
      itemId: event.id,
      title: event.title,
      subtitle: `${event.date} • ${event.venue}`,
      category: event.category,
      date: event.date
    });
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col text-left"
    >
      {/* Event Banner */}
      <div className="relative h-44 sm:h-48 w-full bg-slate-900 overflow-hidden">
        <img
          src={event.bannerImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-white/95 text-blue-950 font-extrabold text-[10px] uppercase tracking-wider backdrop-blur-md shadow-xs">
              {event.category}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-amber-300 border border-amber-400/30 font-semibold text-[10px] backdrop-blur-md">
              {event.scope === 'COLLEGE' ? 'Campus-Wide' : `${event.departmentCode} Center`}
            </span>
          </div>

          <button
            onClick={handleBookmark}
            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isBookmarked
                ? 'bg-amber-400 text-slate-950'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Date pill overlay at bottom of banner */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
          <div className="px-2.5 py-1 rounded-lg bg-blue-900/90 backdrop-blur-md border border-blue-700/50 flex items-center gap-1.5 text-xs font-bold shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {new Date(event.date).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-900 transition-colors line-clamp-2 mb-1.5">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Event logistics details */}
        <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 truncate">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          {event.speaker && (
            <div className="flex items-center gap-2 truncate text-slate-500 text-[11px]">
              <span className="font-semibold text-slate-700">Speaker:</span>
              <span className="truncate">{event.speaker}</span>
            </div>
          )}
        </div>

        {/* Seat capacity bar */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              <span>Available Seats:</span>
            </span>
            <span
              className={`font-bold ${
                event.availableSeats < 10 ? 'text-rose-600 font-extrabold' : 'text-slate-800'
              }`}
            >
              {event.availableSeats} of {event.totalSeats} left
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                seatsPercentage > 85 ? 'bg-rose-500' : 'bg-blue-600'
              }`}
              style={{ width: `${seatsPercentage}%` }}
            />
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2">
          {isRegistered ? (
            <div className="w-full py-2 px-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>REGISTERED ✓ (View Digital Pass)</span>
            </div>
          ) : (
            <button
              onClick={onRegisterClick}
              disabled={event.availableSeats <= 0}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                event.availableSeats <= 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-900 hover:bg-blue-800 text-white'
              }`}
            >
              {event.availableSeats <= 0 ? (
                'Fully Booked'
              ) : (
                <>
                  <span>1-Click Reserve Seat</span>
                  <span className="text-amber-400">→</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
