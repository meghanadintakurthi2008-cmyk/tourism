# TravelAI - Tourism & Industry Innovation Through AI-Powered Travel Planning

> **Tagline:** "Plan smarter. Travel better. Explore more."  
> **College Project & Smart India Hackathon (SIH) Presentation Edition**

TravelAI is a comprehensive, responsive travel-tech web application engineered to revolutionize Indian tourism through autonomous itinerary generation, dynamic budget forecasting, spatial route clustering, weather-aware activity scheduling, and carbon sustainability scoring.

---

## 🌟 Key Innovations & Features

### 1. 🤖 AI Travel Planner & Route Optimizer
- Autonomous day-by-day itinerary generator tailoring morning, afternoon, and evening activities based on:
  - Origin, destination, dates, party size, and budget tier.
  - Travel style: *Adventure, Relaxation, Family, Romantic, Cultural, Spiritual, Business, Backpacking*.
  - Interests: *Beaches, Mountains, Historical, Temples, Museums, Wildlife, Shopping, Photography, Local food*.
  - Food preferences (*Traditional South Indian, Vegetarian, Seafood, Jain*) & stay preferences (*Eco-Resort, 3-Star, Luxury*).
- **"Optimize My Trip"**: Spatial clustering engine that reorders stops geographically to eliminate zig-zag travel, reducing transit time by up to 38% and saving fuel expenses.

### 2. 💰 Smart Budget Engine & Group Expense Splitter
- Real-time dynamic cost calculator across 6 sectors:
  - Transportation, Accommodation, Food, Activities, Shopping, and Emergency Buffer.
- Interactive SVG donut chart breakdown.
- Dynamic parameter sliders updating budgets instantly when adjusting travelers, hotel stars, or transport.
- **"Save Money With AI"**: Algorithmic savings tips (e.g. mid-week departures, certified suburban eco-homestays).
- Built-in **Group Bill Splitter** with fair per-person shares.

### 3. 🗺️ Destination Explorer & AI Match
- Rich catalog covering Indian tourism hubs: *Araku Valley, Visakhapatnam, Goa, Kerala (Munnar & Alleppey), Kashmir Valley, Rajasthan (Jaipur & Udaipur), Hyderabad, Guntur, Vijayawada, Tirupati, Ooty, Bengaluru*.
- Multi-dimensional filters: Budget, Weather, Season, Adventure level, Family-friendly tag, and full-text search.
- **"AI Destination Match" Quiz**: Computes match percentage (e.g., 95% Match) based on travel personality and explains why the AI recommends it.

### 4. 🧭 Interactive Itinerary Map & Waypoints
- Visual map canvas plotting origin and Day 1/2/3 stops with animated route polylines.
- Pinpoints distance, travel time, and transit method for every stop.
- Pluggable architecture ready for Google Maps or Mapbox API integration.

### 5. 💬 TravelAI Floating Assistant
- Conversational chatbot equipped with quick prompts (*"Best places in Goa?", "4-day budget?", "What should I pack?", "Cheap hotels"*).
- Instant replies with markdown, formatting, and one-click navigation actions.

### 6. 🎒 Weather-Aware Smart Packing Assistant
- Automatically tailors luggage checklist to destination climate and rain probability.
- Interactive checklist with packed counter, category filters, custom item additions, and printable view.

### 7. 🌱 Sustainable Tourism & Carbon Footprint Dashboard
- Calculates estimated CO₂ footprint (kg) and compares against typical flights/SUVs.
- **Trip Sustainability Score (e.g. 92/100)** promoting eco-certified stays, rail travel, and indigenous tribal products.

### 8. 🛡️ Travel Safety & Emergency SOS
- 24x7 emergency contacts: Police 112, Ambulance 108, Tourist Helpline 1363, Women Safety 1091.
- Nearest verified hospitals and medical trauma centers.
- Travel document safe-keeper checklist.
- One-tap **Emergency SOS Simulation** displaying live GPS coordinates.

### 9. 👥 Community Stories & Experiences
- Traveler story feed with photos, reviews, star ratings, and tags.
- Interactive Likes, comments, and modal to share new travel experiences.

### 10. ⚙️ Admin Console & Hackathon Analytics
- Innovation metrics for Smart India Hackathon evaluators: User growth, itinerary volume trends, carbon savings, destination catalog inventory, and AI latency SLOs.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
```bash
npm install
```
*(On Windows PowerShell where `.ps1` script execution may be restricted, use `npm.cmd install`)*

### 3. Run the Development Server
```bash
npm run dev
# or
npm.cmd run dev
```
Open your browser at: `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
# or
npm.cmd run build
```
The production bundle will be generated in the `dist/` directory. You can preview it with:
```bash
npm run preview
```

---

## 🔑 Configuring External APIs

The application is architected with complete, zero-dependency mock services so that it works out of the box without requiring API keys or external services.

To connect live third-party services, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

And populate your credentials:

| Environment Variable | Service | Description |
| :--- | :--- | :--- |
| `VITE_AI_API_KEY` | Google Gemini or OpenAI | Connects real-time LLM responses to the AI Assistant and Planner |
| `VITE_AI_PROVIDER` | `gemini` or `openai` | Selects LLM provider |
| `VITE_MAP_API_KEY` | Google Maps or Mapbox | Connects dynamic satellite routing tiles |
| `VITE_WEATHER_API_KEY`| OpenWeatherMap | Fetches live real-time meteorological conditions |
| `VITE_HOTEL_API_KEY` | Booking / TripAdvisor | Connects live room availability and pricing |

---

## 📁 Architecture Overview

```
tourism/
├── index.html                       # HTML template with Google Fonts & Leaflet styles
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite bundler configuration
├── tailwind.config.js               # Custom travel-tech color palette
├── src/
│   ├── main.tsx                     # React application entry point
│   ├── App.tsx                      # Master navigation, state and tab coordinator
│   ├── types/
│   │   └── index.ts                 # Strong TypeScript data contracts
│   ├── data/
│   │   ├── destinations.ts          # Rich catalog of 14 Indian tourism hubs
│   │   ├── hotels.ts                # Accommodations with eco-ratings and pricing
│   │   ├── experiences.ts           # Hyper-local food and hidden gems
│   │   ├── demoTrips.ts             # Default 3-Day Araku Valley SIH demo
│   │   ├── safetyData.ts            # Emergency contacts and safety tips
│   │   └── communityData.ts         # User stories and reviews
│   ├── services/
│   │   ├── aiPlannerService.ts      # Multi-step generation and route optimizer
│   │   ├── budgetService.ts         # Dynamic cost engine and bill splitter
│   │   ├── weatherService.ts        # Weather conditions and dynamic activity advice
│   │   └── storageService.ts        # LocalStorage persistence layer
│   └── components/                  # Reusable UI component ecosystem
```

---

## 🎓 College & Smart India Hackathon Presentation Notes

- **Default Demo Trip**: Loaded automatically (Araku Valley 3 Days / 2 Nights for 2 travelers, ₹15,000 budget, Nature + Adventure).
- **Instant Demo Logins**: In the top right profile button, click **"Demo Traveler"** or **"Demo Admin"** for 1-click evaluation access.
- **Interactive Confetti**: Triggers on every newly generated trip.
- **Route Clustering**: Click **"Optimize Route"** on any trip to see travel time and budget reduction in action.

*Created for Smart India Hackathon 2026 • Category: Travel, Tourism & Industry Innovation Through AI.*
