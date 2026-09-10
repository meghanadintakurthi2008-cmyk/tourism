import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Wallet, 
  Leaf, 
  ShieldCheck, 
  Users, 
  BookmarkCheck, 
  Bot, 
  Bell, 
  Menu, 
  X, 
  User, 
  ChevronDown,
  Globe2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { UserProfile } from '../../services/storageService';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  user: UserProfile;
  currency: string;
  setCurrency: (c: string) => void;
  unreadAlertsCount?: number;
  onOpenAlerts?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenChat,
  onOpenAuth,
  user,
  currency,
  setCurrency,
  unreadAlertsCount = 2,
  onOpenAlerts
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [alertsDropdown, setAlertsDropdown] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'planner', label: 'Plan Trip', icon: Sparkles, badge: 'AI' },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'experiences', label: 'Experiences', icon: Globe2 },
    { id: 'budget', label: 'Smart Budget', icon: Wallet },
    { id: 'sustainability', label: 'Eco-Travel', icon: Leaf },
    { id: 'safety', label: 'Safety', icon: ShieldCheck },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'mytrips', label: 'My Trips', icon: BookmarkCheck },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-ocean-600 via-sky-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-ocean-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-ocean-800 via-ocean-600 to-emerald-600 bg-clip-text text-transparent">
                  TravelAI
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-ocean-100 text-ocean-700 rounded-md">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Plan smarter. Travel better. Explore more.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-ocean-600 bg-ocean-50 shadow-sm'
                      : 'text-slate-600 hover:text-ocean-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-ocean-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 bg-gradient-to-r from-sunset-500 to-amber-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                title="Change Currency"
              >
                <span>{currency === 'INR' ? '₹ INR' : currency === 'USD' ? '$ USD' : '€ EUR'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {currencyDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
                  {['INR', 'USD', 'EUR'].map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${
                        currency === cur ? 'text-ocean-600 bg-ocean-50' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cur === 'INR' ? '₹ INR' : cur === 'USD' ? '$ USD' : '€ EUR'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Smart Alerts Bell */}
            <div className="relative">
              <button
                onClick={() => setAlertsDropdown(!alertsDropdown)}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title="Smart Travel Alerts"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sunset-500 ring-2 ring-white" />
                )}
              </button>

              {alertsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Smart Alerts</h4>
                    <span className="text-[11px] font-semibold text-ocean-600">2 active</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Weather Alert: Munnar</p>
                        <p className="text-[11px] text-slate-600">Light afternoon rain expected. Switch to tea museum?</p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-ocean-50 border border-ocean-100 flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-ocean-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Vistadome Departure</p>
                        <p className="text-[11px] text-slate-600">Train 18551 to Araku leaves in 3 hours. Platform 1.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Assistant Floating Trigger Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-ocean-500 to-sky-500 hover:from-ocean-600 hover:to-sky-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-ocean-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Profile / Auth Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-ocean-300 hover:bg-slate-50 transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-ocean-500/30"
              />
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                <p className="text-[10px] text-emerald-600 font-semibold">{user.role === 'admin' ? 'Admin Mode' : 'Verified'}</p>
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-1.5 animate-slide-up">
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-slate-100">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold ${
                    isActive
                      ? 'bg-ocean-500 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-slate-500 hover:text-ocean-600"
            >
              ⚙️ Admin Dashboard
            </button>
            <button
              onClick={onOpenAuth}
              className="text-xs font-bold text-ocean-600"
            >
              👤 Switch Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
