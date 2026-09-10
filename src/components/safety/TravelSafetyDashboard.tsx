import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Hospital, 
  Siren, 
  Check, 
  MapPin, 
  Radio, 
  Flame,
  X
} from 'lucide-react';
import { SafetyInfo } from '../../types';

interface TravelSafetyDashboardProps {
  safety: SafetyInfo;
  destinationName: string;
}

export const TravelSafetyDashboard: React.FC<TravelSafetyDashboardProps> = ({
  safety,
  destinationName
}) => {
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<string[]>(['Aadhar Card / Passport', 'Hotel voucher']);

  const toggleDoc = (doc: string) => {
    if (checkedDocs.includes(doc)) {
      setCheckedDocs(checkedDocs.filter(d => d !== doc));
    } else {
      setCheckedDocs([...checkedDocs, doc]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Top Banner with prominent Emergency SOS button */}
      <div className="bg-gradient-to-r from-rose-900 via-red-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-rose-300 text-xs font-bold border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>24x7 Traveler Guardian Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Travel Safety & Emergency SOS
          </h1>
          <p className="text-sm sm:text-base text-rose-100">
            Real-time emergency hotlines, nearest medical trauma centers, and destination-specific precautions for <strong>{destinationName}</strong>.
          </p>
        </div>

        {/* SOS Button */}
        <div className="shrink-0">
          <button
            onClick={() => setSosModalOpen(true)}
            className="px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-rose-600/40 animate-pulse flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95"
          >
            <Siren className="w-5 h-5" />
            <span>Trigger Emergency SOS</span>
          </button>
        </div>
      </div>

      {/* Emergency Contacts Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-rose-600" />
          <span>Immediate Emergency Hotlines</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safety.emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft hover:border-rose-300 transition-colors flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {contact.label}
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {contact.number}
                </span>
                {contact.notes && (
                  <p className="text-[11px] text-slate-500 mt-1">{contact.notes}</p>
                )}
              </div>

              <a
                href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-rose-50 text-rose-600 text-xs font-bold text-center border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* AI Personalized Safety Tips (Requirement #15) */}
      <div className="bg-gradient-to-br from-ocean-50 to-sky-50 rounded-3xl p-6 sm:p-8 border border-ocean-200/80 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-ocean-600 text-white flex items-center justify-center font-bold shadow-md shadow-ocean-600/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">AI Safety Tips for {destinationName}</h3>
            <p className="text-xs text-slate-600">Personalized precautions tailored to geography, activities, and weather</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {safety.localTips.map((tip, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-ocean-100 flex items-start gap-3 text-xs text-slate-700 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-ocean-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">{tip}</p>
            </div>
          ))}
          <div className="p-4 rounded-2xl bg-white/90 border border-ocean-100 flex items-start gap-3 text-xs text-slate-700 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-ocean-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              Store offline offline copies of maps and emergency contacts in case mountain passes or valleys experience cellular signal drops.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Facilities & Document Safeguard Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Nearest Hospitals */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Hospital className="w-5 h-5 text-rose-500" />
            <span>Nearest Verified Medical Facilities</span>
          </h3>

          <div className="space-y-3">
            {safety.nearestHospitals.map((hosp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{hosp.name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>Distance: {hosp.distance}</span>
                  </p>
                </div>
                <a
                  href={`tel:${hosp.contact}`}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-ocean-600 hover:bg-ocean-50"
                >
                  {hosp.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Document Checklist */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Essential Travel Document Safe-Keeper</span>
          </h3>

          <div className="space-y-2.5">
            {safety.documentChecklist.map((doc, idx) => {
              const isChecked = checkedDocs.includes(doc);
              return (
                <div
                  key={idx}
                  onClick={() => toggleDoc(doc)}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    isChecked ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold">{doc}</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Emergency SOS Simulation Modal (Requirement #30) */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center space-y-5 border border-rose-200 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-bounce">
              <Siren className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
                Emergency Alert Mode
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Broadcasting Emergency Coordinates
              </h3>
              <p className="text-xs text-slate-500">
                Simulating live GPS beacon dispatch to tourist police and local health response.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 text-left space-y-1 text-xs">
              <p className="text-slate-500 font-bold uppercase text-[10px]">Your Current Coordinates:</p>
              <p className="font-mono text-slate-800 font-bold">18.3273° N, 82.8775° E (Eastern Ghats Sector)</p>
              <p className="text-[11px] text-emerald-600 font-semibold">✓ Satellite beacon lock active</p>
            </div>

            <div className="space-y-2">
              <a
                href="tel:112"
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 112 (National Emergency)</span>
              </a>
              <a
                href="tel:1363"
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 1363 (Tourist Helpline)</span>
              </a>
            </div>

            <button
              onClick={() => setSosModalOpen(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Cancel Alert
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
