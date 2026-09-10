# TravelAI – FastAPI Backend

> **Tourism & Industry Innovation Through AI-Powered Travel Planning**  
> Tagline: *"Plan smarter. Travel better. Explore more."*

A production-ready, modular FastAPI backend supporting AI itinerary generation, budget calculation & optimization, multi-modal transport comparisons, weather advisories, destination matching, hotel recommendations, packing list generation, community reviews, group expense splitting, and admin analytics.

---

## 🏗️ Architecture & Stack

- **Runtime:** Python 3.11+ / Python 3.13
- **Framework:** FastAPI (Asynchronous, High-Performance)
- **Database:** SQLAlchemy 2.0 ORM with SQLite (dev) / PostgreSQL (production)
- **Validation:** Pydantic v2
- **Authentication:** JWT (JSON Web Tokens) with direct `bcrypt` password hashing
- **Migrations:** Alembic
- **HTTP Client:** HTTPX
- **Containerization:** Docker & Docker Compose

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.11+ installed
- Node.js & npm (for React frontend)

### 2. Virtual Environment Setup
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a `.env` file from `.env.example`:
```ini
APP_NAME=TravelAI
APP_ENV=development
SECRET_KEY=travelai-secret-key-development-minimum-32-characters-required
ACCESS_TOKEN_EXPIRE_MINUTES=1440
DATABASE_URL=sqlite:///./travelai.db
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. Database Initialization & Seeding
Populate the 10 Indian destinations (Araku Valley, Goa, Vizag, Kerala, Kashmir, Rajasthan, Hyderabad, Vijayawada, Ooty, Tirupati), curated hotels, reviews, test users, and a sample 3-day itinerary:
```powershell
.\venv\Scripts\python.exe -m app.seed
```

### 5. Launch the Server
```powershell
.\venv\Scripts\uvicorn.exe app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive API documentation will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health Check: `http://localhost:8000/api/health`

---

## 🧪 Automated Testing

Run the end-to-end 20-point test suite:
```powershell
.\venv\Scripts\python.exe test_endpoints.py
```

---

## 🔑 Pre-Configured Test Accounts

| Role | Email | Password |
|---|---|---|
| **Traveler** | `traveler@travelai.org` | `traveler123` |
| **Traveler (Priya)** | `priya@travelai.org` | `traveler123` |
| **Admin** | `admin@travelai.org` | `admin123` |

---

## 📡 API Endpoints Reference

### 1. Authentication & Users
- `POST /api/auth/register` – Register new traveler account
- `POST /api/auth/login` – Authenticate and receive JWT bearer token
- `GET /api/auth/me` – Retrieve current user profile
- `GET /api/users/profile` – Get user preferences and stats
- `PUT /api/users/profile` – Update user profile & travel preferences

### 2. Destinations
- `GET /api/destinations` – List destinations with multi-criteria filters & pagination
- `GET /api/destinations/search?q={query}` – Search destinations by name, state, or tags
- `GET /api/destinations/{id}` – Destination details with hotels & reviews
- `GET /api/destinations/{id}/hidden-gems` – Offbeat local spots and signature foods
- `POST /api/destinations` – Create destination (Admin only)
- `PUT /api/destinations/{id}` – Update destination (Admin only)
- `DELETE /api/destinations/{id}` – Delete destination (Admin only)

### 3. Trips & Group Travel
- `GET /api/trips` – List user's saved trips
- `POST /api/trips` – Create a new trip
- `GET /api/trips/{id}` – Trip details with itinerary, packing list, and expenses
- `PUT /api/trips/{id}` – Update trip parameters
- `DELETE /api/trips/{id}` – Delete trip
- `POST /api/trips/{id}/expenses` – Log trip expense
- `GET /api/trips/{id}/expenses/split` – Settle and calculate minimal debt transfers
- `POST /api/group-trips` – Create collaborative group trip
- `POST /api/group-trips/{id}/members` – Invite co-travelers

### 4. Itinerary & Activities
- `GET /api/trips/{trip_id}/itinerary` – Full day-by-day activity timeline
- `POST /api/trips/{trip_id}/itinerary/days` – Add a day
- `DELETE /api/itinerary/days/{day_id}` – Delete a day
- `POST /api/itinerary/days/{day_id}/activities` – Add activity with schedule and AI advice
- `PUT /api/itinerary/activities/{activity_id}` – Update activity details
- `DELETE /api/itinerary/activities/{activity_id}` – Remove activity

### 5. AI Engine
- `POST /api/ai/recommend-destinations` – Quiz recommendation matching algorithm
- `POST /api/ai/generate-trip` – Multi-day end-to-end trip generator with activities, budget, stay & safety
- `POST /api/ai/optimize-itinerary` – Eliminate back-tracking and cluster route stops
- `POST /api/ai/chat` – Conversational AI Copilot with prompt responses & quick actions
- `POST /api/ai/recommend-food` – Regional gastronomy, street food & food safety tips
- `POST /api/ai/crowd-prediction` – Peak density estimations and optimal visiting hours

### 6. Budget, Hotels, Transport, Weather
- `POST /api/budget/calculate` – 6-sector calculation (transport, stay, food, activities, shopping, contingency)
- `POST /api/budget/optimize` – AI cost-reduction recommendations
- `GET /api/hotels` – Filter hotels by destination, category, price, eco-rating
- `POST /api/hotels/recommend` – Categorized hotel recommendations (Best Value, Best Rated, Eco)
- `POST /api/transport/recommend` – Multi-modal transit comparison with carbon footprint
- `GET /api/weather/{city}` – Current weather, 3-day forecast, and AI activity advisory

### 7. Packing, Safety, Sustainability, Reviews, Favorites
- `POST /api/packing/generate` – Weather & style-tailored checklist generator
- `GET /api/trips/{id}/packing` – Saved interactive checklist
- `PUT /api/packing/{item_id}` – Toggle item checked status
- `GET /api/safety/{destination}` – Safety score, emergency contacts, safe & caution zones
- `POST /api/sustainability/calculate` – CO2 emissions, eco-score (1-100), tree offset count
- `GET /api/favorites` – Saved destinations/hotels
- `POST /api/favorites` – Bookmark item
- `GET /api/reviews/destination/{id}` – Destination reviews
- `POST /api/reviews` – Post review (auto-recalculates destination average rating)

### 8. Admin Portal
- `GET /api/admin/statistics` – Overview metrics, users, trips, revenue/budget, popular spots
- `GET /api/admin/users` – User audit and role listings
- `GET /api/admin/trips` – System-wide trip registry
- `GET /api/admin/destinations` – Catalog overview with hotel/review stats
- `GET /api/admin/reviews` – Review moderation

---

## 🐳 Docker Deployment

To launch the full backend and PostgreSQL database stack using Docker Compose:

```bash
docker-compose up --build -d
```

The database container will initialize with persistent storage on the `pgdata` volume, and the backend will run automatic migrations and seed data on startup.
