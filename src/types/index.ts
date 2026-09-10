export type BudgetTier = 'budget' | 'moderate' | 'premium' | 'luxury';

export type TravelStyle =
  | 'Adventure'
  | 'Relaxation'
  | 'Family'
  | 'Romantic'
  | 'Cultural'
  | 'Spiritual'
  | 'Business'
  | 'Backpacking';

export interface TripRequest {
  id?: string;
  startingLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelers: number;
  budgetTier: BudgetTier;
  travelStyle: TravelStyle;
  interests: string[];
  foodPreference: string;
  accommodationPreference: string;
  transportationPreference: string;
  studentMode?: boolean;
  backpackerMode?: boolean;
}

export interface ItineraryActivity {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  time: string;
  activity: string;
  location: string;
  estimatedCost: number;
  travelTime: string;
  recommendedDuration: string;
  aiReason: string;
  coordinates: [number, number];
  category: string;
  photoSpot?: boolean;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  weatherSuitability: 'indoor' | 'outdoor' | 'all-weather';
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  date?: string;
  activities: ItineraryActivity[];
  dayStats: {
    totalCost: number;
    travelTime: string;
    carbonKg: number;
  };
}

export interface BudgetCategoryItem {
  category: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  activities: number;
  shopping: number;
  emergency: number;
  total: number;
  currency: string;
  savingsTips: string[];
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  bestTimeToVisit: string;
  avgBudget: number; // In INR for 3 days
  popularActivities: string[];
  rating: number;
  reviewsCount: number;
  travelStyles: TravelStyle[];
  weather: {
    temp: number;
    condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Breezy' | 'Pleasant';
    rainProb: number;
    humidity: number;
    uvIndex: number;
  };
  coordinates: [number, number];
  tags: string[];
  hiddenGems: string[];
  localFoods: string[];
  sustainabilityScore: number;
  familyFriendly: boolean;
  adventureLevel: 'Low' | 'Moderate' | 'High' | 'Extreme';
  bestSeason: 'Winter' | 'Monsoon' | 'Summer' | 'Spring' | 'All Year';
}

export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  image: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  distance: string;
  facilities: string[];
  aiScore: number; // out of 10
  category: 'Best Value' | 'Best Rated' | 'Closest' | 'Budget Friendly' | 'Luxury Resort';
  ecoCertified: boolean;
  location: string;
}

export interface TransportationOption {
  type: 'Flight' | 'Train' | 'Bus' | 'Car' | 'Bike' | 'Walk';
  name: string;
  estimatedCost: number;
  travelTime: string;
  comfortRating: number; // 1-5
  carbonEmissionKg: number;
  isAiRecommended?: boolean;
  aiReason?: string;
}

export interface SafetyInfo {
  destinationId: string;
  destinationName: string;
  emergencyContacts: { label: string; number: string; notes?: string }[];
  nearestHospitals: { name: string; distance: string; contact: string }[];
  localTips: string[];
  alerts: string[];
  documentChecklist: string[];
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'clothes' | 'toiletries' | 'electronics' | 'documents' | 'health' | 'essentials';
  checked: boolean;
  weatherReason?: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge: string;
    location: string;
  };
  destination: string;
  title: string;
  content: string;
  image?: string;
  rating: number;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  date: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string; payload?: any }[];
}

export interface TripPlan {
  id: string;
  tripName: string;
  request: TripRequest;
  createdAt: string;
  destinationInfo: Destination;
  days: ItineraryDay[];
  budget: BudgetBreakdown;
  hotels: Hotel[];
  transportation: TransportationOption[];
  packingList: PackingItem[];
  sustainabilityScore: number;
  carbonKg: number;
  carbonSavedKg: number;
  safety: SafetyInfo;
  isFavorite?: boolean;
}
