import React, { useState } from 'react';
import { 
  TripPlan, 
  ItineraryDay, 
  ItineraryActivity 
} from '../../types';
import { 
  Clock, 
  MapPin, 
  Coins, 
  Timer, 
  Sparkles, 
  Camera, 
  Users, 
  Sun, 
  Umbrella, 
  Zap, 
  Share2, 
  Download, 
  Heart, 
  Check, 
  TrendingDown,
  Navigation
} from 'lucide-react';

interface ItineraryViewProps {
  trip: TripPlan;
  onOptimizeClick: () => void;
  onSaveTrip: () => void;
  onShareTrip: () => void;
  onDownloadTrip: () => void;
  isSaved?: boolean;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  trip,
  onOptimizeClick,
  onSaveTrip,
  onShareTrip,
  onDownloadTrip,
  isSaved = false
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const selectedDay = trip.days.find(d => d.dayNumber === selectedDayNumber) || trip.days[0];

  const getCrowdBadge = (crowd: string) => {
    switch (crowd) {
      case 'Low':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">🟢 Low Crowd</span>;
      case 'Moderate':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">🟡 Moderate Crowd</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">🔴 High Crowd</span>;
      default:
        return null;
    }
  };

  const getPeriodTheme = (period: string) => {
    switch (period) {
      case 'Morning':
        return {
          badge: 'bg-amber-100 text-amber-900 border-amber-200',
          dot: 'bg-amber-500',
          icon: '🌅'
        };
      case 'Afternoon':
        return {
          badge: 'bg-ocean-100 text-ocean-900 border-ocean-200',
          dot: 'bg-ocean-500',
          icon: '☀️'
        };
      case 'Evening':
        return {
          badge: 'bg-purple-100 text-purple-900 border-purple-200',
          dot: 'bg-purple-500',
          icon: '🌆'
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-200',
          dot: 'bg-slate-500',
          icon: '📍'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Trip Title, AI Innovation Highlights & Action Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-ocean-100 text-ocean-700 text-xs font-bold uppercase tracking-wider">
                AI Custom Itinerary
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                🌱 Eco-Score: {trip.sustainabilityScore}/100
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {trip.days.length} Days • {trip.request.travelers} Travelers • {trip.request.travelStyle}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {trip.tripName}
            </h2>

            <p className="text-sm text-slate-600 max-w-2xl">
              Starting from <strong className="text-slate-800">{trip.request.startingLocation}</strong> to{' '}
              <strong className="text-ocean-600">{trip.destinationInfo.name}</strong>. Powered by TravelAI route clustering and crowd-avoidance engine.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOptimizeClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-sunset-500 hover:from-amber-600 hover:to-sunset-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-sunset-500/20 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              <span>Optimize Route</span>
            </button>

            <button
              onClick={onSaveTrip}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <Heart className="w-4 h-4 text-rose-500" />}
              <span>{isSaved ? 'Saved' : 'Save Trip'}</span>
            </button>

            <button
              onClick={onShareTrip}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all"
              title="Share Trip"
            >
              <Share2 className="w-4 h-4 text-ocean-600" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onDownloadTrip}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all"
              title="Download or Print Itinerary"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>

        </div>

        {/* Day Selector Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pt-6 mt-6 border-t border-slate-100 pb-1">
          {trip.days.map((d) => {
            const isSelected = d.dayNumber === selectedDayNumber;
            return (
              <button
                key={d.dayNumber}
                onClick={() => setSelectedDayNumber(d.dayNumber)}
                className={`flex flex-col items-start px-4 py-3 rounded-2xl border min-w-[130px] sm:min-w-[160px] text-left transition-all ${
                  isSelected
                    ? 'bg-ocean-600 text-white border-ocean-600 shadow-md shadow-ocean-600/25'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-ocean-100' : 'text-slate-400'}`}>
                    Day {d.dayNumber}
                  </span>
                  <span className={`text-[11px] font-semibold ${isSelected ? 'text-ocean-200' : 'text-slate-500'}`}>
                    ₹{d.dayStats.totalCost.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-extrabold truncate mt-1 max-w-[140px]">
                  {d.theme}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Active Day Header & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Day {selectedDay.dayNumber}: {selectedDay.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedDay.date || `Day ${selectedDay.dayNumber} of journey`} • Theme: {selectedDay.theme}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-ocean-600" />
            <span>{selectedDay.dayStats.travelTime}</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>₹{selectedDay.dayStats.totalCost.toLocaleString()} est.</span>
          </div>
        </div>
      </div>

      {/* Activity Cards (Morning, Afternoon, Evening) */}
      <div className="space-y-4">
        {selectedDay.activities.map((activity, idx) => {
          const periodMeta = getPeriodTheme(activity.period);

          return (
            <div
              key={activity.id || idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 relative overflow-hidden group"
            >
              {/* Left Accent Color Indicator */}
              <div className={`absolute top-0 left-0 bottom-0 w-2 ${activity.period === 'Morning' ? 'bg-amber-400' : activity.period === 'Afternoon' ? 'bg-ocean-500' : 'bg-purple-500'}`} />

              <div className="pl-3 space-y-4">
                
                {/* Header: Period, Time, Photo & Crowd Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${periodMeta.badge}`}>
                      <span>{periodMeta.icon}</span>
                      <span>{activity.period}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {activity.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activity.photoSpot && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                        <Camera className="w-3 h-3 text-purple-600" />
                        <span>Top Photo Spot</span>
                      </span>
                    )}
                    {getCrowdBadge(activity.crowdLevel)}
                  </div>
                </div>

                {/* Main Activity Details */}
                <div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-ocean-600 transition-colors">
                    {activity.activity}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{activity.location}</span>
                  </p>
                </div>

                {/* Metrics Bar: Cost, Travel Time, Duration */}
                <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. Cost</span>
                    <span className="font-extrabold text-slate-800 text-sm">
                      {activity.estimatedCost === 0 ? 'Free Entry' : `₹${activity.estimatedCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Travel Time</span>
                    <span className="font-bold text-slate-700">{activity.travelTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                    <span className="font-bold text-slate-700">{activity.recommendedDuration}</span>
                  </div>
                </div>

                {/* AI Reason for Recommendation Box */}
                <div className="p-3.5 rounded-2xl bg-ocean-50/70 border border-ocean-100 flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-lg bg-ocean-200 text-ocean-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-ocean-700" />
                  </div>
                  <div>
                    <span className="font-bold text-ocean-900 block mb-0.5">AI Recommendation Reason:</span>
                    <p className="text-slate-600 leading-relaxed">
                      {activity.aiReason}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
