import React from 'react';
import { Route, PiggyBank, Leaf, CheckCircle2, TrendingUp, Award } from 'lucide-react';

export const InnovationStats: React.FC = () => {
  const stats = [
    {
      icon: Route,
      value: '54,200+',
      label: 'AI Itineraries Generated',
      subtext: 'Across 180+ Indian destinations',
      color: 'text-ocean-600',
      bg: 'bg-ocean-50'
    },
    {
      icon: PiggyBank,
      value: '19.4%',
      label: 'Average Budget Saved',
      subtext: 'Through off-peak & route spatial clustering',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      icon: Leaf,
      value: '142 Tons',
      label: 'CO₂ Footprint Reduced',
      subtext: 'By promoting scenic rail & eco-stays',
      color: 'text-emerald-700',
      bg: 'bg-emerald-100/60'
    },
    {
      icon: Award,
      value: '98.6%',
      label: 'SIH Innovation Rating',
      subtext: 'Smart tourism & sustainable industry impact',
      color: 'text-sunset-600',
      bg: 'bg-sunset-50'
    }
  ];

  return (
    <section className="py-12 bg-white/60 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white hover:shadow-soft transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
