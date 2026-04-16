import { api } from './api';

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  provider: string;
}

export interface FoodScanResponse {
  name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export const aiService = {
  async chat(message: string, history: AIChatMessage[]): Promise<AIResponse> {
    const { data } = await api.post('/ai/chat', {
      message,
      history,
    });
    return data;
  },

  async getWorkoutPlan(muscleGroup: string, experienceLevel: string): Promise<AIResponse> {
    const { data } = await api.post('/ai/workout-plan', {
      muscle_group: muscleGroup,
      experience_level: experienceLevel,
    });
    return data;
  },

  async getMealSuggestion(message: string): Promise<AIResponse> {
    const { data } = await api.post('/ai/meal-suggestion', {
      message,
    });
    return data;
  },

  async scanFood(base64Image: string): Promise<FoodScanResponse> {
    const { data } = await api.post('/ai/scan-food', { image: base64Image });
    return data;
  },
};
