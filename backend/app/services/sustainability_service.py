from typing import Dict, Any, List

class SustainabilityService:
    @staticmethod
    def calculate_sustainability(
        transport_mode: str = "Train",
        days: int = 3,
        travelers: int = 2,
        hotel_type: str = "Eco-Resort",
        destination_name: str = "Araku Valley"
    ) -> Dict[str, Any]:
        """Calculate trip carbon footprint and sustainability score with green recommendations."""
        t = max(1, travelers)
        d = max(1, days)

        # Baseline transport emissions per person (round trip ~ 250km)
        mode_emissions = {
            "flight": 85.0,
            "car": 38.0,
            "bus": 15.0,
            "train": 12.0,
            "bike": 18.0,
            "ev": 8.0
        }
        selected_mode = transport_mode.lower()
        trans_factor = mode_emissions.get(selected_mode, 14.0)
        transport_co2 = round(trans_factor * t, 1)

        # Hotel emissions per night
        hotel_emissions = {
            "eco-resort": 5.0,
            "homestay": 4.0,
            "3-star": 14.0,
            "luxury": 32.0,
            "hostel": 6.0
        }
        hotel_factor = hotel_emissions.get(hotel_type.lower(), 7.0)
        hotel_co2 = round(hotel_factor * d * (t / 2), 1)

        total_co2 = round(transport_co2 + hotel_co2, 1)

        # Calculate Score out of 100
        score = 88
        if "train" in selected_mode or "ev" in selected_mode:
            score += 6
        elif "flight" in selected_mode:
            score -= 15

        if "eco" in hotel_type.lower() or "homestay" in hotel_type.lower():
            score += 4
        elif "luxury" in hotel_type.lower():
            score -= 8

        score = max(40, min(98, score))

        recommendations = [
            "Opt for scenic electrified rail instead of private diesel cabs to reduce transit emissions by 68%.",
            f"Support local tribal businesses in {destination_name} by purchasing shade-grown organic coffee and handcrafted wooden toys.",
            "Carry reusable water canisters; refill at verified RO purification points to prevent single-use plastic pollution in mountain valleys.",
            "Participate in community-guided walking and cycling trails rather than motorized vehicle safaris."
        ]

        return {
            "score": score,
            "carbon_footprint_kg": total_co2,
            "transport_emissions_kg": transport_co2,
            "accommodation_impact_kg": hotel_co2,
            "eco_transport_options": [
                {"mode": "Vistadome Train", "carbon_kg": 12.0, "recommendation": "Lowest carbon impact scenic choice"},
                {"mode": "Electric Vehicle (EV)", "carbon_kg": 8.0, "recommendation": "Zero tailpipe emissions"},
                {"mode": "APSRTC Electric Bus", "carbon_kg": 10.0, "recommendation": "Mass transit efficiency"}
            ],
            "recommendations": recommendations
        }

sustainability_service = SustainabilityService()
