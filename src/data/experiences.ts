export interface ExperienceItem {
  id: string;
  title: string;
  category: 'Local Food' | 'Traditional Festival' | 'Local Market' | 'Handicraft' | 'Cultural Activity' | 'Hidden Gem';
  destinationId: string;
  destinationName: string;
  description: string;
  image: string;
  duration: string;
  estimatedCost: string;
  insiderTip: string;
  rating: number;
}

export const LOCAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Authentic Bongu Chicken (Bamboo Chicken) Cooking',
    category: 'Local Food',
    destinationId: 'araku-valley',
    destinationName: 'Araku Valley',
    description: 'Learn how indigenous Valmiki & Kondh tribes marinate farm-fresh country chicken with wild forest herbs, seal it inside raw green bamboo stems, and charcoal-roast it without oil or water.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    duration: '1.5 Hours',
    estimatedCost: '₹350 per portion',
    insiderTip: 'Try it right near Chaparai waterfall where tribal cooks use freshly harvested mountain bamboo.',
    rating: 4.9
  },
  {
    id: 'exp-2',
    title: 'Araku Organic Arabica Coffee Cupping & Roasting',
    category: 'Cultural Activity',
    destinationId: 'araku-valley',
    destinationName: 'Araku Valley',
    description: 'Walk through shade-grown tribal coffee plantations under silver oak trees, learn artisanal cherry pulping, and taste three distinct roasts of award-winning Araku Arabica.',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    duration: '2 Hours',
    estimatedCost: '₹200 per person',
    insiderTip: 'Buy whole bean medium roast coffee directly from the cooperative to support tribal farmers.',
    rating: 4.8
  },
  {
    id: 'exp-3',
    title: 'Katiki Waterfalls Hidden Jungle Pool',
    category: 'Hidden Gem',
    destinationId: 'araku-valley',
    destinationName: 'Araku Valley',
    description: 'A secluded 50-foot natural cascade fed by the Gosthani River, reached via a rugged jeep trail and 20-minute trek through untouched canopies of wild bamboo.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    duration: '3 Hours',
    estimatedCost: '₹250 (Jeep ride split)',
    insiderTip: 'Go early in the morning around 8:00 AM before tourist jeeps arrive to experience pure tranquility.',
    rating: 4.9
  },
  {
    id: 'exp-4',
    title: 'Dhimsa Tribal Dance & Campfire Evening',
    category: 'Traditional Festival',
    destinationId: 'araku-valley',
    destinationName: 'Araku Valley',
    description: 'Join local villagers performing the energetic Dhimsa folk dance, dressed in colorful sarees with brass ornaments to the rhythm of Mori and Thadalu drums.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    duration: '1 Hour',
    estimatedCost: 'Free / Resort included',
    insiderTip: 'Tribes welcome travelers to dance along with the circular chain; no prior dance skill needed!',
    rating: 4.7
  },
  {
    id: 'exp-5',
    title: 'Erra Matti Dibbalu - Red Sand Coastal Canyon',
    category: 'Hidden Gem',
    destinationId: 'visakhapatnam',
    destinationName: 'Visakhapatnam',
    description: 'A rare quaternary geological formation of deep red sand dunes located between Vizag and Bheemunipatnam, dating back millions of years.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    duration: '2 Hours',
    estimatedCost: 'Free entry',
    insiderTip: 'Golden hour at 5:00 PM creates stunning fiery red hues against the blue Bay of Bengal.',
    rating: 4.8
  },
  {
    id: 'exp-6',
    title: 'Kondapalli Wooden Toy Craft Workshop',
    category: 'Handicraft',
    destinationId: 'vijayawada',
    destinationName: 'Vijayawada',
    description: 'Watch master artisans shape soft Tella Poniki softwood into iconic Raja-Rani figurines, Ambari elephants, and village folk toys with natural tamarind gum colors.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    duration: '2 Hours',
    estimatedCost: '₹300 - ₹800 souvenirs',
    insiderTip: 'Purchasing GI-tagged Kondapalli toys supports a 400-year-old artisan community.',
    rating: 4.9
  }
];
