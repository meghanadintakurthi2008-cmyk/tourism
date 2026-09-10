import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Navigation, 
  Calendar, 
  Users, 
  Compass, 
  Coins, 
  Utensils, 
  Building2, 
  Train, 
  GraduationCap, 
  Backpack, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { TripRequest, TravelStyle, BudgetTier } from '../../types';

interface TravelPlannerProps {
  initialRequest?: Partial<TripRequest>;
  onGenerateTrip: (request: TripRequest) => void;
}

export const TravelPlanner: React.FC<TravelPlannerProps> = ({
  initialRequest,
  onGenerateTrip
}) => {
  const [startingLocation, setStartingLocation] = useState(initialRequest?.startingLocation || 'Visakhapatnam');
  const [destination, setDestination] = useState(initialRequest?.destination || 'Araku Valley');
  const [startDate, setStartDate] = useState(initialRequest?.startDate || '2026-10-15');
  const [endDate, setEndDate] = useState(initialRequest?.endDate || '2026-10-17');
  const [travelers, setTravelers] = useState<number>(initialRequest?.travelers || 2);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>(initialRequest?.budgetTier || 'moderate');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(initialRequest?.travelStyle || 'Adventure');
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialRequest?.interests || ['Mountains', 'Nature', 'Photography', 'Local food']
  );
  const [foodPreference, setFoodPreference] = useState(initialRequest?.foodPreference || 'Traditional South Indian');
  const [accommodationPreference, setAccommodationPreference] = useState(
    initialRequest?.accommodationPreference || 'Eco-Resort / Homestay'
  );
  const [transportationPreference, setTransportationPreference] = useState(
    initialRequest?.transportationPreference || 'Scenic Train + Local Transit'
  );
  const [studentMode, setStudentMode] = useState<boolean>(false);
  const [backpackerMode, setBackpackerMode] = useState<boolean>(false);

  const interestOptions = [
    'Beaches',
    'Mountains',
    'Historical places',
    'Temples',
    'Museums',
    'Wildlife',
    'Shopping',
    'Nightlife',
    'Adventure',
    'Photography',
    'Local food'
  ];

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

  const foodOptions = [
    'Traditional South Indian',
    'Pure Vegetarian',
    'Vegan',
    'Non-Vegetarian / Biryani',
    'Local Coastal Seafood',
    'Jain Friendly',
    'No Preference'
  ];

  const accommodationOptions = [
    'Eco-Resort / Homestay (High Sustainability)',
    '3-Star Comfortable Hotel',
    'Boutique Heritage Villa',
    'Backpacker Hostel Dorm',
    '5-Star Luxury Resort'
  ];

  const transportOptions = [
    'Scenic Train + Local Transit (Eco Recommended)',
    'Private Cab / Rental SUV',
    'Intercity AC Sleeper Bus',
    'Direct Flight + Airport Cab',
    'Self-Drive EV / Motorcycle'
  ];

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter(i => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateTrip({
      startingLocation,
      destination,
      startDate,
      endDate,
      durationDays: 3,
      travelers,
      budgetTier,
      travelStyle,
      interests: selectedInterests,
      foodPreference,
      accommodationPreference,
      transportationPreference,
      studentMode,
      backpackerMode
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-ocean-900 via-ocean-800 to-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Travel Agent</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI Travel Planner
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Customize your trip parameters. Our AI model evaluates weather, crowds, route efficiency, budget caps, and carbon impact to generate the optimal travel plan.
          </p>
        </div>

        {/* Decorative circle */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-ocean-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Planning Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft space-y-8">
        
        {/* Section 1: Route & Dates */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-5 h-5 text-ocean-600" />
            <h3 className="text-base font-bold text-slate-800">1. Route & Schedule</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-ocean-500">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-ocean-600" /> Starting Location
              </label>
              <input
                type="text"
                value={startingLocation}
                onChange={(e) => setStartingLocation(e.target.value)}
                placeholder="e.g. Visakhapatnam, Hyderabad"
                required
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-ocean-500">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sunset-500" /> Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Araku Valley, Goa"
                required
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-ocean-500">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-ocean-500">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Group Size, Travel Style & Budget */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Users className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-800">2. Party Size, Travel Style & Budget</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Number of People */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-2">Travelers</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setTravelers(n)}
                    className={`py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      travelers === n
                        ? 'bg-ocean-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {n === 4 ? '4+ People' : `${n} ${n === 1 ? 'Person' : 'People'}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 block mb-2">Style</label>
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

          {/* Budget Tier */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-600 block mb-2 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-500" /> Budget Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'budget', label: 'Budget', range: '₹8k - ₹12k', sub: 'Hostels, shared cabs' },
                { id: 'moderate', label: 'Moderate', range: '₹14k - ₹20k', sub: '3-Star, private cabs' },
                { id: 'premium', label: 'Premium', range: '₹22k - ₹35k', sub: 'Boutique stays, flights' },
                { id: 'luxury', label: 'Luxury', range: '₹40k+', sub: '5-Star suites & chauffeurs' }
              ].map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setBudgetTier(tier.id as BudgetTier)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    budgetTier === tier.id
                      ? 'border-ocean-500 bg-ocean-50/70 ring-2 ring-ocean-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800">{tier.label}</p>
                  <p className="text-xs font-extrabold text-ocean-600 mt-0.5">{tier.range}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{tier.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Interests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-sunset-500" />
              <h3 className="text-base font-bold text-slate-800">3. Specific Interests (Select all that apply)</h3>
            </div>
            <span className="text-xs font-semibold text-ocean-600">
              {selectedInterests.length} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {interestOptions.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-ocean-600 text-white border-ocean-600 shadow-sm scale-105'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Food, Hotel & Transit Preferences */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Utensils className="w-5 h-5 text-ocean-600" />
            <h3 className="text-base font-bold text-slate-800">4. Dining & Logistical Preferences</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Food */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1.5">Food Preference</label>
              <select
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-ocean-500"
              >
                {foodOptions.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Accommodation */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1.5">Accommodation Style</label>
              <select
                value={accommodationPreference}
                onChange={(e) => setAccommodationPreference(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-ocean-500"
              >
                {accommodationOptions.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Transportation */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1.5">Transit Preference</label>
              <select
                value={transportationPreference}
                onChange={(e) => setTransportationPreference(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-ocean-500"
              >
                {transportOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Student & Backpacker Toggles (Requirement #30) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div
              onClick={() => setStudentMode(!studentMode)}
              className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                studentMode ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className={`w-5 h-5 ${studentMode ? 'text-sky-600' : 'text-slate-400'}`} />
                <div>
                  <p className="text-xs font-bold text-slate-800">Student Budget Mode</p>
                  <p className="text-[10px] text-slate-500">Applies verified youth museum & train discounts</p>
                </div>
              </div>
              <input type="checkbox" checked={studentMode} readOnly className="rounded text-sky-600 focus:ring-0" />
            </div>

            <div
              onClick={() => setBackpackerMode(!backpackerMode)}
              className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                backpackerMode ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Backpack className={`w-5 h-5 ${backpackerMode ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <p className="text-xs font-bold text-slate-800">Solo Backpacker Mode</p>
                  <p className="text-[10px] text-slate-500">Prioritizes shared hostels & local street dining</p>
                </div>
              </div>
              <input type="checkbox" checked={backpackerMode} readOnly className="rounded text-emerald-600 focus:ring-0" />
            </div>
          </div>

        </div>

        {/* Generate Button (Requirement #31) */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-ocean-600 via-sky-600 to-emerald-600 hover:from-ocean-700 hover:to-emerald-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-ocean-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span>✨ Generate My AI Trip</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>

    </div>
  );
};
