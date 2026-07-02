'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface Referral {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Pending' | 'Inactive';
  signupDate: string;
  earnings: string;
}

export interface Transaction {
  id: number;
  date: string;
  type: string;
  amount: string;
  status: string;
  method: string;
}

export interface User {
  phone: string;
  name: string;
  balance: number;
  pendingEarnings: number;
  referrals: Referral[];
  transactions: Transaction[];
  country?: string;
  bio?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  signup: (phone: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  simulateReferral: () => void;
  requestWithdrawal: (amount: number, method: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SEED_REFERRALS: Referral[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://avatar.vercel.sh/sarah',
    status: 'Active',
    signupDate: 'Jun 28, 2026',
    earnings: 'KES 1,000',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://avatar.vercel.sh/mike',
    status: 'Pending',
    signupDate: 'Jun 25, 2026',
    earnings: 'KES 0',
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://avatar.vercel.sh/emma',
    status: 'Active',
    signupDate: 'Jun 20, 2026',
    earnings: 'KES 1,000',
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    avatar: 'https://avatar.vercel.sh/alex',
    status: 'Active',
    signupDate: 'Jun 15, 2026',
    earnings: 'KES 1,000',
  },
  {
    id: 5,
    name: 'Lisa Wong',
    email: 'lisa@example.com',
    avatar: 'https://avatar.vercel.sh/lisa',
    status: 'Inactive',
    signupDate: 'May 28, 2026',
    earnings: 'KES 0',
  },
  {
    id: 6,
    name: 'James Murphy',
    email: 'james@example.com',
    avatar: 'https://avatar.vercel.sh/james',
    status: 'Active',
    signupDate: 'May 12, 2026',
    earnings: 'KES 1,000',
  },
];

const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    date: 'Jun 28, 2026',
    type: 'Withdrawal',
    amount: 'KES 12,000',
    status: 'Completed',
    method: 'M-Pesa',
  },
  {
    id: 2,
    date: 'Jun 15, 2026',
    type: 'Referral Bonus',
    amount: 'KES 2,000',
    status: 'Completed',
    method: 'Platform',
  },
  {
    id: 3,
    date: 'Jun 14, 2026',
    type: 'Withdrawal',
    amount: 'KES 8,000',
    status: 'Completed',
    method: 'M-Pesa',
  },
  {
    id: 4,
    date: 'Jun 01, 2026',
    type: 'Withdrawal',
    amount: 'KES 5,000',
    status: 'Completed',
    method: 'M-Pesa',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load auth user and registered users from localStorage
    const savedUserJson = localStorage.getItem('rafiki_current_user');
    if (savedUserJson) {
      setUser(JSON.parse(savedUserJson));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Basic verification from mock DB in localStorage
    const usersJson = localStorage.getItem('rafiki_users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Find matching user
    const existingUser = users.find((u: any) => u.phone === phone && u.password === password);
    
    if (existingUser) {
      const userDetails: User = {
        phone: existingUser.phone,
        name: existingUser.name,
        balance: existingUser.balance ?? 24000,
        pendingEarnings: existingUser.pendingEarnings ?? 3000,
        referrals: existingUser.referrals ?? SEED_REFERRALS,
        transactions: existingUser.transactions ?? SEED_TRANSACTIONS,
        email: existingUser.email ?? `${existingUser.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        country: existingUser.country ?? 'Kenya',
        bio: existingUser.bio ?? 'Rafiki Rewards Promoter. Sharing links, making impact!',
      };
      
      setUser(userDetails);
      localStorage.setItem('rafiki_current_user', JSON.stringify(userDetails));
      return true;
    }
    
    // If no user exists yet in localStorage, create a default "demo" account if credentials are "0712345678" and "password"
    if (phone === '0712345678' && password === 'password') {
      const defaultUser: User = {
        phone: '0712345678',
        name: 'John Doe',
        balance: 24000,
        pendingEarnings: 3000,
        referrals: SEED_REFERRALS,
        transactions: SEED_TRANSACTIONS,
        email: 'john@example.com',
        country: 'Kenya',
        bio: 'Digital marketer and content creator focused on affiliate marketing.',
      };
      setUser(defaultUser);
      localStorage.setItem('rafiki_current_user', JSON.stringify(defaultUser));
      
      // Save to mock DB as well
      const newUsersList = [...users, { ...defaultUser, password }];
      localStorage.setItem('rafiki_users', JSON.stringify(newUsersList));
      return true;
    }

    return false;
  };

  const signup = async (phone: string, password: string, name: string): Promise<boolean> => {
    const usersJson = localStorage.getItem('rafiki_users') || '[]';
    const users = JSON.parse(usersJson);

    // Check if phone already registered
    if (users.some((u: any) => u.phone === phone)) {
      return false; // already exists
    }

    const newUserObj = {
      phone,
      password,
      name,
      balance: 0,
      pendingEarnings: 0,
      referrals: [],
      transactions: [],
      email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      country: 'Kenya',
      bio: 'Rafiki Rewards Promoter. Sharing links, making impact!',
    };

    const newUsersList = [...users, newUserObj];
    localStorage.setItem('rafiki_users', JSON.stringify(newUsersList));

    // Log the user in directly
    const userDetails: User = {
      phone: newUserObj.phone,
      name: newUserObj.name,
      balance: newUserObj.balance,
      pendingEarnings: newUserObj.pendingEarnings,
      referrals: newUserObj.referrals,
      transactions: newUserObj.transactions,
      email: newUserObj.email,
      country: newUserObj.country,
      bio: newUserObj.bio,
    };

    setUser(userDetails);
    localStorage.setItem('rafiki_current_user', JSON.stringify(userDetails));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rafiki_current_user');
    router.push('/');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('rafiki_current_user', JSON.stringify(updatedUser));

    // Sync back to users list
    const usersJson = localStorage.getItem('rafiki_users') || '[]';
    const users = JSON.parse(usersJson);
    const updatedUsers = users.map((u: any) => {
      if (u.phone === user.phone) {
        return { ...u, ...data };
      }
      return u;
    });
    localStorage.setItem('rafiki_users', JSON.stringify(updatedUsers));
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
      id: Date.now(),
      name: randomName,
      email: randomEmail,
      avatar: randomAvatar,
      status: randomStatus,
      signupDate: dateStr,
      earnings: `KES ${referralReward.toLocaleString()}`,
    };

    const newTransaction: Transaction | null = referralReward > 0 ? {
      id: Date.now() + 1,
      date: dateStr,
      type: 'Referral Bonus',
      amount: `KES ${referralReward.toLocaleString()}`,
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
    localStorage.setItem('rafiki_current_user', JSON.stringify(updatedUser));

    // Update in all users database
    const usersJson = localStorage.getItem('rafiki_users') || '[]';
    const users = JSON.parse(usersJson);
    const updatedUsers = users.map((u: any) => {
      if (u.phone === user.phone) {
        return {
          ...u,
          balance: updatedUser.balance,
          pendingEarnings: updatedUser.pendingEarnings,
          referrals: updatedUser.referrals,
          transactions: updatedUser.transactions,
        };
      }
      return u;
    });
    localStorage.setItem('rafiki_users', JSON.stringify(updatedUsers));
  };

  const requestWithdrawal = (amount: number, method: string): boolean => {
    if (!user || user.balance < amount) return false;

    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    const withdrawalTx: Transaction = {
      id: Date.now(),
      date: dateStr,
      type: 'Withdrawal',
      amount: `KES ${amount.toLocaleString()}`,
      status: 'Completed',
      method: method === 'mpesa' ? 'M-Pesa' : 'Bank Transfer',
    };

    const updatedUser: User = {
      ...user,
      balance: user.balance - amount,
      transactions: [withdrawalTx, ...user.transactions],
    };

    setUser(updatedUser);
    localStorage.setItem('rafiki_current_user', JSON.stringify(updatedUser));

    // Update in all users database
    const usersJson = localStorage.getItem('rafiki_users') || '[]';
    const users = JSON.parse(usersJson);
    const updatedUsers = users.map((u: any) => {
      if (u.phone === user.phone) {
        return {
          ...u,
          balance: updatedUser.balance,
          transactions: updatedUser.transactions,
        };
      }
      return u;
    });
    localStorage.setItem('rafiki_users', JSON.stringify(updatedUsers));

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
