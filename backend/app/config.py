import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "TravelAI Backend"
    ENVIRONMENT: str = "development"
    API_V1_STR: str = "/api"

    # Database
    DATABASE_URL: str = "sqlite:///./travelai.db"

    # JWT Authentication
    SECRET_KEY: str = "travelai-super-secure-production-secret-key-2026-sih"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440 # 24 hours

    # External APIs
    AI_API_KEY: str = ""
    AI_PROVIDER: str = "gemini"
    WEATHER_API_KEY: str = ""
    MAPS_API_KEY: str = ""
    HOTEL_API_KEY: str = ""

    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow"
    )

    @property
    def cors_origin_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

settings = Settings()
