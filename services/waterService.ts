import { api } from './api';
import { WaterLog } from '../types';

export const waterService = {
  async getWaterLogByDate(date: string): Promise<{ total_glasses: number; logs: WaterLog[] }> {
    const { data } = await api.get(`/metrics/water-log?target_date=${date}`);
    // API returns an array of logs; aggregate total glasses here
    const logs: WaterLog[] = Array.isArray(data) ? data : [];
    const total_glasses = logs.reduce((sum, log) => sum + (log.glasses ?? 0), 0);
    return { total_glasses, logs };
  },

  async logWater(glasses: number = 1): Promise<WaterLog> {
    const { data } = await api.post(`/metrics/water-log?glasses=${glasses}`, {});
    return data;
  },
};
