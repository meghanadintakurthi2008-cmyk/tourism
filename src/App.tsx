import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Hero } from './components/home/Hero';
import { InnovationStats } from './components/home/InnovationStats';
import { TravelPlanner } from './components/planner/TravelPlanner';
import { GenerationLoading } from './components/planner/GenerationLoading';
import { TripCompanionDashboard } from './components/companion/TripCompanionDashboard';
import { SmartBudgetDashboard } from './components/budget/SmartBudgetDashboard';
import { DestinationExplorer } from './components/destinations/DestinationExplorer';
import { LocalExperiencesSection } from './components/experiences/LocalExperiencesSection';
import { SustainabilityDashboard } from './components/sustainability/SustainabilityDashboard';
import { TravelSafetyDashboard } from './components/safety/TravelSafetyDashboard';
import { TravelCommunity } from './components/community/TravelCommunity';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AIChatbot } from './components/assistant/AIChatbot';
import { TripOptimizerModal } from './components/optimizer/TripOptimizerModal';
import { AuthModal } from './components/auth/AuthModal';
import { LanguageAndCurrencyTools } from './components/extra/LanguageAndCurrencyTools';

import { TripPlan, TripRequest, Destination } from './types';
import { storageService, UserProfile } from './services/storageService';
import { aiPlannerService, GenerationProgress } from './services/aiPlannerService';
import { DEMO_ARAKU_TRIP } from './data/demoTrips';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');
  const [plannerSubMode, setPlannerSubMode] = useState<'view' | 'form'>('view');

  // Core Data
  const [activeTrip, setActiveTrip] = useState<TripPlan>(() => storageService.getActiveTrip());
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>(() => storageService.getSavedTrips());
  const [favorites, setFavorites] = useState<string[]>(() => storageService.getFavoriteDestinations());
  const [user, setUser] = useState<UserProfile>(() => storageService.getUserProfile());
  const [currency, setCurrency] = useState<string>('INR');

  // Modals & Floats
  const [chatOpen, setChatOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [optimizerOpen, setOptimizerOpen] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress | null>(null);

  // Sync to storage
  useEffect(() => {
    storageService.setActiveTrip(activeTrip);
  }, [activeTrip]);

  useEffect(() => {
    storageService.setUserProfile(user);
  }, [user]);

  // Handler: Generate Trip
  const handleGenerateTrip = async (req: Partial<TripRequest>) => {
    const fullRequest: TripRequest = {
      startingLocation: req.startingLocation || 'Visakhapatnam',
      destination: req.destination || 'Araku Valley',
      startDate: req.startDate || '2026-10-15',
      endDate: req.endDate || '2026-10-17',
      durationDays: req.durationDays || 3,
      travelers: req.travelers || 2,
      budgetTier: req.budgetTier || 'moderate',
      travelStyle: req.travelStyle || 'Adventure',
      interests: req.interests || ['Mountains', 'Nature', 'Photography'],
      foodPreference: req.foodPreference || 'Traditional South Indian',
      accommodationPreference: req.accommodationPreference || 'Eco-Resort',
      transportationPreference: req.transportationPreference || 'Scenic Train',
      studentMode: req.studentMode,
      backpackerMode: req.backpackerMode
    };

    setGenerationProgress({ step: 1, totalSteps: 5, message: 'Initiating AI travel planner...' });

    try {
      const generatedTrip = await aiPlannerService.generateTrip(fullRequest, (p) => {
        setGenerationProgress(p);
      });

      setActiveTrip(generatedTrip);
      setGenerationProgress(null);
      setActiveTab('planner');
      setPlannerSubMode('view');

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setGenerationProgress(null);
    }
  };

  // Handler: Save active trip
  const handleSaveTrip = () => {
    const updated = storageService.saveTrip(activeTrip);
    setSavedTrips(updated);
  };

  const isTripSaved = savedTrips.some(t => t.id === activeTrip.id);

  // Handler: Toggle Favorite Destination
  const handleToggleFavoriteDestination = (destId: string) => {
    const updated = storageService.toggleFavoriteDestination(destId);
    setFavorites(updated);
  };

  // Handler: Plan trip for a specific destination
  const handlePlanTripForDestination = (dest: Destination) => {
    handleGenerateTrip({
      destination: dest.name,
      travelStyle: dest.travelStyles[0] || 'Nature',
      durationDays: 3,
      travelers: 2
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-ocean-100 selection:text-ocean-900">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChat={() => setChatOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        user={user}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            <Hero
              onPlanTripClick={() => {
                setActiveTab('planner');
                setPlannerSubMode('form');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreDestinationsClick={() => {
                setActiveTab('destinations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGenerateTrip={handleGenerateTrip}
            />

            <InnovationStats />

            {/* Quick Teaser: Featured Destinations Catalog */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ocean-600 block mb-1">
                    Verified Indian Destinations
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Explore Trending Smart Destinations
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('destinations');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-ocean-600 hover:text-ocean-700 underline"
                >
                  View All Destinations ({favorites.length} saved) →
                </button>
              </div>

              <DestinationExplorer
                onSelectDestination={(d) => {}}
                onPlanTrip={handlePlanTripForDestination}
                favorites={favorites}
                onToggleFavorite={handleToggleFavoriteDestination}
              />
            </section>

            {/* Teaser: Local Experiences & Hidden Gems */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <LocalExperiencesSection />
            </section>

            {/* Teaser: Language & Currency Utilities */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <LanguageAndCurrencyTools />
            </section>
          </div>
        )}

        {/* TAB 2: AI TRAVEL PLANNER */}
        {activeTab === 'planner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Planner View:</span>
                <span className="text-sm font-bold text-slate-800">
                  {plannerSubMode === 'view' ? `Active Plan (${activeTrip.destinationInfo.name})` : 'Custom Trip Form'}
                </span>
              </div>
              <button
                onClick={() => setPlannerSubMode(plannerSubMode === 'view' ? 'form' : 'view')}
                className="px-4 py-2 rounded-xl bg-ocean-50 text-ocean-700 hover:bg-ocean-100 text-xs font-bold transition-colors"
              >
                {plannerSubMode === 'view' ? '✨ Create New Itinerary' : '← Back to Active Trip'}
              </button>
            </div>

            {plannerSubMode === 'form' ? (
              <TravelPlanner
                initialRequest={activeTrip.request}
                onGenerateTrip={handleGenerateTrip}
              />
            ) : (
              <TripCompanionDashboard
                trip={activeTrip}
                onEditTrip={() => setPlannerSubMode('form')}
                onOptimizeTrip={() => setOptimizerOpen(true)}
                onSaveTrip={handleSaveTrip}
                isSaved={isTripSaved}
              />
            )}
          </div>
        )}

        {/* TAB 3: DESTINATIONS EXPLORER */}
        {activeTab === 'destinations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <DestinationExplorer
              onSelectDestination={(d) => {}}
              onPlanTrip={handlePlanTripForDestination}
              favorites={favorites}
              onToggleFavorite={handleToggleFavoriteDestination}
            />
          </div>
        )}

        {/* TAB 4: EXPERIENCES & HIDDEN GEMS */}
        {activeTab === 'experiences' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <LocalExperiencesSection />
          </div>
        )}

        {/* TAB 5: SMART BUDGET */}
        {activeTab === 'budget' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <SmartBudgetDashboard
              initialTrip={activeTrip}
              currency={currency}
            />
          </div>
        )}

        {/* TAB 6: SUSTAINABILITY / ECO-TRAVEL */}
        {activeTab === 'sustainability' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <SustainabilityDashboard trip={activeTrip} />
          </div>
        )}

        {/* TAB 7: SAFETY & SOS */}
        {activeTab === 'safety' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <TravelSafetyDashboard
              safety={activeTrip.safety}
              destinationName={activeTrip.destinationInfo.name}
            />
          </div>
        )}

        {/* TAB 8: COMMUNITY */}
        {activeTab === 'community' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <TravelCommunity />
          </div>
        )}

        {/* TAB 9: MY TRIPS & PROFILE */}
        {activeTab === 'mytrips' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <UserDashboard
              user={user}
              savedTrips={savedTrips}
              favorites={favorites}
              onOpenTrip={(t) => {
                setActiveTrip(t);
                setActiveTab('planner');
                setPlannerSubMode('view');
              }}
              onPlanNewTrip={() => {
                setActiveTab('planner');
                setPlannerSubMode('form');
              }}
              onExploreDestinations={() => setActiveTab('destinations')}
            />
          </div>
        )}

        {/* TAB 10: ADMIN CONSOLE */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <AdminDashboard />
          </div>
        )}

      </main>

      {/* Floating AI Assistant Chatbot */}
      <AIChatbot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Floating AI Trigger Pill (Visible when Chatbot closed) */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-ocean-600 via-sky-500 to-emerald-500 text-white shadow-2xl shadow-ocean-600/40 hover:scale-110 active:scale-95 transition-all group flex items-center gap-2.5"
          aria-label="Open AI Travel Assistant"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">Ask TravelAI</span>
        </button>
      )}

      {/* Generation Loading Modal */}
      {generationProgress && (
        <GenerationLoading progress={generationProgress} />
      )}

      {/* Trip Optimizer Modal */}
      <TripOptimizerModal
        isOpen={optimizerOpen}
        onClose={() => setOptimizerOpen(false)}
        trip={activeTrip}
        onApplyOptimizedTrip={(optimized) => setActiveTrip(optimized)}
      />

      {/* Auth / Profile Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        currentUser={user}
        onLoginSuccess={(newProfile) => setUser(newProfile)}
      />

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
