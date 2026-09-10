from typing import Dict, Any, List
from app.schemas.budget import BudgetCalculationRequest, BudgetBreakdownResponse, BudgetOptimizeResponse

class BudgetService:
    @staticmethod
    def calculate_budget(req: BudgetCalculationRequest) -> BudgetBreakdownResponse:
        """Calculate dynamic 6-sector trip budget with student and backpacker modifiers."""
        t = max(1, req.travelers)
        days = max(1, req.days)

        multiplier = 1.0
        if req.budget_tier == "budget":
            multiplier = 0.75
        elif req.budget_tier == "premium":
            multiplier = 1.6
        elif req.budget_tier == "luxury":
            multiplier = 2.4

        if req.student_discount:
            multiplier *= 0.88 # 12% student concession
        if req.backpacker_mode:
            multiplier *= 0.75 # 25% backpacker mode

        # Base daily allocations
        transport = round(req.transport_budget * (t / 2) * multiplier, 2)
        rooms_needed = max(1, (t + 1) // 2)
        accommodation = round(req.hotel_budget * rooms_needed * (days - 1 if days > 1 else 1) * multiplier * 0.4, 2)
        food = round(req.food_budget * t * (days / 3) * multiplier * 0.5, 2)
        activities = round(req.activity_budget * t * multiplier * 0.4, 2)
        shopping = round(req.shopping_budget * (0.5 if req.backpacker_mode else 1.0), 2)
        emergency = round((transport + accommodation + food + activities) * 0.05, 2)

        total = round(transport + accommodation + food + activities + shopping + emergency, 2)

        return BudgetBreakdownResponse(
            transportation=transport,
            accommodation=accommodation,
            food=food,
            activities=activities,
            shopping=shopping,
            emergency=emergency,
            total=total,
            currency="INR",
            per_person_total=round(total / t, 2),
            daily_per_person=round(total / (t * days), 2)
        )

    @staticmethod
    def optimize_budget(total_budget: float, destination: str, days: int = 3, travelers: int = 2) -> BudgetOptimizeResponse:
        """Provide actionable AI-driven cost reduction suggestions."""
        savings = round(total_budget * 0.18, 2)
        new_total = round(total_budget - savings, 2)

        suggestions = [
            f"Travel one day earlier (Tuesday/Wednesday) to reduce intercity transit fares by approximately 18%.",
            f"Choose a certified eco-homestay 1.5 km from the {destination} center to save approx ₹800 per night without sacrificing quality.",
            f"Enjoy regional specialties (like Bamboo Chicken or local thalis) at village cooperatives rather than commercial tourist buffets to cut dining costs by 30%.",
            f"Book combined multi-attraction entry passes online to bypass on-spot ticketing surcharges."
        ]

        return BudgetOptimizeResponse(
            potential_savings=savings,
            new_estimated_total=new_total,
            suggestions=suggestions
        )

    @staticmethod
    def split_expenses(expenses: List[Dict[str, Any]], members: List[str]) -> Dict[str, Any]:
        """Calculate per-person shares and minimal settlement transactions."""
        if not members:
            members = ["Me"]

        total = sum(e["amount"] for e in expenses)
        member_count = len(members)
        per_person = round(total / member_count, 2) if member_count > 0 else 0.0

        paid_summary: Dict[str, float] = {m: 0.0 for m in members}
        for e in expenses:
            payer = e.get("paid_by", members[0])
            if payer not in paid_summary:
                paid_summary[payer] = 0.0
            paid_summary[payer] += e["amount"]

        # Calculate balances (paid - share)
        balances = {m: round(paid_summary.get(m, 0.0) - per_person, 2) for m in members}

        debtors = [[m, -bal] for m, bal in balances.items() if bal < -0.01]
        creditors = [[m, bal] for m, bal in balances.items() if bal > 0.01]

        settlements = []
        d_idx = 0
        c_idx = 0
        while d_idx < len(debtors) and c_idx < len(creditors):
            deb_name, deb_amt = debtors[d_idx]
            cred_name, cred_amt = creditors[c_idx]

            transfer = min(deb_amt, cred_amt)
            settlements.append({
                "payer": deb_name,
                "receiver": cred_name,
                "amount": round(transfer, 2)
            })

            debtors[d_idx][1] -= transfer
            creditors[c_idx][1] -= transfer

            if debtors[d_idx][1] <= 0.01:
                d_idx += 1
            if creditors[c_idx][1] <= 0.01:
                c_idx += 1

        return {
            "total_expense": round(total, 2),
            "member_count": member_count,
            "per_person_share": per_person,
            "paid_summary": paid_summary,
            "settlements": settlements
        }

budget_service = BudgetService()
