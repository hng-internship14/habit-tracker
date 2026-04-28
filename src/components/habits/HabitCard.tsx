'use client';

import React from 'react';
import { Habit } from '../../types/habit';
import { getHabitSlug } from '../../lib/slug';
import { calculateCurrentStreak } from '../../lib/streaks';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habit: Habit) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onEdit, onDelete }) => {
  const slug = getHabitSlug(habit.name);
  const streak = calculateCurrentStreak(habit.completions);
  const today = new Date().toLocaleDateString('en-CA');
  const isCompletedToday = habit.completions.includes(today);

  return (
    <div 
      data-testid={`habit-card-${slug}`}
      className="p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex flex-col gap-6 group hover:bg-white/[0.05] hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-black/40"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div 
            data-testid={`habit-streak-${slug}`}
            className="inline-flex items-center px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-4"
          >
            <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.450 0c-1.038 1.038-2.12 2.12-2.12 2.12s-1.082-1.082-2.12-2.12a1 1 0 00-1.450 0L3.255 4.553a1 1 0 000 1.450c1.038 1.038 2.12 2.12 2.12 2.12s-1.082 1.082-2.12 2.12a1 1 0 000 1.450l2.000 2.000a1 1 0 001.450 0c1.038-1.038 2.12-2.12 2.12-2.12s1.082 1.082 2.12 2.12a1 1 0 001.450 0l2.000-2.000a1 1 0 000-1.450c-1.038-1.038-2.12-2.12-2.12-2.12s1.082-1.082 2.12-2.12a1 1 0 000-1.450l-2.000-2.000z" clipRule="evenodd" />
            </svg>
            {streak} day streak
          </div>
          <h3 className="text-2xl font-black text-white mb-2 leading-tight tracking-tight">
            {habit.name}
          </h3>
          <p className="text-white/40 text-sm font-medium leading-relaxed line-clamp-2">
            {habit.description || 'No description provided.'}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          data-testid={`habit-complete-${slug}`}
          onClick={() => onToggle(habit)}
          className={`flex-1 py-4 px-6 rounded-2xl font-black transition-all flex items-center justify-center gap-2 text-sm group/btn ${
            isCompletedToday 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-white text-black hover:bg-white/90 shadow-xl shadow-white/5 active:scale-95'
          }`}
        >
          {isCompletedToday ? (
            <>
              <svg className="w-5 h-5 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Done</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Mark Done</span>
            </>
          )}
        </button>

        <div className="flex gap-2">
          <button
            data-testid={`habit-edit-${slug}`}
            onClick={() => onEdit(habit)}
            className="p-4 bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-white/40 hover:text-white"
            title="Edit habit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            data-testid={`habit-delete-${slug}`}
            onClick={() => onDelete(habit)}
            className="p-4 bg-red-500/5 backdrop-blur-xl hover:bg-red-500/10 border border-red-500/10 rounded-2xl transition-all text-red-500/40 hover:text-red-500"
            title="Delete habit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
