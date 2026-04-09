import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge } from '../ui/Badge';
import { theme } from '../../constants/theme';

interface MacroSummaryProps {
  proteinCurrent: number;
  proteinGoal: number;
  carbsCurrent: number;
  carbsGoal: number;
  fatCurrent: number;
  fatGoal: number;
}

export function MacroSummary({
  proteinCurrent, proteinGoal,
  carbsCurrent, carbsGoal,
  fatCurrent, fatGoal
}: MacroSummaryProps) {
  return (
    <View style={styles.container}>
      <Badge 
        label={`P: ${proteinCurrent}/${proteinGoal}g`} 
        variant="primary" 
      />
      <Badge 
        label={`C: ${carbsCurrent}/${carbsGoal}g`} 
        variant="success" 
      />
      <Badge 
        label={`F: ${fatCurrent}/${fatGoal}g`} 
        variant="warning" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
});
