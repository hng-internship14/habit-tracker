import { User, Session } from '../types/auth';
import { Habit } from '../types/habit';

const KEYS = {
  USERS: 'habit-tracker-users',
  SESSION: 'habit-tracker-session',
  HABITS: 'habit-tracker-habits',
};

// Generic storage helpers
const get = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const set = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Auth
export const getUsers = (): User[] => get<User[]>(KEYS.USERS) || [];
export const setUsers = (users: User[]): void => set(KEYS.USERS, users);

export const getSession = (): Session | null => get<Session>(KEYS.SESSION);
export const setSession = (session: Session | null): void => set(KEYS.SESSION, session);

// Habits
export const getHabits = (): Habit[] => get<Habit[]>(KEYS.HABITS) || [];
export const setHabits = (habits: Habit[]): void => set(KEYS.HABITS, habits);

export const getUserHabits = (userId: string): Habit[] => {
  return getHabits().filter((h) => h.userId === userId);
};
