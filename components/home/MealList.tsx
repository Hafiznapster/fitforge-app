import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { theme } from '../../constants/theme';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Haptics from 'expo-haptics';

export interface Meal {
  id: string;
  name: string;
  calories: number;
  meal_type: string;
}

interface MealListProps {
  meals: Meal[];
  onDelete?: (id: string) => void;
}

export function MealList({ meals, onDelete }: MealListProps) {
  const handleDelete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onDelete) onDelete(id);
  };

  const renderRightActions = (id: string) => {
    return (
      <View style={styles.rightAction}>
        <Text style={styles.actionText}>Delete</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <Swipeable
      key={item.id}
      renderRightActions={() => renderRightActions(item.id)}
      onSwipeableOpen={(direction) => {
        if (direction === 'right') {
          handleDelete(item.id);
        }
      }}
      containerStyle={styles.swipeableContainer}
    >
      <Card variant="solid" style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.meal_type.toUpperCase()}</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.calories}>{item.calories} kcal</Text>
        </View>
      </Card>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Meals</Text>
      <View style={{ minHeight: 200, width: '100%' }}>
        <FlashList
          data={meals}
          renderItem={renderItem}
          estimatedItemSize={70}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🍽️</Text>
              <Text style={styles.emptyTitle}>No meals logged yet</Text>
              <Text style={styles.emptySubtitle}>Start fueling up! Swipe left to delete an item.</Text>
              <Button
                label="Log First Meal"
                variant="secondary"
                onPress={() => {}} // We will implement the meal logging modal in the next step
                style={{ marginTop: theme.spacing.md }}
              />
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.spacing.md,
    width: '100%',
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  swipeableContainer: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    margin: 0,
    borderWidth: 0,
  },
  info: {
    flex: 1,
  },
  name: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  type: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calories: {
    ...theme.typography.body,
    color: theme.colors.primary,
  },
  rightAction: {
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: theme.spacing.xl,
  },
  actionText: {
    color: '#FFF',
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});
