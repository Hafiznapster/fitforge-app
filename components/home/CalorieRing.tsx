import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ProgressRing } from '../ui/ProgressRing';
import { theme } from '../../constants/theme';

interface CalorieRingProps {
  currentCalories: number;
  goalCalories: number;
}

export function CalorieRing({ currentCalories, goalCalories }: CalorieRingProps) {
  const progress = goalCalories > 0 ? Math.min(currentCalories / goalCalories, 1) : 0;
  const remaining = Math.max(goalCalories - currentCalories, 0);

  return (
    <View style={styles.container}>
      <ProgressRing 
        progress={progress} 
        size={180} 
        strokeWidth={16} 
        label={currentCalories.toString()} 
        sublabel={`/ ${goalCalories} kcal`}
        color={progress >= 1 ? theme.colors.warning : theme.colors.primary}
      />
      <Text style={styles.remainingText}>
        {remaining} kcal remaining
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
  },
  remainingText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
  },
});
