import React, { useEffect, useState, useCallback } from 'react';
import { Slot, useRouter, useSegments, ErrorBoundaryProps } from 'expo-router';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../stores/authStore';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { theme } from '../constants/theme';
import Toast from 'react-native-toast-message';
import { Button } from '../components/ui/Button';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorSubtitle}>{error.message}</Text>
      <Button label="Try Again" onPress={retry} variant="primary" />
    </View>
  );
}

/**
 * Root layout: MUST always render <Slot /> on every render (Expo Router requirement).
 * Auth session loading + route guarding is handled inside <AuthGate />,
 * which is a sibling of Slot — NOT a conditional replacement for it.
 */
export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <AuthGate />
      <Toast />
    </View>
  );
}

/**
 * AuthGate handles:
 * 1. Loading the Supabase session on mount
 * 2. Listening for auth state changes
 * 3. Redirecting based on auth state (with proper deferral)
 *
 * It renders a full-screen loading overlay while the session is being checked,
 * and then turns invisible once ready.
 */
function AuthGate() {
  const { session, setSession } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  // Track component mount — navigation is only safe after this
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load session from Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect based on auth state — retries until router is truly ready
  useEffect(() => {
    if (!isReady || !hasMounted) return;

    const inAuthGroup = segments[0] === '(auth)';
    let cancelled = false;

    // Use requestAnimationFrame with retry — Expo Router v6 on Hermes/Android
    // can take multiple frames before the navigation container is fully ready
    const tryNavigate = () => {
      if (cancelled) return;
      try {
        if (!session && !inAuthGroup) {
          router.replace('/(auth)/login');
        } else if (session && inAuthGroup) {
          router.replace('/(tabs)');
        }
      } catch {
        // Router not mounted yet — retry on next frame
        requestAnimationFrame(tryNavigate);
      }
    };

    requestAnimationFrame(tryNavigate);

    return () => {
      cancelled = true;
    };
  }, [session, isReady, hasMounted, segments]);

  // Show loading overlay while session is being checked
  if (!isReady) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Once ready, this component is invisible
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    zIndex: 100,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  errorTitle: {
    ...theme.typography.h2,
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  errorSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
});
