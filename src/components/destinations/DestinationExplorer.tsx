import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  X, 
  Sun, 
  Heart, 
  ArrowRight,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { Destination } from '../../types';
import { DESTINATIONS } from '../../data/destinations';
import { DestinationCard } from './DestinationCard';
import { AIMatchQuiz } from './AIMatchQuiz';

interface DestinationExplorerProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  favorites: string[];
  onToggleFavorite: (destId: string) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  onSelectDestination,
  onPlanTrip,
  favorites,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');
  const [weatherFilter, setWeatherFilter] = useState('All');
  const [seasonFilter, setSeasonFilter] = useState('All');
  const [adventureFilter, setAdventureFilter] = useState('All');
  const [familyOnly, setFamilyOnly] = useState(false);
  const [selectedModalDest, setSelectedModalDest] = useState<Destination | null>(null);

  // Filters logic
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesState = dest.state.toLowerCase().includes(q);
        const matchesTag = dest.tags.some(t => t.toLowerCase().includes(q));
        const matchesAct = dest.popularActivities.some(a => a.toLowerCase().includes(q));
        if (!matchesName && !matchesState && !matchesTag && !matchesAct) return false;
      }

      // Travel Style
      if (selectedStyle !== 'All') {
        const matchesStyle = dest.travelStyles.some(s => s.toLowerCase() === selectedStyle.toLowerCase()) ||
                             dest.tags.some(t => t.toLowerCase().includes(selectedStyle.toLowerCase()));
        if (!matchesStyle) return false;
      }

      // Budget Filter
      if (budgetFilter === 'budget' && dest.avgBudget > 15000) return false;
      if (budgetFilter === 'moderate' && (dest.avgBudget < 15000 || dest.avgBudget > 23000)) return false;
      if (budgetFilter === 'luxury' && dest.avgBudget < 23000) return false;

      // Weather Filter
      if (weatherFilter !== 'All' && dest.weather.condition !== weatherFilter) return false;

      // Season Filter
      if (seasonFilter !== 'All' && dest.bestSeason !== seasonFilter && dest.bestSeason !== 'All Year') return false;

      // Adventure Level
      if (adventureFilter !== 'All' && dest.adventureLevel !== adventureFilter) return false;

      // Family Friendly
      if (familyOnly && !dest.familyFriendly) return false;

      return true;
    });
  }, [searchQuery, selectedStyle, budgetFilter, weatherFilter, seasonFilter, adventureFilter, familyOnly]);

  const travelStyles = ['All', 'Adventure', 'Nature', 'Romantic', 'Cultural', 'Spiritual', 'Family', 'Relaxation', 'Food'];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-ocean-900 via-sky-900 to-emerald-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Tourism Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Destination Explorer
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Discover breathtaking hill stations, serene coastal beaches, royal heritage palaces, and sacred spiritual corridors across India with AI ratings and sustainability indexes.
          </p>
        </div>
      </div>

      {/* Feature 6: AI Destination Matcher Quiz */}
      <AIMatchQuiz onSelectDestination={onSelectDestination} onPlanTrip={onPlanTrip} />

      {/* Search & Comprehensive Multi-Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-5">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by destination (Araku, Goa, Vizag, Kerala, Kashmir), state, activity, or tag..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Travel Style Horizontal Pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Filter by Style
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {travelStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedStyle === style
                    ? 'bg-ocean-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Row: Budget, Weather, Season, Adventure, Family */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100 text-xs font-semibold">
          
          {/* Budget */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Budget</label>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            >
              <option value="All">All Budgets</option>
              <option value="budget">Under ₹15k (Budget)</option>
              <option value="moderate">₹15k - ₹23k (Moderate)</option>
              <option value="luxury">₹23k+ (Premium/Luxury)</option>
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Weather</label>
            <select
              value={weatherFilter}
              onChange={(e) => setWeatherFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            >
              <option value="All">Any Weather</option>
              <option value="Pleasant">Pleasant / Mild</option>
              <option value="Sunny">Sunny / Clear</option>
              <option value="Breezy">Breezy Coastal</option>
              <option value="Rainy">Tropical Rain</option>
            </select>
          </div>

          {/* Best Season */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Best Season</label>
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            >
              <option value="All">All Seasons</option>
              <option value="Winter">Winter (Oct-Mar)</option>
              <option value="Summer">Summer / Hills</option>
              <option value="Spring">Spring</option>
            </select>
          </div>

          {/* Adventure */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Adventure Level</label>
            <select
              value={adventureFilter}
              onChange={(e) => setAdventureFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            >
              <option value="All">Any Level</option>
              <option value="Low">Low (Relaxed)</option>
              <option value="Moderate">Moderate (Treks & Trails)</option>
              <option value="High">High (Extreme)</option>
            </select>
          </div>

          {/* Family Friendly Toggle */}
          <div className="col-span-2 sm:col-span-1 flex items-end">
            <label className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="font-bold text-slate-700">Family Friendly</span>
              <input
                type="checkbox"
                checked={familyOnly}
                onChange={(e) => setFamilyOnly(e.target.checked)}
                className="rounded text-ocean-600 focus:ring-0"
              />
            </label>
          </div>

        </div>

      </div>

      {/* Results Header & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">
            Showing <span className="text-ocean-600">{filteredDestinations.length}</span> destinations
          </p>
          {(searchQuery || selectedStyle !== 'All' || budgetFilter !== 'All' || weatherFilter !== 'All' || seasonFilter !== 'All' || adventureFilter !== 'All' || familyOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStyle('All');
                setBudgetFilter('All');
                setWeatherFilter('All');
                setSeasonFilter('All');
                setAdventureFilter('All');
                setFamilyOnly(false);
              }}
              className="text-xs font-bold text-rose-500 hover:text-rose-600"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No destinations match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try loosening your filters or clearing your search term to see more verified travel spots.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={(d) => setSelectedModalDest(d)}
                onPlanTrip={onPlanTrip}
                isFavorite={favorites.includes(dest.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Destination Quick Details Modal */}
      {selectedModalDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Image Header */}
            <div className="relative h-64 shrink-0">
              <img
                src={selectedModalDest.image}
                alt={selectedModalDest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedModalDest(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold">
                    Eco Score: {selectedModalDest.sustainabilityScore}/100
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    ★ {selectedModalDest.rating} ({selectedModalDest.reviewsCount} reviews)
                  </span>
                </div>
                <h3 className="text-2xl font-black">{selectedModalDest.name}</h3>
                <p className="text-xs text-slate-300">{selectedModalDest.state}, {selectedModalDest.country}</p>
              </div>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">About Destination</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedModalDest.description}</p>
              </div>

              {/* Weather & Travel Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Current Temp</span>
                  <span className="font-extrabold text-slate-800 text-sm">{selectedModalDest.weather.temp}°C {selectedModalDest.weather.condition}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Best Season</span>
                  <span className="font-bold text-slate-700">{selectedModalDest.bestTimeToVisit}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Avg 3-Day Budget</span>
                  <span className="font-extrabold text-ocean-600 text-sm">₹{selectedModalDest.avgBudget.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Adventure Level</span>
                  <span className="font-bold text-slate-700">{selectedModalDest.adventureLevel}</span>
                </div>
              </div>

              {/* Hidden Gems (Requirement #13) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sunset-500" />
                  <span>Hidden Gems (AI Discovered)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedModalDest.hiddenGems.map((gem, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs font-medium text-slate-700">
                      💎 {gem}
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Foods (Requirement #13) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Must-Try Local Foods
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModalDest.localFoods.map((food, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-ocean-50 text-ocean-700 text-xs font-semibold border border-ocean-100">
                      🍲 {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setSelectedModalDest(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const dest = selectedModalDest;
                  setSelectedModalDest(null);
                  onPlanTrip(dest);
                }}
                className="px-6 py-2.5 rounded-xl bg-ocean-600 hover:bg-ocean-700 text-white text-xs font-bold shadow-md shadow-ocean-600/20 flex items-center gap-2"
              >
                <span>Plan AI Trip to {selectedModalDest.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
