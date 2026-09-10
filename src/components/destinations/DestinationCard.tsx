import React from 'react';
import { 
  Star, 
  MapPin, 
  Coins, 
  Calendar, 
  Compass, 
  Sparkles, 
  Leaf, 
  Heart,
  ArrowUpRight 
} from 'lucide-react';
import { Destination } from '../../types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (destId: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  onPlanTrip,
  isFavorite = false,
  onToggleFavorite
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between">
      
      {/* Card Header & Image */}
      <div>
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{destination.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({destination.reviewsCount})</span>
          </div>

          {/* Eco / Sustainability Tag */}
          <div className="absolute top-3.5 right-12 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1 shadow-sm">
            <Leaf className="w-3 h-3" />
            <span>{destination.sustainabilityScore}/100</span>
          </div>

          {/* Favorite Toggle Button */}
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(destination.id);
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 backdrop-blur-md transition-colors shadow-sm"
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          )}

          {/* Destination Name & State Overlay */}
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <h3 className="text-xl font-extrabold tracking-tight drop-shadow-sm">
              {destination.name}
            </h3>
            <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{destination.state}, {destination.country}</span>
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Best Season</span>
              <span className="font-semibold text-slate-700">{destination.bestTimeToVisit}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg 3-Day Budget</span>
              <span className="font-bold text-ocean-600">₹{destination.avgBudget.toLocaleString()}</span>
            </div>
          </div>

          {/* Popular Activities Tag Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {destination.popularActivities.slice(0, 3).map((act, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-medium truncate max-w-[140px]">
                {act}
              </span>
            ))}
            {destination.popularActivities.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold text-ocean-600">
                +{destination.popularActivities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0 flex items-center gap-2">
        <button
          onClick={() => onSelect(destination)}
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-ocean-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors text-center"
        >
          View Details
        </button>
        <button
          onClick={() => onPlanTrip(destination)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-ocean-600 hover:bg-ocean-700 text-white text-xs font-bold shadow-md shadow-ocean-600/20 transition-all text-center flex items-center justify-center gap-1"
        >
          <span>Plan Trip</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
