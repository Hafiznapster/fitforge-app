import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Badge } from '../ui/Badge';
import { theme } from '../../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SuggestionChipsProps {
  onSelect: (prompt: string) => void;
}

const PRESETS = [
  'What should I eat tonight?',
  'Review my workout',
  'How to break a plateau?',
  'Best pre-workout?'
];

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {PRESETS.map((preset, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => onSelect(preset)}
          style={styles.chipWrapper}
        >
          <Badge label={preset} variant="ghost" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    marginBottom: theme.spacing.sm,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  chipWrapper: {
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 4,
    paddingHorizontal: 2,
    backgroundColor: theme.colors.surface,
  },
});
