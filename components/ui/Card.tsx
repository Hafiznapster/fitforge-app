import React from 'react';
import { View, ViewProps, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'solid' | 'glass';
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, variant = 'solid', style, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        variant === 'glass' ? styles.glass : styles.solid,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    overflow: 'hidden',
  },
  solid: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  glass: {
    backgroundColor: theme.colors.surfaceGlass,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    // Add backdrop filter when running on web, or native shadow mapping
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});
