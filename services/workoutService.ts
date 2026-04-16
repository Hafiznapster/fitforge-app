import { api } from './api';
import { Workout } from '../types';

export const workoutService = {
  async getWorkoutsByDate(date: string): Promise<Workout[]> {
    const { data } = await api.get(`/workouts?date=${date}`);
    return data;
  },

  async getWorkoutHistory(limit: number = 20): Promise<Workout[]> {
    const { data } = await api.get(`/workouts/history?limit=${limit}`);
    return data;
  },

  async createWorkout(workoutData: Omit<Workout, 'id' | 'logged_at'>): Promise<Workout> {
    const { data } = await api.post('/workouts', workoutData);
    return data;
  },

  async deleteWorkout(id: string): Promise<void> {
    await api.delete(`/workouts/${id}`);
  },
};
