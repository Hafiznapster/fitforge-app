import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExerciseCard } from './ExerciseCard';
import { Button } from '../ui/Button';
import { theme } from '../../constants/theme';
import { WorkoutSession as SessionType } from '../../types/workout';
import { FlashList } from '@shopify/flash-list';

interface WorkoutSessionProps {
  session: SessionType;
  onEndSession: (durationMin: number) => void;
  onToggleExercise: (id: string) => void;
}

export function WorkoutSession({ session, onEndSession, onToggleExercise }: WorkoutSessionProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    const durationMin = Math.round(elapsedSeconds / 60);
    onEndSession(durationMin);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{session.name}</Text>
          <Text style={styles.timer}>{formatTime(elapsedSeconds)}</Text>
        </View>
        <Button label="Finish" onPress={handleFinish} variant="primary" />
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={session.exercises}
          renderItem={({ item }) => (
            <ExerciseCard 
              exercise={item} 
              onToggleCompletion={onToggleExercise} 
            />
          )}
          keyExtractor={item => item.id}
          estimatedItemSize={100}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  timer: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontVariant: ['tabular-nums'],
  },
  listContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
});
