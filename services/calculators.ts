export function calculateBMR(age: number, gender: 'male' | 'female', weightKg: number, heightCm: number): number {
  const base = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
} as const;

export function calculateTDEE(bmr: number, activityLevel: keyof typeof ACTIVITY_MULTIPLIERS): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

export function calculateGoalCalories(tdee: number, goal: 'cut' | 'slow_cut' | 'maintain' | 'lean_bulk' | 'bulk'): number {
  const adjustments = { cut: -500, slow_cut: -250, maintain: 0, lean_bulk: 250, bulk: 500 };
  return tdee + adjustments[goal];
}

export function calculateMacros(calories: number) {
  return {
    protein_g: Math.round((calories * 0.30) / 4),
    carbs_g: Math.round((calories * 0.40) / 4),
    fat_g: Math.round((calories * 0.30) / 9),
  };
}
