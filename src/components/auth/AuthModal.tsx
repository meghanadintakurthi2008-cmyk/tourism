import React, { useState } from 'react';
import { User, Lock, Mail, Sparkles, X, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { UserProfile } from '../../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLoginSuccess: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleDemoTraveler = () => {
    onLoginSuccess({
      name: 'Meghana R.',
      email: 'meghana@travelai.org',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Sustainable Explorer',
      totalTripsCount: 4,
      sustainabilityScore: 88,
      currency: 'INR',
      role: 'traveler'
    });
    onClose();
  };

  const handleDemoAdmin = () => {
    onLoginSuccess({
      name: 'Prof. Sharma (Admin)',
      email: 'admin@sih-travelai.gov.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge: 'Platform Evaluator / Admin',
      totalTripsCount: 28,
      sustainabilityScore: 96,
      currency: 'INR',
      role: 'admin'
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: name || (email.split('@')[0] || 'Traveler'),
      email: email || 'traveler@travelai.org',
      avatar: currentUser.avatar,
      badge: 'Verified Explorer',
      totalTripsCount: 1,
      sustainabilityScore: 85,
      currency: 'INR',
      role: 'traveler'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ocean-600 to-sky-400 text-white flex items-center justify-center font-bold mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {mode === 'login' ? 'Sign In to TravelAI' : mode === 'signup' ? 'Create TravelAI Account' : 'Reset Password'}
          </h3>
          <p className="text-xs text-slate-500">
            Access saved itineraries, personalized recommendations & community tips.
          </p>
        </div>

        {/* 1-Click Demo Login Options (Mandatory for Presentations) */}
        <div className="space-y-2 pt-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            Instant 1-Click Demo Logins
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoTraveler}
              className="p-2.5 rounded-xl bg-ocean-50 hover:bg-ocean-100 text-ocean-700 text-xs font-bold border border-ocean-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Demo Traveler</span>
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="flex-1 h-px bg-slate-200" />
          <span>or continue with email</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Meghana Reddy"
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-ocean-500"
                required
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-ocean-500"
              required
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-ocean-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-ocean-600 hover:bg-ocean-700 text-white font-bold text-xs shadow-md shadow-ocean-600/20 transition-all"
          >
            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        {/* Mode Toggle Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          {mode === 'login' ? (
            <>
              <button onClick={() => setMode('signup')} className="font-semibold text-ocean-600 hover:underline">
                Create new account
              </button>
              <button onClick={() => setMode('forgot')} className="hover:underline">
                Forgot password?
              </button>
            </>
          ) : (
            <button onClick={() => setMode('login')} className="font-semibold text-ocean-600 hover:underline mx-auto">
              Already have an account? Sign in
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
