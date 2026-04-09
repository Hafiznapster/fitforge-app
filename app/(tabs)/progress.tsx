import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { WeightChart } from '../../components/progress/WeightChart';
import { CalorieChart } from '../../components/progress/CalorieChart';
import { MacroPieChart } from '../../components/progress/MacroPieChart';
import { WorkoutFrequencyChart } from '../../components/progress/WorkoutFrequencyChart';
import { theme } from '../../constants/theme';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Progress Dashboard</Text>
        
        <WeightChart />
        <CalorieChart />
        <MacroPieChart />
        <WorkoutFrequencyChart />
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
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  header: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
  },
});
