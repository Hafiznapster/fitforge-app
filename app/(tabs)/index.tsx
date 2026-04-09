import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { useAuthStore } from '../../stores/useAuthStore';
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
  const router = useRouter();
  
  // Placeholder data - in a real app this comes from Zustand store fed by Supabase
  const [meals, setMeals] = useState([
    { id: '1', name: 'Oatmeal & Protein', calories: 450, meal_type: 'breakfast' },
    { id: '2', name: 'Chicken Salad', calories: 650, meal_type: 'lunch' },
  ]);

  const currentCalories = meals.reduce((sum: number, meal: any) => sum + meal.calories, 0);
  const goalCalories = 2200;

  const handleDelete = (id: string) => {
    setMeals(meals.filter((m: any) => m.id !== id));
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
            proteinCurrent={85} proteinGoal={150}
            carbsCurrent={120} carbsGoal={200}
            fatCurrent={40} fatGoal={65}
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
