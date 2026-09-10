import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Sparkles, 
  CloudSun, 
  Printer, 
  Trash2, 
  ShieldCheck, 
  Camera, 
  FolderCheck,
  CheckCircle2
} from 'lucide-react';
import { PackingItem, TripPlan } from '../../types';

interface SmartPackingAssistantProps {
  trip: TripPlan;
}

export const SmartPackingAssistant: React.FC<SmartPackingAssistantProps> = ({ trip }) => {
  const [items, setItems] = useState<PackingItem[]>(trip.packingList || []);
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: PackingItem = {
      id: `p-custom-${Date.now()}`,
      name: newItemName.trim(),
      category: 'essentials',
      checked: false
    };
    setItems([...items, newItem]);
    setNewItemName('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const checkedCount = items.filter(i => i.checked).length;
  const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(i => i.category === selectedCategory);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-ocean-100 text-ocean-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Smart Packing Assistant</span>
            </span>
            <span className="text-xs text-slate-500">
              Weather-Tailored for {trip.destinationInfo.name} ({trip.destinationInfo.weather.temp}°C)
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Intelligent Packing Checklist
          </h3>
        </div>

        {/* Progress Pill & Print */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700">{checkedCount} / {items.length} Packed</span>
            <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Print Checklist"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weather Advisory Card */}
      <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sky-200 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
          <CloudSun className="w-4 h-4 text-sky-700" />
        </div>
        <div className="text-xs space-y-0.5">
          <span className="font-bold text-sky-950">AI Weather-Aware Luggage Recommendation:</span>
          <p className="text-slate-600 leading-relaxed">
            Forecasting <strong>{trip.destinationInfo.weather.temp}°C {trip.destinationInfo.weather.condition}</strong> with {trip.destinationInfo.weather.rainProb}% rain probability. AI added breathable mountain-wear, lightweight rain protection, and specialized footwear for natural cave trails.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'clothes', label: 'Clothes & Footwear' },
          { id: 'documents', label: 'Documents & IDs' },
          { id: 'electronics', label: 'Electronics' },
          { id: 'health', label: 'Health & Meds' },
          { id: 'essentials', label: 'Essentials' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-ocean-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Checklist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-start justify-between gap-3 transition-all ${
              item.checked
                ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
                : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                className="mt-0.5 shrink-0"
              >
                {item.checked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <div>
                <p className={`text-xs font-semibold ${item.checked ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                  {item.name}
                </p>
                {item.weatherReason && (
                  <span className="inline-block text-[10px] text-ocean-600 font-medium mt-0.5">
                    🌦️ {item.weatherReason}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item.id);
              }}
              className="text-slate-300 hover:text-rose-500 transition-colors p-1"
              title="Remove Item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Custom Item Bar */}
      <form onSubmit={addItem} className="flex items-center gap-2 pt-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add custom item (e.g. Binoculars, Trekking pole)..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold placeholder-slate-400 focus:outline-none focus:border-ocean-500 focus:bg-white"
        />
        <button
          type="submit"
          disabled={!newItemName.trim()}
          className="px-4 py-2.5 rounded-2xl bg-ocean-600 hover:bg-ocean-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

    </div>
  );
};
