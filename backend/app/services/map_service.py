from typing import List, Dict, Any

class MapService:
    @staticmethod
    def get_transport_recommendations(
        origin: str,
        destination: str,
        travelers: int = 2,
        budget: float = 15000.0,
        preference: str = "Train"
    ) -> Dict[str, Any]:
        """Generate multi-modal transport comparison with carbon impact and AI recommendations."""
        is_hilly = "araku" in destination.lower() or "munnar" in destination.lower() or "ooty" in destination.lower()
        t = max(1, travelers)

        options: List[Dict[str, Any]] = [
            {
                "type": "Train",
                "name": f"Scenic Express ({origin} ➔ {destination})",
                "cost": round(750.0 * t),
                "duration": "3h 30m" if is_hilly else "4h 45m",
                "comfort_rating": 4.5,
                "carbon_emission_kg": round(12.0 * t, 1),
                "is_ai_recommended": True,
                "ai_reason": "Recommended: Lowest cost and 68% lower carbon emissions compared to roadway cars. Offers panoramic mountain views."
            },
            {
                "type": "Car",
                "name": f"Private Cab / Eco EV ({origin} ➔ {destination})",
                "cost": round(3500.0 + (t * 200)),
                "duration": "3h 15m" if is_hilly else "4h 00m",
                "comfort_rating": 4.0,
                "carbon_emission_kg": round(36.0 * (t * 0.5), 1),
                "is_ai_recommended": False,
                "ai_reason": "Direct door-to-door transit; flexible stops at roadside viewpoints."
            },
            {
                "type": "Bus",
                "name": f"State Deluxe Super Luxury ({origin} ➔ {destination})",
                "cost": round(450.0 * t),
                "duration": "4h 15m" if is_hilly else "5h 30m",
                "comfort_rating": 3.2,
                "carbon_emission_kg": round(16.0 * t, 1),
                "is_ai_recommended": False,
                "ai_reason": "High frequency departures; best for solo backpackers on tight budgets."
            },
            {
                "type": "Bike",
                "name": "Adventure Motorcycle Rental",
                "cost": round(1400.0 * (1 if t <= 2 else 2)),
                "duration": "3h 45m",
                "comfort_rating": 3.8,
                "carbon_emission_kg": round(20.0, 1),
                "is_ai_recommended": False,
                "ai_reason": "Thrilling experience across hairpin ghats; recommended for experienced riders."
            }
        ]

        if not is_hilly or "goa" in destination.lower() or "kashmir" in destination.lower():
            options.append({
                "type": "Flight",
                "name": f"Direct Flight to nearest airport ({destination})",
                "cost": round(4200.0 * t),
                "duration": "1h 20m",
                "comfort_rating": 4.8,
                "carbon_emission_kg": round(85.0 * t, 1),
                "is_ai_recommended": False,
                "ai_reason": "Fastest transit; ideal for tight business or weekend getaways."
            })

        return {
            "origin": origin,
            "destination": destination,
            "travelers": t,
            "recommended_mode": "Train",
            "ai_summary": "Train travel offers the highest safety rating, lowest cost, and least environmental degradation along scenic corridors.",
            "options": options
        }

map_service = MapService()
