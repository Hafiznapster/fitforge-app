export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight_kg: number;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  isCompleted?: boolean;
}

export interface WorkoutSession {
  id: string;
  name: string;
  date: Date;
  duration_min?: number;
  exercises: Exercise[];
}
