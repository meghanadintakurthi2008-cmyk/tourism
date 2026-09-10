import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart, Star, Percent, RefreshCw } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';
import { Destination } from '../../types';

interface AIMatchQuizProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
}

export const AIMatchQuiz: React.FC<AIMatchQuizProps> = ({
  onSelectDestination,
  onPlanTrip
}) => {
  const quizOptions = [
    { id: 'Peaceful', label: 'Peaceful', emoji: '🧘' },
    { id: 'Adventure', label: 'Adventure', emoji: '🧗' },
    { id: 'Romantic', label: 'Romantic', emoji: '💖' },
    { id: 'Family', label: 'Family', emoji: '👨‍👩‍👦' },
    { id: 'Cultural', label: 'Cultural', emoji: '🏛️' },
    { id: 'Spiritual', label: 'Spiritual', emoji: '🛕' },
    { id: 'Nature', label: 'Nature', emoji: '🌲' },
    { id: 'Food', label: 'Food', emoji: '🍲' },
    { id: 'Photography', label: 'Photography', emoji: '📸' }
  ];

  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Nature', 'Photography', 'Peaceful']);
  const [budgetCap, setBudgetCap] = useState<'low' | 'mid' | 'high'>('low');

  const toggleOption = (id: string) => {
    if (selectedStyles.includes(id)) {
      if (selectedStyles.length > 1) {
        setSelectedStyles(selectedStyles.filter(s => s !== id));
      }
    } else {
      setSelectedStyles([...selectedStyles, id]);
    }
  };

  // Compute matches
  const matchResults = DESTINATIONS.map((dest) => {
    let score = 70;
    // Check style overlap
    selectedStyles.forEach(style => {
      const match = dest.tags.some(t => t.toLowerCase().includes(style.toLowerCase())) ||
                    dest.travelStyles.some(s => s.toLowerCase().includes(style.toLowerCase())) ||
                    dest.popularActivities.some(a => a.toLowerCase().includes(style.toLowerCase()));
      if (match) score += 10;
    });

    if (budgetCap === 'low' && dest.avgBudget <= 16000) score += 8;
    if (budgetCap === 'high' && dest.avgBudget >= 22000) score += 8;

    score = Math.min(99, Math.max(72, score));

    const whyAi = `Based on your interest in ${selectedStyles.join(', ').toLowerCase()} and ${budgetCap === 'low' ? 'budget-conscious' : 'comfort-focused'} travel, ${dest.name} scores high with authentic ${dest.tags.slice(0, 2).join(' & ')} and sustainable tourism options.`;

    return {
      destination: dest,
      matchScore: score,
      whyAi
    };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-white to-ocean-50/50 rounded-3xl p-6 sm:p-10 border border-ocean-100 shadow-soft space-y-8">
      
      {/* Quiz Top Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Destination Matcher</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What kind of trip are you looking for?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Select your vibe and let our matching algorithm find your ideal Indian destination.
        </p>
      </div>

      {/* Selectable Pills Grid */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
        {quizOptions.map((opt) => {
          const isSelected = selectedStyles.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                isSelected
                  ? 'bg-ocean-600 text-white border-ocean-600 shadow-md shadow-ocean-600/25 scale-105'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span>{opt.emoji}</span>
              <span>{opt.label}</span>
              {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Budget Preference Pills */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <span className="text-xs font-bold text-slate-500">Budget Range:</span>
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'low', label: 'Under ₹16k (Value)' },
            { id: 'mid', label: '₹16k - ₹25k (Moderate)' },
            { id: 'high', label: '₹25k+ (Luxury)' }
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setBudgetCap(b.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                budgetCap === b.id ? 'bg-white text-ocean-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 AI Matched Results */}
      <div className="space-y-4 pt-4 border-t border-ocean-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Top AI Recommended Destinations
          </h3>
          <span className="text-xs font-semibold text-ocean-600">Updated automatically</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matchResults.map((result, idx) => (
            <div
              key={result.destination.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Match percentage pill */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{result.matchScore}% Match</span>
                  </span>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {result.destination.rating}
                  </span>
                </div>

                {/* Destination Image */}
                <div className="h-40 rounded-2xl overflow-hidden relative">
                  <img
                    src={result.destination.image}
                    alt={result.destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h4 className="font-extrabold text-base drop-shadow-sm">{result.destination.name}</h4>
                    <p className="text-[11px] text-slate-200">{result.destination.state}</p>
                  </div>
                </div>

                {/* AI Reasoning Box */}
                <div className="p-3 rounded-2xl bg-ocean-50/70 border border-ocean-100 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-ocean-900 block mb-0.5">Why AI Recommends:</strong>
                  {result.whyAi}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectDestination(result.destination)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Explore
                </button>
                <button
                  onClick={() => onPlanTrip(result.destination)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-ocean-600 hover:bg-ocean-700 text-white shadow-sm transition-all"
                >
                  Plan Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
