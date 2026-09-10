from fastapi import APIRouter, HTTPException, status
from typing import Dict, Any, List
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/weather", tags=["Weather"])


@router.get("/{city}")
async def get_city_weather(city: str) -> Dict[str, Any]:
    """
    Fetch current real-time or modeled weather forecast with AI-generated outdoor activity advisories.
    Supports OpenWeatherMap API key or automatic regional fallbacks.
    """
    if not city or not city.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="City name must not be blank"
        )

    weather = await WeatherService.get_weather(city.strip())
    
    # Also generate a 3-day forecast outlook
    base_temp = weather["temperature"]
    forecast = [
        {
            "day": "Day 1",
            "condition": weather["condition"],
            "temp_high": round(base_temp + 1.5, 1),
            "temp_low": round(base_temp - 4.0, 1),
            "rain_probability": weather["rain_probability"]
        },
        {
            "day": "Day 2",
            "condition": "Pleasant" if weather["rain_probability"] > 30 else weather["condition"],
            "temp_high": round(base_temp + 0.8, 1),
            "temp_low": round(base_temp - 3.5, 1),
            "rain_probability": max(5, weather["rain_probability"] - 15)
        },
        {
            "day": "Day 3",
            "condition": "Sunny & Clear",
            "temp_high": round(base_temp + 2.0, 1),
            "temp_low": round(base_temp - 3.0, 1),
            "rain_probability": 5
        }
    ]

    return {
        "success": True,
        "current": weather,
        "forecast": forecast
    }
