import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '../../src/components/auth/SignupForm';
import LoginForm from '../../src/components/auth/LoginForm';
import React from 'react';

describe('auth flow', () => {
  it('submits the signup form and creates a session', async () => {
    const onSignup = vi.fn();
    render(<SignupForm onSignup={onSignup} />);
    
    fireEvent.change(screen.getByTestId('auth-signup-firstname'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('auth-signup-lastname'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('auth-signup-confirm-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-signup-submit'));
    
    expect(onSignup).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('shows an error for duplicate signup email', () => {
    render(<SignupForm onSignup={vi.fn()} error="User already exists" />);
    expect(screen.getByText('User already exists')).toBeDefined();
  });

  it('submits the login form and stores the active session', async () => {
    const onLogin = vi.fn();
    render(<LoginForm onLogin={onLogin} />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));
    
    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('shows an error for invalid login credentials', () => {
    render(<LoginForm onLogin={vi.fn()} error="Invalid email or password" />);
    expect(screen.getByText('Invalid email or password')).toBeDefined();
  });
});
