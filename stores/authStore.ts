import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  setInitializing: (initializing: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isInitializing: true,

      setSession: (session) => set({
        session,
        isAuthenticated: !!session,
        user: session?.user ?? null
      }),

      setUser: (user) => set({ user }),

      setInitializing: (initializing) => set({ isInitializing: initializing }),

      logout: () => {
        set({ user: null, session: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
