'use client';

import { useAuth } from '../../context/AuthContext';
import SignupForm from '../../components/auth/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  const { signup, error } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Habit Tracker</h1>
        <p className="text-foreground/40">Start your journey today</p>
      </div>
      
      <SignupForm onSignup={(data) => signup(data)} error={error} />
      
      <p className="mt-8 text-white/40 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Sign in instead
        </Link>
      </p>
    </div>
  );
}
