import { api } from './api';
import { Meal } from '../types';

export const mealService = {
  async getMealsByDate(date: string): Promise<Meal[]> {
    const { data } = await api.get(`/meals?target_date=${date}`);
    return data;
  },

  async createMeal(mealData: Omit<Meal, 'id' | 'logged_at'>): Promise<Meal> {
    const { data } = await api.post('/meals', mealData);
    return data;
  },

  async deleteMeal(id: string): Promise<void> {
    await api.delete(`/meals/${id}`);
  },
};
