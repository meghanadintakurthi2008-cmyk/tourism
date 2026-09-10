export interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Breezy' | 'Mist';
  rainProbability: number;
  humidity: number;
  windSpeedKmH: number;
  uvIndex: number;
  airQualityIndex: number;
  forecast: {
    day: string;
    temp: number;
    condition: string;
    rainProb: number;
  }[];
  aiWeatherAdvisory: string;
  recommendedIndoorAlternative?: string;
}

export const weatherService = {
  getWeatherForDestination(destinationName: string): WeatherData {
    const nameLower = destinationName.toLowerCase();

    if (nameLower.includes('araku')) {
      return {
        city: 'Araku Valley',
        temp: 22,
        feelsLike: 21,
        condition: 'Partly Cloudy',
        rainProbability: 15,
        humidity: 62,
        windSpeedKmH: 12,
        uvIndex: 5,
        airQualityIndex: 28, // Pristine mountain air
        forecast: [
          { day: 'Today', temp: 22, condition: 'Partly Cloudy', rainProb: 15 },
          { day: 'Tomorrow', temp: 21, condition: 'Mist & Sunshine', rainProb: 10 },
          { day: 'Day 3', temp: 23, condition: 'Sunny', rainProb: 5 }
        ],
        aiWeatherAdvisory: 'Optimal mountain weather! Morning valley mist clears by 8:30 AM. Perfect light for Borra Caves and Katiki trekking.'
      };
    }

    if (nameLower.includes('vizag') || nameLower.includes('visakhapatnam')) {
      return {
        city: 'Visakhapatnam',
        temp: 28,
        feelsLike: 30,
        condition: 'Breezy',
        rainProbability: 10,
        humidity: 70,
        windSpeedKmH: 22,
        uvIndex: 6,
        airQualityIndex: 45,
        forecast: [
          { day: 'Today', temp: 28, condition: 'Breezy Coastal', rainProb: 10 },
          { day: 'Tomorrow', temp: 29, condition: 'Sunny & Warm', rainProb: 5 },
          { day: 'Day 3', temp: 28, condition: 'Pleasant Winds', rainProb: 15 }
        ],
        aiWeatherAdvisory: 'Fresh sea breezes along Beach Road. Ocean waves are moderate; ideal for evening strolls at Kailasagiri.'
      };
    }

    if (nameLower.includes('goa')) {
      return {
        city: 'Goa',
        temp: 30,
        feelsLike: 33,
        condition: 'Sunny',
        rainProbability: 5,
        humidity: 65,
        windSpeedKmH: 14,
        uvIndex: 8,
        airQualityIndex: 35,
        forecast: [
          { day: 'Today', temp: 30, condition: 'Sunny Beach Weather', rainProb: 5 },
          { day: 'Tomorrow', temp: 31, condition: 'Clear Sky', rainProb: 0 },
          { day: 'Day 3', temp: 30, condition: 'Golden Sunset', rainProb: 5 }
        ],
        aiWeatherAdvisory: 'High UV index at noon. AI recommends scheduling water sports and beach lounging before 11:30 AM or after 3:30 PM.'
      };
    }

    if (nameLower.includes('kerala') || nameLower.includes('munnar')) {
      return {
        city: 'Munnar & Alleppey',
        temp: 21,
        feelsLike: 20,
        condition: 'Rainy',
        rainProbability: 60,
        humidity: 82,
        windSpeedKmH: 16,
        uvIndex: 4,
        airQualityIndex: 22,
        forecast: [
          { day: 'Today', temp: 21, condition: 'Passing Showers', rainProb: 60 },
          { day: 'Tomorrow', temp: 20, condition: 'Misty Rain', rainProb: 55 },
          { day: 'Day 3', temp: 22, condition: 'Clearing Skies', rainProb: 25 }
        ],
        aiWeatherAdvisory: 'Rain is expected tomorrow. AI recommends visiting the Tata Tea Museum & spice processing centers instead of the outdoor waterfall trek.',
        recommendedIndoorAlternative: 'Tata Tea Museum & Cultural Kathakali Hall'
      };
    }

    // Default fallback
    return {
      city: destinationName,
      temp: 26,
      feelsLike: 27,
      condition: 'Sunny',
      rainProbability: 10,
      humidity: 58,
      windSpeedKmH: 10,
      uvIndex: 6,
      airQualityIndex: 40,
      forecast: [
        { day: 'Today', temp: 26, condition: 'Clear', rainProb: 10 },
        { day: 'Tomorrow', temp: 27, condition: 'Sunny', rainProb: 10 },
        { day: 'Day 3', temp: 26, condition: 'Pleasant', rainProb: 15 }
      ],
      aiWeatherAdvisory: 'Favorable travel conditions across outdoor and cultural monuments.'
    };
  }
};
