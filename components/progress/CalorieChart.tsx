import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { theme } from '../../constants/theme';
import { Card } from '../ui/Card';

export function CalorieChart() {
  const data = [
    { value: 2100, label: 'M' },
    { value: 2350, label: 'T', frontColor: theme.colors.error }, // Exceeded goal
    { value: 2150, label: 'W' },
    { value: 1950, label: 'T', frontColor: theme.colors.success }, // Good
    { value: 2200, label: 'F' },
    { value: 2500, label: 'S', frontColor: theme.colors.error },
    { value: 2000, label: 'S' },
  ];

  return (
    <Card variant="solid" style={styles.card}>
      <Text style={styles.title}>Calories (7 Days)</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          frontColor={theme.colors.primary}
          barWidth={22}
          barBorderRadius={4}
          yAxisColor={theme.colors.border}
          xAxisColor={theme.colors.border}
          yAxisTextStyle={{ color: theme.colors.textMuted, fontSize: 10 }}
          xAxisLabelTextStyle={{ color: theme.colors.textMuted }}
          rulesColor={theme.colors.border}
          height={160}
          maxValue={3000}
          showReferenceLine1
          referenceLine1Position={2200}
          referenceLine1Config={{
            color: theme.colors.warning,
            dashWidth: 4,
            dashGap: 4,
            thickness: 2,
          }}
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
