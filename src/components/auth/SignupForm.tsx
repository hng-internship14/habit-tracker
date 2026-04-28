'use client';

import React, { useState } from 'react';

interface SignupFormProps {
  onSignup: (data: { firstName: string; lastName: string; email: string; password: string }) => void;
  error?: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, error: externalError }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    onSignup({ firstName, lastName, email, password });
  };

  const displayError = error || externalError;

  return (
    <div className="w-full max-w-md p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20">
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/20 rotate-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Create Account</h2>
        <p className="text-white/40 font-medium">Start your habit journey today.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="firstName">
              First Name
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                id="firstName"
                type="text"
                data-testid="auth-signup-firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.08] transition-all font-medium"
                placeholder="John"
                required
              />
            </div>
          </div>
          <div className="relative group">
            <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="lastName">
              Last Name
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                id="lastName"
                type="text"
                data-testid="auth-signup-lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.08] transition-all font-medium"
                placeholder="Doe"
                required
              />
            </div>
          </div>
        </div>

        <div className="relative group">
          <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              data-testid="auth-signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.08] transition-all font-medium"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              id="password"
              type="password"
              data-testid="auth-signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.08] transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-[10px] font-black text-white/40 mb-2 ml-1 uppercase tracking-[0.2em]" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <input
              id="confirmPassword"
              type="password"
              data-testid="auth-signup-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.08] transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        
        {displayError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold flex items-center gap-3 animate-shake">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {displayError}
          </div>
        )}

        <button
          type="submit"
          data-testid="auth-signup-submit"
          className="w-full py-5 px-4 bg-white text-black font-black rounded-2xl transition-all shadow-xl shadow-white/10 active:scale-[0.98] text-lg mt-4 flex items-center justify-center gap-3 group"
        >
          <span>Get Started</span>
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
