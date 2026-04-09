import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { theme } from '../../constants/theme';

export interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  color: string;
}

export function MacroBar({ label, current, goal, color }: MacroBarProps) {
  const percentage = Math.min((current / (goal || 1)) * 100, 100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(`${percentage}%`, { damping: 20 }),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.values}>
          {current} <Text style={styles.goal}>/ {goal}g</Text>
        </Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, animatedStyle, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  values: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  goal: {
    color: theme.colors.textMuted,
  },
  track: {
    height: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceGlass,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
});
