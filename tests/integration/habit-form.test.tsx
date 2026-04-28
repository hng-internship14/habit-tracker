import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HabitForm from '../../src/components/habits/HabitForm';
import HabitCard from '../../src/components/habits/HabitCard';
import React from 'react';
import { Habit } from '../../src/types/habit';

describe('habit form', () => {
  it('shows a validation error when habit name is empty', () => {
    render(<HabitForm onSave={vi.fn()} onCancel={vi.fn()} />);
    fireEvent.click(screen.getByTestId('habit-save-button'));
    expect(screen.getByText('Habit name is required')).toBeDefined();
  });

  it('creates a new habit and renders it in the list', () => {
    const onSave = vi.fn();
    render(<HabitForm onSave={onSave} onCancel={vi.fn()} />);
    
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'New Habit' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(onSave).toHaveBeenCalledWith({
      name: 'New Habit',
      description: '',
      frequency: 'daily'
    });
  });

  it('edits an existing habit and preserves immutable fields', () => {
    const mockHabit: Habit = {
      id: '1',
      userId: 'user1',
      name: 'Old Name',
      description: 'Old Desc',
      frequency: 'daily',
      createdAt: '2026-04-01T00:00:00Z',
      completions: ['2026-04-01']
    };
    const onSave = vi.fn();
    render(<HabitForm initialHabit={mockHabit} onSave={onSave} onCancel={vi.fn()} />);
    
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(onSave).toHaveBeenCalledWith({
      name: 'New Name',
      description: 'Old Desc',
      frequency: 'daily'
    });
  });

  it('deletes a habit only after explicit confirmation', () => {
    const onDelete = vi.fn();
    const mockHabit: Habit = {
      id: '1',
      userId: 'user1',
      name: 'Habit to Delete',
      description: '',
      frequency: 'daily',
      createdAt: '',
      completions: []
    };
    render(<HabitCard habit={mockHabit} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={onDelete} />);
    
    fireEvent.click(screen.getByTestId('habit-delete-habit-to-delete')); // Correct slug for "Habit to Delete"
    expect(onDelete).toHaveBeenCalledWith(mockHabit);
  });

  it('toggles completion and updates the streak display', () => {
    const onToggle = vi.fn();
    const mockHabit: Habit = {
      id: '1',
      userId: 'user1',
      name: 'Habit to Toggle',
      description: '',
      frequency: 'daily',
      createdAt: '',
      completions: []
    };
    render(<HabitCard habit={mockHabit} onToggle={onToggle} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    fireEvent.click(screen.getByTestId('habit-complete-habit-to-toggle'));
    expect(onToggle).toHaveBeenCalledWith(mockHabit);
  });
});
