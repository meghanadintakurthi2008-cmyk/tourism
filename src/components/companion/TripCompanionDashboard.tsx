import React, { useState } from 'react';
import { 
  TripPlan 
} from '../../types';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  Coins, 
  CloudSun, 
  Route, 
  Building2, 
  Train, 
  CheckSquare, 
  ShieldCheck, 
  Share2, 
  Download, 
  Edit3, 
  Heart, 
  Zap, 
  Printer,
  Sparkles,
  Check
} from 'lucide-react';
import { ItineraryView } from '../planner/ItineraryView';
import { SmartItineraryMap } from '../map/SmartItineraryMap';
import { WeatherSection } from '../weather/WeatherSection';
import { HotelSection } from '../accommodation/HotelSection';
import { SmartTransportationSection } from '../transportation/SmartTransportationSection';
import { SmartPackingAssistant } from '../packing/SmartPackingAssistant';
import { TravelSafetyDashboard } from '../safety/TravelSafetyDashboard';

interface TripCompanionDashboardProps {
  trip: TripPlan;
  onEditTrip: () => void;
  onOptimizeTrip: () => void;
  onSaveTrip: () => void;
  isSaved?: boolean;
}

export const TripCompanionDashboard: React.FC<TripCompanionDashboardProps> = ({
  trip,
  onEditTrip,
  onOptimizeTrip,
  onSaveTrip,
  isSaved = false
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'itinerary' | 'map' | 'hotels' | 'transit' | 'packing' | 'safety' | 'weather'>('itinerary');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownload = () => {
    // Generate text/markdown download of itinerary
    let content = `# TravelAI Itinerary: ${trip.tripName}\n`;
    content += `Destination: ${trip.destinationInfo.name} (${trip.destinationInfo.state})\n`;
    content += `Travelers: ${trip.request.travelers} | Total Budget: ₹${trip.budget.total.toLocaleString()}\n\n`;

    trip.days.forEach(day => {
      content += `## Day ${day.dayNumber}: ${day.title}\n`;
      day.activities.forEach(act => {
        content += `- [${act.period}] ${act.time}: ${act.activity} at ${act.location} (Cost: ₹${act.estimatedCost})\n`;
        content += `  AI Note: ${act.aiReason}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trip.destinationInfo.name.toLowerCase().replace(/\s+/g, '-')}-itinerary.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner & Control Hub */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-ocean-100 text-ocean-700 text-xs font-bold uppercase tracking-wider">
                Trip Companion Hub
              </span>
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                🌱 Eco-Score {trip.sustainabilityScore}/100
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {trip.tripName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {trip.destinationInfo.name} • {trip.request.durationDays} Days • {trip.request.travelers} Travelers • Total Budget ~₹{trip.budget.total.toLocaleString()}
            </p>
          </div>

          {/* Action Hub Buttons (Save, Edit, Share, Download) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOptimizeTrip}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Optimize Route</span>
            </button>

            <button
              onClick={onEditTrip}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Trip</span>
            </button>

            <button
              onClick={onSaveTrip}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <Heart className="w-4 h-4 text-rose-500" />}
              <span>{isSaved ? 'Trip Saved' : 'Save Trip'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all"
            >
              <Share2 className="w-4 h-4 text-ocean-600" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download (.md)</span>
            </button>
          </div>
        </div>

        {/* Quick Companion Subtabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
          {[
            { id: 'itinerary', label: 'Day-by-Day Itinerary', icon: Calendar },
            { id: 'map', label: 'Interactive Route Map', icon: Route },
            { id: 'hotels', label: 'Hotels & Stays', icon: Building2 },
            { id: 'transit', label: 'Transportation', icon: Train },
            { id: 'packing', label: 'Packing Checklist', icon: CheckSquare },
            { id: 'weather', label: 'Weather Forecast', icon: CloudSun },
            { id: 'safety', label: 'Safety & SOS Contacts', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-ocean-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtab Content View */}
      <div>
        {activeSubTab === 'itinerary' && (
          <ItineraryView
            trip={trip}
            onOptimizeClick={onOptimizeTrip}
            onSaveTrip={onSaveTrip}
            onShareTrip={handleShare}
            onDownloadTrip={handleDownload}
            isSaved={isSaved}
          />
        )}

        {activeSubTab === 'map' && (
          <SmartItineraryMap trip={trip} />
        )}

        {activeSubTab === 'hotels' && (
          <HotelSection
            destinationId={trip.destinationInfo.id}
            destinationName={trip.destinationInfo.name}
            hotels={trip.hotels}
          />
        )}

        {activeSubTab === 'transit' && (
          <SmartTransportationSection
            options={trip.transportation}
            originCity={trip.request.startingLocation}
            destinationCity={trip.destinationInfo.name}
          />
        )}

        {activeSubTab === 'packing' && (
          <SmartPackingAssistant trip={trip} />
        )}

        {activeSubTab === 'weather' && (
          <WeatherSection destinationName={trip.destinationInfo.name} />
        )}

        {activeSubTab === 'safety' && (
          <TravelSafetyDashboard
            safety={trip.safety}
            destinationName={trip.destinationInfo.name}
          />
        )}
      </div>

    </div>
  );
};
