import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '../../src/lib/streaks';

/* MENTOR_TRACE_STAGE3_HABIT_A91 */
describe('calculateCurrentStreak', () => {
  it('returns 0 when completions is empty', () => {
    expect(calculateCurrentStreak([])).toBe(0);
  });

  it('returns the streak length if completed yesterday even if not completed today', () => {
    const today = '2026-04-27';
    const completions = ['2026-04-26'];
    expect(calculateCurrentStreak(completions, today)).toBe(1);
  });

  it('returns the correct streak for consecutive completed days', () => {
    const today = '2026-04-27';
    const completions = ['2026-04-27', '2026-04-26', '2026-04-25'];
    expect(calculateCurrentStreak(completions, today)).toBe(3);
  });

  it('ignores duplicate completion dates', () => {
    const today = '2026-04-27';
    const completions = ['2026-04-27', '2026-04-27', '2026-04-26'];
    expect(calculateCurrentStreak(completions, today)).toBe(2);
  });

  it('breaks the streak when more than one calendar day is missing', () => {
    const today = '2026-04-27';
    const completions = ['2026-04-27', '2026-04-25'];
    expect(calculateCurrentStreak(completions, today)).toBe(1);
  });

  it('returns 0 when neither today nor yesterday is completed', () => {
    const today = '2026-04-27';
    const completions = ['2026-04-25'];
    expect(calculateCurrentStreak(completions, today)).toBe(0);
  });
});
