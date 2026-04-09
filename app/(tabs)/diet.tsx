import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { MacroBar } from '../../components/ui/MacroBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MealList } from '../../components/home/MealList';
import { BodyMetrics } from '../../components/diet/BodyMetrics';
import { BarcodeScanner } from '../../components/diet/BarcodeScanner';
import { FoodPhotoScanner } from '../../components/diet/FoodPhotoScanner';
import { theme } from '../../constants/theme';

export default function DietScreen() {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [meals, setMeals] = useState([
    { id: '1', name: 'Scrambled Eggs', calories: 300, meal_type: 'breakfast' }
  ]);

  const handleLogFood = () => {
    if (!foodName || !calories) return;
    const newMeal = {
      id: Math.random().toString(),
      name: foodName,
      calories: parseInt(calories, 10),
      meal_type: 'snack',
    };
    setMeals([newMeal, ...meals]);
    setFoodName('');
    setCalories('');
  };

  const handleDelete = (id: string) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  const handleScanFill = (food: { name: string; calories: number }) => {
    setFoodName(food.name);
    setCalories(food.calories.toString());
  };

  const currentCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.title}>Diet & Macros</Text>

          <Card variant="solid" style={styles.macrosCard}>
            <Text style={styles.subtitle}>Today's Progress</Text>
            <MacroBar label="Calories" current={currentCalories} goal={2200} color={theme.colors.primary} />
            <MacroBar label="Protein" current={20} goal={150} color={theme.colors.protein} />
            <MacroBar label="Carbs" current={10} goal={200} color={theme.colors.carbs} />
            <MacroBar label="Fat" current={8} goal={65} color={theme.colors.fat} />
          </Card>

          <BodyMetrics />

          <Card variant="glass" style={styles.logCard}>
            <Text style={styles.subtitle}>Log Food</Text>
            
            <View style={styles.scannerRow}>
              <View style={styles.scannerItem}>
                <BarcodeScanner onScan={handleScanFill} />
              </View>
              <View style={styles.scannerItem}>
                <FoodPhotoScanner onScan={handleScanFill} />
              </View>
            </View>

            <TextInput 
              style={styles.input} 
              placeholder="Food name (e.g. Banana)" 
              placeholderTextColor={theme.colors.textMuted}
              value={foodName}
              onChangeText={setFoodName}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Calories" 
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
            />
            <Button label="Add Food" onPress={handleLogFood} />
          </Card>

          <View style={styles.listContainer}>
            <MealList meals={meals} onDelete={handleDelete} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  macrosCard: {
    marginBottom: theme.spacing.lg,
  },
  logCard: {
    marginBottom: theme.spacing.lg,
  },
  scannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  scannerItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  listContainer: {
    minHeight: 300, 
    flex: 1,
  },
});
