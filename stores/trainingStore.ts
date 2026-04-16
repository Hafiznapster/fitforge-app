import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout, Metric } from '../types';
import { workoutService } from '../services/workoutService';
import { metricService } from '../services/metricService';
import { format } from 'date-fns';

interface TrainingState {
  workouts: Workout[];
  history: Workout[];
  metrics: Metric[];
  isLoading: boolean;
  fetchWorkoutsForDate: (date: Date) => Promise<void>;
  fetchHistory: () => Promise<void>;
  fetchMetrics: () => Promise<void>;
  addWorkout: (workout: Omit<Workout, 'id' | 'logged_at'>) => Promise<void>;
  removeWorkout: (id: string) => Promise<void>;
  logMetric: (metric: Omit<Metric, 'id' | 'logged_at'>) => Promise<void>;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      workouts: [],
      history: [],
      metrics: [],
      isLoading: false,

      fetchWorkoutsForDate: async (date) => {
        set({ isLoading: true });
        const dateStr = format(date, 'yyyy-MM-dd');
        try {
          const workouts = await workoutService.getWorkoutsByDate(dateStr);
          set({ workouts });
        } catch (error) {
          console.error('Error fetching workouts:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchHistory: async () => {
        set({ isLoading: true });
        try {
          const history = await workoutService.getWorkoutHistory();
          set({ history });
        } catch (error) {
          console.error('Error fetching history:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchMetrics: async () => {
        set({ isLoading: true });
        try {
          const metrics = await metricService.getMetrics();
          set({ metrics });
        } catch (error) {
          console.error('Error fetching metrics:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addWorkout: async (workoutData) => {
        try {
          const newWorkout = await workoutService.createWorkout(workoutData);
          set((state) => ({ workouts: [...state.workouts, newWorkout] }));
        } catch (error) {
          console.error('Error adding workout:', error);
          throw error;
        }
      },

      removeWorkout: async (id) => {
        try {
          await workoutService.deleteWorkout(id);
          set((state) => ({
            workouts: state.workouts.filter((w) => w.id !== id),
          }));
        } catch (error) {
          console.error('Error removing workout:', error);
          throw error;
        }
      },

      logMetric: async (metricData) => {
        try {
          const newMetric = await metricService.logMetric(metricData);
          set((state) => ({ metrics: [...state.metrics, newMetric] }));
        } catch (error) {
          console.error('Error logging metric:', error);
          throw error;
        }
      },
    }),
    {
      name: 'training-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
