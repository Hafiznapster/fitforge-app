export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  age: number;
  gender: 'male' | 'female' | 'other';
  height_cm: number;
  weight_kg: number;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
  calorie_goal: number;
  protein_goal: number;
  carb_goal: number;
  fat_goal: number;
  created_at: string;
  updated_at: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre' | 'post';
  notes: string;
  logged_at: string;
}

export interface Workout {
  id: string;
  name: string;
  type: string;
  duration_min: number;
  calories_burned: number;
  notes: string;
  logged_at: string;
  exercises: Exercise[];
}

export interface Exercise {
  exercise_name: string;
  sets: number;
  reps: number;
  weight_kg: number;
  rest_sec: number;
  order_index: number;
}

export interface Metric {
  id: string;
  weight_kg: number;
  body_fat_pct: number;
  muscle_mass_kg: number;
  waist_cm: number;
  logged_at: string;
}

export interface WaterLog {
  id: string;
  glasses: number;
  logged_at: string;
}
