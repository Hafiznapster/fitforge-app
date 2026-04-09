import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Proper MMKV adapter for Zustand
import { MMKV } from 'react-native-mmkv';
const mmkvStorage = new MMKV();

const zustandStorage = {
  getItem: (name: string) => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    mmkvStorage.set(name, value);
  },
  removeItem: (name: string) => {
    mmkvStorage.delete(name);
  },
};

interface SettingsState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isDarkMode: true, // Dark mode first by default
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'fitforge-settings',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
