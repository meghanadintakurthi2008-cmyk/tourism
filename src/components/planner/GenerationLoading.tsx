import React from 'react';
import { Sparkles, MapPin, Route, Wallet, Calendar, CheckCircle2 } from 'lucide-react';
import { GenerationProgress } from '../../services/aiPlannerService';

interface GenerationLoadingProps {
  progress: GenerationProgress;
}

export const GenerationLoading: React.FC<GenerationLoadingProps> = ({ progress }) => {
  const steps = [
    { title: 'Analyzing your travel preferences & style', icon: Sparkles },
    { title: 'Finding the best attractions, hidden gems & local dining', icon: MapPin },
    { title: 'Optimizing route sequence to minimize transit delays', icon: Route },
    { title: 'Calculating dynamic budget & carbon sustainability score', icon: Wallet },
    { title: 'Preparing your personalized smart itinerary', icon: Calendar }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-white/40 text-center space-y-6">
        
        {/* Animated Glow Circle */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ocean-500 via-sky-400 to-emerald-400 animate-spin opacity-75 blur-md" style={{ animationDuration: '2.5s' }} />
          <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner">
            <Sparkles className="w-10 h-10 text-ocean-600 animate-pulse" />
          </div>
        </div>

        {/* Dynamic Heading */}
        <div className="space-y-2">
          <span className="px-3 py-1 bg-ocean-50 text-ocean-700 text-xs font-bold rounded-full uppercase tracking-wider">
            AI Engine Processing (Step {progress.step} of {progress.totalSteps})
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Generating Your AI Trip
          </h3>
          <p className="text-sm font-medium text-slate-600 min-h-[40px] flex items-center justify-center">
            {progress.message}
          </p>
        </div>

        {/* Step Progress Checklist */}
        <div className="space-y-2.5 text-left pt-2 border-t border-slate-100">
          {steps.map((stepItem, idx) => {
            const Icon = stepItem.icon;
            const isCompleted = idx + 1 < progress.step;
            const isCurrent = idx + 1 === progress.step;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-ocean-50/90 text-ocean-900 border border-ocean-200'
                    : isCompleted
                    ? 'text-slate-700 bg-slate-50/60'
                    : 'text-slate-400 opacity-50'
                }`}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-ocean-600 animate-spin' : 'text-slate-400'}`} style={isCurrent ? { animationDuration: '4s' } : undefined} />
                  )}
                </div>
                <span className="text-xs font-semibold">{stepItem.title}</span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-ocean-500 via-sky-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(progress.step / progress.totalSteps) * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
};
