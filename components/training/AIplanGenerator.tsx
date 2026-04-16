import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { theme } from '../../constants/theme';
import { Exercise } from '../../types';
import { aiService } from '../../services/aiService';
import { parseAIWorkoutPlan } from '../../services/aiParser';

interface AIplanGeneratorProps {
  onPlanGenerated: (name: string, plan: Exercise[]) => void;
}

export function AIplanGenerator({ onPlanGenerated }: AIplanGeneratorProps) {
  const [visible, setVisible] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState('Chest');
  const [experience, setExperience] = useState('intermediate');
  const [loading, setLoading] = useState(false);

  const MUSCLES = ['Chest', 'Back', 'Legs', 'Arms', 'Core', 'Full Body'];
  const EXP = ['beginner', 'intermediate', 'expert'];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await aiService.getWorkoutPlan(muscleGroup, experience);
      const exercises = parseAIWorkoutPlan(response.content);

      setVisible(false);
      onPlanGenerated(`${muscleGroup} AI Plan`, exercises);
    } catch (error) {
      console.error('AI Plan Generation Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button label="Generate with AI ✨" onPress={() => setVisible(true)} variant="secondary" />

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <Card variant="solid" style={styles.modalContent}>
            <Text style={styles.title}>AI Plan Generator</Text>

            <Text style={styles.label}>Target Muscle Group</Text>
            <View style={styles.chipRow}>
              {MUSCLES.map(m => (
                <TouchableOpacity
                  key={m}
                  style={[styles.chip, muscleGroup === m && styles.chipActive]}
                  onPress={() => setMuscleGroup(m)}
                >
                  <Text style={[styles.chipText, muscleGroup === m && styles.chipTextActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Experience Level</Text>
            <View style={styles.chipRow}>
              {EXP.map(e => (
                <TouchableOpacity
                  key={e}
                  style={[styles.chip, experience === e && styles.chipActive]}
                  onPress={() => setExperience(e)}
                >
                  <Text style={[styles.chipText, experience === e && styles.chipTextActive]}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.actions}>
              <Button label="Cancel" variant="ghost" onPress={() => setVisible(false)} style={{ flex: 1 }} />
              <Button label="Generate" onPress={handleGenerate} isLoading={loading} style={{ flex: 1 }} />
            </View>
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    marginHorizontal: 0,
    borderWidth: 0,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: theme.colors.primaryHover,
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.textMuted,
  },
  chipTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
  },
});
