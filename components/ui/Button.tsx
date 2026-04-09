import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../constants/theme';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export function Button({ label, variant = 'primary', isLoading, style, disabled, ...props }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  
  const getBackgroundColor = () => {
    if (disabled && !isGhost) return theme.colors.surfaceGlass;
    if (isPrimary) return theme.colors.primary;
    if (isSecondary) return 'transparent';
    return 'transparent';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.base,
        { backgroundColor: getBackgroundColor() },
        isSecondary && styles.secondaryBorder,
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? '#FFF' : theme.colors.primary} />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary && { color: '#FFF' },
            isSecondary && { color: theme.colors.text },
            isGhost && { color: theme.colors.primary },
            disabled && { color: theme.colors.textMuted },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  secondaryBorder: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  text: {
    ...theme.typography.h3,
    fontSize: 16,
  },
});
