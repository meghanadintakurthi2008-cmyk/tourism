import datetime
from sqlalchemy.orm import Session
from app.database.connection import SessionLocal, engine, Base
from app.database.models import (
    User,
    Destination,
    Hotel,
    Review,
    Trip,
    ItineraryDay,
    ItineraryActivity,
    PackingItem,
    TravelPreference
)
from app.utils.security import hash_password


def seed_database():
    print("[INFO] Initializing TravelAI database tables...")
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()

    try:
        # 1. Seed Users
        print("[INFO] Seeding initial users...")
        admin_user = db.query(User).filter(User.email == "admin@travelai.org").first()
        if not admin_user:
            admin_user = User(
                name="TravelAI Admin",
                email="admin@travelai.org",
                hashed_password=hash_password("admin123"),
                role="admin"
            )
            db.add(admin_user)

        traveler_user = db.query(User).filter(User.email == "traveler@travelai.org").first()
        if not traveler_user:
            traveler_user = User(
                name="Rahul Sharma",
                email="traveler@travelai.org",
                hashed_password=hash_password("traveler123"),
                role="traveler"
            )
            db.add(traveler_user)

        priya_user = db.query(User).filter(User.email == "priya@travelai.org").first()
        if not priya_user:
            priya_user = User(
                name="Priya Patel",
                email="priya@travelai.org",
                hashed_password=hash_password("traveler123"),
                role="traveler"
            )
            db.add(priya_user)

        db.commit()
        db.refresh(admin_user)
        db.refresh(traveler_user)
        db.refresh(priya_user)

        # Traveler Preferences
        if not traveler_user.preferences:
            pref = TravelPreference(
                user_id=traveler_user.id,
                food_preference="Traditional & Tribal",
                accommodation_preference="Eco-Resort",
                transport_preference="Scenic Train",
                interests="Nature, Photography, Coffee Plantations, Trekking",
                budget_tier="moderate"
            )
            db.add(pref)
            db.commit()

        # 2. Seed Destinations (10 Top Indian Destinations)
        print("[INFO] Seeding rich Indian destinations catalog...")
        destinations_data = [
            {
                "name": "Araku Valley",
                "country": "India",
                "state": "Andhra Pradesh",
                "description": "A tranquil hill station nestled in the Eastern Ghats, celebrated for its sprawling Arabica coffee plantations, million-year-old limestone Borra caves, cascading Katiki waterfalls, and vibrant tribal culture.",
                "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                "best_time": "October to March",
                "average_budget": 12500.0,
                "travel_style": "Nature, Adventure, Cultural",
                "rating": 4.8,
                "latitude": 18.3273,
                "longitude": 82.8775,
                "tags": "Hills, Coffee, Caves, Waterfalls, Tribal Culture, Vistadome Train, Eco-Tourism",
                "hidden_gems": "Katiki Hidden Jungle Cascades; Galikonda Peak (4,340 ft sunrise viewpoint); Madugula 100-year halwa makeries; Chaparai forest stream",
                "local_foods": "Bongu Lo Chicken (charcoal bamboo roasted); Fresh Roasted Araku Arabica Coffee; Madugula Halwa; Ragi Sangati with Natukodi Pulusu",
                "sustainability_score": 94
            },
            {
                "name": "Visakhapatnam (Vizag)",
                "country": "India",
                "state": "Andhra Pradesh",
                "description": "The 'Jewel of the East Coast' where verdant Eastern Ghats hills kiss pristine Bay of Bengal shores. Famous for Rushikonda Beach, INS Kursura Submarine Museum, and hilltop ropeways.",
                "image_url": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
                "best_time": "October to March",
                "average_budget": 14000.0,
                "travel_style": "Coastal, Heritage, Adventure",
                "rating": 4.7,
                "latitude": 17.6868,
                "longitude": 83.2185,
                "tags": "Beaches, Submarine Museum, Kailasagiri, Coastal Food, Water Sports",
                "hidden_gems": "Yarada Secluded Bay; Thotlakonda Buddhist Monastic Ruins; Matsyadarshini Aquarium; Dolphin's Nose Lighthouse trail",
                "local_foods": "Royyala Iguru (Spicy Prawn Curry); Beachside Hot Punugulu; Andhra Crab Fry; Gongura Mamsam",
                "sustainability_score": 88
            },
            {
                "name": "Goa",
                "country": "India",
                "state": "Goa",
                "description": "Sun-drenched golden coastline, vibrant Portuguese heritage villas in Fontainhas, serene backwaters of Chapora, spice plantations, and historic UNESCO churches of Velha Goa.",
                "image_url": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
                "best_time": "November to February",
                "average_budget": 22000.0,
                "travel_style": "Coastal, Heritage, Leisure",
                "rating": 4.7,
                "latitude": 15.2993,
                "longitude": 74.1240,
                "tags": "Beaches, Heritage, Portuguese Architecture, Seafood, Nightlife, Waterfalls",
                "hidden_gems": "Kakolem Tiger Beach; Fontainhas Latin Quarter early dawn walking trail; Divar Island cycling loop; Cabo de Rama Fort sunset",
                "local_foods": "Goan Fish Curry Thali; Bebinca Layer Cake; Prawn Balchão; Poi with Chorizo",
                "sustainability_score": 82
            },
            {
                "name": "Munnar & Kerala Backwaters",
                "country": "India",
                "state": "Kerala",
                "description": "'God's Own Country' wonderland featuring emerald rolling tea estates in Munnar, silent backwater lagoons navigated by solar houseboats in Alleppey, and world-renowned Ayurvedic healing.",
                "image_url": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
                "best_time": "September to March",
                "average_budget": 18500.0,
                "travel_style": "Nature, Wellness, Romantic",
                "rating": 4.9,
                "latitude": 10.0889,
                "longitude": 77.0595,
                "tags": "Tea Estates, Backwaters, Houseboats, Ayurveda, Waterfalls, Wildlife",
                "hidden_gems": "Kolukkumalai (World's highest organic tea estate); Marayoor sandalwood forest dolmens; Pathiramanal bird sanctuary",
                "local_foods": "Appam with Vegetable Ishtu; Karimeen Pollichathu (Pearl Spot Fish); Kerala Sadya; Banana Chips in coconut oil",
                "sustainability_score": 96
            },
            {
                "name": "Gulmarg & Srinagar",
                "country": "India",
                "state": "Jammu & Kashmir",
                "description": "'Paradise on Earth' blessed with snow-draped Himalayan peaks, shimmering Dal Lake shikaras, cedar-fringed alpine meadows, and Asia's highest cable car gondola.",
                "image_url": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80",
                "best_time": "April to October (Gardens), Dec to Feb (Snow)",
                "average_budget": 26000.0,
                "travel_style": "Snow, Romantic, Adventure",
                "rating": 4.9,
                "latitude": 34.0484,
                "longitude": 74.3805,
                "tags": "Snow, Dal Lake, Shikara, Gondola, Mountains, Handicrafts, Saffron",
                "hidden_gems": "Apharwat Peak high-altitude frozen lake; Floating vegetable market at 5 AM; Naranag ancient stone temple ruins",
                "local_foods": "Kashmiri Wazwan (Rogan Josh & Gushtaba); Traditional Kahwa Green Tea with saffron & crushed almonds; Sheermal",
                "sustainability_score": 86
            },
            {
                "name": "Jaipur & Udaipur",
                "country": "India",
                "state": "Rajasthan",
                "description": "The royal soul of India showcasing the pink terracotta ramparts of Amer Fort, Hawa Mahal, and the floating marble palaces upon Lake Pichola.",
                "image_url": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
                "best_time": "October to March",
                "average_budget": 19500.0,
                "travel_style": "Heritage, Luxury, Cultural",
                "rating": 4.8,
                "latitude": 26.9124,
                "longitude": 75.7873,
                "tags": "Palaces, Forts, Royalty, Desert, Handloom, Heritage Havelis",
                "hidden_gems": "Chand Baori stepwell in Abhaneri; Nahargarh Fort stepwell at twilight; Bagore Ki Haveli puppet dance",
                "local_foods": "Dal Baati Churma; Laal Maas (Smoked red chili curry); Ghewar; Pyaaz Kachori",
                "sustainability_score": 84
            },
            {
                "name": "Hyderabad",
                "country": "India",
                "state": "Telangana",
                "description": "The City of Pearls, where grand Nizami architecture like Charminar and Golconda Fort blends seamlessly with India's high-tech cyber corridors and legendary culinary traditions.",
                "image_url": "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80",
                "best_time": "October to February",
                "average_budget": 11500.0,
                "travel_style": "Heritage, Culinary, Urban",
                "rating": 4.6,
                "latitude": 17.3850,
                "longitude": 78.4867,
                "tags": "Biryani, Charminar, Golconda, Nizami Palaces, Cyber City, Pearls",
                "hidden_gems": "Qutb Shahi royal heritage tombs; Chowmahalla vintage car collection; Paigah Palace stucco work",
                "local_foods": "Hyderabadi Dum Biryani; Haleem; Double Ka Meetha; Irani Chai with Osmania Biscuits",
                "sustainability_score": 85
            },
            {
                "name": "Vijayawada & Amaravati",
                "country": "India",
                "state": "Andhra Pradesh",
                "description": "Spiritual and commercial heart on the banks of Krishna River, home to sacred Kanaka Durga Temple, ancient 4th-century Undavalli rock-cut cave shrines, and Prakasam Barrage.",
                "image_url": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
                "best_time": "November to February",
                "average_budget": 9500.0,
                "travel_style": "Spiritual, Heritage, Riverine",
                "rating": 4.5,
                "latitude": 16.5062,
                "longitude": 80.6480,
                "tags": "Krishna River, Undavalli Caves, Kanaka Durga, Barrage, Buddhist Heritage",
                "hidden_gems": "Undavalli 4-storey monolith rock cave sanctuary; Bhavani Island water recreation; Kondapalli wooden toy artisan village",
                "local_foods": "Kondapalli Chicken Pulao; Ulava Charu; Mirchi Bajji on Krishna River bund; Putharekulu sweet rice sheets",
                "sustainability_score": 89
            },
            {
                "name": "Ooty (Udhagamandalam)",
                "country": "India",
                "state": "Tamil Nadu",
                "description": "'Queen of Hill Stations' perched at 7,350 ft amidst the Nilgiri Blue Mountains. Featuring UNESCO steam toy train, vast botanical nurseries, eucalyptus groves, and Doddabetta Peak.",
                "image_url": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
                "best_time": "October to June",
                "average_budget": 15000.0,
                "travel_style": "Hills, Nature, Heritage",
                "rating": 4.7,
                "latitude": 11.4102,
                "longitude": 76.6950,
                "tags": "Nilgiri Mountain Railway, Tea Gardens, Botanical Gardens, Lakes, Waterfalls",
                "hidden_gems": "Avalanche Lake silent valley; Toda indigenous tribal hamlet huts; Pine Forest cinematic glade",
                "local_foods": "Nilgiri Roasted Tea; Homemade Dark Chocolates; Ooty Varkey puff pastries; Fresh forest berry jams",
                "sustainability_score": 93
            },
            {
                "name": "Tirupati & Tirumala",
                "country": "India",
                "state": "Andhra Pradesh",
                "description": "The sacred Seshachalam hill range housing the ancient temple of Lord Venkateswara, alongside pristine Silathoranam natural stone arch geological wonders and Kapilatheertham waterfalls.",
                "image_url": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
                "best_time": "September to February",
                "average_budget": 8500.0,
                "travel_style": "Spiritual, Geological, Nature",
                "rating": 4.9,
                "latitude": 13.6288,
                "longitude": 79.4192,
                "tags": "Tirumala, Pilgrimage, Natural Geological Arch, Waterfalls, Hill Shrine",
                "hidden_gems": "Silathoranam 2.5-billion-year-old natural rock arch; Srivari Mettu traditional stone steps pilgrimage trail; Talakona cascading waterfall in forest reserve",
                "local_foods": "Authentic Tirupati Laddu prasadam; Traditional curd rice with mango pickle; Gongura pulusu",
                "sustainability_score": 91
            }
        ]

        dest_objs = {}
        for d in destinations_data:
            existing = db.query(Destination).filter(Destination.name == d["name"]).first()
            if not existing:
                dest = Destination(**d)
                db.add(dest)
                db.commit()
                db.refresh(dest)
                dest_objs[d["name"]] = dest
            else:
                dest_objs[d["name"]] = existing

        # 3. Seed Hotels
        print("[INFO] Seeding curated hotel recommendations...")
        araku_dest = dest_objs.get("Araku Valley")
        goa_dest = dest_objs.get("Goa")
        vizag_dest = dest_objs.get("Visakhapatnam (Vizag)")

        hotels_data = [
            # Araku Hotels
            {
                "name": "Haritha Valley Resort (APTDC)",
                "destination_id": araku_dest.id,
                "price_per_night": 2800.0,
                "rating": 4.6,
                "description": "Surrounded by lush coffee estates and misty peaks. Features tribal Dhimsa dance evenings and solar heated water.",
                "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
                "latitude": 18.332,
                "longitude": 82.880,
                "facilities": "Free Breakfast, Mountain View Balcony, Hot Water, Bonfire, WiFi, Doctor on Call",
                "category": "Best Value",
                "eco_certified": True,
                "ai_score": 9.4
            },
            {
                "name": "Hill View Luxury Valley Eco Cottages",
                "destination_id": araku_dest.id,
                "price_per_night": 4500.0,
                "rating": 4.8,
                "description": "Private wood cabins perched overlooking Galikonda valley ridge with farm-to-table organic dining.",
                "image_url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
                "latitude": 18.340,
                "longitude": 82.890,
                "facilities": "Organic Dining, Spa, Stargazing Deck, Free WiFi, Solar Power, Room Service",
                "category": "Best Rated",
                "eco_certified": True,
                "ai_score": 9.7
            },
            {
                "name": "Tribal Heritage Homestay Araku",
                "destination_id": araku_dest.id,
                "price_per_night": 1400.0,
                "rating": 4.5,
                "description": "Cozy family-run homestay close to Araku railway station and tribal handicraft street.",
                "image_url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
                "latitude": 18.325,
                "longitude": 82.875,
                "facilities": "Home-cooked Food, Hot Water, Guided Village Walk, Free Parking",
                "category": "Budget Friendly",
                "eco_certified": True,
                "ai_score": 9.1
            },
            # Goa Hotels
            {
                "name": "Fontainhas Heritage Boutique Villa",
                "destination_id": goa_dest.id,
                "price_per_night": 5200.0,
                "rating": 4.9,
                "description": "18th-century restored Portuguese mansion in the Latin Quarter with courtyard cafe.",
                "image_url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
                "latitude": 15.498,
                "longitude": 73.832,
                "facilities": "Art Gallery, Portuguese Breakfast, High-Speed WiFi, Air Conditioning, Bicycle Rentals",
                "category": "Best Rated",
                "eco_certified": True,
                "ai_score": 9.6
            },
            {
                "name": "Palolem Green Beach Bungalows",
                "destination_id": goa_dest.id,
                "price_per_night": 2400.0,
                "rating": 4.6,
                "description": "Eco-friendly wooden huts 50 meters from gentle swimming waters of South Goa.",
                "image_url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
                "latitude": 15.010,
                "longitude": 74.020,
                "facilities": "Beach Access, Yoga Shala, Sea View Balcony, Seafood Shack, WiFi",
                "category": "Best Value",
                "eco_certified": True,
                "ai_score": 9.3
            },
            # Vizag Hotels
            {
                "name": "Novotel Varun Beach Visakhapatnam",
                "destination_id": vizag_dest.id,
                "price_per_night": 7200.0,
                "rating": 4.8,
                "description": "Panoramic oceanfront luxury hotel directly on RK Beach with rooftop infinity pool.",
                "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
                "latitude": 17.712,
                "longitude": 83.315,
                "facilities": "Infinity Pool, Sea View Rooms, Multi-Cuisine Dining, Gym, Spa, Executive Lounge",
                "category": "Best Rated",
                "eco_certified": False,
                "ai_score": 9.5
            },
            {
                "name": "Haritha Beach Resort Rushikonda",
                "destination_id": vizag_dest.id,
                "price_per_night": 2600.0,
                "rating": 4.4,
                "description": "Andhra Tourism seaside property on the hillock overlooking Rushikonda Blue Flag Beach.",
                "image_url": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
                "latitude": 17.785,
                "longitude": 83.385,
                "facilities": "Beach Access, Restaurant, Free Parking, Air Conditioning",
                "category": "Best Value",
                "eco_certified": True,
                "ai_score": 9.0
            }
        ]

        for h in hotels_data:
            exists = db.query(Hotel).filter(Hotel.name == h["name"]).first()
            if not exists:
                db.add(Hotel(**h))
        db.commit()

        # 4. Seed Reviews
        print("[INFO] Seeding verified traveler reviews...")
        reviews_data = [
            {
                "user_id": traveler_user.id,
                "destination_id": araku_dest.id,
                "rating": 5,
                "comment": "The Vistadome train journey from Vizag to Araku through 84 tunnels was unforgettable! The Borra Caves are breathtaking, and Bongu Bamboo Chicken cooked on coal is a 10/10 culinary adventure."
            },
            {
                "user_id": priya_user.id,
                "destination_id": araku_dest.id,
                "rating": 5,
                "comment": "Araku Arabica coffee straight from the tribal plantation is heavenly. Highly recommend hiring an eco guide for Katiki falls early in the morning before crowds arrive!"
            },
            {
                "user_id": traveler_user.id,
                "destination_id": goa_dest.id,
                "rating": 5,
                "comment": "Fontainhas Latin Quarter was gorgeous. We cycled around Divar island and had the most serene vacation away from north Goa traffic."
            }
        ]
        for r in reviews_data:
            exists = db.query(Review).filter(
                Review.user_id == r["user_id"],
                Review.destination_id == r["destination_id"]
            ).first()
            if not exists:
                db.add(Review(**r))
        db.commit()

        # 5. Seed Example User Trip (Araku Valley 3-Day Expedition)
        print("[INFO] Seeding sample 3-day trip with itinerary and activities...")
        sample_trip = db.query(Trip).filter(Trip.user_id == traveler_user.id, Trip.trip_name == "Araku Valley Nature & Coffee Expedition").first()
        if not sample_trip:
            sample_trip = Trip(
                user_id=traveler_user.id,
                destination_id=araku_dest.id,
                trip_name="Araku Valley Nature & Coffee Expedition",
                start_date=str(datetime.date.today() + datetime.timedelta(days=7)),
                end_date=str(datetime.date.today() + datetime.timedelta(days=9)),
                travelers=2,
                budget=14000.0,
                travel_style="Nature & Adventure",
                status="planned",
                sustainability_score=94,
                carbon_footprint_kg=24.0,
                notes="Board Vistadome morning train; carry power bank and hiking boots."
            )
            db.add(sample_trip)
            db.commit()
            db.refresh(sample_trip)

            # Seed 3 Itinerary Days
            day1 = ItineraryDay(trip_id=sample_trip.id, day_number=1, date=sample_trip.start_date, title="Scenic Vistadome Arrival & Borra Caves")
            day2 = ItineraryDay(trip_id=sample_trip.id, day_number=2, date=str(datetime.date.today() + datetime.timedelta(days=8)), title="Jungle Cascades & Coffee Cupping")
            day3 = ItineraryDay(trip_id=sample_trip.id, day_number=3, date=sample_trip.end_date, title="Hanging Gardens & Tribal Crafts")
            db.add_all([day1, day2, day3])
            db.commit()
            db.refresh(day1)
            db.refresh(day2)
            db.refresh(day3)

            # Day 1 Activities
            act1 = ItineraryActivity(
                itinerary_day_id=day1.id,
                name="Vistadome Scenic Rail through Eastern Ghats",
                description="Iconic glass-domed train journey traversing 84 mountain tunnels and 58 bridges.",
                location="Visakhapatnam Junction to Borra Guhalu",
                start_time="07:00 AM",
                end_time="10:15 AM",
                estimated_cost=1500.0,
                duration="3h 15m",
                travel_time="Direct Train",
                latitude=18.280,
                longitude=83.040,
                crowd_level="Moderate",
                ai_reason="Morning departure captures morning mist across Eastern Ghat gorges.",
                photo_spot=True
            )
            act2 = ItineraryActivity(
                itinerary_day_id=day1.id,
                name="Borra Million-Year Limestone Caves",
                description="One of the largest cave formations in India with illuminated stalactites and stalagmites.",
                location="Ananthagiri Hills, Borra",
                start_time="11:00 AM",
                end_time="01:30 PM",
                estimated_cost=400.0,
                duration="2.5 Hours",
                travel_time="10 mins",
                latitude=18.281,
                longitude=83.041,
                crowd_level="Moderate",
                ai_reason="Natural cool underground microclimate during midday hours.",
                photo_spot=True
            )
            act3 = ItineraryActivity(
                itinerary_day_id=day1.id,
                name="Authentic Bamboo Chicken Tasting at Chaparai",
                description="Zero-oil chicken marinated in regional spices and slow-roasted inside green forest bamboo stems.",
                location="Chaparai Waterfalls Food Enclave",
                start_time="02:00 PM",
                end_time="03:30 PM",
                estimated_cost=700.0,
                duration="1.5 Hours",
                travel_time="25 mins",
                latitude=18.310,
                longitude=82.850,
                crowd_level="Low",
                ai_reason="Traditional tribal culinary signature of the Araku valley.",
                photo_spot=False
            )
            db.add_all([act1, act2, act3])

            # Packing Items
            packing_items = [
                PackingItem(trip_id=sample_trip.id, name="Light fleece jacket for cool evenings", category="clothes", is_checked=True),
                PackingItem(trip_id=sample_trip.id, name="Sturdy hiking sneakers with wet-rock grip", category="shoes", is_checked=True),
                PackingItem(trip_id=sample_trip.id, name="20,000mAh Power Bank", category="electronics", is_checked=False),
                PackingItem(trip_id=sample_trip.id, name="Biodegradable mosquito repellent", category="health", is_checked=False),
                PackingItem(trip_id=sample_trip.id, name="Original Government Photo ID", category="documents", is_checked=True)
            ]
            db.add_all(packing_items)
            db.commit()

        print("[SUCCESS] TravelAI database seeded successfully with 10 destinations, hotels, reviews, and test users!")

    except Exception as e:
        print(f"[ERROR] Error seeding database: {e}")
        db.rollback()
        raise e
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
