import { TripPlan, Destination } from '../types';
import { DESTINATIONS } from './destinations';
import { HOTELS } from './hotels';

const arakuDestination: Destination = DESTINATIONS.find(d => d.id === 'araku-valley') || DESTINATIONS[0];

export const DEMO_ARAKU_TRIP: TripPlan = {
  id: 'trip-demo-araku-2026',
  tripName: 'Misty Ghats & Coffee Trails: Araku Adventure',
  createdAt: '2026-09-10T10:00:00.000Z',
  destinationInfo: arakuDestination,
  request: {
    startingLocation: 'Visakhapatnam',
    destination: 'Araku Valley',
    startDate: '2026-10-15',
    endDate: '2026-10-17',
    durationDays: 3,
    travelers: 2,
    budgetTier: 'moderate',
    travelStyle: 'Adventure',
    interests: ['Mountains', 'Nature', 'Wildlife', 'Photography', 'Local food', 'Historical places'],
    foodPreference: 'Local Tribal & Traditional South Indian',
    accommodationPreference: 'Eco-Resort / Homestay',
    transportationPreference: 'Scenic Vistadome Train + Local Cab'
  },
  days: [
    {
      dayNumber: 1,
      title: 'Ghat Ascent, Panoramic Viewpoints & Tribal Culinary Feast',
      theme: 'Travel & Scenic Discovery',
      date: 'Day 1 (Arrival & Exploration)',
      dayStats: {
        totalCost: 4600,
        travelTime: '3h 15m scenic transit',
        carbonKg: 14.2
      },
      activities: [
        {
          id: 'a-101',
          period: 'Morning',
          time: '07:00 AM - 10:45 AM',
          activity: 'Scenic Vistadome Train Journey from Vizag through 58 Tunnels',
          location: 'Visakhapatnam Junction to Araku Station (Vistadome Coach EC)',
          estimatedCost: 1800,
          travelTime: '3h 30m',
          recommendedDuration: '3.5 Hours',
          aiReason: 'AI recommended the 07:00 AM Vistadome rail ride because the morning mist through the Ananthagiri hills offers 98% optimal lighting for photography and cuts carbon footprint by 64% vs road cabs.',
          coordinates: [18.2324, 83.0031],
          category: 'Scenic Transit',
          photoSpot: true,
          crowdLevel: 'Moderate',
          weatherSuitability: 'all-weather'
        },
        {
          id: 'a-102',
          period: 'Afternoon',
          time: '12:30 PM - 02:00 PM',
          activity: 'Traditional Bongu Chicken (Bamboo Chicken) & Ragi Sangati Lunch',
          location: 'Chaparai Village Tribal Food Stalls',
          estimatedCost: 750,
          travelTime: '20 mins',
          recommendedDuration: '1.5 Hours',
          aiReason: 'Zero-oil charcoal cooking technique inside forest bamboo shoots. Highly recommended by 96% of foodie travelers for authentic cultural taste.',
          coordinates: [18.2891, 82.8552],
          category: 'Local Food Experience',
          photoSpot: false,
          crowdLevel: 'Low',
          weatherSuitability: 'outdoor'
        },
        {
          id: 'a-103',
          period: 'Evening',
          time: '04:30 PM - 06:30 PM',
          activity: 'Galikonda Sunset Viewpoint (Highest point in Visakhapatnam District)',
          location: 'Galikonda Viewpoint, Araku Ghat Road (Elev: 4,340 ft)',
          estimatedCost: 150,
          travelTime: '25 mins',
          recommendedDuration: '2 Hours',
          aiReason: 'Peak sunset timing at 5:35 PM with unobstructed 360-degree mountain valley views and roadside herbal ginger tea stalls.',
          coordinates: [18.2755, 82.912],
          category: 'Sunset Viewpoint',
          photoSpot: true,
          crowdLevel: 'Moderate',
          weatherSuitability: 'outdoor'
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'Subterranean Wonders, Wild Waterfalls & Organic Coffee',
      theme: 'Nature Attractions & Cultural Heritage',
      date: 'Day 2 (Nature & Immersion)',
      dayStats: {
        totalCost: 5200,
        travelTime: '1h 45m local transit',
        carbonKg: 8.5
      },
      activities: [
        {
          id: 'a-201',
          period: 'Morning',
          time: '08:30 AM - 11:30 AM',
          activity: 'Million-Year-Old Borra Limestone Caves Exploration',
          location: 'Borra Caves, Ananthagiri Hills',
          estimatedCost: 800,
          travelTime: '40 mins',
          recommendedDuration: '3 Hours',
          aiReason: 'Naturally formed stalactite and stalagmite calcium formations illuminated with artistic eco-LED lighting. Morning visit avoids peak afternoon crowds by 72%.',
          coordinates: [18.2804, 83.0402],
          category: 'Geological Wonder',
          photoSpot: true,
          crowdLevel: 'Low',
          weatherSuitability: 'indoor'
        },
        {
          id: 'a-202',
          period: 'Afternoon',
          time: '01:00 PM - 03:30 PM',
          activity: 'Katiki Waterfalls Secret Jungle Trek & Freshwater Pool',
          location: 'Katiki Waterfalls (via 4x4 Jeep trail from Borra)',
          estimatedCost: 1200,
          travelTime: '30 mins',
          recommendedDuration: '2.5 Hours',
          aiReason: 'AI identifies this as a certified "Hidden Gem" - 50ft pristine cascade fed by Gosthani river. Natural mineral swimming pool and lush mountain flora.',
          coordinates: [18.293, 83.011],
          category: 'Adventure Trek',
          photoSpot: true,
          crowdLevel: 'Low',
          weatherSuitability: 'outdoor'
        },
        {
          id: 'a-203',
          period: 'Evening',
          time: '05:00 PM - 07:30 PM',
          activity: 'Araku Tribal Museum & Live Dhimsa Dance by Campfire',
          location: 'Padmapuram Area Tribal Cultural Center',
          estimatedCost: 450,
          travelTime: '20 mins',
          recommendedDuration: '2.5 Hours',
          aiReason: 'Interactive live community performance preserving indigenous folk music and dance. 100% of ticket proceeds support local tribal schooling cooperatives.',
          coordinates: [18.3312, 82.871],
          category: 'Cultural Immersion',
          photoSpot: true,
          crowdLevel: 'Moderate',
          weatherSuitability: 'all-weather'
        }
      ]
    },
    {
      dayNumber: 3,
      title: 'Highland Gardens, Coffee Plantation Tasting & Return Transit',
      theme: 'Adventure, Crafts & Departure',
      date: 'Day 3 (Wrap-up & Return)',
      dayStats: {
        totalCost: 4800,
        travelTime: '3h 30m return transit',
        carbonKg: 13.5
      },
      activities: [
        {
          id: 'a-301',
          period: 'Morning',
          time: '08:30 AM - 10:30 AM',
          activity: 'Padmapuram Treehouse Botanical Gardens Walk',
          location: 'Padmapuram Gardens, Araku',
          estimatedCost: 200,
          travelTime: '10 mins',
          recommendedDuration: '2 Hours',
          aiReason: 'Historical WW2 orchard featuring rare medicinal flora and hanging rope bridges. Ideal morning temperature at 21°C.',
          coordinates: [18.3341, 82.8682],
          category: 'Botanical Heritage',
          photoSpot: true,
          crowdLevel: 'Low',
          weatherSuitability: 'outdoor'
        },
        {
          id: 'a-302',
          period: 'Afternoon',
          time: '11:00 AM - 01:30 PM',
          activity: 'Coffee House Museum, Artisan Cupping & Tribal Handicrafts',
          location: 'Araku Coffee Museum, Station Road',
          estimatedCost: 1400,
          travelTime: '15 mins',
          recommendedDuration: '2.5 Hours',
          aiReason: 'Taste signature dark roast Arabica beans and purchase GI-certified Araku tribal roast coffee beans, honey, and hand-woven jute shawls.',
          coordinates: [18.3298, 82.873],
          category: 'Local Shopping & Tasting',
          photoSpot: true,
          crowdLevel: 'Moderate',
          weatherSuitability: 'indoor'
        },
        {
          id: 'a-303',
          period: 'Evening',
          time: '03:45 PM - 07:30 PM',
          activity: 'Scenic Mountain Drive & Return Descent to Visakhapatnam',
          location: 'Araku Valley to Vizag Central',
          estimatedCost: 2100,
          travelTime: '3h 30m',
          recommendedDuration: '3.5 Hours',
          aiReason: 'AI scheduled the descent before dusk to ensure optimal mountain road visibility and comfort after a 3-day high-altitude nature excursion.',
          coordinates: [17.721, 83.287],
          category: 'Return Transit',
          photoSpot: false,
          crowdLevel: 'Moderate',
          weatherSuitability: 'all-weather'
        }
      ]
    }
  ],
  budget: {
    transportation: 4500,
    accommodation: 4800, // 2 nights at eco-homestay
    food: 2800,
    activities: 2100,
    shopping: 1200,
    emergency: 600,
    total: 16000,
    currency: 'INR',
    savingsTips: [
      'Booking the morning Vistadome train saved ₹1,600 over private roundtrip taxi hire.',
      'Selecting the certified eco-homestay (Haritha/Green Valley) saved ₹1,400 compared to luxury boutique hotels.',
      'Enjoying bamboo chicken directly at village clusters reduced restaurant markups by 35%.'
    ]
  },
  hotels: [
    HOTELS[0], // Haritha Valley Resort
    HOTELS[1]  // Tyda Jungle Bells
  ],
  transportation: [
    {
      type: 'Train',
      name: 'Vistadome Hill Express (Vizag - Araku)',
      estimatedCost: 1800,
      travelTime: '3h 30m',
      comfortRating: 5,
      carbonEmissionKg: 12.4,
      isAiRecommended: true,
      aiReason: 'Lowest carbon footprint (70% lower than SUV) + panoramic glass roof scenic mountain view.'
    },
    {
      type: 'Car',
      name: 'Private SUV / Eco EV Cab',
      estimatedCost: 3800,
      travelTime: '3h 15m',
      comfortRating: 4,
      carbonEmissionKg: 38.0,
      aiReason: 'Flexible door-to-door schedule, higher budget required.'
    },
    {
      type: 'Bus',
      name: 'APSRTC Ghat Deluxe Super Luxury',
      estimatedCost: 550,
      travelTime: '4h 10m',
      comfortRating: 3,
      carbonEmissionKg: 15.0,
      aiReason: 'Best for extreme budget backpackers.'
    }
  ],
  packingList: [
    { id: 'p-1', name: 'Light jacket / fleece (Ghat evenings dip to 17°C)', category: 'clothes', checked: true, weatherReason: 'Pleasant mountain climate with cool breezes' },
    { id: 'p-2', name: 'Sturdy hiking boots with wet-rock grip (Caves & Falls)', category: 'clothes', checked: true },
    { id: 'p-3', name: 'Original Govt Photo ID & Train tickets', category: 'documents', checked: true },
    { id: 'p-4', name: 'High-capacity 20,000mAh Power Bank (remote signal battery drain)', category: 'electronics', checked: true },
    { id: 'p-5', name: 'Reusable BPA-free thermal water bottle (avoid single use plastic)', category: 'essentials', checked: true },
    { id: 'p-6', name: 'Biodegradable mosquito repellent lotion', category: 'health', checked: false },
    { id: 'p-7', name: 'DSLR / Mirrorless Camera + Lens cloth', category: 'electronics', checked: false },
    { id: 'p-8', name: 'Cash ₹2,000 in notes (Remote tribal stalls have patchy UPI/QR)', category: 'essentials', checked: true },
    { id: 'p-9', name: 'Light rain poncho / compact umbrella', category: 'clothes', checked: false, weatherReason: '15% rain probability in Eastern Ghat valleys' }
  ],
  sustainabilityScore: 92,
  carbonKg: 36.2,
  carbonSavedKg: 28.5,
  safety: {
    destinationId: 'araku-valley',
    destinationName: 'Araku Valley & Borra Caves',
    emergencyContacts: [
      { label: 'Tourist Police Helpdesk (Araku)', number: '08936-249622', notes: 'Station Road, 24/7' },
      { label: 'National Emergency Helpline', number: '112', notes: 'Toll-free emergency response' },
      { label: 'Government Area Hospital (Araku)', number: '08936-249633', notes: 'Emergency trauma & medical services' },
      { label: 'AP Tourism 24x7 Information Center', number: '1800-425-45454', notes: 'Verified tours & transport assistance' }
    ],
    nearestHospitals: [
      { name: 'Araku Community Health Center', distance: '1.4 km', contact: '+91 8936-249633' },
      { name: 'King George Hospital (KGH Vizag)', distance: '110 km (Air ambulance & Super-specialty)', contact: '+91 891-2564891' }
    ],
    alerts: [
      'Ghat road fog can reduce visibility between 6:00 AM and 8:00 AM; drivers advised to use low-beam fog lights.',
      'Borra Caves steps can be slippery due to natural calcium dripping; wear shoes with rubber soles.'
    ],
    localTips: [
      'Respect indigenous tribal privacy: always request verbal consent before photographing community elders.',
      'Avoid single-use plastic bottles; refill at Haritha eco-water stations.'
    ],
    documentChecklist: ['Aadhar Card / Passport', 'Train e-ticket (IRCTC)', 'Hotel voucher', 'Medical insurance card']
  }
};
