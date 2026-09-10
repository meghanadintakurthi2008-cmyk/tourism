import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  TrendingDown, 
  Sparkles, 
  Users, 
  Building2, 
  Train, 
  Utensils, 
  Compass, 
  ShoppingBag, 
  ShieldAlert, 
  Check, 
  Percent, 
  Divide, 
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { BudgetBreakdown, TripPlan } from '../../types';
import { budgetService, BudgetModifiers } from '../../services/budgetService';

interface SmartBudgetDashboardProps {
  initialTrip: TripPlan;
  currency: string;
}

export const SmartBudgetDashboard: React.FC<SmartBudgetDashboardProps> = ({
  initialTrip,
  currency
}) => {
  // Modifiers state
  const [modifiers, setModifiers] = useState<BudgetModifiers>({
    travelers: initialTrip.request.travelers || 2,
    hotelCategoryMultiplier: 1.0,
    transportationMultiplier: 0.8,
    foodBudgetLevel: 'moderate',
    activityBudgetLevel: 'moderate',
    studentDiscount: initialTrip.request.studentMode || false,
    backpackerMode: initialTrip.request.backpackerMode || false
  });

  // Group bill splitter state
  const [splitterTotal, setSplitterTotal] = useState<number>(initialTrip.budget.total);
  const [splitterMembers, setSplitterMembers] = useState<number>(modifiers.travelers);
  const [customTipPercent, setCustomTipPercent] = useState<number>(5);

  // Recalculate dynamic budget in real-time
  const dynamicBudget: BudgetBreakdown = useMemo(() => {
    return budgetService.calculateDynamicBudget(initialTrip.budget, modifiers);
  }, [initialTrip.budget, modifiers]);

  const categoryItems = useMemo(() => {
    return budgetService.getCategoryItems(dynamicBudget);
  }, [dynamicBudget]);

  // SVG Donut Chart Calculation
  const total = dynamicBudget.total || 1;
  let accumulatedAngle = 0;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  const perPersonCost = Math.round(dynamicBudget.total / Math.max(1, modifiers.travelers));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-ocean-800 via-sky-800 to-emerald-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Financial Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Smart Budget Planner
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Real-time financial breakdown for your trip to <strong>{initialTrip.destinationInfo.name}</strong>. Adjust group size, accommodation tier, or transportation to see your estimated budget adjust dynamically.
          </p>
        </div>
      </div>

      {/* Main Budget Display: Total Card & Visual Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Total Cost & Per-Person Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Estimated Cost
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>AI Optimized</span>
              </span>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                ₹{dynamicBudget.total.toLocaleString()}
              </div>
              <p className="text-xs font-medium text-slate-500 mt-1">
                For {modifiers.travelers} {modifiers.travelers === 1 ? 'traveler' : 'travelers'} • Approx. <strong className="text-ocean-600">₹{perPersonCost.toLocaleString()}</strong> per person
              </p>
            </div>

            {/* Visual SVG Donut Chart */}
            <div className="pt-4 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {categoryItems.map((item, index) => {
                    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -accumulatedAngle;
                    accumulatedAngle += (item.percentage / 100) * circumference;

                    return (
                      <circle
                        key={index}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="16"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 hover:opacity-80"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Categories</span>
                  <span className="text-sm font-extrabold text-slate-800">6 Sectors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Mini Legend */}
          <div className="grid grid-cols-2 gap-2 pt-6 mt-4 border-t border-slate-100 text-[11px]">
            {categoryItems.slice(0, 4).map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-slate-600 truncate">{cat.category}:</span>
                <span className="font-bold text-slate-800">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Modifiers Panel: Sliders & Selectors */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">Modify Trip Parameters</h3>
            <span className="text-xs text-ocean-600 font-semibold">Updates in Real-Time</span>
          </div>

          <div className="space-y-5">
            
            {/* Number of Travelers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-ocean-600" />
                  Number of Travelers: <span className="text-ocean-600">{modifiers.travelers}</span>
                </label>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setModifiers({ ...modifiers, travelers: num })}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      modifiers.travelers === num
                        ? 'bg-ocean-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num === 6 ? '6+' : `${num}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Category */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-600" />
                Hotel / Accommodation Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Hostel/Budget', mult: 0.6, sub: '₹1.2k/nt' },
                  { label: '3-Star Hotel', mult: 1.0, sub: '₹2.8k/nt' },
                  { label: 'Eco-Boutique', mult: 1.6, sub: '₹4.5k/nt' },
                  { label: 'Luxury Resort', mult: 2.4, sub: '₹8k+/nt' }
                ].map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setModifiers({ ...modifiers, hotelCategoryMultiplier: tier.mult })}
                    className={`p-2.5 rounded-2xl text-left border text-xs transition-all ${
                      modifiers.hotelCategoryMultiplier === tier.mult
                        ? 'border-ocean-500 bg-ocean-50 text-ocean-900 font-bold ring-1 ring-ocean-500'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <p className="font-bold">{tier.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{tier.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Transportation Mode */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                <Train className="w-4 h-4 text-emerald-600" />
                Transportation Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Train / Bus (Eco)', mult: 0.5 },
                  { label: 'Private Cab / SUV', mult: 1.0 },
                  { label: 'Flight + Cab', mult: 2.2 }
                ].map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setModifiers({ ...modifiers, transportationMultiplier: t.mult })}
                    className={`p-2.5 rounded-2xl text-center border text-xs font-bold transition-all ${
                      modifiers.transportationMultiplier === t.mult
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dining & Activity Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-sunset-500" />
                  Dining Budget Level
                </label>
                <select
                  value={modifiers.foodBudgetLevel}
                  onChange={(e) => setModifiers({ ...modifiers, foodBudgetLevel: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
                >
                  <option value="economic">Local Street & Authentic Cafes (Low)</option>
                  <option value="moderate">Balanced Dining & Specialties (Standard)</option>
                  <option value="foodie">Fine Dining & Gourmet Tastings (Premium)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-purple-500" />
                  Activities & Excursions
                </label>
                <select
                  value={modifiers.activityBudgetLevel}
                  onChange={(e) => setModifiers({ ...modifiers, activityBudgetLevel: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
                >
                  <option value="light">Relaxed (Self-guided, few tickets)</option>
                  <option value="moderate">Standard (Museums, Caves & Parks)</option>
                  <option value="adventure">High Adventure (Jeep safari, speedboats, guides)</option>
                </select>
              </div>
            </div>

            {/* Special Discounts Checkboxes */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={modifiers.studentDiscount}
                  onChange={(e) => setModifiers({ ...modifiers, studentDiscount: e.target.checked })}
                  className="rounded text-ocean-600 focus:ring-0"
                />
                <span>Student Concession (-12%)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={modifiers.backpackerMode}
                  onChange={(e) => setModifiers({ ...modifiers, backpackerMode: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-0"
                />
                <span>Backpacker Mode (-25%)</span>
              </label>
            </div>

          </div>
        </div>

      </div>

      {/* Breakdown Cards by Category */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Expense Category Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryItems.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[10px] font-bold text-slate-400">{cat.percentage}%</span>
              </div>
              <p className="text-xs font-medium text-slate-500 truncate">{cat.category}</p>
              <p className="text-base sm:text-lg font-black text-slate-800 mt-1">
                ₹{cat.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Save Money With AI Section (Requirement #4) */}
      <div className="bg-gradient-to-br from-amber-50 to-sunset-50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Save Money With AI</h3>
            <p className="text-xs text-slate-600">Personalized algorithmic cost optimizations based on historical travel data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {dynamicBudget.savingsTips.map((tip, idx) => (
            <div key={idx} className="bg-white/90 rounded-2xl p-4 border border-amber-200/60 shadow-sm flex items-start gap-3 text-xs">
              <span className="text-base shrink-0">💡</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {tip}
              </p>
            </div>
          ))}
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200/60 shadow-sm flex items-start gap-3 text-xs">
            <span className="text-base shrink-0">🏷️</span>
            <p className="text-slate-700 leading-relaxed font-medium">
              Choose a hotel 1.5 km from the city center to save approximately ₹800 per night without sacrificing cleanliness or convenience.
            </p>
          </div>
        </div>
      </div>

      {/* Group Trip Expense Splitter (Requirement #30) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-ocean-100 text-ocean-600 flex items-center justify-center font-bold">
              <Divide className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Trip Expense Splitter</h3>
              <p className="text-xs text-slate-500">Calculate fair shares for group and family travels</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">Splitting with:</span>
            <div className="flex items-center gap-1.5">
              {[2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSplitterMembers(num)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    splitterMembers === num
                      ? 'bg-ocean-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Bill</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block">
              ₹{dynamicBudget.total.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500">All planned activities & stays</span>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-50 border border-ocean-100">
            <span className="text-[11px] font-bold text-ocean-600 uppercase tracking-wider block">Each Person Pays</span>
            <span className="text-2xl font-black text-ocean-800 mt-1 block">
              ₹{Math.round(dynamicBudget.total / splitterMembers).toLocaleString()}
            </span>
            <span className="text-[11px] text-ocean-600">Split evenly among {splitterMembers} people</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Daily Share Per Head</span>
            <span className="text-2xl font-black text-emerald-800 mt-1 block">
              ₹{Math.round(dynamicBudget.total / splitterMembers / (initialTrip.days.length || 3)).toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-600">Per day across {initialTrip.days.length || 3} days</span>
          </div>
        </div>
      </div>

    </div>
  );
};
