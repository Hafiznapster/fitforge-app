import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { theme } from '../../constants/theme';
import { Card } from '../ui/Card';

export function MacroPieChart() {
  const pieData = [
    { value: 45, color: theme.colors.protein, text: '45%' }, // Protein
    { value: 35, color: theme.colors.carbs, text: '35%' },   // Carbs
    { value: 20, color: theme.colors.fat, text: '20%' },     // Fat
  ];

  return (
    <Card variant="solid" style={styles.card}>
      <Text style={styles.title}>Weekly Macros</Text>
      <View style={styles.chartContainer}>
        <PieChart
          donut
          data={pieData}
          innerRadius={50}
          radius={80}
          textColor="black"
          textSize={12}
          showText
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.centerText}>1,850</Text>
                <Text style={styles.centerSubText}>avg kcal</Text>
              </View>
            );
          }}
        />
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: theme.colors.protein }]} />
          <Text style={styles.legendText}>Protein</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: theme.colors.carbs }]} />
          <Text style={styles.legendText}>Carbs</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: theme.colors.fat }]} />
          <Text style={styles.legendText}>Fat</Text>
        </View>
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
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  centerSubText: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
});
