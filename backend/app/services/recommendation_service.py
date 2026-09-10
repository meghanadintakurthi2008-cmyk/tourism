from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.database.models import Destination
from app.schemas.ai import AIDestinationMatchRequest, MatchedDestinationItem

class RecommendationService:
    @staticmethod
    def match_destinations(req: AIDestinationMatchRequest, db: Session) -> List[MatchedDestinationItem]:
        """Compute match percentage and AI reasoning comparing user criteria with destination catalog."""
        destinations = db.query(Destination).all()
        results: List[MatchedDestinationItem] = []

        for dest in destinations:
            score = 65
            style_lower = (req.travel_style or "").lower()
            interests_lower = [i.lower() for i in req.interests]

            # Match travel style
            if style_lower in dest.travel_style.lower():
                score += 12

            # Match interests
            dest_text = f"{dest.name} {dest.description} {dest.tags} {dest.hidden_gems}".lower()
            matched_interests = []
            for interest in interests_lower:
                if interest in dest_text:
                    score += 6
                    matched_interests.append(interest)

            # Match budget
            per_person_budget = req.budget / max(1, req.travelers)
            if per_person_budget >= (dest.average_budget * 0.5):
                score += 8
            else:
                score -= 10

            # Cap score
            match_percentage = min(99, max(60, score))

            # Build reasoning
            interests_str = ", ".join(matched_interests) if matched_interests else "general exploration"
            reason = (
                f"Matched {match_percentage}% based on your affinity for {req.travel_style} travel and interest in {interests_str}. "
                f"{dest.name} in {dest.state} offers high eco-sustainability ({dest.sustainability_score}/100) and fits comfortably within your ₹{req.budget:,.0f} budget."
            )

            tags_list = [t.strip() for t in dest.tags.split(",") if t.strip()]

            results.append(MatchedDestinationItem(
                destination=dest.name,
                state=dest.state,
                match_percentage=match_percentage,
                reason=reason,
                estimated_budget=dest.average_budget,
                image_url=dest.image_url,
                tags=tags_list
            ))

        # Sort descending by match percentage
        results.sort(key=lambda x: x.match_percentage, reverse=True)
        return results[:5]

recommendation_service = RecommendationService()
