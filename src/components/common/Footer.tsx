import React from 'react';
import { Sparkles, Heart, Github, Twitter, Linkedin, Instagram, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Project Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ocean-500 to-emerald-400 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  TravelAI
                </span>
                <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-ocean-900 text-ocean-400 rounded-full border border-ocean-700">
                  v1.0
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              "Tourism & Industry Innovation Through AI-Powered Travel Planning."
              An autonomous platform designed to empower travelers with smart routing, sustainable eco-tourism insights, real-time budget forecasting, and community wisdom.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-ocean-400">🎓 College Project & Hackathon Presentation</p>
              <p className="text-[11px] text-slate-400">Smart India Hackathon • Category: Travel & Tourism Innovation</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-ocean-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" aria-label="Github">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-ocean-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-ocean-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-ocean-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('planner')} className="hover:text-ocean-400 transition-colors">AI Trip Planner</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-ocean-400 transition-colors">Destination Explorer</button></li>
              <li><button onClick={() => onNavigate('budget')} className="hover:text-ocean-400 transition-colors">Smart Budget Engine</button></li>
              <li><button onClick={() => onNavigate('sustainability')} className="hover:text-ocean-400 transition-colors">Eco-Travel & Carbon Score</button></li>
              <li><button onClick={() => onNavigate('safety')} className="hover:text-ocean-400 transition-colors">Safety & Emergency SOS</button></li>
              <li><button onClick={() => onNavigate('community')} className="hover:text-ocean-400 transition-colors">Traveler Community</button></li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Featured Destinations</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-ocean-400 transition-colors">Araku Valley (Eastern Ghats)</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-ocean-400 transition-colors">Visakhapatnam (Coast)</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-ocean-400 transition-colors">Goa Beaches & Heritage</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-ocean-400 transition-colors">Kerala Tea & Backwaters</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-ocean-400 transition-colors">Rajasthan Forts & Palaces</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-ocean-400 transition-colors">Kashmir Valleys & Shikara</button></li>
            </ul>
          </div>

          {/* Innovation & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Tech & Architecture</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="text-slate-300 font-medium">React 18 + Vite + TS</span></li>
              <li><span className="text-slate-300 font-medium">Tailwind CSS & Glassmorphism</span></li>
              <li><span className="text-slate-300 font-medium">Leaflet Interactive Map</span></li>
              <li><span className="text-slate-300 font-medium">Local-first Storage API</span></li>
              <li><button onClick={() => onNavigate('admin')} className="text-ocean-400 hover:underline flex items-center gap-1 font-semibold">Admin Panel <ExternalLink className="w-3 h-3" /></button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 TravelAI Platform. All rights reserved. Powered by AI. Inspired by travel.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">API Documentation</a>
            <a href="#" className="hover:text-slate-300">Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
