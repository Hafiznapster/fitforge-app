import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Switch, TextInput, ScrollView } from 'react-native';
import { theme } from '../constants/theme';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { Button } from '../components/ui/Button';
import { useSettingsStore } from '../stores/useSettingsStore';
import { Card } from '../components/ui/Card';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import { supabase } from '../services/supabase';

export default function ProfileScreen() {
  const { session } = useAuthStore();
  const { isDarkMode, toggleTheme } = useSettingsStore();
  const { profile, fetchProfile, updateProfile, isLoading } = useUserStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editWeight, setEditWeight] = useState('');
  const [editCalorieGoal, setEditCalorieGoal] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleSaveProfile = async () => {
    try {
      const weightNum = parseFloat(editWeight);
      const calorieNum = parseInt(editCalorieGoal);

      if (isNaN(weightNum) || weightNum <= 0) {
        Toast.show({ type: 'error', text1: 'Invalid Weight', text2: 'Please enter a positive number' });
        return;
      }

      if (isNaN(calorieNum) || calorieNum <= 0) {
        Toast.show({ type: 'error', text1: 'Invalid Calories', text2: 'Please enter a positive number' });
        return;
      }

      const updates: any = {};
      updates.weight_kg = weightNum;
      updates.calorie_goal = calorieNum;

      await updateProfile(updates);
      Toast.show({ type: 'success', text1: 'Profile Updated' });
      setIsEditing(false);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Update Failed' });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // The auth listener in _layout.tsx will handle the redirect
  };

  const email = session?.user?.email || 'user@fitforge.com';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Button label="← Back" variant="ghost" onPress={() => router.back()} />
          <Text style={styles.title}>Profile & Settings</Text>
        </View>

        <Card variant="glass" style={styles.card}>
          <Text style={styles.label}>Account</Text>
          <Text style={styles.value}>{email}</Text>
          <Text style={styles.value}>{profile?.username || 'No username set'}</Text>
        </Card>

        <Card variant="solid" style={styles.card}>
          <Text style={styles.label}>Fitness Goals</Text>
          {!isEditing ? (
            <View style={styles.goalRow}>
              <View style={styles.goalItem}>
                <Text style={styles.goalLabel}>Weight</Text>
                <Text style={styles.goalValue}>{profile?.weight_kg} kg</Text>
              </View>
              <View style={styles.goalItem}>
                <Text style={styles.goalLabel}>Daily Calories</Text>
                <Text style={styles.goalValue}>{profile?.calorie_goal} kcal</Text>
              </View>
            </View>
          ) : (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                value={editWeight}
                onChangeText={setEditWeight}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Calorie Goal"
                value={editCalorieGoal}
                onChangeText={setEditCalorieGoal}
                keyboardType="numeric"
              />
              <Button label="Save Changes" onPress={handleSaveProfile} />
              <Button label="Cancel" variant="ghost" onPress={() => setIsEditing(false)} />
            </View>
          )}
          <Button
            label={isEditing ? "Editing..." : "Edit Goals"}
            variant="ghost"
            onPress={() => {
              setEditWeight(profile?.weight_kg?.toString() || '');
              setEditCalorieGoal(profile?.calorie_goal?.toString() || '');
              setIsEditing(true);
            }}
            style={styles.editBtn}
          />
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
          onPress={handleSignOut}
          style={styles.signOutBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
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
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  goalItem: {
    alignItems: 'flex-start',
  },
  goalLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  goalValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  editContainer: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  editBtn: {
    marginTop: theme.spacing.sm,
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
