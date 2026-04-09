import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'ghost';
}

export function Badge({ label, variant = 'primary' }: BadgeProps) {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: 'rgba(46, 213, 115, 0.15)', text: theme.colors.success };
      case 'warning':
        return { bg: 'rgba(255, 165, 2, 0.15)', text: theme.colors.warning };
      case 'error':
        return { bg: 'rgba(255, 71, 87, 0.15)', text: theme.colors.error };
      case 'ghost':
        return { bg: theme.colors.surface, text: theme.colors.textMuted };
      case 'primary':
      default:
        return { bg: 'rgba(108, 92, 231, 0.15)', text: theme.colors.primary };
    }
  };

  const colors = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    ...theme.typography.small,
    textTransform: 'uppercase',
  },
});
