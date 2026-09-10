from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database.connection import get_db
from app.schemas.ai import (
    AIDestinationMatchRequest,
    AIDestinationMatchResponse,
    AITripGenerateRequest,
    AITripGenerateResponse,
    AIOptimizeRequest,
    AIOptimizeResponse,
    AIChatRequest,
    AIChatResponse,
    AIFoodRequest,
    AIFoodResponse,
    AICrowdRequest,
    AICrowdResponse
)
from app.services.ai_service import AIService
from app.services.recommendation_service import RecommendationService

router = APIRouter(prefix="/ai", tags=["AI Engine"])


@router.post("/recommend-destinations", response_model=AIDestinationMatchResponse)
def match_destinations(req: AIDestinationMatchRequest, db: Session = Depends(get_db)):
    """
    Match traveler preferences (budget, interests, style, duration) against destination catalog
    using scoring algorithms to compute match percentages and AI rationale.
    """
    matched = RecommendationService.match_destinations(req, db)
    return AIDestinationMatchResponse(
        recommendations=matched
    )


@router.post("/generate-trip", response_model=AITripGenerateResponse)
async def generate_trip(req: AITripGenerateRequest, db: Session = Depends(get_db)):
    """
    Generate comprehensive multi-day AI travel itinerary with timed day-by-day activities,
    multi-sector budget allocations, hotel recommendations, safety guidelines, and packing checklist.
    """
    return await AIService.generate_trip(req, db)


@router.post("/optimize-itinerary", response_model=AIOptimizeResponse)
def optimize_itinerary(req: AIOptimizeRequest):
    """
    Analyze itinerary stops to eliminate backtracking, reduce transit delay, and suggest optimal scheduling.
    """
    return AIService.optimize_itinerary(req)


@router.post("/chat", response_model=AIChatResponse)
async def chat_copilot(req: AIChatRequest):
    """
    Conversational AI Travel Assistant Copilot answering questions about destinations,
    packing advice, food recommendations, and budget optimization.
    """
    return await AIService.chat(req)


@router.post("/recommend-food", response_model=AIFoodResponse)
def recommend_food(req: AIFoodRequest):
    """
    Provide regional culinary specialties, street food highlights, dining categories, and hygiene advice.
    """
    return AIService.recommend_food(req)


@router.post("/crowd-prediction", response_model=AICrowdResponse)
def crowd_prediction(req: AICrowdRequest):
    """
    Predict crowd density levels, queue wait times, and recommended visiting windows for attractions.
    """
    return AIService.predict_crowd(req)
