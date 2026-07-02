'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const faqs = [
    {
      q: "How much do I earn per referral?",
      a: "You earn KES 1,000 for every friend who signs up using your unique link and activates their account. There is no cap on how many friends you can refer."
    },
    {
      q: "How do I withdraw my earnings?",
      a: "Once your balance reaches KES 5,000, you can request a direct payout. We support instant withdrawals directly to M-Pesa or Bank Transfer."
    },
    {
      q: "Is there a signup fee to join Rafiki Rewards?",
      a: "No, joining Rafiki Rewards is completely free. You do not need to buy any package or subscription to refer and earn."
    },
    {
      q: "How are referrals verified?",
      a: "Our tracking system automatically records signups from your referral link. To prevent fraud, accounts must be verified through SMS or email confirmation."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
      {/* Navigation */}
      <header className="border-b border-zinc-900 bg-zinc-950 px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-1 sm:gap-2 group flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image width={48} height={48} src="/logo.png" alt="Rafiki Rewards Logo" className="object-contain" />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-base sm:text-lg font-bold text-white leading-tight">Rafiki Rewards</span>
              <span className="text-xs text-zinc-500 font-bold">Refer & Earn</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded text-xs sm:text-sm px-3 sm:px-4 py-2 font-bold transition-all">
                  Dashboard
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
                  Log In
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded text-xs sm:text-sm px-3 sm:px-4 py-2 font-bold transition-all">
                    Register
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Banner Background */}
      <section className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/banner.jpeg"
            alt="Rafiki Rewards Banner"
            fill
            priority
            className="object-cover object-center w-full h-full"
            sizes="100vw"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center space-y-6 sm:space-y-8 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Refer your friends.<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Earn KES 1000</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-zinc-100 max-w-xl mx-auto leading-relaxed font-medium">
              A clean, no-nonsense referral system. Share your custom link, track signups in real-time, and withdraw your earnings directly to M-Pesa.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
              <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 font-bold rounded transition-all duration-300 shadow-lg hover:shadow-purple-600/50">
                  {isAuthenticated ? "Go to Dashboard" : "Start Earning Now"}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-zinc-900/30 border-t border-b border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white tracking-tight">
            Three Steps to Get Paid
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className="p-4 sm:p-5 md:p-6 bg-zinc-900 border border-zinc-850 rounded-lg space-y-3 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 01</div>
              <h3 className="text-base sm:text-lg font-bold text-white">Join Rafiki</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                Create a free account in under a minute. No payment or subscription is required to join.
              </p>
            </div>
            <div className="p-4 sm:p-5 md:p-6 bg-zinc-900 border border-zinc-850 rounded-lg space-y-3 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 02</div>
              <h3 className="text-base sm:text-lg font-bold text-white">Share Your URL</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                Copy your unique link and share it on WhatsApp, Telegram, text messages, or social feeds.
              </p>
            </div>
            <div className="p-4 sm:p-5 md:p-6 bg-zinc-900 border border-zinc-850 rounded-lg space-y-3 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 03</div>
              <h3 className="text-base sm:text-lg font-bold text-white">Earn KES 1,000</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                Get KES 1,000 credited to your dashboard for every verified signup. Withdraw instantly via M-Pesa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="border border-zinc-900 bg-zinc-900/30 rounded-lg overflow-hidden hover:border-zinc-800 transition-all duration-300">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-zinc-200 focus:outline-none hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 flex-shrink-0 ml-3" />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 sm:pt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-850">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer & Newsletter */}
      <footer className="border-t border-zinc-900 py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 bg-zinc-950 text-xs sm:text-sm text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
          {/* Logo and Branding */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pb-6 sm:pb-8 border-b border-zinc-900">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                <Image src="/logo.png" alt="Rafiki Rewards Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-zinc-300 text-sm sm:text-base">Rafiki Rewards</span>
            </div>

            {/* Newsletter Signup */}
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:max-w-sm ml-auto">
              <input
                type="email"
                placeholder="Join newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 sm:py-2.5 bg-zinc-900 border border-zinc-850 rounded focus:outline-none focus:border-zinc-700 text-xs sm:text-sm text-white placeholder-zinc-650"
                required
              />
              <button type="submit" className="px-3 sm:px-4 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold text-xs sm:text-sm whitespace-nowrap transition-all">
                {subscribed ? "✓" : "Join"}
              </button>
            </form>
          </div>

          {/* Copyright */}
          <div className="text-center text-[10px] sm:text-xs text-zinc-650">
            © {new Date().getFullYear()} Rafiki Rewards. Built cleanly in Kenya.
          </div>
        </div>
      </footer>
    </div>
  );
}

