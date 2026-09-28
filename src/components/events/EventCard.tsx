import React from 'react';
import { CampusEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Ticket
} from 'lucide-react';

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

  const eventDateObj = new Date(event.date);
  const monthName = eventDateObj.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  const dayNum = eventDateObj.getDate();

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
      className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col text-left active:scale-[0.99]"
    >
      {/* Event Banner */}
      <div className="relative h-44 sm:h-48 w-full bg-slate-900 overflow-hidden">
        <img
          src={event.bannerImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Distinctive Date Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <div className="flex flex-col items-center justify-center w-12 h-14 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 overflow-hidden text-center shrink-0">
            <span className="w-full bg-indigo-900 text-amber-300 text-[9px] font-black uppercase py-0.5 tracking-wider">
              {monthName}
            </span>
            <span className="text-xl font-black text-slate-900 leading-tight py-0.5">
              {dayNum}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-amber-300 border border-amber-400/30 font-bold text-[10px] backdrop-blur-md w-fit">
              {event.category}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/20 text-white font-medium text-[10px] backdrop-blur-md w-fit">
              {event.scope === 'COLLEGE' ? 'Campus-Wide' : `${event.departmentCode} Center`}
            </span>
          </div>
        </div>

        {/* Bookmark button (Top Right) */}
        <button
          onClick={handleBookmark}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 z-10 ${
            isBookmarked
              ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          title={isBookmarked ? 'Remove Bookmark' : 'Save Event'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Time pill overlay at bottom of banner */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>

          {event.speaker && (
            <div className="text-[11px] text-indigo-200 font-semibold truncate max-w-[140px]">
              {event.speaker}
            </div>
          )}
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-900 transition-colors line-clamp-2 mb-1.5">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Venue Location */}
        <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100 truncate">
          <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="truncate font-medium">{event.venue}</span>
        </div>

        {/* Seat capacity bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              <span>Available Seats:</span>
            </span>
            <span
              className={`font-bold ${
                event.availableSeats < 15 ? 'text-rose-600 font-extrabold' : 'text-slate-800'
              }`}
            >
              {event.availableSeats} of {event.totalSeats} left
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                seatsPercentage > 85 ? 'bg-rose-500' : seatsPercentage > 60 ? 'bg-amber-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${seatsPercentage}%` }}
            />
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2">
          {isRegistered ? (
            <div className="w-full py-2.5 px-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>PASS ISSUED (Tap to View QR)</span>
            </div>
          ) : (
            <button
              onClick={onRegisterClick}
              disabled={event.availableSeats <= 0}
              className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                event.availableSeats <= 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-900 hover:bg-indigo-800 text-white'
              }`}
            >
              {event.availableSeats <= 0 ? (
                'Fully Booked'
              ) : (
                <>
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Click Reserve Pass</span>
                  <span className="text-amber-400 font-black">→</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
