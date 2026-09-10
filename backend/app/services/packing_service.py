from typing import Dict, Any, List
from app.schemas.packing import PackingGenerateRequest, PackingListCategorizedResponse

class PackingService:
    @staticmethod
    def generate_packing_list(req: PackingGenerateRequest) -> PackingListCategorizedResponse:
        """Generate smart checklist customized to destination, climate, duration and travel style."""
        is_hilly = any(h in req.destination.lower() for h in ["araku", "munnar", "ooty", "kashmir", "hills"])
        is_coastal = any(c in req.destination.lower() for c in ["goa", "vizag", "visakhapatnam", "beach", "kerala"])
        is_rainy = "rain" in (req.weather or "").lower()

        clothes = [
            f"{req.days + 1} sets of comfortable breathable clothing",
            "Undergarments & quick-dry socks",
            "Sleepwear / night clothes"
        ]

        shoes = [
            "Comfortable sneakers / walking shoes with wet grip"
        ]

        if is_hilly:
            clothes.append("Warm fleece jacket / thermal layer (temperatures dip in valleys)")
            shoes.append("Sturdy hiking boots for limestone cave trails")
        elif is_coastal:
            clothes.append("Quick-dry swimwear & UV rash guard")
            shoes.append("Breathable sandals / flip-flops for sandy shores")

        if is_rainy:
            clothes.append("Lightweight rain poncho or compact umbrella")

        electronics = [
            "Smartphone & fast charging cables",
            "High-capacity 20,000mAh Power Bank (essential for remote valley trails)",
            "Universal adapter / multi-plug"
        ]
        if "photo" in req.travel_style.lower() or "adventure" in req.travel_style.lower():
            electronics.append("DSLR/Mirrorless Camera with spare battery & SD cards")

        documents = [
            "Original Government Photo ID (Aadhar Card, Driving License, or Passport)",
            "Confirmed train / flight tickets & hotel reservation vouchers",
            "Medical insurance cards & cash notes (₹2,000 in change for rural stalls)"
        ]

        health_items = [
            "Personal prescription medications",
            "First-aid kit (band-aids, antiseptic cream, pain relievers)",
            "Motion sickness tablets (for winding mountain ghat hairpin bends)"
        ]

        toiletries = [
            "Biodegradable mosquito repellent cream / spray",
            "Sunscreen lotion SPF 50+ & UV sunglasses",
            "Travel-size toothpaste, toothbrush & lip balm"
        ]

        optional_items = [
            "Reusable BPA-free thermal water bottle (avoid single-use plastics)",
            "Foldable tote bag for local tribal handicrafts & roasted coffee purchases",
            "Small binoculars for bird watching"
        ]

        advisory = (
            f"Packing tailored for {req.destination} over {req.days} days. "
            f"Prioritized {'mountain trail essentials and layered clothing' if is_hilly else 'sun protection and coastal beachwear'}."
        )

        return PackingListCategorizedResponse(
            destination=req.destination,
            days=req.days,
            clothes=clothes,
            shoes=shoes,
            electronics=electronics,
            documents=documents,
            health_items=health_items,
            toiletries=toiletries,
            optional_items=optional_items,
            weather_advisory=advisory
        )

packing_service = PackingService()
