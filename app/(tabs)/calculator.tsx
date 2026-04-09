import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { calculateBMR, calculateTDEE, calculateGoalCalories, calculateMacros, ACTIVITY_MULTIPLIERS } from '../../services/calculators';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { theme } from '../../constants/theme';

export default function CalculatorScreen() {
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('175');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<keyof typeof ACTIVITY_MULTIPLIERS>('moderate');
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk'>('maintain');

  const [results, setResults] = useState<{bmr: number, tdee: number, target: number, macros: any} | null>(null);

  const handleCalculate = () => {
    const a = parseInt(age, 10);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!a || !w || !h) return;

    const bmr = calculateBMR(a, gender, w, h);
    const tdee = calculateTDEE(bmr, activity);
    const target = calculateGoalCalories(tdee, goal === 'cut' ? 'cut' : goal === 'bulk' ? 'bulk' : 'maintain');
    const macros = calculateMacros(target);

    setResults({ bmr, tdee, target, macros });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.title}>Calorie Calculator</Text>

          <Card variant="solid" style={styles.card}>
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />

            <Text style={styles.label}>Height (cm)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} />

            <View style={styles.row}>
              <Button 
                label="Male" 
                variant={gender === 'male' ? 'primary' : 'ghost'} 
                onPress={() => setGender('male')} 
                style={{ flex: 1, marginRight: 8 }} 
              />
              <Button 
                label="Female" 
                variant={gender === 'female' ? 'primary' : 'ghost'} 
                onPress={() => setGender('female')} 
                style={{ flex: 1, marginLeft: 8 }} 
              />
            </View>

            <Button label="Calculate Offline" onPress={handleCalculate} style={styles.calcBtn} />
          </Card>

          {results && (
            <Card variant="glass" style={styles.resultsCard}>
              <Text style={styles.resultsTitle}>Your Results</Text>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>BMR:</Text>
                <Text style={styles.resultValue}>{results.bmr} kcal</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>TDEE:</Text>
                <Text style={styles.resultValue}>{results.tdee} kcal</Text>
              </View>
              
              <View style={[styles.resultRow, styles.targetRow]}>
                <Text style={styles.targetLabel}>Target Goal:</Text>
                <Text style={styles.targetValue}>{results.target} kcal</Text>
              </View>

              <View style={styles.macrosRow}>
                <View style={styles.macroBox}>
                  <Text style={styles.macroValue}>{results.macros.protein_g}g</Text>
                  <Text style={[styles.macroLabel, { color: theme.colors.protein }]}>Protein</Text>
                </View>
                <View style={styles.macroBox}>
                  <Text style={styles.macroValue}>{results.macros.carbs_g}g</Text>
                  <Text style={[styles.macroLabel, { color: theme.colors.carbs }]}>Carbs</Text>
                </View>
                <View style={styles.macroBox}>
                  <Text style={styles.macroValue}>{results.macros.fat_g}g</Text>
                  <Text style={[styles.macroLabel, { color: theme.colors.fat }]}>Fat</Text>
                </View>
              </View>

              <Button label="Save to Profile" variant="secondary" style={styles.saveBtn} />
            </Card>
          )}

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
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  input: {
    backgroundColor: theme.colors.surfaceGlass,
    color: theme.colors.text,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  calcBtn: {
    marginTop: theme.spacing.sm,
  },
  resultsCard: {
    padding: theme.spacing.lg,
  },
  resultsTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  resultLabel: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  resultValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  targetRow: {
    borderBottomWidth: 0,
    marginTop: theme.spacing.sm,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  targetLabel: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  targetValue: {
    ...theme.typography.h2,
    color: theme.colors.success,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },
  macroBox: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  macroLabel: {
    ...theme.typography.caption,
    marginTop: 4,
  },
  saveBtn: {
    marginTop: theme.spacing.xl,
  },
});
