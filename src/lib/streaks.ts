export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (completions.length === 0) return 0;

  const currentToday = today || new Date().toLocaleDateString('en-CA');
  const uniqueDates = new Set(completions);

  let streak = 0;
  let checkDateStr = currentToday;

  // If not completed today, check if it was completed yesterday to keep streak alive
  if (!uniqueDates.has(currentToday)) {
    const yesterday = new Date(currentToday + 'T00:00:00Z');
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    checkDateStr = yesterday.toISOString().split('T')[0];
  }

  while (uniqueDates.has(checkDateStr)) {
    streak++;
    const date = new Date(checkDateStr + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() - 1);
    checkDateStr = date.toISOString().split('T')[0];
  }

  return streak;
}
