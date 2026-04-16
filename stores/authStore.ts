import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setInitializing: (initializing: boolean) => void;
  signOut: () => Promise<void>;
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
        user: session?.user ?? null,
      }),

      setUser: (user) => set({ user }),

      setInitializing: (initializing) => set({ isInitializing: initializing }),

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Don't persist isInitializing — it should always start as true
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
