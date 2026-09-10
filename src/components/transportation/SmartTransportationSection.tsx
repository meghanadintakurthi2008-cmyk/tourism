import React, { useState } from 'react';
import { 
  Train, 
  Plane, 
  Bus, 
  Car, 
  Bike, 
  Footprints, 
  Sparkles, 
  Leaf, 
  Timer, 
  Coins, 
  Star, 
  CheckCircle2 
} from 'lucide-react';
import { TransportationOption } from '../../types';

interface SmartTransportationSectionProps {
  options: TransportationOption[];
  originCity: string;
  destinationCity: string;
}

export const SmartTransportationSection: React.FC<SmartTransportationSectionProps> = ({
  options,
  originCity,
  destinationCity
}) => {
  const [selectedType, setSelectedType] = useState<string>('Train');

  const getIcon = (type: string) => {
    switch (type) {
      case 'Flight': return Plane;
      case 'Train': return Train;
      case 'Bus': return Bus;
      case 'Car': return Car;
      case 'Bike': return Bike;
      case 'Walk': return Footprints;
      default: return Train;
    }
  };

  const allTransitOptions: TransportationOption[] = [
    {
      type: 'Train',
      name: `Vistadome Hill Express (${originCity} ➔ ${destinationCity})`,
      estimatedCost: 1800,
      travelTime: '3h 30m',
      comfortRating: 5,
      carbonEmissionKg: 12.4,
      isAiRecommended: true,
      aiReason: 'Lowest cost and 68% lower carbon emissions compared to roadway cars. Glass roof offers panoramic mountain vistas.'
    },
    {
      type: 'Car',
      name: 'Private SUV / Eco EV Cab',
      estimatedCost: 3600,
      travelTime: '3h 15m',
      comfortRating: 4,
      carbonEmissionKg: 38.0,
      aiReason: 'Door-to-door convenience with flexibility to pause at viewpoint ghats.'
    },
    {
      type: 'Bus',
      name: 'APSRTC Ghat Super Luxury Express',
      estimatedCost: 550,
      travelTime: '4h 10m',
      comfortRating: 3,
      carbonEmissionKg: 15.2,
      aiReason: 'Highly economical for students and backpackers with departures every hour.'
    },
    {
      type: 'Bike',
      name: 'Royal Enfield Mountain Rental',
      estimatedCost: 1400,
      travelTime: '3h 45m',
      comfortRating: 4,
      carbonEmissionKg: 21.0,
      aiReason: 'Unmatched thrills through hairpin curves; best for adventure motorcycle enthusiasts.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-ocean-100 text-ocean-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Train className="w-3 h-3" />
              <span>Smart Transportation Comparison</span>
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Route Transit Options: {originCity} ➔ {destinationCity}
          </h3>
        </div>

        {/* AI Best Choice Banner */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>AI Choice: Scenic Train</span>
        </div>
      </div>

      {/* Transit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allTransitOptions.map((opt) => {
          const Icon = getIcon(opt.type);
          const isSelected = selectedType === opt.type;

          return (
            <div
              key={opt.type}
              onClick={() => setSelectedType(opt.type)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'border-ocean-500 bg-ocean-50/70 ring-2 ring-ocean-500/20 shadow-md'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              {opt.isAiRecommended && (
                <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                  ✨ AI Recommended
                </span>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                    isSelected ? 'bg-ocean-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-slate-900">
                    ₹{opt.estimatedCost.toLocaleString()}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800">{opt.type}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{opt.name}</p>
                </div>

                {/* Metrics */}
                <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Timer className="w-3.5 h-3.5 text-slate-400" /> Travel Time:
                    </span>
                    <span className="font-bold">{opt.travelTime}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Comfort:
                    </span>
                    <span className="font-bold">{opt.comfortRating}/5</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-700">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" /> CO₂ Emission:
                    </span>
                    <span className="font-bold">{opt.carbonEmissionKg} kg</span>
                  </div>
                </div>

                {/* Reason */}
                <p className="text-[11px] text-slate-600 leading-relaxed pt-2 border-t border-slate-100 italic">
                  "{opt.aiReason}"
                </p>
              </div>

              <button
                type="button"
                className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition-colors ${
                  isSelected ? 'bg-ocean-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSelected ? 'Selected Transit' : 'Select Transit'}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
