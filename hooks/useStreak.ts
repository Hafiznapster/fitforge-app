import { useState, useEffect } from 'react';

export function useStreak() {
  const [streak, setStreak] = useState(0);

  // Simulated logic for fetching from MMKV/Supabase
  useEffect(() => {
    // Check local storage for last active workout date
    // Compare to today
    // If consecutive, setStreak to X. If missed, reset to 0.
    setStreak(4); // Mock active streak
  }, []);

  return { streak };
}
