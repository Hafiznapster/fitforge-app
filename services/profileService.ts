import { api } from './api';
import { Profile } from '../types';

export const profileService = {
  async getMyProfile(): Promise<Profile> {
    const { data } = await api.get('/profiles/me');
    return data;
  },

  async updateMyProfile(updates: Partial<Profile>): Promise<Profile> {
    const { data } = await api.patch('/profiles/me', updates);
    return data;
  },
};
