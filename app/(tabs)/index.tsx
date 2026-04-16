import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { useDailyStore } from '../../stores/dailyStore';
import { useUserStore } from '../../stores/userStore';
import { useStreak } from '../../hooks/useStreak';
import { CalorieRing } from '../../components/home/CalorieRing';
import { MacroSummary } from '../../components/home/MacroSummary';
import { MealList } from '../../components/home/MealList';
import { WaterTracker } from '../../components/home/WaterTracker';
import { WeekCalendar } from '../../components/home/WeekCalendar';
import { StreakBadge } from '../../components/home/StreakBadge';
import { Button } from '../../components/ui/Button';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { signOut } = useAuthStore();
  const { streak } = useStreak();
  const { meals, removeMeal, fetchDailyData } = useDailyStore();
  const { profile } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    fetchDailyData();
  }, []);

  const currentCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const goalCalories = profile?.calorie_goal || 2000;

  const handleDelete = (id: string) => {
    removeMeal(id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Button
                label="⚙️ Settings"
                variant="ghost"
                onPress={() => router.push('/profile')}
            />
          </View>
          <StreakBadge streak={streak} />

          <CalorieRing
            currentCalories={currentCalories}
            goalCalories={goalCalories}
          />

          <MacroSummary
            proteinCurrent={meals.reduce((sum, m) => sum + m.protein_g, 0)} proteinGoal={profile?.protein_goal || 150}
            carbsCurrent={meals.reduce((sum, m) => sum + m.carbs_g, 0)} carbsGoal={profile?.carb_goal || 200}
            fatCurrent={meals.reduce((sum, m) => sum + m.fat_g, 0)} fatGoal={profile?.fat_goal || 65}
          />

          <WaterTracker />

          <WeekCalendar />

          <MealList meals={meals} onDelete={handleDelete} />

          <Button
            label="Sign Out"
            variant="ghost"
            onPress={signOut}
            style={styles.signOutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing.lg,
    alignItems: 'center',
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  signOutButton: {
    marginVertical: theme.spacing.xl,
  },
});
