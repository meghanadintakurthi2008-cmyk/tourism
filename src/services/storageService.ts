import { TripPlan, Destination, Hotel } from '../types';
import { DEMO_ARAKU_TRIP } from '../data/demoTrips';

const SAVED_TRIPS_KEY = 'travelai_saved_trips';
const ACTIVE_TRIP_KEY = 'travelai_active_trip';
const FAVORITE_DESTINATIONS_KEY = 'travelai_fav_destinations';
const FAVORITE_HOTELS_KEY = 'travelai_fav_hotels';
const USER_PROFILE_KEY = 'travelai_user_profile';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  badge: string;
  totalTripsCount: number;
  sustainabilityScore: number;
  currency: string;
  role: 'traveler' | 'admin';
}

const DEFAULT_USER: UserProfile = {
  name: 'Meghana R.',
  email: 'meghana@travelai.org',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  badge: 'Sustainable Explorer',
  totalTripsCount: 4,
  sustainabilityScore: 88,
  currency: 'INR',
  role: 'traveler'
};

export const storageService = {
  getActiveTrip(): TripPlan {
    try {
      const stored = localStorage.getItem(ACTIVE_TRIP_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading active trip', e);
    }
    return DEMO_ARAKU_TRIP;
  },

  setActiveTrip(trip: TripPlan): void {
    try {
      localStorage.setItem(ACTIVE_TRIP_KEY, JSON.stringify(trip));
    } catch (e) {
      console.error('Error saving active trip', e);
    }
  },

  getSavedTrips(): TripPlan[] {
    try {
      const stored = localStorage.getItem(SAVED_TRIPS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading saved trips', e);
    }
    return [DEMO_ARAKU_TRIP];
  },

  saveTrip(trip: TripPlan): TripPlan[] {
    const trips = this.getSavedTrips();
    const existingIndex = trips.findIndex(t => t.id === trip.id);
    let updated: TripPlan[];
    if (existingIndex >= 0) {
      updated = [...trips];
      updated[existingIndex] = trip;
    } else {
      updated = [trip, ...trips];
    }
    try {
      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving trips list', e);
    }
    return updated;
  },

  getFavoriteDestinations(): string[] {
    try {
      const stored = localStorage.getItem(FAVORITE_DESTINATIONS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['araku-valley', 'visakhapatnam', 'goa', 'kerala-munnar'];
  },

  toggleFavoriteDestination(destinationId: string): string[] {
    const list = this.getFavoriteDestinations();
    const exists = list.includes(destinationId);
    const updated = exists ? list.filter(id => id !== destinationId) : [...list, destinationId];
    try {
      localStorage.setItem(FAVORITE_DESTINATIONS_KEY, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  },

  getFavoriteHotels(): string[] {
    try {
      const stored = localStorage.getItem(FAVORITE_HOTELS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['h-araku-1', 'h-vizag-2', 'h-goa-1'];
  },

  toggleFavoriteHotel(hotelId: string): string[] {
    const list = this.getFavoriteHotels();
    const exists = list.includes(hotelId);
    const updated = exists ? list.filter(id => id !== hotelId) : [...list, hotelId];
    try {
      localStorage.setItem(FAVORITE_HOTELS_KEY, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  },

  getUserProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_USER;
  },

  setUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {}
  }
};
