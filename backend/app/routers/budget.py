from fastapi import APIRouter, Depends, status
from app.schemas.budget import (
    BudgetCalculationRequest,
    BudgetBreakdownResponse,
    BudgetOptimizeRequest,
    BudgetOptimizeResponse
)
from app.services.budget_service import BudgetService

router = APIRouter(prefix="/budget", tags=["Budget Calculator"])


@router.post("/calculate", response_model=BudgetBreakdownResponse)
def calculate_budget(req: BudgetCalculationRequest):
    """
    Calculate full 6-sector trip budget breakdown (transport, lodging, food, activities, shopping, contingency).
    Takes into account duration, number of travelers, budget tier, student discounts, and backpacker mode.
    """
    return BudgetService.calculate_budget(req)


@router.post("/optimize", response_model=BudgetOptimizeResponse)
def optimize_budget(req: BudgetOptimizeRequest):
    """
    Provide intelligent AI-powered cost-reduction strategies tailored for the destination and group parameters.
    """
    return BudgetService.optimize_budget(
        total_budget=req.total_budget,
        destination=req.destination,
        days=req.days,
        travelers=req.travelers
    )
