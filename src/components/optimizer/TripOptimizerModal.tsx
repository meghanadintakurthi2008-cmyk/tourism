import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Route, 
  Sun, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { TripPlan } from '../../types';
import { aiPlannerService } from '../../services/aiPlannerService';

interface TripOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripPlan;
  onApplyOptimizedTrip: (optimized: TripPlan) => void;
}

export const TripOptimizerModal: React.FC<TripOptimizerModalProps> = ({
  isOpen,
  onClose,
  trip,
  onApplyOptimizedTrip
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const optimizationData = aiPlannerService.optimizeTrip(trip);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      setTimeout(() => {
        onApplyOptimizedTrip(optimizationData.optimizedTrip);
        onClose();
      }, 800);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-amber-200 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-lg shadow-amber-500/30">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
              AI Route Clustering Engine
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              AI Trip Optimizer
            </h3>
          </div>
        </div>

        {/* Big Optimization Banner (Requirement #19) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-slate-800 space-y-2">
          <p className="text-sm font-bold text-amber-950">
            "Your current itinerary requires 4 hours of unnecessary travel. AI can reduce it to 2.5 hours and save ₹1,600."
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {optimizationData.explanation}
          </p>
        </div>

        {/* Before vs After Comparison */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Schedule</span>
            <div className="flex items-center gap-1.5 text-slate-700 font-bold">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>3h 40m transit</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 font-bold">
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>₹{trip.budget.total.toLocaleString()} total</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">AI Optimized</span>
            <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>2h 10m (-{optimizationData.timeSaved})</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved {optimizationData.costSaved}</span>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Reorders stops by geographical proximity to reduce zig-zag travel.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Swaps outdoor waterfall trek to morning to avoid midday heat.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Avoids tourist bus bottlenecks at Borra Caves ticket counter.</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleApply}
          disabled={isApplying || applied}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-sunset-600 hover:from-amber-600 hover:to-sunset-700 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
        >
          {applied ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Optimization Applied!</span>
            </>
          ) : isApplying ? (
            <span>Optimizing stops...</span>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Apply AI Optimization</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </div>
    </div>
  );
};
