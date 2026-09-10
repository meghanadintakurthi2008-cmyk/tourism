import React, { useState } from 'react';
import { Globe, ArrowRightLeft, Volume2, Sparkles, Check } from 'lucide-react';

export const LanguageAndCurrencyTools: React.FC = () => {
  // Currency State
  const [inrAmount, setInrAmount] = useState<number>(15000);
  const [targetCurrency, setTargetCurrency] = useState<'USD' | 'EUR'>('USD');

  const usdRate = 0.012; // 1 INR ~ 0.012 USD
  const eurRate = 0.011; // 1 INR ~ 0.011 EUR

  const convertedValue = targetCurrency === 'USD'
    ? (inrAmount * usdRate).toFixed(2)
    : (inrAmount * eurRate).toFixed(2);

  // Language State
  const [selectedLang, setSelectedLang] = useState<'telugu' | 'hindi' | 'malayalam' | 'konkani'>('telugu');

  const phrases = {
    telugu: [
      { english: 'Hello / Greetings', local: 'Namaskaram (నమస్కారం)', usage: 'Formal greeting anytime' },
      { english: 'How much is this?', local: 'Idi entha? (ఇది ఎంత?)', usage: 'At markets and handicraft stalls' },
      { english: 'Where is the bus/train station?', local: 'Station ekkada undi? (స్టేషన్ ఎక్కడ ఉంది?)', usage: 'For transit directions' },
      { english: 'The food is very delicious!', local: 'Bhojanam chala baagundi! (భోజనం చాలా బాగుంది!)', usage: 'Complimenting local cooks' },
      { english: 'Please help me', local: 'Dayachesi naku saayam cheyandi', usage: 'Emergency / assistance' }
    ],
    hindi: [
      { english: 'Hello / Greetings', local: 'Namaste (नमस्ते)', usage: 'Universal polite greeting' },
      { english: 'How much does this cost?', local: 'Yeh kitne ka hai? (यह कितने का है?)', usage: 'Shopping & bargaining' },
      { english: 'Please take me to...', local: 'Kripya mujhe ... le chaliye', usage: 'Taxi / Rickshaw drivers' },
      { english: 'Thank you very much', local: 'Bahut bahut dhanyavaad', usage: 'Showing gratitude' }
    ],
    malayalam: [
      { english: 'Hello / Greetings', local: 'Namaskaram (നമസ്കാരം)', usage: 'General greeting' },
      { english: 'How much is this?', local: 'Ithinu ethraya? (ഇതിന് എത്രയാ?)', usage: 'Local spice markets' },
      { english: 'Where is the boat jetty?', local: 'Boat jetty evideyaanu? (ബോട്ട് ജെട്ടി എവിടെയാണ്?)', usage: 'Alleppey backwaters' },
      { english: 'Food is superb', local: 'Bakshanam valare nannaayirikkunnu', usage: 'At sadya restaurants' }
    ],
    konkani: [
      { english: 'Hello', local: 'Deu boro dis dium (देव बरॉ दीस दींव)', usage: 'Traditional Goan greeting' },
      { english: 'How are you?', local: 'Koso asa? (कसॉ आसा?)', usage: 'Friendly greeting' },
      { english: 'How much?', local: 'Kitlem zale? (कितलें जालें?)', usage: 'Beach shacks & markets' }
    ]
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-8">
      
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Sparkles className="w-5 h-5 text-ocean-600" />
        <h3 className="text-lg font-bold text-slate-900">Innovative Travel Utilities (Currency & Regional Languages)</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Currency Converter */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-ocean-600" />
              Live Currency Calculator
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">1 USD ≈ ₹83.4</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Amount in Indian Rupees (₹ INR)</label>
              <input
                type="number"
                value={inrAmount}
                onChange={(e) => setInrAmount(Number(e.target.value) || 0)}
                className="w-full p-3 rounded-xl bg-white border border-slate-200 text-base font-extrabold text-slate-900 focus:outline-none focus:border-ocean-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTargetCurrency('USD')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  targetCurrency === 'USD' ? 'bg-ocean-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                US Dollar ($ USD)
              </button>
              <button
                type="button"
                onClick={() => setTargetCurrency('EUR')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  targetCurrency === 'EUR' ? 'bg-ocean-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Euro (€ EUR)
              </button>
            </div>

            <div className="p-4 rounded-xl bg-ocean-50/80 border border-ocean-100 flex items-baseline justify-between">
              <span className="text-xs font-bold text-ocean-900">Converted Est.:</span>
              <span className="text-2xl font-black text-ocean-700">
                {targetCurrency === 'USD' ? '$' : '€'}{convertedValue}
              </span>
            </div>
          </div>
        </div>

        {/* Regional Language Helper */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              Local Language Phrasebook
            </span>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
            {[
              { id: 'telugu', label: 'Telugu (AP/Araku)' },
              { id: 'hindi', label: 'Hindi (National)' },
              { id: 'malayalam', label: 'Malayalam (Kerala)' },
              { id: 'konkani', label: 'Konkani (Goa)' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id as any)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedLang === lang.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Phrases List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {phrases[selectedLang].map((p, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200/80 space-y-0.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.local}</span>
                  <span className="text-[10px] text-slate-400">{p.usage}</span>
                </div>
                <p className="text-[11px] text-slate-500">"{p.english}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
