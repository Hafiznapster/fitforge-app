import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { theme } from '../../constants/theme';

export function BodyMetrics() {
  const [weight, setWeight] = useState('75.5');
  const [bodyFat, setBodyFat] = useState('18.2');

  const handleLog = () => {
    // In Phase 2: Send to supabase body_metrics table
  };

  return (
    <Card variant="glass" style={styles.card}>
      <Text style={styles.title}>Body Metrics</Text>
      
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput 
            style={styles.input} 
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.spacer} />
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Body Fat (%)</Text>
          <TextInput 
            style={styles.input} 
            value={bodyFat}
            onChangeText={setBodyFat}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Button label="Log Metrics" onPress={handleLog} variant="secondary" />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  inputGroup: {
    flex: 1,
  },
  spacer: {
    width: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
