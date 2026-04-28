'use client';

import React, { useState } from 'react';
import { Habit } from '../../types/habit';
import { validateHabitName } from '../../lib/validators';

interface HabitFormProps {
  initialHabit?: Habit;
  onSave: (data: { name: string; description: string; frequency: 'daily' }) => void;
  onCancel: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ initialHabit, onSave, onCancel }) => {
  const [name, setName] = useState(initialHabit?.name || '');
  const [description, setDescription] = useState(initialHabit?.description || '');
  const [frequency, setFrequency] = useState<'daily'>('daily');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateHabitName(name);
    
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onSave({ name: validation.value, description, frequency });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 transition-all duration-500">
      <div 
        data-testid="habit-form"
        className="w-full max-w-lg bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.6)] relative transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            {initialHabit ? 'Edit Habit' : 'Create Habit'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="habit-name">
              Habit Name
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <input
                id="habit-name"
                data-testid="habit-name-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                className={`w-full bg-white/[0.03] border rounded-2xl pl-14 pr-5 py-4 text-white focus:outline-none focus:ring-2 transition-all ${
                  error ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-indigo-500/50 focus:bg-white/[0.06]'
                }`}
                placeholder="e.g. Morning Meditation"
              />
            </div>
            {error && <p className="mt-2 ml-1 text-red-400 text-xs font-bold animate-pulse">{error}</p>}
          </div>

          <div className="relative group">
            <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="habit-desc">
              Description (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-6 text-white/20 group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </span>
              <textarea
                id="habit-desc"
                data-testid="habit-description-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.06] transition-all resize-none h-32"
                placeholder="Why are you doing this?"
              />
            </div>
          </div>

          <div className="relative group">
            <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="habit-freq">
              Frequency
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <select
                id="habit-freq"
                data-testid="habit-frequency-select"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'daily')}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-10 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="daily" className="bg-zinc-900 text-white">Daily</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 px-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/10 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="habit-save-button"
              className="flex-1 py-4 px-4 bg-white text-black font-black rounded-2xl transition-all shadow-xl shadow-white/5 active:scale-95 flex items-center justify-center gap-2 group/save"
            >
              <span>Save Habit</span>
              <svg className="w-5 h-5 transition-transform group-hover/save:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
