'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface Referral {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Pending' | 'Inactive';
  signupDate: string;
  earnings: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: string;
  method: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  balance: number;
  pendingEarnings: number;
  referrals: Referral[];
  transactions: Transaction[];
  country?: string;
  bio?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  signup: (phone: string, email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  simulateReferral: () => void;
  requestWithdrawal: (amount: number, method: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('rafiki_token');
    if (token) {
      validateSession();
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateSession = async () => {
    try {
      const token = localStorage.getItem('rafiki_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('rafiki_token');
      }
    } catch (error) {
      console.error('Session validation error:', error);
      localStorage.removeItem('rafiki_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Login error:', error);
        return false;
      }

      const data = await response.json();
      localStorage.setItem('rafiki_token', data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (phone: string, email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Signup error:', error);
        return false;
      }

      const data = await response.json();
      localStorage.setItem('rafiki_token', data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('rafiki_token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('rafiki_token');
      setUser(null);
      router.push('/');
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    // TODO: Implement API endpoint for profile updates
  };

  const simulateReferral = () => {
    if (!user) return;

    const firstNames = ['David', 'Mercy', 'Peter', 'Amani', 'Wanjiku', 'Nekesa', 'Juma', 'Otieno', 'Faith', 'Kibet'];
    const lastNames = ['Karanja', 'Kamau', 'Ondieki', 'Mwangi', 'Omwamba', 'Chepngetich', 'Kiprotich', 'Mutua', 'Ochieng'];
    const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const randomEmail = `${randomName.toLowerCase().replace(/\s+/g, '')}@example.com`;
    const randomAvatar = `https://avatar.vercel.sh/${randomName.replace(/\s+/g, '')}`;
    const randomStatus: 'Active' | 'Pending' = Math.random() > 0.3 ? 'Active' : 'Pending';

    const referralReward = randomStatus === 'Active' ? 1000 : 0;
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    const newReferral: Referral = {
      id: Date.now().toString(),
      name: randomName,
      email: randomEmail,
      avatar: randomAvatar,
      status: randomStatus,
      signupDate: dateStr,
      earnings: referralReward,
    };

    const newTransaction: Transaction | null = referralReward > 0 ? {
      id: (Date.now() + 1).toString(),
      date: dateStr,
      type: 'Referral Bonus',
      amount: referralReward,
      status: 'Completed',
      method: 'Platform',
    } : null;

    const updatedUser: User = {
      ...user,
      balance: user.balance + referralReward,
      pendingEarnings: user.pendingEarnings + (randomStatus === 'Pending' ? 1000 : 0),
      referrals: [newReferral, ...user.referrals],
      transactions: newTransaction ? [newTransaction, ...user.transactions] : user.transactions,
    };

    setUser(updatedUser);
    // TODO: Implement API endpoint for creating referrals
  };

  const requestWithdrawal = (amount: number, method: string): boolean => {
    if (!user || user.balance < amount) return false;

    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    const withdrawalTx: Transaction = {
      id: Date.now().toString(),
      date: dateStr,
      type: 'Withdrawal',
      amount: amount,
      status: 'Pending',
      method: method,
    };

    const updatedUser: User = {
      ...user,
      balance: user.balance - amount,
      transactions: [withdrawalTx, ...user.transactions],
    };

    setUser(updatedUser);
    // TODO: Implement API endpoint for withdrawal requests
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        simulateReferral,
        requestWithdrawal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
