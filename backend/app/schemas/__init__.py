from app.schemas.user import UserRegister, UserLogin, UserResponse, UserUpdate, Token
from app.schemas.destination import DestinationBase, DestinationCreate, DestinationUpdate, DestinationResponse, DestinationPagination
from app.schemas.itinerary import ActivityBase, ActivityCreate, ActivityUpdate, ActivityResponse, ItineraryDayCreate, ItineraryDayResponse
from app.schemas.trip import TripBase, TripCreate, TripUpdate, TripResponse, GroupTripCreate, GroupMemberAdd
from app.schemas.budget import BudgetCalculationRequest, BudgetBreakdownResponse, BudgetOptimizeRequest, BudgetOptimizeResponse
from app.schemas.hotel import HotelBase, HotelCreate, HotelResponse, HotelRecommendRequest, HotelCategoryRecommendation
from app.schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse
from app.schemas.packing import PackingGenerateRequest, PackingItemCreate, PackingItemUpdate, PackingItemResponse, PackingListCategorizedResponse
from app.schemas.expense import TripExpenseCreate, TripExpenseResponse, ExpenseSplitResponse
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

__all__ = [
    "UserRegister",
    "UserLogin",
    "UserResponse",
    "UserUpdate",
    "Token",
    "DestinationBase",
    "DestinationCreate",
    "DestinationUpdate",
    "DestinationResponse",
    "DestinationPagination",
    "ActivityBase",
    "ActivityCreate",
    "ActivityUpdate",
    "ActivityResponse",
    "ItineraryDayCreate",
    "ItineraryDayResponse",
    "TripBase",
    "TripCreate",
    "TripUpdate",
    "TripResponse",
    "GroupTripCreate",
    "GroupMemberAdd",
    "BudgetCalculationRequest",
    "BudgetBreakdownResponse",
    "BudgetOptimizeRequest",
    "BudgetOptimizeResponse",
    "HotelBase",
    "HotelCreate",
    "HotelResponse",
    "HotelRecommendRequest",
    "HotelCategoryRecommendation",
    "ReviewCreate",
    "ReviewUpdate",
    "ReviewResponse",
    "PackingGenerateRequest",
    "PackingItemCreate",
    "PackingItemUpdate",
    "PackingItemResponse",
    "PackingListCategorizedResponse",
    "TripExpenseCreate",
    "TripExpenseResponse",
    "ExpenseSplitResponse",
    "AIDestinationMatchRequest",
    "AIDestinationMatchResponse",
    "AITripGenerateRequest",
    "AITripGenerateResponse",
    "AIOptimizeRequest",
    "AIOptimizeResponse",
    "AIChatRequest",
    "AIChatResponse",
    "AIFoodRequest",
    "AIFoodResponse",
    "AICrowdRequest",
    "AICrowdResponse"
]
