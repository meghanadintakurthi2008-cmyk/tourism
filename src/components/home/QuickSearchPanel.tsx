import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Users, 
  Compass, 
  Sparkles, 
  Coins,
  ArrowRight
} from 'lucide-react';
import { TravelStyle, BudgetTier, TripRequest } from '../../types';

interface QuickSearchPanelProps {
  onGenerateTrip: (request: Partial<TripRequest>) => void;
  onExploreDestinations?: () => void;
}

export const QuickSearchPanel: React.FC<QuickSearchPanelProps> = ({ onGenerateTrip }) => {
  const [fromLocation, setFromLocation] = useState('Visakhapatnam');
  const [destination, setDestination] = useState('Araku Valley');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-17');
  const [travelers, setTravelers] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Adventure');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('moderate');

  const travelStyles: TravelStyle[] = [
    'Adventure',
    'Relaxation',
    'Family',
    'Romantic',
    'Cultural',
    'Spiritual',
    'Business',
    'Backpacking'
  ];

  const budgetOptions: { label: string; value: BudgetTier; desc: string }[] = [
    { label: 'Budget', value: 'budget', desc: 'Hostels & public transit' },
    { label: 'Moderate', value: 'moderate', desc: 'Standard 3-star comfort' },
    { label: 'Premium', value: 'premium', desc: 'Boutique resorts & cabs' },
    { label: 'Luxury', value: 'luxury', desc: '5-star & private chauffeurs' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateTrip({
      startingLocation: fromLocation,
      destination,
      startDate,
      endDate,
      durationDays: 3,
      travelers,
      travelStyle,
      budgetTier,
      interests: ['Nature', 'Mountains', 'Local food', 'Photography'],
      foodPreference: 'Traditional & Local',
      accommodationPreference: 'Eco-Resort',
      transportationPreference: 'Scenic Train'
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-ocean-950/15 border border-white/80 p-5 sm:p-8 transition-all hover:shadow-ocean-900/20">
      
      {/* Panel Top Title / Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-ocean-100 text-ocean-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Smart AI Trip Generator</h3>
            <p className="text-xs text-slate-500">Autonomous route, budget and timing generator</p>
          </div>
        </div>

        {/* Demo Preset Quick Load Pill */}
        <button
          type="button"
          onClick={() => {
            setFromLocation('Visakhapatnam');
            setDestination('Araku Valley');
            setStartDate('2026-10-15');
            setEndDate('2026-10-17');
            setTravelers(2);
            setTravelStyle('Adventure');
            setBudgetTier('moderate');
          }}
          className="text-xs font-semibold text-ocean-600 hover:text-ocean-700 bg-ocean-50 hover:bg-ocean-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
        >
          <span>✨ Reset to Hackathon Demo (Araku 3-Day)</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Row 1: Locations and Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Starting Location */}
          <div className="bg-slate-50 hover:bg-white focus-within:bg-white rounded-2xl p-3.5 border border-slate-200/80 focus-within:border-ocean-500 focus-within:ring-2 focus-within:ring-ocean-500/20 transition-all">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Navigation className="w-3.5 h-3.5 text-ocean-500" />
              From (Starting point)
            </label>
            <input
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="e.g. Visakhapatnam, Hyderabad"
              required
              className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Destination */}
          <div className="bg-slate-50 hover:bg-white focus-within:bg-white rounded-2xl p-3.5 border border-slate-200/80 focus-within:border-ocean-500 focus-within:ring-2 focus-within:ring-ocean-500/20 transition-all">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-sunset-500" />
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Araku Valley, Goa, Munnar"
              required
              className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Start Date */}
          <div className="bg-slate-50 hover:bg-white focus-within:bg-white rounded-2xl p-3.5 border border-slate-200/80 focus-within:border-ocean-500 focus-within:ring-2 focus-within:ring-ocean-500/20 transition-all">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
            />
          </div>

          {/* End Date */}
          <div className="bg-slate-50 hover:bg-white focus-within:bg-white rounded-2xl p-3.5 border border-slate-200/80 focus-within:border-ocean-500 focus-within:ring-2 focus-within:ring-ocean-500/20 transition-all">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
            />
          </div>

        </div>

        {/* Row 2: Travelers, Travel Style, and Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
          
          {/* Travelers Selector */}
          <div className="lg:col-span-3">
            <label className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-ocean-600" />
              Number of Travelers
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setTravelers(num)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    travelers === num
                      ? 'bg-ocean-600 text-white shadow-md shadow-ocean-600/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {num === 4 ? '4+' : num}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style Selector */}
          <div className="lg:col-span-9">
            <label className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              Travel Style
            </label>
            <div className="flex flex-wrap gap-2">
              {travelStyles.map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => setTravelStyle(style)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    travelStyle === style
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Row 3: Budget Tier */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-2.5 flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-amber-500" />
            Budget Tier
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {budgetOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setBudgetTier(opt.value)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  budgetTier === opt.value
                    ? 'border-ocean-500 bg-ocean-50/70 ring-2 ring-ocean-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <p className="text-xs font-bold text-slate-800">{opt.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Big Action Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-ocean-600 via-sky-600 to-emerald-600 hover:from-ocean-700 hover:to-emerald-700 p-4 text-white font-bold text-base shadow-xl shadow-ocean-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Generate AI Trip</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

      </form>
    </div>
  );
};
