import logging
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import settings
from app.database.connection import engine, Base
from app.routers import (
    auth,
    users,
    destinations,
    trips,
    itinerary,
    budget,
    hotels,
    weather,
    transport,
    packing,
    safety,
    sustainability,
    favorites,
    reviews,
    ai,
    admin
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("travelai")

# Initialize database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TravelAI API",
    description="Tourism & Industry Innovation Through AI-Powered Travel Planning Backend API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS Configuration
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]
if not origins:
    origins = ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if "*" not in origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Standardized Error Handlers
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "status_code": exc.status_code,
            "message": exc.detail,
            "error": exc.detail
        }
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    formatted_errors = []
    for err in exc.errors():
        field = " -> ".join([str(loc) for loc in err.get("loc", [])])
        formatted_errors.append(f"{field}: {err.get('msg')}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "status_code": status.HTTP_422_UNPROCESSABLE_ENTITY,
            "message": "Request validation failed",
            "errors": formatted_errors,
            "details": exc.errors()
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled server error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": "An unexpected internal server error occurred",
            "error": str(exc)
        }
    )


# Health and Welcome Endpoints
@app.get("/", tags=["Health"])
def root():
    return {
        "service": "TravelAI Backend API",
        "tagline": "Plan smarter. Travel better. Explore more.",
        "status": "online",
        "documentation": "/docs"
    }


@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "TravelAI Backend",
        "version": "1.0.0",
        "database": "connected"
    }


# Include All 16 Modular Routers under /api
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(destinations.router, prefix="/api")
app.include_router(trips.router, prefix="/api")
app.include_router(itinerary.router, prefix="/api")
app.include_router(budget.router, prefix="/api")
app.include_router(hotels.router, prefix="/api")
app.include_router(weather.router, prefix="/api")
app.include_router(transport.router, prefix="/api")
app.include_router(packing.router, prefix="/api")
app.include_router(safety.router, prefix="/api")
app.include_router(sustainability.router, prefix="/api")
app.include_router(favorites.router, prefix="/api")
app.include_router(reviews.router, prefix="/api")
app.include_router(ai.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
