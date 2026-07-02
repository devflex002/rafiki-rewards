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
      <header className="border-b border-zinc-900 bg-zinc-950 px-6 ">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex-shrink-0">
              <Image width={120} height={100} src="/logo.png" alt="Rafiki Rewards Logo"  className="mt-2 object-contain" />
            </div>
            <div className="flex flex-col -ml-8">
              <span className="text-xl font-bold text-white">Rafiki Rewards</span>
              <span className="text-sm text-zinc-500 font-bold  -mt-0.5">Refer & Earn</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded text-xs px-4 py-2 font-bold transition-all">
                  Open Dashboard
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
                  Log In
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded text-xs px-4 py-2 font-bold transition-all">
                    Register
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center space-y-8">


        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Refer your friends.<br />
          Earn KES 1000
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium">
          A clean, no-nonsense referral system. Share your custom link, track signups in real-time, and withdraw your earnings directly to M-Pesa.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
            <Button className="bg-purple-600 hover:bg-purple-500 text-white text-sm px-6 py-3 font-bold rounded min-w-[200px]">
              {isAuthenticated ? "Go to Dashboard" : "Start Earning Now"}
            </Button>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-zinc-900/30 border-t border-b border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-white tracking-tight">
            Three Steps to Get Paid
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900 border border-zinc-850 rounded space-y-3">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 01</div>
              <h3 className="text-lg font-bold text-white">Join Rafiki</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Create a free account in under a minute. No payment or subscription is required to join.
              </p>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-850 rounded space-y-3">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 02</div>
              <h3 className="text-lg font-bold text-white">Share Your URL</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Copy your unique link and share it on WhatsApp, Telegram, text messages, or social feeds.
              </p>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-850 rounded space-y-3">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 03</div>
              <h3 className="text-lg font-bold text-white">Earn KES 1,000</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Get KES 1,000 credited to your dashboard for every verified signup. Withdraw instantly via M-Pesa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-6 max-w-3xl mx-auto space-y-8">
        <h2 className="text-2xl font-black text-center text-white tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="border border-zinc-900 bg-zinc-900/30 rounded">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-bold text-zinc-200 focus:outline-none hover:text-white"
                >
                  <span>{faq.q}</span>
                  <HelpCircle className="h-4 w-4 text-zinc-500" />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-850">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer & Newsletter */}
      <footer className="border-t border-zinc-900 py-12 px-6 bg-zinc-950 text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/logo.png" alt="Rafiki Rewards Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-zinc-300">Rafiki Rewards</span>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs w-full">
            <input
              type="email"
              placeholder="Join newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-850 rounded focus:outline-none focus:border-zinc-700 text-xs text-white placeholder-zinc-650"
              required
            />
            <button type="submit" className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold text-xs">
              {subscribed ? "Subscribed!" : "Join"}
            </button>
          </form>

          <span className="text-[10px] text-zinc-650">© {new Date().getFullYear()} Rafiki Rewards. Built cleanly in Kenya.</span>
        </div>
      </footer>
    </div>
  );
}

