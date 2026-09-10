import { Hotel } from '../types';

export const HOTELS: Hotel[] = [
  // Araku Valley
  {
    id: 'h-araku-1',
    name: 'Haritha Valley Resort (APTDC)',
    destinationId: 'araku-valley',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 2800,
    rating: 4.6,
    reviewsCount: 380,
    distance: '0.8 km from Araku Railway Station',
    facilities: ['Free Breakfast', 'Garden Balcony', 'Tribal Dance Arena', 'Bonfire', 'Room Service'],
    aiScore: 9.4,
    category: 'Best Value',
    ecoCertified: true,
    location: 'Near Padmapuram Gardens, Araku'
  },
  {
    id: 'h-araku-2',
    name: 'Tyda Jungle Bells Eco-Resort',
    destinationId: 'araku-valley',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 3500,
    rating: 4.8,
    reviewsCount: 290,
    distance: '18 km from Borra Caves',
    facilities: ['Log Huts', 'Bird Watching Trails', 'Forest Dining', 'Campfire', 'Trekking Guide'],
    aiScore: 9.6,
    category: 'Best Rated',
    ecoCertified: true,
    location: 'Tyda Eastern Ghats Forest'
  },
  {
    id: 'h-araku-3',
    name: 'Green Valley Coffee Homestay',
    destinationId: 'araku-valley',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 1600,
    rating: 4.4,
    reviewsCount: 165,
    distance: '1.2 km from Coffee Museum',
    facilities: ['Homecooked Bamboo Meals', 'Plantation Tour', 'Free Wi-Fi', 'Solar Heated Water'],
    aiScore: 9.1,
    category: 'Budget Friendly',
    ecoCertified: true,
    location: 'Coffee Estate Road, Araku'
  },

  // Visakhapatnam
  {
    id: 'h-vizag-1',
    name: 'The Gateway Hotel Beach Road',
    destinationId: 'visakhapatnam',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 5500,
    rating: 4.7,
    reviewsCount: 710,
    distance: '0.2 km from RK Beach',
    facilities: ['Ocean View Pool', 'Seafood Restaurant', 'Gym & Spa', 'Airport Shuttle'],
    aiScore: 9.3,
    category: 'Luxury Resort',
    ecoCertified: false,
    location: 'Beach Road, Vizag'
  },
  {
    id: 'h-vizag-2',
    name: 'Seabreeze Comfort Inn',
    destinationId: 'visakhapatnam',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 2100,
    rating: 4.5,
    reviewsCount: 420,
    distance: '0.5 km from Submarine Museum',
    facilities: ['Free High-Speed Wi-Fi', 'Buffet Breakfast', 'Travel Desk', 'AC Rooms'],
    aiScore: 9.2,
    category: 'Best Value',
    ecoCertified: true,
    location: 'Ramakrishna Beach, Vizag'
  },

  // Goa
  {
    id: 'h-goa-1',
    name: 'Heritage Village Resort & Spa',
    destinationId: 'goa',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 6200,
    rating: 4.9,
    reviewsCount: 940,
    distance: '200m from Arossim Beach',
    facilities: ['Ayurvedic Spa', 'Outdoor Pool', 'Live Fado Music', 'Beach Shuttle', 'Eco-Waste System'],
    aiScore: 9.7,
    category: 'Best Rated',
    ecoCertified: true,
    location: 'South Goa'
  },
  {
    id: 'h-goa-2',
    name: 'Zostel Backpacker Beachside',
    destinationId: 'goa',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 1200,
    rating: 4.6,
    reviewsCount: 1250,
    distance: '300m from Morjim Beach',
    facilities: ['Co-working Space', 'Rooftop Cafe', 'Community Kitchen', 'Bicycle Rental'],
    aiScore: 9.5,
    category: 'Budget Friendly',
    ecoCertified: true,
    location: 'Morjim, North Goa'
  },

  // Kerala
  {
    id: 'h-kerala-1',
    name: 'Spice Valley Eco Lodge Munnar',
    destinationId: 'kerala-munnar',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 3900,
    rating: 4.8,
    reviewsCount: 520,
    distance: '2.5 km from Mattupetty Dam',
    facilities: ['Tea Garden Balcony', 'Organic Farm-to-table', 'Campfire', 'Solar Powered'],
    aiScore: 9.5,
    category: 'Best Value',
    ecoCertified: true,
    location: 'Old Munnar Valley'
  }
];
