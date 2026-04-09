import { useState } from 'react';
import { WorkoutSession, Exercise } from '../types/workout';

// Mock initial data
const MOCK_HISTORY: WorkoutSession[] = [
  {
    id: '1',
    name: 'Push Day',
    date: new Date(Date.now() - 86400000), // Yesterday
    duration_min: 45,
    exercises: [
      { id: 'e1', name: 'Bench Press', sets: 3, reps: 8, weight_kg: 60, difficulty: 'intermediate' },
      { id: 'e2', name: 'Triceps Pushdown', sets: 3, reps: 12, weight_kg: 20, difficulty: 'beginner' },
    ],
  }
];

export function useWorkouts() {
  const [history, setHistory] = useState<WorkoutSession[]>(MOCK_HISTORY);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);

  const startSession = (name: string, initialExercises: Exercise[] = []) => {
    setActiveSession({
      id: Math.random().toString(),
      name,
      date: new Date(),
      exercises: initialExercises,
    });
  };

  const endSession = (duration_min: number) => {
    if (!activeSession) return;
    const completedSession = { ...activeSession, duration_min };
    setHistory((prev) => [completedSession, ...prev]);
    setActiveSession(null);
  };

  const toggleExerciseCompletion = (exerciseId: string) => {
    if (!activeSession) return;
    setActiveSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map(ex => 
          ex.id === exerciseId ? { ...ex, isCompleted: !ex.isCompleted } : ex
        )
      };
    });
  };

  return {
    history,
    activeSession,
    startSession,
    endSession,
    toggleExerciseCompletion,
  };
}
