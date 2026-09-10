import React from 'react';
import { 
  User, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Heart, 
  Leaf, 
  Wallet, 
  Clock, 
  ArrowRight,
  Compass,
  Award,
  CheckCircle2
} from 'lucide-react';
import { TripPlan, Destination } from '../../types';
import { UserProfile } from '../../services/storageService';
import { DESTINATIONS } from '../../data/destinations';

interface UserDashboardProps {
  user: UserProfile;
  savedTrips: TripPlan[];
  favorites: string[];
  onOpenTrip: (trip: TripPlan) => void;
  onPlanNewTrip: () => void;
  onExploreDestinations: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  savedTrips,
  favorites,
  onOpenTrip,
  onPlanNewTrip,
  onExploreDestinations
}) => {
  const favoriteDestinations = DESTINATIONS.filter(d => favorites.includes(d.id));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-ocean-900 via-sky-800 to-emerald-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white/20 shadow-lg"
          />
          <div>
            <span className="px-3 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider">
              {user.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {user.email} • {user.totalTripsCount} trips planned with TravelAI
            </p>
          </div>
        </div>

        <button
          onClick={onPlanNewTrip}
          className="shrink-0 px-6 py-3.5 rounded-2xl bg-white text-ocean-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-ocean-600" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* Metrics Row (Total Trips, Budget Planned, Sustainability Score) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Saved Trips</span>
            <Compass className="w-5 h-5 text-ocean-600" />
          </div>
          <span className="text-3xl font-black text-slate-900">{savedTrips.length}</span>
          <p className="text-xs text-slate-500 mt-1">Active itineraries in your account</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Eco-Travel Score</span>
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-emerald-600">{user.sustainabilityScore}</span>
            <span className="text-sm font-bold text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Eco-certified traveler standing</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Bookmarked Places</span>
            <Heart className="w-5 h-5 text-rose-500" />
          </div>
          <span className="text-3xl font-black text-slate-900">{favorites.length}</span>
          <p className="text-xs text-slate-500 mt-1">Saved destinations & stays</p>
        </div>

      </div>

      {/* Saved & Upcoming Trips */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Your Saved Itineraries</h3>
          <span className="text-xs text-slate-500 font-semibold">{savedTrips.length} Trips Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onOpenTrip(trip)}
              className="p-5 rounded-2xl border border-slate-200 hover:border-ocean-300 hover:bg-ocean-50/40 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-ocean-100 text-ocean-700 text-[11px] font-bold">
                    {trip.destinationInfo.name}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    ₹{trip.budget.total.toLocaleString()}
                  </span>
                </div>
                <h4 className="font-extrabold text-base text-slate-900 group-hover:text-ocean-600 transition-colors">
                  {trip.tripName}
                </h4>
                <p className="text-xs text-slate-500">
                  {trip.days.length} Days • {trip.request.travelers} Travelers • {trip.request.travelStyle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-ocean-600">
                <span>View Full Trip Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Destinations Row */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Bookmarked Destinations</h3>
          <button
            onClick={onExploreDestinations}
            className="text-xs font-bold text-ocean-600 hover:underline"
          >
            Explore More Destinations →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {favoriteDestinations.map((dest) => (
            <div
              key={dest.id}
              className="rounded-2xl overflow-hidden border border-slate-200 relative group"
            >
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <h5 className="font-bold text-xs text-slate-900 truncate">{dest.name}</h5>
                <p className="text-[10px] text-slate-500 truncate">{dest.state}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
