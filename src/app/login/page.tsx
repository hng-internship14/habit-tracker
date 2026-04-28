'use client';

import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  const { login, error } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Habit Tracker</h1>
        <p className="text-foreground/40">Sign in to your account</p>
      </div>
      
      <LoginForm onLogin={login} error={error} />
      
      <p className="mt-8 text-white/40 text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Create one now
        </Link>
      </p>
    </div>
  );
}
