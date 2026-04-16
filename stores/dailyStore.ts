import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal, WaterLog } from '../types';
import { mealService } from '../services/mealService';
import { waterService } from '../services/waterService';
import { format } from 'date-fns';

interface DailyState {
  selectedDate: string; // YYYY-MM-DD
  meals: Meal[];
  waterTotal: number;
  isLoading: boolean;
  setDate: (date: Date) => void;
  fetchDailyData: () => Promise<void>;
  addMeal: (meal: Omit<Meal, 'id' | 'logged_at'>) => Promise<void>;
  removeMeal: (id: string) => Promise<void>;
  addWater: (glasses: number) => Promise<void>;
}

export const useDailyStore = create<DailyState>()(
  persist(
    (set, get) => ({
      selectedDate: format(new Date(), 'yyyy-MM-dd'),
      meals: [],
      waterTotal: 0,
      isLoading: false,

      setDate: (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        set({ selectedDate: dateStr });
        get().fetchDailyData();
      },

      fetchDailyData: async () => {
        set({ isLoading: true });
        const date = get().selectedDate;
        try {
          const [meals, waterData] = await Promise.all([
            mealService.getMealsByDate(date),
            waterService.getWaterLogByDate(date),
          ]);
          set({ meals, waterTotal: waterData.total_glasses });
        } catch (error) {
          console.error('Error fetching daily data:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addMeal: async (mealData) => {
        try {
          const newMeal = await mealService.createMeal(mealData);
          set((state) => ({ meals: [...state.meals, newMeal] }));
        } catch (error) {
          console.error('Error adding meal:', error);
          throw error;
        }
      },

      removeMeal: async (id) => {
        try {
          await mealService.deleteMeal(id);
          set((state) => ({
            meals: state.meals.filter((m) => m.id !== id),
          }));
        } catch (error) {
          console.error('Error removing meal:', error);
          throw error;
        }
      },

      addWater: async (glasses) => {
        try {
          await waterService.logWater(glasses);
          const data = await waterService.getWaterLogByDate(get().selectedDate);
          set({ waterTotal: data.total_glasses });
        } catch (error) {
          console.error('Error adding water:', error);
          throw error;
        }
      },
    }),
    {
      name: 'daily-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
