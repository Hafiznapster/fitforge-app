import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useWorkouts } from '../../hooks/useWorkouts';
import { WorkoutSession } from '../../components/training/WorkoutSession';
import { AIplanGenerator } from '../../components/training/AIplanGenerator';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { theme } from '../../constants/theme';
import { FlashList } from '@shopify/flash-list';
import { Exercise } from '../../types/workout';

export default function TrainingScreen() {
  const { 
    history, 
    activeSession, 
    startSession, 
    endSession, 
    toggleExerciseCompletion 
  } = useWorkouts();

  const handleStartEmpty = () => {
    startSession('Custom Session', []);
  };

  const handlePlanGenerated = (name: string, exercises: Exercise[]) => {
    startSession(name, exercises);
  };

  const renderHistoryItem = ({ item }: { item: any }) => (
    <Card variant="glass" style={styles.historyCard}>
      <Text style={styles.historyTitle}>{item.name}</Text>
      <View style={styles.historyStats}>
        <Text style={styles.historyStat}>{item.date.toLocaleDateString()}</Text>
        <Text style={styles.historyStat}>{item.duration_min} min</Text>
      </View>
    </Card>
  );

  if (activeSession) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WorkoutSession 
          session={activeSession}
          onEndSession={endSession}
          onToggleExercise={toggleExerciseCompletion}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
          <AIplanGenerator onPlanGenerated={handlePlanGenerated} />
        </View>

        <Button 
          label="Start Custom Workout" 
          onPress={handleStartEmpty} 
          style={styles.startBtn}
        />

        <Text style={styles.historyHeader}>History</Text>
        <View style={styles.listContainer}>
          <FlashList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            estimatedItemSize={80}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No workouts logged yet.</Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  startBtn: {
    marginBottom: theme.spacing.xl,
  },
  historyHeader: {
    ...theme.typography.h3,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  },
  listContainer: {
    flex: 1,
  },
  historyCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  historyTitle: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  historyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyStat: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xl,
  },
});
