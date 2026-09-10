/**
 * TravelAI REST API Client
 * Connects frontend React components to the FastAPI backend at http://localhost:8000/api
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Token Storage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('travelai_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('travelai_token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('travelai_token');
};

// Generic Fetch Wrapper
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errJson = await response.json();
      errorMessage = errJson.message || errJson.detail || errorMessage;
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// 1. Health
export const checkBackendHealth = async () => {
  return request<{ status: string; service: string; database: string }>('/health');
};

// 2. Authentication & User Profile
export const apiAuth = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await request<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setAuthToken(res.access_token);
    return res;
  },
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await request<{ access_token: string; token_type: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setAuthToken(res.access_token);
    return res;
  },
  getMe: async () => {
    return request<any>('/auth/me');
  },
  logout: () => {
    clearAuthToken();
  },
};

// 3. Destinations
export const apiDestinations = {
  getAll: async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return request<any>(`/destinations${query ? `?${query}` : ''}`);
  },
  getById: async (id: number) => {
    return request<any>(`/destinations/${id}`);
  },
  search: async (query: string) => {
    return request<any[]>(`/destinations/search?q=${encodeURIComponent(query)}`);
  },
  getHiddenGems: async (id: number) => {
    return request<any>(`/destinations/${id}/hidden-gems`);
  },
};

// 4. Trips & Itineraries
export const apiTrips = {
  list: async () => {
    return request<any[]>('/trips');
  },
  getById: async (tripId: number) => {
    return request<any>(`/trips/${tripId}`);
  },
  create: async (tripData: any) => {
    return request<any>('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  },
  getItinerary: async (tripId: number) => {
    return request<any[]>(`/trips/${tripId}/itinerary`);
  },
  addDay: async (tripId: number, dayData: any) => {
    return request<any>(`/trips/${tripId}/itinerary/days`, {
      method: 'POST',
      body: JSON.stringify(dayData),
    });
  },
  addActivity: async (dayId: number, activityData: any) => {
    return request<any>(`/itinerary/days/${dayId}/activities`, {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  },
  deleteActivity: async (activityId: number) => {
    return request<any>(`/itinerary/activities/${activityId}`, {
      method: 'DELETE',
    });
  },
};

// 5. AI Engine
export const apiAI = {
  generateTrip: async (payload: {
    origin?: string;
    destination: string;
    start_date: string;
    end_date: string;
    travelers?: number;
    budget?: number;
    travel_style?: string;
    interests?: string[];
  }) => {
    return request<any>('/ai/generate-trip', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  recommendDestinations: async (quizAnswers: {
    budget: number;
    days: number;
    travel_style: string;
    interests: string[];
    travelers?: number;
  }) => {
    return request<any>('/ai/recommend-destinations', {
      method: 'POST',
      body: JSON.stringify(quizAnswers),
    });
  },
  optimizeItinerary: async (payload: any) => {
    return request<any>('/ai/optimize-itinerary', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  chat: async (message: string, context?: any) => {
    return request<any>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  },
  recommendFood: async (destination: string, budget?: number) => {
    return request<any>('/ai/recommend-food', {
      method: 'POST',
      body: JSON.stringify({ destination, budget }),
    });
  },
  predictCrowd: async (destination: string, date: string, time: string) => {
    return request<any>('/ai/crowd-prediction', {
      method: 'POST',
      body: JSON.stringify({ destination, date, time }),
    });
  },
};

// 6. Budget
export const apiBudget = {
  calculate: async (payload: any) => {
    return request<any>('/budget/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  optimize: async (payload: any) => {
    return request<any>('/budget/optimize', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// 7. Hotels
export const apiHotels = {
  list: async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return request<any[]>(`/hotels${query ? `?${query}` : ''}`);
  },
  recommend: async (payload: { destination_name?: string; budget_per_night?: number }) => {
    return request<any[]>('/hotels/recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// 8. Transport & Weather
export const apiTransport = {
  recommend: async (payload: { origin: string; destination: string; travelers?: number; budget?: number }) => {
    return request<any>('/transport/recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export const apiWeather = {
  getForCity: async (city: string) => {
    return request<any>(`/weather/${encodeURIComponent(city)}`);
  },
};

// 9. Packing, Safety, Sustainability
export const apiPacking = {
  generate: async (payload: any) => {
    return request<any>('/packing/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  getForTrip: async (tripId: number) => {
    return request<any[]>(`/trips/${tripId}/packing`);
  },
  toggleItem: async (itemId: number, is_checked: boolean) => {
    return request<any>(`/packing/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ is_checked }),
    });
  },
};

export const apiSafety = {
  getForDestination: async (destination: string) => {
    return request<any>(`/safety/${encodeURIComponent(destination)}`);
  },
};

export const apiSustainability = {
  calculate: async (payload: any) => {
    return request<any>('/sustainability/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// 10. Favorites & Reviews
export const apiFavorites = {
  list: async () => {
    return request<any[]>('/favorites');
  },
  add: async (item_type: string, item_id: number) => {
    return request<any>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ item_type, item_id }),
    });
  },
  remove: async (favorite_id: number) => {
    return request<any>(`/favorites/${favorite_id}`, {
      method: 'DELETE',
    });
  },
  check: async (item_type: string, item_id: number) => {
    return request<any>(`/favorites/check?item_type=${item_type}&item_id=${item_id}`);
  },
};

export const apiReviews = {
  getForDestination: async (destinationId: number) => {
    return request<any[]>(`/reviews/destination/${destinationId}`);
  },
  create: async (data: { destination_id: number; rating: number; comment: string }) => {
    return request<any>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// 11. Admin
export const apiAdmin = {
  getStatistics: async () => {
    return request<any>('/admin/statistics');
  },
  getUsers: async (page = 1, limit = 20) => {
    return request<any>(`/admin/users?page=${page}&limit=${limit}`);
  },
  getTrips: async (page = 1, limit = 20) => {
    return request<any>(`/admin/trips?page=${page}&limit=${limit}`);
  },
};
