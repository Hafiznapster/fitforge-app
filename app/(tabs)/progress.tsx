import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { WeightChart } from '../../components/progress/WeightChart';
import { CalorieChart } from '../../components/progress/CalorieChart';
import { MacroPieChart } from '../../components/progress/MacroPieChart';
import { WorkoutFrequencyChart } from '../../components/progress/WorkoutFrequencyChart';
import { theme } from '../../constants/theme';
import { useTrainingStore } from '../../stores/trainingStore';

export default function ProgressScreen() {
  const { metrics, fetchMetrics } = useTrainingStore();

  useEffect(() => {
    fetchMetrics();
  }, []);

  // We can now pass real metrics to the charts
  // Note: Components might need updates to accept data props
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentವಾಗಿ={styles.container}>
        <Text style={styles.header}>Progress Dashboard</Text>

        <WeightChart data={metrics} />
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
