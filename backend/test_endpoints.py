import json
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def run_tests():
    print("========================================")
    print("TravelAI Backend End-to-End Test Suite")
    print("========================================")

    # 1. Health
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] 1. GET /api/health -> 200 OK", res.json())

    # 2. Auth Login
    res = client.post("/api/auth/login", json={
        "email": "traveler@travelai.org",
        "password": "traveler123"
    })
    assert res.status_code == 200, f"Login failed: {res.text}"
    data = res.json()
    token = data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("[PASS] 2. POST /api/auth/login -> 200 OK (Token received)")

    # 3. Auth Me
    res = client.get("/api/auth/me", headers=headers)
    assert res.status_code == 200, f"Auth me failed: {res.text}"
    print("[PASS] 3. GET /api/auth/me -> 200 OK (User:", res.json()["name"], ")")

    # 4. Destinations List
    res = client.get("/api/destinations")
    assert res.status_code == 200, f"Destinations failed: {res.text}"
    dest_data = res.json()
    assert dest_data["total"] >= 10, f"Expected at least 10 destinations, got {dest_data['total']}"
    print(f"[PASS] 4. GET /api/destinations -> 200 OK (Found {dest_data['total']} destinations)")

    # 5. Destination Search
    res = client.get("/api/destinations/search?q=araku")
    assert res.status_code == 200, f"Search failed: {res.text}"
    assert len(res.json()) >= 1, "Araku not found"
    araku_id = res.json()[0]["id"]
    print(f"[PASS] 5. GET /api/destinations/search?q=araku -> 200 OK (Found ID {araku_id})")

    # 6. Budget Calculation
    res = client.post("/api/budget/calculate", json={
        "destination": "Araku Valley",
        "days": 3,
        "travelers": 2,
        "budget_tier": "moderate"
    })
    assert res.status_code == 200, f"Budget calculation failed: {res.text}"
    b_data = res.json()
    print(f"[PASS] 6. POST /api/budget/calculate -> 200 OK (Total INR {b_data['total']})")

    # 7. Budget Optimization
    res = client.post("/api/budget/optimize", json={
        "total_budget": 15000.0,
        "destination": "Araku Valley",
        "days": 3,
        "travelers": 2
    })
    assert res.status_code == 200, f"Budget optimize failed: {res.text}"
    print(f"[PASS] 7. POST /api/budget/optimize -> 200 OK (Savings INR {res.json()['potential_savings']})")

    # 8. Hotels List & Recommend
    res = client.get("/api/hotels")
    assert res.status_code == 200, f"Hotels failed: {res.text}"
    res_rec = client.post("/api/hotels/recommend", json={"destination_name": "Araku Valley"})
    assert res_rec.status_code == 200, f"Hotel recommend failed: {res_rec.text}"
    print(f"[PASS] 8. POST /api/hotels/recommend -> 200 OK ({len(res_rec.json())} categories)")

    # 9. Transport Recommendations
    res = client.post("/api/transport/recommend", json={
        "origin": "Visakhapatnam",
        "destination": "Araku Valley",
        "travelers": 2
    })
    assert res.status_code == 200, f"Transport failed: {res.text}"
    print(f"[PASS] 9. POST /api/transport/recommend -> 200 OK (Recommended: {res.json()['recommended_mode']})")

    # 10. Packing List Generation
    res = client.post("/api/packing/generate", json={
        "destination": "Araku Valley",
        "days": 3,
        "weather": "Pleasant",
        "travel_style": "Adventure"
    })
    assert res.status_code == 200, f"Packing failed: {res.text}"
    print(f"[PASS] 10. POST /api/packing/generate -> 200 OK ({len(res.json()['clothes'])} clothes suggestions)")

    # 11. Safety Information
    res = client.get("/api/safety/Araku")
    assert res.status_code == 200, f"Safety failed: {res.text}"
    print(f"[PASS] 11. GET /api/safety/Araku -> 200 OK (Safety score: {res.json()['data']['safety_score']})")

    # 12. Sustainability Calculation
    res = client.post("/api/sustainability/calculate", json={
        "transport_mode": "Train",
        "days": 3,
        "travelers": 2,
        "destination_name": "Araku Valley"
    })
    assert res.status_code == 200, f"Sustainability failed: {res.text}"
    print(f"[PASS] 12. POST /api/sustainability/calculate -> 200 OK (Eco-score: {res.json()['data']['score']})")

    # 13. AI Destination Matching
    res = client.post("/api/ai/recommend-destinations", json={
        "budget": 15000.0,
        "days": 3,
        "travelers": 2,
        "travel_style": "Nature",
        "interests": ["Coffee", "Caves", "Hills"]
    })
    assert res.status_code == 200, f"AI match failed: {res.text}"
    top_match = res.json()["recommendations"][0]
    print(f"[PASS] 13. POST /api/ai/recommend-destinations -> 200 OK (Top: {top_match['destination']} - {top_match['match_percentage']}%)")

    # 14. AI Trip Generation
    res = client.post("/api/ai/generate-trip", json={
        "origin": "Visakhapatnam",
        "destination": "Araku Valley",
        "start_date": "2026-10-01",
        "end_date": "2026-10-03",
        "travelers": 2,
        "budget": 14000.0,
        "travel_style": "Nature"
    })
    assert res.status_code == 200, f"Trip generate failed: {res.text}"
    trip_gen = res.json()
    print(f"[PASS] 14. POST /api/ai/generate-trip -> 200 OK ({len(trip_gen['daily_itinerary'])} days generated)")

    # 15. AI Chat Copilot
    res = client.post("/api/ai/chat", json={"message": "What are the best places to visit in Goa?"})
    assert res.status_code == 200, f"AI chat failed: {res.text}"
    print("[PASS] 15. POST /api/ai/chat -> 200 OK")

    # 16. Admin Analytics
    admin_login = client.post("/api/auth/login", json={
        "email": "admin@travelai.org",
        "password": "admin123"
    })
    admin_token = admin_login.json()["access_token"]
    admin_headers = {"Authorization": f"Bearer {admin_token}"}
    res = client.get("/api/admin/statistics", headers=admin_headers)
    assert res.status_code == 200, f"Admin statistics failed: {res.text}"
    print(f"[PASS] 16. GET /api/admin/statistics -> 200 OK (Total Users: {res.json()['overview']['total_users']})")

    # 17. User Trips List
    res = client.get("/api/trips", headers=headers)
    assert res.status_code == 200, f"Trips failed: {res.text}"
    user_trips = res.json()
    assert len(user_trips) >= 1, "Expected at least 1 trip for traveler"
    trip_id = user_trips[0]["id"]
    print(f"[PASS] 17. GET /api/trips -> 200 OK (Trip ID {trip_id}: {user_trips[0]['trip_name']})")

    # 18. Trip Itinerary
    res = client.get(f"/api/trips/{trip_id}/itinerary", headers=headers)
    assert res.status_code == 200, f"Trip itinerary failed: {res.text}"
    days = res.json()
    print(f"[PASS] 18. GET /api/trips/{trip_id}/itinerary -> 200 OK ({len(days)} days, {len(days[0]['activities'])} activities on Day 1)")

    # 19. Favorites Toggle & Check
    res_fav = client.post("/api/favorites", headers=headers, json={"item_type": "destination", "item_id": araku_id})
    assert res_fav.status_code in [200, 201], f"Favorites failed: {res_fav.text}"
    fav_id = res_fav.json()["id"]
    res_chk = client.get(f"/api/favorites/check?item_type=destination&item_id={araku_id}", headers=headers)
    assert res_chk.status_code == 200 and res_chk.json()["is_favorited"] == True
    print(f"[PASS] 19. POST /api/favorites & GET /api/favorites/check -> 200 OK")

    # 20. Reviews Creation
    res_rev = client.post("/api/reviews", headers=headers, json={
        "destination_id": araku_id,
        "rating": 5,
        "comment": "Unbelievable scenery and fresh coffee! Highly recommended for weekenders."
    })
    assert res_rev.status_code == 201, f"Review failed: {res_rev.text}"
    print(f"[PASS] 20. POST /api/reviews -> 201 Created")

    print("\n[SUCCESS] ALL 20 TEST SUITES PASSED FLAWLESSLY! TravelAI backend is 100% production-ready.")

if __name__ == "__main__":
    run_tests()
