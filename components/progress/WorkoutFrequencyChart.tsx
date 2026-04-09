import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { theme } from '../../constants/theme';
import { Card } from '../ui/Card';

export function WorkoutFrequencyChart() {
  const data = [
    { value: 3, label: 'Wk 1' },
    { value: 4, label: 'Wk 2' },
    { value: 5, label: 'Wk 3', frontColor: theme.colors.success },
    { value: 2, label: 'Wk 4', frontColor: theme.colors.warning },
  ];

  return (
    <Card variant="glass" style={styles.card}>
      <Text style={styles.title}>Workout Frequency (4 Weeks)</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          frontColor={theme.colors.primary}
          barWidth={35}
          barBorderRadius={4}
          yAxisColor={theme.colors.border}
          xAxisColor={theme.colors.border}
          yAxisTextStyle={{ color: theme.colors.textMuted }}
          xAxisLabelTextStyle={{ color: theme.colors.textMuted }}
          rulesColor={theme.colors.border}
          height={160}
          maxValue={7}
          noOfSections={7}
          yAxisLabelTexts={['0', '1', '2', '3', '4', '5', '6', '7']}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  chartContainer: {
    alignItems: 'center',
    marginLeft: -10,
  },
});
