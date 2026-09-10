import React, { useState } from 'react';
import { 
  Building2, 
  Star, 
  MapPin, 
  Sparkles, 
  Leaf, 
  Check, 
  Filter, 
  Coins, 
  Heart,
  ExternalLink 
} from 'lucide-react';
import { Hotel } from '../../types';
import { HOTELS } from '../../data/hotels';

interface HotelSectionProps {
  destinationId: string;
  destinationName: string;
  hotels?: Hotel[];
  favorites?: string[];
  onToggleFavorite?: (hotelId: string) => void;
}

export const HotelSection: React.FC<HotelSectionProps> = ({
  destinationId,
  destinationName,
  hotels = HOTELS,
  favorites = [],
  onToggleFavorite
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [bookingSuccessHotel, setBookingSuccessHotel] = useState<string | null>(null);

  const displayedHotels = hotels.filter(h => {
    if (selectedFilter === 'All') return true;
    return h.category === selectedFilter;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span>Verified Accommodations</span>
            </span>
            <span className="text-xs text-slate-500">Curated for {destinationName}</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Smart Accommodations & Eco-Stays
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Best Value', 'Best Rated', 'Closest', 'Budget Friendly'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-ocean-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {bookingSuccessHotel && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <span>✓ Reservation inquiry simulated for <strong>{bookingSuccessHotel}</strong>! A booking voucher has been saved to your offline itinerary.</span>
          <button onClick={() => setBookingSuccessHotel(null)} className="font-bold underline ml-2">Dismiss</button>
        </div>
      )}

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
          >
            <div>
              {/* Hotel Image with Badges */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ocean-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  {hotel.category}
                </span>

                {/* Eco Tag */}
                {hotel.ecoCertified && (
                  <span className="absolute top-3 right-12 px-2 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Leaf className="w-3 h-3" /> Eco Certified
                  </span>
                )}

                {/* Favorite toggle */}
                {onToggleFavorite && (
                  <button
                    onClick={() => onToggleFavorite(hotel.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 backdrop-blur-md transition-colors shadow-sm"
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(hotel.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                )}

                {/* AI Score Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-xs font-black text-slate-900 flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>AI Score: {hotel.aiScore}/10</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-ocean-600">
                      ₹{hotel.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">/ night</span>
                  </div>
                </div>

                {/* Distance note */}
                <p className="text-[11px] font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                  📍 {hotel.distance}
                </p>

                {/* Facilities Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hotel.facilities.map((fac, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => setBookingSuccessHotel(hotel.name)}
                className="w-full py-2.5 rounded-xl bg-ocean-600 hover:bg-ocean-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Reserve Stay
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
