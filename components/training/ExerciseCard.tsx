import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { theme } from '../../constants/theme';
import { Exercise } from '../../types/workout';

interface ExerciseCardProps {
  exercise: Exercise;
  onToggleCompletion?: (id: string) => void;
}

export function ExerciseCard({ exercise, onToggleCompletion }: ExerciseCardProps) {
  const getDifficultyVariant = () => {
    switch (exercise.difficulty) {
      case 'beginner': return 'success';
      case 'expert': return 'error';
      case 'intermediate': 
      default: return 'warning';
    }
  };

  return (
    <Card variant="glass" style={[styles.card, exercise.isCompleted && styles.completedCard]}>
      <View style={styles.topRow}>
        <Text style={[styles.name, exercise.isCompleted && styles.completedText]}>
          {exercise.name}
        </Text>
        <Badge label={exercise.difficulty} variant={getDifficultyVariant()} />
      </View>
      
      <View style={styles.bottomRow}>
        <Text style={styles.details}>
          {exercise.sets} sets × {exercise.reps} reps
        </Text>
        <Text style={styles.weight}>{exercise.weight_kg} kg</Text>
      </View>

      {onToggleCompletion && (
        <TouchableOpacity 
          style={[styles.checkbox, exercise.isCompleted && styles.checkboxActive]}
          onPress={() => onToggleCompletion(exercise.id)}
        >
          {exercise.isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.sm,
    paddingRight: 50, // Space for the checkbox
  },
  completedCard: {
    opacity: 0.7,
    borderColor: theme.colors.success,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.textMuted,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  weight: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  checkbox: {
    position: 'absolute',
    right: theme.spacing.md,
    top: '50%',
    marginTop: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  checkmark: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
