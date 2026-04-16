import React, { useState } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';
import { useDailyStore } from '../../stores/dailyStore';

export function WaterTracker() {
  const TOTAL_GLASSES = 8;
  const { waterTotal, addWater } = useDailyStore();

  const drops = Array.from({ length: TOTAL_GLASSES });

  const handleTap = (index: number) => {
    const targetGlasses = index + 1;
    const difference = targetGlasses - waterTotal;

    if (difference > 0) {
      addWater(difference);
    } else if (difference < 0) {
      Toast.show({
        type: 'info',
        text1: 'Hydration Log',
        text2: 'Water intake can only be increased for today',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hydration</Text>
      <View style={styles.dropRow}>
        {drops.map((_, i) => {
          const isFilled = i < waterTotal;
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
      <Text style={styles.subtitle}>{waterTotal} of {TOTAL_GLASSES} glasses</Text>
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
    transform: [{ rotate: '-45deg' }],
    backgroundColor: theme.colors.surfaceGlass,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropFilled: {
    backgroundColor: 'rgba(0, 210, 211, 0.2)',
    borderColor: theme.colors.secondary,
  },
  dropText: {
    fontSize: 16,
    transform: [{ rotate: '45deg' }],
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});
