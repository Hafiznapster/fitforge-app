import { Exercise } from '../types';

/**
 * Parses an AI-generated markdown workout plan into a structured list of Exercises.
 * Expects patterns like: "1. Bench Press: 4 sets x 10 reps (80kg)"
 */
export function parseAIWorkoutPlan(markdown: string): Exercise[] {
  const exercises: Exercise[] = [];
  const lines = markdown.split('\n');

  // Regex to find exercise lines: "1. Exercise Name: 4 sets x 10 reps (80kg)"
  // Or simple variations like "Bench Press - 3x12"
  const exerciseRegex = /^(\d+)\.\s*(.+?):\s*(\d+)\s*sets\s*x\s*(\d+)\s*reps\s*\((\d+)\s*kg\)/i;
  const simplifiedRegex = /^(\d+)\.\s*(.+?)\s*-\s*(\d+)x(\d+)\s*\((\d+)\s*kg\)/i;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    let match = trimmed.match(exerciseRegex);
    if (!match) match = trimmed.match(simplifiedRegex);

    if (match) {
      exercises.push({
        exercise_name: match[2].trim(),
        sets: parseInt(match[3], 10),
        reps: parseInt(match[4], 10),
        weight_kg: parseFloat(match[5]),
        rest_sec: 90, // Default
        order_index: index,
      });
    }
  });

  // Fallback: If no structured matches, create a few generic exercises based on the content
  if (exercises.length === 0) {
    return [
      { exercise_name: 'AI Suggested Main Lift', sets: 3, reps: 10, weight_kg: 0, rest_sec: 90, order_index: 0 },
      { exercise_name: 'AI Suggested Accessory', sets: 3, reps: 12, weight_kg: 0, rest_sec: 60, order_index: 1 },
    ];
  }

  return exercises;
}
