import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Sun, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { weatherService, WeatherData } from '../../services/weatherService';

interface WeatherSectionProps {
  destinationName: string;
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({ destinationName }) => {
  const weather: WeatherData = weatherService.getWeatherForDestination(destinationName);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <CloudSun className="w-3 h-3" />
              <span>Weather-Aware Planning</span>
            </span>
            <span className="text-xs text-slate-500">Live Forecast Engine</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Current Climate & AI Activity Guidance: {weather.city}
          </h3>
        </div>

        {/* Current Big Temperature Pill */}
        <div className="flex items-center gap-3 bg-ocean-50/80 px-4 py-2.5 rounded-2xl border border-ocean-100">
          <div className="text-3xl font-black text-ocean-900">
            {weather.temp}°C
          </div>
          <div className="text-xs">
            <p className="font-bold text-ocean-800">{weather.condition}</p>
            <p className="text-slate-500">Feels like {weather.feelsLike}°C</p>
          </div>
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 text-sky-600 mb-1">
            <Droplets className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rain Probability</span>
          </div>
          <span className="text-xl font-black text-slate-800">{weather.rainProbability}%</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Low risk of showers</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 text-ocean-600 mb-1">
            <Droplets className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Humidity</span>
          </div>
          <span className="text-xl font-black text-slate-800">{weather.humidity}%</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Comfortable mountain air</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Sun className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">UV Radiation Index</span>
          </div>
          <span className="text-xl font-black text-slate-800">{weather.uvIndex} (Moderate)</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Light SPF recommended</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Wind className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Air Quality (AQI)</span>
          </div>
          <span className="text-xl font-black text-emerald-600">{weather.airQualityIndex} (Pristine)</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Pure forest atmosphere</p>
        </div>

      </div>

      {/* AI Weather-Aware Activity Recommendation Box (Requirement #10) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-ocean-50 to-sky-50 border border-ocean-200/80 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-ocean-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-ocean-600/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-ocean-900 block">
            AI Dynamic Schedule Adjustment:
          </span>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            {weather.aiWeatherAdvisory}
          </p>
          {weather.recommendedIndoorAlternative && (
            <div className="pt-2 flex items-center gap-2 text-xs text-ocean-700 font-bold">
              <span>Indoor Alternative: {weather.recommendedIndoorAlternative}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3-Day Forecast Strip */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          3-Day Travel Outlook
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {weather.forecast.map((fc, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">{fc.day}</p>
                <p className="text-[11px] text-slate-500">{fc.condition}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-slate-800">{fc.temp}°C</span>
                <p className="text-[10px] text-sky-600 font-semibold">{fc.rainProb}% Rain</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
