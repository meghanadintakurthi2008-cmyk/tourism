import React from 'react';
import { Sparkles, Compass, ShieldCheck, Leaf, ArrowDown } from 'lucide-react';
import { QuickSearchPanel } from './QuickSearchPanel';
import { TripRequest } from '../../types';

interface HeroProps {
  onPlanTripClick: () => void;
  onExploreDestinationsClick: () => void;
  onGenerateTrip: (request: Partial<TripRequest>) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlanTripClick,
  onExploreDestinationsClick,
  onGenerateTrip
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Decorative Gradients & Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 opacity-70">
        <div className="absolute top-10 left-10 w-96 h-96 bg-ocean-300/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-emerald-300/25 rounded-full blur-3xl" />
        <div className="absolute -top-10 left-1/3 w-80 h-80 bg-sunset-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-sm border border-ocean-100/80 text-xs font-bold text-ocean-700 backdrop-blur-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Tourism & Industry Innovation • Smart India Hackathon Edition</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Your{' '}
            <span className="bg-gradient-to-r from-ocean-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Travel Planner
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Discover destinations, build personalized itineraries, manage your budget and experience smarter travel with AI.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onPlanTripClick}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-ocean-600 hover:bg-ocean-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-ocean-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-sky-200" />
              <span>Plan My Trip</span>
            </button>

            <button
              onClick={onExploreDestinationsClick}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-ocean-600 font-bold text-sm sm:text-base border border-slate-200 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-5 h-5 text-slate-400" />
              <span>Explore Destinations</span>
            </button>
          </div>

          {/* Quick Value Props Banner */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-500" />
              <span>Zero-Carbon AI Optimizer</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-ocean-500" />
              <span>Verified 24x7 Safety & SOS</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sunset-500" />
              <span>Dynamic Budget Forecaster</span>
            </div>
          </div>

        </div>

        {/* Hero Interactive Search/Planning Panel */}
        <div className="mt-12 sm:mt-16">
          <QuickSearchPanel onGenerateTrip={onGenerateTrip} onExploreDestinations={onExploreDestinationsClick} />
        </div>

      </div>
    </section>
  );
};
