import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Switch } from 'react-native';
import { theme } from '../constants/theme';
import { useAuthStore } from '../stores/useAuthStore';
import { Button } from '../components/ui/Button';
import { useSettingsStore } from '../stores/useSettingsStore';
import { Card } from '../components/ui/Card';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { signOut, session } = useAuthStore();
  const { isDarkMode, toggleTheme } = useSettingsStore();
  const router = useRouter();

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleTheme();
    Toast.show({
      type: 'success',
      text1: 'Theme Updated',
      text2: 'Restart app to apply full layout styles',
      position: 'bottom',
    });
  };

  const email = session?.user?.email || 'user@fitforge.com';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Button label="← Back" variant="ghost" onPress={() => router.back()} />
          <Text style={styles.title}>Profile & Settings</Text>
        </View>

        <Card variant="glass" style={styles.card}>
          <Text style={styles.label}>Account</Text>
          <Text style={styles.value}>{email}</Text>
        </Card>

        <Card variant="solid" style={styles.card}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={handleToggle}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </Card>

        <Button 
          label="Sign Out" 
          variant="secondary" 
          onPress={signOut} 
          style={styles.signOutBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  value: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  settingLabel: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  signOutBtn: {
    marginTop: 'auto',
    marginBottom: theme.spacing.xxl,
  },
});
