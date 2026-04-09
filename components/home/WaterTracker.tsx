import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';

export function WaterTracker() {
  const TOTAL_GLASSES = 8;
  const [consumed, setConsumed] = useState(3);

  const drops = Array.from({ length: TOTAL_GLASSES });

  const handleTap = (index: number) => {
    // If tapping the same glass, you can toggle it off, or just fill up to that point
    // Usually filling sequentially is better
    setConsumed(index + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hydration</Text>
      <View style={styles.dropRow}>
        {drops.map((_, i) => {
          const isFilled = i < consumed;
          return (
            <TouchableOpacity 
              key={i} 
              onPress={() => handleTap(i)}
              style={styles.dropContainer}
            >
              <View style={[styles.drop, isFilled && styles.dropFilled]}>
                {isFilled && <Text style={styles.dropText}>💧</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.subtitle}>{consumed} of {TOTAL_GLASSES} glasses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    width: '100%',
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  dropRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropContainer: {
    padding: 2,
  },
  drop: {
    width: 32,
    height: 40,
    borderRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
    transform: [{ rotate: '-45deg' }], // Makes a teardrop shape
    backgroundColor: theme.colors.surfaceGlass,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropFilled: {
    backgroundColor: 'rgba(0, 210, 211, 0.2)', // Light secondary cyan
    borderColor: theme.colors.secondary,
  },
  dropText: {
    fontSize: 16,
    transform: [{ rotate: '45deg' }], // Counter-rotate the emoji
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});
