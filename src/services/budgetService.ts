import { BudgetBreakdown, BudgetCategoryItem } from '../types';

export interface BudgetModifiers {
  travelers: number;
  hotelCategoryMultiplier: number; // 0.6 (Hostel/Budget), 1.0 (3-Star), 1.6 (Boutique/4-Star), 2.4 (5-Star Luxury)
  transportationMultiplier: number; // 0.5 (Train/Bus), 1.0 (Standard Cab), 2.2 (Flight)
  foodBudgetLevel: 'economic' | 'moderate' | 'foodie'; // 0.7, 1.0, 1.5
  activityBudgetLevel: 'light' | 'moderate' | 'adventure'; // 0.6, 1.0, 1.4
  studentDiscount: boolean;
  backpackerMode: boolean;
}

export const budgetService = {
  calculateDynamicBudget(base: BudgetBreakdown, modifiers: BudgetModifiers): BudgetBreakdown {
    const travelerRatio = modifiers.travelers / 2; // base was for 2 travelers
    let studentFactor = modifiers.studentDiscount ? 0.88 : 1.0;
    let backpackerFactor = modifiers.backpackerMode ? 0.75 : 1.0;

    const transportation = Math.round(
      base.transportation * travelerRatio * modifiers.transportationMultiplier * studentFactor * backpackerFactor
    );

    const accommodation = Math.round(
      base.accommodation * (modifiers.travelers <= 2 ? 1 : Math.ceil(modifiers.travelers / 2)) *
      modifiers.hotelCategoryMultiplier * backpackerFactor
    );

    const foodMult = modifiers.foodBudgetLevel === 'economic' ? 0.7 : modifiers.foodBudgetLevel === 'foodie' ? 1.5 : 1.0;
    const food = Math.round(base.food * travelerRatio * foodMult * backpackerFactor);

    const actMult = modifiers.activityBudgetLevel === 'light' ? 0.6 : modifiers.activityBudgetLevel === 'adventure' ? 1.4 : 1.0;
    const activities = Math.round(base.activities * travelerRatio * actMult * studentFactor);

    const shopping = Math.round(base.shopping * (modifiers.backpackerMode ? 0.4 : 1.0));
    const emergency = Math.round((transportation + accommodation + food + activities) * 0.05);

    const total = transportation + accommodation + food + activities + shopping + emergency;

    const tips: string[] = [
      'Travel one day earlier (mid-week departure) to reduce transportation cost by ~18%.',
      'Choose a verified eco-homestay 1.5 km from the city center to save approximately ₹800 per night without sacrificing comfort.',
      'Group travel (3+ people) unlocks volume discounts on vehicle charters and boat cruises.'
    ];

    if (modifiers.studentDiscount) {
      tips.unshift('🎓 Student ID applied: 12% discount factored on state museum tickets and rail fares.');
    }
    if (modifiers.backpackerMode) {
      tips.unshift('🎒 Backpacker Mode active: Shared dorms, public transit, and authentic street dining prioritized.');
    }

    return {
      transportation,
      accommodation,
      food,
      activities,
      shopping,
      emergency,
      total,
      currency: 'INR',
      savingsTips: tips
    };
  },

  getCategoryItems(budget: BudgetBreakdown): BudgetCategoryItem[] {
    const total = Math.max(1, budget.total);
    return [
      {
        category: 'Transportation',
        amount: budget.transportation,
        percentage: Math.round((budget.transportation / total) * 100),
        color: '#0284c7', // Ocean Blue
        icon: 'Plane'
      },
      {
        category: 'Accommodation',
        amount: budget.accommodation,
        percentage: Math.round((budget.accommodation / total) * 100),
        color: '#38bdf8', // Sky Blue
        icon: 'Building'
      },
      {
        category: 'Food & Dining',
        amount: budget.food,
        percentage: Math.round((budget.food / total) * 100),
        color: '#f97316', // Sunset Orange
        icon: 'Utensils'
      },
      {
        category: 'Activities & Tours',
        amount: budget.activities,
        percentage: Math.round((budget.activities / total) * 100),
        color: '#10b981', // Eco Green
        icon: 'Compass'
      },
      {
        category: 'Shopping & Crafts',
        amount: budget.shopping,
        percentage: Math.round((budget.shopping / total) * 100),
        color: '#8b5cf6', // Purple
        icon: 'ShoppingBag'
      },
      {
        category: 'Emergency Buffer',
        amount: budget.emergency,
        percentage: Math.round((budget.emergency / total) * 100),
        color: '#64748b', // Slate
        icon: 'ShieldAlert'
      }
    ];
  }
};
