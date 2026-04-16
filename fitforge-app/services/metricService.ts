import { api } from './api';
import { Metric } from '../types';

export const metricService = {
  async getMetrics(limit: number = 30): Promise<Metric[]> {
    const { data } = await api.get(`/metrics?limit=${limit}`);
    return data;
  },

  async logMetric(metricData: Omit<Metric, 'id' | 'logged_at'>): Promise<Metric> {
    const { data } = await api.post('/metrics', metricData);
    return data;
  },
};
