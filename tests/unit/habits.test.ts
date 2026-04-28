import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '../../src/lib/habits';
import { Habit } from '../../src/types/habit';

describe('toggleHabitCompletion', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'user1',
    name: 'Drink Water',
    description: '8 glasses a day',
    frequency: 'daily',
    createdAt: '2026-04-01T00:00:00Z',
    completions: ['2026-04-25'],
  };

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(mockHabit, '2026-04-26');
    expect(result.completions).toContain('2026-04-26');
    expect(result.completions.length).toBe(2);
  });

  it('removes a completion date when the date already exists', () => {
    const result = toggleHabitCompletion(mockHabit, '2026-04-25');
    expect(result.completions).not.toContain('2026-04-25');
    expect(result.completions.length).toBe(0);
  });

  it('does not mutate the original habit object', () => {
    const originalCompletionsCount = mockHabit.completions.length;
    toggleHabitCompletion(mockHabit, '2026-04-26');
    expect(mockHabit.completions.length).toBe(originalCompletionsCount);
  });

  it('does not return duplicate completion dates', () => {
    const habitWithDupes = { ...mockHabit, completions: ['2026-04-25', '2026-04-25'] };
    const result = toggleHabitCompletion(habitWithDupes, '2026-04-26');
    const uniqueCompletions = new Set(result.completions);
    expect(uniqueCompletions.size).toBe(result.completions.length);
  });
});
