import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export function WeekCalendar() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=Mon, 6=Sun
  const completedDays = [0, 2]; // Mon and Wed completed

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This Week</Text>
      <View style={styles.row}>
        {days.map((day, i) => {
          const isToday = i === todayIndex;
          const isCompleted = completedDays.includes(i);
          return (
            <View 
              key={i} 
              style={[
                styles.dayBox, 
                isCompleted && styles.completed,
                isToday && styles.today
              ]}
            >
              <Text 
                style={[
                  styles.dayText, 
                  isCompleted && styles.completedText,
                  isToday && styles.todayText
                ]}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: 40,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceGlass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  completed: {
    backgroundColor: 'rgba(46, 213, 115, 0.15)',
    borderColor: theme.colors.success,
  },
  today: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  dayText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  completedText: {
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  todayText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
});
