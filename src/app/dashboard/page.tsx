'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Habit } from '../../types/habit';
import { getHabits, setHabits } from '../../lib/storage';
import { toggleHabitCompletion } from '../../lib/habits';
import HabitCard from '../../components/habits/HabitCard';
import HabitForm from '../../components/habits/HabitForm';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const [habits, setHabitsState] = useState<Habit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  useEffect(() => {
    if (user) {
      const allHabits = getHabits();
      setHabitsState(allHabits.filter((h) => h.userId === user.userId));
    }
  }, [user]);

  const handleSaveHabit = (data: { name: string; description: string; frequency: 'daily' }) => {
    const allHabits = getHabits();
    let updatedHabits: Habit[];

    if (editingHabit) {
      updatedHabits = allHabits.map((h) =>
        h.id === editingHabit.id ? { ...h, ...data } : h
      );
    } else {
      const newHabit: Habit = {
        id: Math.random().toString(36).substring(2, 11),
        userId: user!.userId,
        ...data,
        createdAt: new Date().toISOString(),
        completions: [],
      };
      updatedHabits = [...allHabits, newHabit];
    }

    setHabits(updatedHabits);
    setHabitsState(updatedHabits.filter((h) => h.userId === user!.userId));
    setIsFormOpen(false);
    setEditingHabit(undefined);
  };

  const handleToggleHabit = (habit: Habit) => {
    const allHabits = getHabits();
    const today = new Date().toLocaleDateString('en-CA');
    const updatedAll = allHabits.map((h) =>
      h.id === habit.id ? toggleHabitCompletion(h, today) : h
    );
    setHabits(updatedAll);
    setHabitsState(updatedAll.filter((h) => h.userId === user!.userId));
  };

  const handleDeleteHabit = (habit: Habit) => {
    if (confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      const allHabits = getHabits();
      const updatedAll = allHabits.filter((h) => h.id !== habit.id);
      setHabits(updatedAll);
      setHabitsState(updatedAll.filter((h) => h.userId === user!.userId));
    }
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div 
      data-testid="dashboard-page"
      className="min-h-screen bg-black text-white p-6 md:p-12 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/20 via-black to-black"
    >
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-16 sticky top-0 z-30 py-4 backdrop-blur-md bg-black/20 rounded-3xl px-6 border border-white/5">
        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 tracking-tight mb-2">
            My Habits
          </h1>
          <p className="text-white/40 font-medium">
            Keep going, <span className="text-indigo-400">{user.firstName}</span>. You're doing great.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingHabit(undefined);
              setIsFormOpen(true);
            }}
            data-testid="create-habit-button"
            className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-white/90 transition-all active:scale-95 shadow-xl shadow-white/10 hidden md:flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Habit</span>
          </button>
          <button
            onClick={logout}
            data-testid="auth-logout-button"
            className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 group"
            title="Logout"
          >
            <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {habits.length === 0 ? (
          <div 
            data-testid="empty-state"
            className="flex flex-col items-center justify-center py-32 px-8 bg-white/5 border-2 border-dashed border-white/5 rounded-[3rem] text-center"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">No habits yet</h2>
            <p className="text-white/40 max-w-sm mb-10 font-medium leading-relaxed">
              Start your journey to better habits by creating your first one today.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-10 py-4 bg-white text-black font-black rounded-[2rem] hover:bg-white/90 transition-all active:scale-95"
            >
              Start New Habit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={handleToggleHabit}
                onEdit={(h) => {
                  setEditingHabit(h);
                  setIsFormOpen(true);
                }}
                onDelete={handleDeleteHabit}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full shadow-2xl flex items-center justify-center md:hidden z-40 active:scale-90 transition-transform"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {isFormOpen && (
        <HabitForm
          initialHabit={editingHabit}
          onSave={handleSaveHabit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingHabit(undefined);
          }}
        />
      )}
    </div>
  );
}
