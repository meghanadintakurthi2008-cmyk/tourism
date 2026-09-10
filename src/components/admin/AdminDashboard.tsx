import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Building2, 
  Sparkles, 
  TrendingUp, 
  Leaf, 
  ShieldCheck, 
  CheckCircle2, 
  Star,
  ExternalLink,
  Plus
} from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';
import { HOTELS } from '../../data/hotels';
import { COMMUNITY_POSTS } from '../../data/communityData';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'destinations' | 'hotels' | 'aiAnalytics'>('overview');

  const stats = [
    { label: 'Registered Travelers', value: '18,420', change: '+14% this month', icon: Users, color: 'text-ocean-600', bg: 'bg-ocean-50' },
    { label: 'Active Destinations', value: `${DESTINATIONS.length}`, change: '12 added in Q3', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Partner Eco-Hotels', value: `${HOTELS.length}+`, change: '94% eco-verified', icon: Building2, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'AI Optimization Rate', value: '98.4%', change: 'Avg 1.8h saved/trip', icon: Sparkles, color: 'text-sunset-600', bg: 'bg-sunset-50' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-bold border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Administration & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Smart India Hackathon Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Monitoring AI generation latency, sustainable tourism metrics, destination inventory, and live traveler feedback.
          </p>
        </div>

        {/* Console Mode Badge */}
        <div className="px-4 py-2 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>System Healthy • v1.0.4 Online</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{s.label}</span>
                <div className={`w-8 h-8 rounded-xl ${s.bg} ${s.color} flex items-center justify-center font-bold`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{s.value}</div>
              <p className="text-xs font-semibold text-emerald-600">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'overview', label: 'Innovation & Analytics' },
          { id: 'destinations', label: `Destinations Inventory (${DESTINATIONS.length})` },
          { id: 'hotels', label: `Accommodations (${HOTELS.length})` },
          { id: 'aiAnalytics', label: 'AI Model Accuracy & Feedback' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Charts */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Trip Generation Volume Chart Simulation */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Itinerary Generation Trends</h3>
                <p className="text-xs text-slate-500">Weekly AI-generated itineraries across Indian hubs</p>
              </div>
              <span className="text-xs font-bold text-ocean-600">+28% growth</span>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100">
              {[
                { day: 'Mon', val: 45 },
                { day: 'Tue', val: 62 },
                { day: 'Wed', val: 78 },
                { day: 'Thu', val: 95 },
                { day: 'Fri', val: 124 },
                { day: 'Sat', val: 168 },
                { day: 'Sun', val: 140 }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-600">{bar.val}</span>
                  <div
                    className="w-full max-w-[42px] bg-gradient-to-t from-ocean-600 to-sky-400 rounded-t-xl transition-all duration-500 hover:opacity-80"
                    style={{ height: `${(bar.val / 170) * 100}%` }}
                  />
                  <span className="text-[11px] font-bold text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Peak planning day: Saturday (Weekend excursion generation)</span>
              <span className="font-semibold text-slate-700">Total this week: 712 Trips</span>
            </div>
          </div>

          {/* AI Carbon Offsets Impact Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Green Tourism Impact</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                By recommending electrified trains and certified eco-homestays, the platform diverted an estimated <strong>142 Metric Tons</strong> of CO₂ from tourism corridors.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Rail Route Adoption</span>
                <span className="text-emerald-600 font-bold">78%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[78%]" />
              </div>

              <div className="flex justify-between font-semibold text-slate-700 pt-2">
                <span>Local Food Artisan Visits</span>
                <span className="text-ocean-600 font-bold">91%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-ocean-500 h-full w-[91%]" />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Destination Catalog Table */}
      {activeTab === 'destinations' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Destination</th>
                <th className="pb-3">State</th>
                <th className="pb-3">Avg Budget (3d)</th>
                <th className="pb-3">Eco Score</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {DESTINATIONS.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-bold text-slate-900">{d.name}</td>
                  <td className="py-3">{d.state}</td>
                  <td className="py-3 font-bold text-ocean-600">₹{d.avgBudget.toLocaleString()}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      {d.sustainabilityScore}/100
                    </span>
                  </td>
                  <td className="py-3 font-bold text-amber-500">★ {d.rating}</td>
                  <td className="py-3 text-emerald-600 font-bold">✓ Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Accommodations Table */}
      {activeTab === 'hotels' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Hotel Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Rate / Night</th>
                <th className="pb-3">AI Score</th>
                <th className="pb-3">Eco Certified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {HOTELS.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-bold text-slate-900">{h.name}</td>
                  <td className="py-3">{h.category}</td>
                  <td className="py-3 font-bold text-ocean-600">₹{h.pricePerNight.toLocaleString()}</td>
                  <td className="py-3 font-bold text-amber-600">{h.aiScore} / 10</td>
                  <td className="py-3">
                    {h.ecoCertified ? (
                      <span className="text-emerald-600 font-bold">✓ Yes</span>
                    ) : (
                      <span className="text-slate-400">Standard</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: AI Analytics & Feedback */}
      {activeTab === 'aiAnalytics' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <h3 className="text-base font-bold text-slate-900">AI Recommendation Engine Metrics</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Average Generation Latency</span>
              <p className="text-xl font-black text-slate-900 mt-1">1.8 seconds</p>
              <p className="text-[11px] text-emerald-600 font-semibold">99.8% under target SLO</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Route Clustering Efficiency</span>
              <p className="text-xl font-black text-slate-900 mt-1">36% less transit time</p>
              <p className="text-[11px] text-ocean-600 font-semibold">Spatial distance minimization</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Traveler Acceptance Score</span>
              <p className="text-xl font-black text-slate-900 mt-1">94.2%</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Itineraries followed without edit</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
