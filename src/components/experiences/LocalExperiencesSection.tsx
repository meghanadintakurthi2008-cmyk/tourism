import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Tag, 
  Star, 
  Flame, 
  Coffee, 
  Compass,
  ArrowRight,
  Filter
} from 'lucide-react';
import { LOCAL_EXPERIENCES, ExperienceItem } from '../../data/experiences';

export const LocalExperiencesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Hidden Gem',
    'Local Food',
    'Cultural Activity',
    'Traditional Festival',
    'Handicraft'
  ];

  const displayedItems = activeCategory === 'All'
    ? LOCAL_EXPERIENCES
    : LOCAL_EXPERIENCES.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-sunset-600 to-rose-600 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-200 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hyper-Local Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Experience Like a Local & Hidden Gems
          </h1>
          <p className="text-sm sm:text-base text-amber-100">
            Step off the crowded tourist circuits. Savor age-old tribal culinary recipes, engage with indigenous artisans, and discover secret waterfalls known only to native guides.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-2xl whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-sunset-600 text-white shadow-md shadow-sunset-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'Hidden Gem' ? '💎 Hidden Gems' : cat}
          </button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm">
                  {item.category === 'Hidden Gem' ? '💎 Hidden Gem' : item.category}
                </span>

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-xs font-bold text-amber-300 block">{item.destinationName}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-sunset-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Insider Tip Box */}
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2">
                  <span className="text-sm shrink-0">💡</span>
                  <div>
                    <span className="font-bold block">Local Insider Tip:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">{item.insiderTip}</p>
                  </div>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                    <span className="font-semibold text-slate-700">{item.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. Expense</span>
                    <span className="font-bold text-emerald-600">{item.estimatedCost}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-sunset-400 hover:bg-sunset-50/50 text-xs font-bold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Add to My Trip Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
