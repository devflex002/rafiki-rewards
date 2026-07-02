'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, AlertCircle, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!phone || !password) {
      setError('Please enter both phone number and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const success = await login(phone, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid phone number or password. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please check your connection and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
        </div>
      ) : (
        <>
          {/* Background Glows */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Main Login Card */}
          <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl shadow-2xl relative z-10 space-y-6">
            {/* Header / Logo */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src="/logo.png"
                  alt="Rafiki Rewards Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white">Welcome back</h1>
              <p className="text-xs text-zinc-400 font-medium">
                Enter your phone details to access your dashboard
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="h-3 w-3" /> Phone Number
                </label>
                <Input
                  type="text"
                  placeholder="e.g. 0712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600 focus-visible:ring-purple-600 h-10 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="h-3 w-3" /> Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-650 focus-visible:ring-purple-600 h-10 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold h-10 text-sm mt-2 transition-all shadow-[0_0_20px_rgba(147,51,234,0.2)] active:scale-[0.98]"
              >
                {loading ? 'Logging in...' : 'Sign In'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>

            {/* Footer info */}
            <div className="text-center text-xs text-zinc-500 pt-2  border-zinc-850">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
