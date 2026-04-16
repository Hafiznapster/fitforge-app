import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types';
import { profileService } from '../services/profileService';

interface UserState {
  profile: Profile | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  setProfile: (profile: Profile | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,

      setProfile: (profile) => set({ profile }),

      fetchProfile: async () => {
        set({ isLoading: true });
        try {
          const profile = await profileService.getMyProfile();
          set({ profile });
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateProfile: async (updates) => {
        try {
          const updatedProfile = await profileService.updateMyProfile(updates);
          set({ profile: updatedProfile });
        } catch (error) {
          console.error('Error updating profile:', error);
          throw error;
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
