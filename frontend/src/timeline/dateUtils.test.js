import { dayOffset } from './dateUtils';

describe('dayOffset', () => {
  test('calculates days between two dates correctly', () => {
    const start = new Date('2026-01-01');
    const end = new Date('2026-01-10');
    expect(dayOffset(start, end)).toBe(9);
  });

  test('returns 0 for same date', () => {
    const date = new Date('2026-01-01');
    expect(dayOffset(date, date)).toBe(0);
  });

  test('handles month boundaries', () => {
    const start = new Date('2025-12-25');
    const end = new Date('2026-01-05');
    expect(dayOffset(start, end)).toBe(11);
  });
});