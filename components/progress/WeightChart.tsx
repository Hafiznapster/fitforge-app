import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { theme } from '../../constants/theme';
import { Card } from '../ui/Card';

export function WeightChart() {
  const data = [
    { value: 76.5, label: '1st' },
    { value: 76.2 }, { value: 76.1 }, { value: 75.8 }, { value: 75.9 }, 
    { value: 75.5, label: '15th' },
    { value: 75.6 }, { value: 75.3 }, { value: 75.1 }, { value: 74.8, label: '30th' }
  ];

  return (
    <Card variant="glass" style={styles.card}>
      <Text style={styles.title}>Weight Progress (30 Days)</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          color={theme.colors.primary}
          thickness={3}
          hideDataPoints
          yAxisColor={theme.colors.border}
          xAxisColor={theme.colors.border}
          yAxisTextStyle={{ color: theme.colors.textMuted }}
          xAxisLabelTextStyle={{ color: theme.colors.textMuted }}
          rulesType="solid"
          rulesColor={theme.colors.border}
          initialSpacing={10}
          height={180}
          maxValue={80}
          noOfSections={4}
          yAxisLabelTexts={['70', '73', '76', '79', '82']}
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
    marginLeft: -10, // Adjust centering logic from library
  },
});
