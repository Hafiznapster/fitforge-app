import { api } from './api';
import { WaterLog } from '../types';

export const waterService = {
  async getWaterLogByDate(date: string): Promise<{ total_glasses: number; logs: WaterLog[] }> {
    const { data } = await api.get(`/water-log?date=${date}`);
    return data;
  },

  async logWater(glasses: number = 1): Promise<WaterLog> {
    const { data } = await api.post('/water-log', { glasses });
    return data;
  },
};
