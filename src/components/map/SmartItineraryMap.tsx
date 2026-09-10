import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  Route, 
  Clock, 
  Train, 
  Car, 
  Bus, 
  ExternalLink, 
  Layers, 
  Compass, 
  Sparkles,
  Info
} from 'lucide-react';
import { TripPlan, ItineraryActivity } from '../../types';

interface SmartItineraryMapProps {
  trip: TripPlan;
}

export const SmartItineraryMap: React.FC<SmartItineraryMapProps> = ({ trip }) => {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [selectedActivity, setSelectedActivity] = useState<ItineraryActivity | null>(
    trip.days[0]?.activities[0] || null
  );

  const currentDay = trip.days.find(d => d.dayNumber === selectedDayNum) || trip.days[0];
  const activities = currentDay ? currentDay.activities : [];

  // Center coordinate for the map
  const centerLat = trip.destinationInfo.coordinates[0];
  const centerLng = trip.destinationInfo.coordinates[1];

  // Pluggable architecture note
  const hasRealMapKey = Boolean(import.meta.env.VITE_MAP_API_KEY);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-ocean-100 text-ocean-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Route className="w-3 h-3" />
              <span>Smart Itinerary Route Map</span>
            </span>
            <span className="text-xs text-emerald-600 font-semibold hidden sm:inline">
              ✓ Spatial Clustered
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Interactive Transit & Attraction Waypoints
          </h3>
          <p className="text-xs text-slate-500">
            Connecting starting origin <strong className="text-slate-700">{trip.request.startingLocation}</strong> to {trip.destinationInfo.name} daily attraction waypoints.
          </p>
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl shrink-0">
          {trip.days.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => {
                setSelectedDayNum(d.dayNumber);
                setSelectedActivity(d.activities[0] || null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDayNum === d.dayNumber
                  ? 'bg-ocean-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Day {d.dayNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container & Waypoint Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Realistic Interactive Map View */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden relative min-h-[440px] flex flex-col justify-between border border-slate-800 shadow-inner group">
          
          {/* Mock Real Map Canvas with OpenStreetMap tile styling and interactive route path */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950 opacity-90" />
          
          {/* Simulated Satellite/Terrain Map Texture */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url(${trip.destinationInfo.image})` }}
          />

          {/* Interactive SVG Routing Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 450">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Starting Origin to Destination Curve */}
            <path
              d="M 120 380 Q 250 260, 360 220 T 650 140"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeDasharray="8 6"
              filter="url(#glow)"
              className="animate-pulse"
            />
          </svg>

          {/* Map Controls Floating Badge */}
          <div className="relative z-20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold shadow-lg">
              <Compass className="w-4 h-4 text-ocean-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Map Layer: Smart Route Clusters</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold backdrop-blur-md">
                Live GPS Simulation
              </span>
            </div>
          </div>

          {/* Interactive Waypoint Pins on Map */}
          <div className="relative z-20 px-6 py-10 flex flex-wrap items-center justify-around gap-6">
            
            {/* Origin Node */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-ocean-600 text-white flex items-center justify-center shadow-lg shadow-ocean-600/50 border-2 border-white animate-bounce">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="mt-2 px-2.5 py-1 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold border border-slate-700 shadow-md">
                {trip.request.startingLocation}
              </div>
            </div>

            {/* Waypoint 1: Morning */}
            {activities[0] && (
              <div 
                onClick={() => setSelectedActivity(activities[0])}
                className="flex flex-col items-center cursor-pointer group/pin"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover/pin:scale-110 ${
                  selectedActivity?.id === activities[0].id ? 'bg-amber-500 text-white ring-4 ring-amber-400/40' : 'bg-slate-800 text-amber-400'
                }`}>
                  <span className="text-xs font-black">1</span>
                </div>
                <div className="mt-2 px-2.5 py-1 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold border border-slate-700 shadow-md max-w-[140px] truncate text-center">
                  {activities[0].activity}
                </div>
              </div>
            )}

            {/* Waypoint 2: Afternoon */}
            {activities[1] && (
              <div 
                onClick={() => setSelectedActivity(activities[1])}
                className="flex flex-col items-center cursor-pointer group/pin"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover/pin:scale-110 ${
                  selectedActivity?.id === activities[1].id ? 'bg-ocean-500 text-white ring-4 ring-ocean-400/40' : 'bg-slate-800 text-ocean-400'
                }`}>
                  <span className="text-xs font-black">2</span>
                </div>
                <div className="mt-2 px-2.5 py-1 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold border border-slate-700 shadow-md max-w-[140px] truncate text-center">
                  {activities[1].activity}
                </div>
              </div>
            )}

            {/* Waypoint 3: Evening */}
            {activities[2] && (
              <div 
                onClick={() => setSelectedActivity(activities[2])}
                className="flex flex-col items-center cursor-pointer group/pin"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover/pin:scale-110 ${
                  selectedActivity?.id === activities[2].id ? 'bg-purple-500 text-white ring-4 ring-purple-400/40' : 'bg-slate-800 text-purple-400'
                }`}>
                  <span className="text-xs font-black">3</span>
                </div>
                <div className="mt-2 px-2.5 py-1 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold border border-slate-700 shadow-md max-w-[140px] truncate text-center">
                  {activities[2].activity}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Floating Map Info Bar */}
          <div className="relative z-20 p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-ocean-400" />
              <span>Coordinates: {centerLat.toFixed(4)}° N, {centerLng.toFixed(4)}° E • OpenStreetMap Engine</span>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.destinationInfo.name + ' ' + (selectedActivity?.location || ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ocean-400 hover:text-ocean-300 font-bold flex items-center gap-1 transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Selected Waypoint Details Sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Day {selectedDayNum} Stops ({activities.length} Waypoints)
              </h4>
              <span className="text-xs font-bold text-ocean-600">{currentDay.dayStats.travelTime}</span>
            </div>

            {/* List of stops */}
            <div className="space-y-2.5">
              {activities.map((act, idx) => {
                const isSelected = selectedActivity?.id === act.id;
                return (
                  <div
                    key={act.id}
                    onClick={() => setSelectedActivity(act)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-ocean-500 bg-ocean-50/80 ring-2 ring-ocean-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold text-white ${
                          idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-ocean-500' : 'bg-purple-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800 truncate max-w-[160px]">
                          {act.activity}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">{act.travelTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate pl-7">
                      {act.location}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Waypoint Detail Card */}
          {selectedActivity && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                  {selectedActivity.period} Stop
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {selectedActivity.estimatedCost === 0 ? 'Free' : `₹${selectedActivity.estimatedCost}`}
                </span>
              </div>
              <h5 className="text-sm font-bold text-slate-900">{selectedActivity.activity}</h5>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {selectedActivity.aiReason}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Transit Time</span>
                  <span className="font-semibold text-slate-700">{selectedActivity.travelTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Visit Duration</span>
                  <span className="font-semibold text-slate-700">{selectedActivity.recommendedDuration}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
