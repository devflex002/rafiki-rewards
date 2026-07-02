'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CaptchaGame } from '@/components/auth/captcha-game';
import { ArrowRight, AlertCircle, Phone, Lock, User, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      setError('Please complete the verification game first.');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const success = await signup(phone, password, name);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('This phone number is already registered.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">

      {/* Main Signup Card */}
      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-6 rounded-2xl shadow-2xl relative z-10 space-y-4">
        {/* Header / Logo */}
        <div className="flex flex-col items-center  text-center">
          <div className="relative w-48 h-48 -mt-8 mx-auto">
            <Image 
              src="/logo.png" 
              alt="Rafiki Rewards Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl -mt-12 font-black tracking-tight text-white flex items-center gap-1.5 justify-center">
            Create account 
          </h1>
          <p className="text-xs mt-2 text-zinc-400 font-medium">
            Start earning KES 1000 per referral today!
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-400  flex items-center gap-1.5">
              <User className="h-3 w-3" /> Full Name
            </label>
            <Input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-650 focus-visible:ring-purple-600 h-10 text-sm"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-400  flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> Phone Number
            </label>
            <Input
              type="text"
              placeholder="e.g. 0712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-650 focus-visible:ring-purple-600 h-10 text-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-650 focus-visible:ring-purple-600 h-10 text-sm mb-4"
            />
          </div>

          {/* Captcha Verification Game */}
          <div className="pt-2">
            <CaptchaGame onVerify={setIsVerified} />
          </div>

          <Button
            type="submit"
            disabled={loading || !isVerified}
            className={`w-full font-bold h-10 text-sm mt-4 transition-all duration-300 ${
              isVerified
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] active:scale-[0.98]'
                : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50 cursor-not-allowed'
            }`}
          >
            {loading ? 'Creating account...' : 'Create Account'}
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </form>

        {/* Footer info */}
        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-850">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors font-sans">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
