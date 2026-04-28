'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Session } from '../types/auth';
import { getUsers, setUsers, getSession, setSession } from '../lib/storage';
import Toast from '../components/shared/Toast';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  error: string | null;
  toast: { message: string; type: 'success' | 'error' } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    const users = getUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const session = { 
        userId: foundUser.id, 
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName
      };
      setSession(session);
      setUser(session);
      setToast({ message: 'Welcome back!', type: 'success' });
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const signup = async (data: SignupData) => {
    setError(null);
    const users = getUsers();
    
    if (users.find((u) => u.email === data.email)) {
      setError('User already exists');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString(),
    };

    const newUsers = [...users, newUser];
    setUsers(newUsers);

    const session = { 
      userId: newUser.id, 
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName
    };
    setSession(session);
    setUser(session);
    setToast({ message: 'Account created successfully!', type: 'success' });
    router.push('/dashboard');
  };

  const logout = () => {
    setSession(null);
    setUser(null);
    setToast({ message: 'Logged out successfully', type: 'success' });
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, error, toast }}>
      {children}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
