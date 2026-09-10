import httpx
from typing import Dict, Any
from app.config import settings

class WeatherService:
    @staticmethod
    async def get_weather(city: str) -> Dict[str, Any]:
        """Fetch weather from OpenWeatherMap if key is provided, else return realistic mock data."""
        if settings.WEATHER_API_KEY:
            try:
                async with httpx.AsyncClient(timeout=5.0) as client:
                    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={settings.WEATHER_API_KEY}&units=metric"
                    res = await client.get(url)
                    if res.status_code == 200:
                        data = res.json()
                        temp = data.get("main", {}).get("temp", 25)
                        condition = data.get("weather", [{}])[0].get("main", "Clear")
                        humidity = data.get("main", {}).get("humidity", 60)
                        wind = data.get("wind", {}).get("speed", 12)
                        return {
                            "city": city,
                            "temperature": round(temp, 1),
                            "condition": condition,
                            "humidity": humidity,
                            "rain_probability": 40 if "Rain" in condition else 10,
                            "wind_speed_kmh": round(wind * 3.6, 1),
                            "is_mock": False,
                            "activity_advice": WeatherService._generate_advice(condition, temp)
                        }
            except Exception:
                pass

        # Fallback to realistic mock weather based on Indian destinations
        return WeatherService._mock_weather(city)

    @staticmethod
    def _mock_weather(city: str) -> Dict[str, Any]:
        c_lower = city.lower()
        if "araku" in c_lower:
            temp = 22.0
            condition = "Partly Cloudy"
            rain = 15
            humidity = 62
            wind = 12.0
        elif "vizag" in c_lower or "visakhapatnam" in c_lower:
            temp = 28.5
            condition = "Breezy Coastal"
            rain = 10
            humidity = 72
            wind = 22.0
        elif "goa" in c_lower:
            temp = 30.0
            condition = "Sunny"
            rain = 5
            humidity = 68
            wind = 14.0
        elif "kerala" in c_lower or "munnar" in c_lower:
            temp = 21.0
            condition = "Passing Showers"
            rain = 55
            humidity = 82
            wind = 16.0
        elif "kashmir" in c_lower:
            temp = 14.0
            condition = "Crisp & Clear"
            rain = 5
            humidity = 48
            wind = 9.0
        else:
            temp = 26.0
            condition = "Pleasant"
            rain = 10
            humidity = 58
            wind = 11.0

        return {
            "city": city,
            "temperature": temp,
            "condition": condition,
            "humidity": humidity,
            "rain_probability": rain,
            "wind_speed_kmh": wind,
            "is_mock": True,
            "activity_advice": WeatherService._generate_advice(condition, temp)
        }

    @staticmethod
    def _generate_advice(condition: str, temp: float) -> str:
        if "rain" in condition.lower() or "showers" in condition.lower():
            return "Rain is expected. AI recommends visiting covered museums, heritage tea factories or indoor cultural galleries instead of slippery waterfall trails."
        elif temp > 32:
            return "Warm midday sun forecast. AI recommends scheduling water sports and beach walks before 11:00 AM or after 4:00 PM."
        elif temp < 18:
            return "Cool mountain temperatures. Carry light thermal fleece layers for dawn viewpoints and evening campfires."
        else:
            return "Optimal weather conditions for both outdoor sightseeing and scenic transit."

weather_service = WeatherService()
