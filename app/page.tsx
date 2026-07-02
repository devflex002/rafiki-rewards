'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Share2,
  BarChart3,
  ShieldCheck,
  DollarSign,
  Wallet,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Gift,
  Lock,
  Layers,
  Copy,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  // States for interactive components
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'campaign' | 'share' | 'analytics'>('campaign');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Newsletter signup state
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // FAQ Data
  const faqs = [
    {
      q: 'How does Rafiki Rewards track referrals?',
      a: 'We use a combination of advanced cookies, device fingerprinting, and direct IP validation. When someone clicks a referral link, they are tracked securely. Once they sign up or complete a conversion event, the referring partner is credited instantly.',
    },
    {
      q: 'Which withdrawal and payment options are supported?',
      a: 'Through our integrated wallet system, users can track their pending and clear earnings. Withdrawals are processed safely using Bank Transfers, PayPal, and Stripe Connect. For Kenyan users, local bank transfers and direct payout channels are easily managed.',
    },
    {
      q: 'Is there a limit to how many referral links I can generate?',
      a: 'No! You can generate unlimited custom referral links for different campaigns, marketing channels, or promotional materials to see precisely where your signups originate.',
    },
    {
      q: 'What fraud prevention systems are active?',
      a: 'Our smart Anti-Fraud Engine prevents self-referrals, duplicate account signups, IP matching abuse, and rapid clicking patterns. You can review and flag suspicious referral transactions directly inside your dashboard.',
    },
    {
      q: 'Can we integrate Rafiki Rewards with our existing codebase?',
      a: 'Yes, our Enterprise tier includes comprehensive developer API access, custom webhooks for tracking signups automatically, and single sign-on (SSO) support for your platform.',
    },
  ];

  // Pricing plans
  const starterPrice = isAnnual ? 23 : 29;
  const proPrice = isAnnual ? 63 : 79;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailStatus('error');
      return;
    }
    setEmailStatus('success');
    setEmail('');
    setTimeout(() => setEmailStatus('idle'), 4000);
  };

  const [copiedLink, setCopiedLink] = useState(false);
  const copyLinkText = 'rafiki.rw/ref/john-doe';
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${copyLinkText}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/20 via-zinc-950/0 to-zinc-950/0 -z-10 pointer-events-none" />
      <div className="absolute top-[800px] left-1/4 w-[400px] h-[400px] bg-purple-900/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[1800px] right-1/4 w-[500px] h-[500px] bg-indigo-900/5 blur-[150px] -z-10 pointer-events-none" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/75 border-b border-zinc-900/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform duration-200">
              <Gift className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">Rafiki</span>
              <span className="text-[10px] text-zinc-400 font-medium -mt-1 uppercase tracking-widest">Rewards</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">FAQ</a>
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Documentation</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/dashboard">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-md text-sm px-4 py-2 flex items-center gap-1.5 transition-all shadow-lg shadow-purple-900/10">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs font-semibold text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Smart Referral Tracking Built for Growth</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Turn word-of-mouth into your most powerful{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">
              growth engine
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Automate affiliate campaigns, track customer referrals, and payout commissions effortlessly. Setup your campaign in minutes and watch your customer base expand.
          </p>

          {/* Signup Action & Form */}
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:border-purple-500 text-sm text-white placeholder-zinc-500 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="h-11 px-6 bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm rounded-md transition-colors whitespace-nowrap shadow-md shadow-purple-900/10"
            >
              Get Started Free
            </button>
          </form>

          {/* Form Feedbacks */}
          {emailStatus === 'success' && (
            <p className="text-xs text-emerald-400 animate-fade-in">
              ✓ Awesome! We've sent a sign-up invite link to your email. Check your inbox!
            </p>
          )}
          {emailStatus === 'error' && (
            <p className="text-xs text-rose-400">
              ⚠ Please enter a valid email address.
            </p>
          )}

          {/* Live Mockup Widget */}
          <div className="pt-16 max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative border border-zinc-800/80 bg-zinc-900/90 rounded-xl overflow-hidden shadow-2xl">
              {/* Mockup Toolbar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-950/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="text-xs font-mono text-zinc-500">app.rafikirewards.com/dashboard</div>
                <div className="w-6 h-6 rounded-full bg-zinc-800/50 flex items-center justify-center">
                  <Lock className="h-3 w-3 text-zinc-500" />
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Side Stats */}
                <div className="md:col-span-1 space-y-4 border-b md:border-b-0 md:border-r border-zinc-800/80 pb-6 md:pb-0 md:pr-6">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Live Campaign</span>
                    <h4 className="text-sm font-semibold text-white">Summer Referral Drive 2026</h4>
                  </div>

                  <div className="bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Total Referrals</span>
                      <Users className="h-3.5 w-3.5 text-purple-400" />
                    </div>
                    <p className="text-xl font-bold text-white">24</p>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      +12 this month
                    </span>
                  </div>

                  <div className="bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Total Payouts</span>
                      <Wallet className="h-3.5 w-3.5 text-indigo-400" />
                    </div>
                    <p className="text-xl font-bold text-white">$2,845.50</p>
                    <span className="text-[10px] text-zinc-500 font-medium">
                      Bank Transfer • Completed
                    </span>
                  </div>
                </div>

                {/* Graph & Activity Mockup */}
                <div className="md:col-span-2 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-300">Daily Referral Analytics</span>
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                      Conversion Rate: 8.4%
                    </span>
                  </div>

                  {/* Simple CSS simulated chart bars */}
                  <div className="h-36 flex items-end justify-between gap-2.5 pt-4">
                    {[35, 55, 40, 65, 80, 50, 75, 95, 60, 85, 100, 70].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
                        <div 
                          className="w-full bg-gradient-to-t from-purple-950 to-purple-500 rounded-t transition-all group-hover/bar:from-purple-500 group-hover/bar:to-indigo-400"
                          style={{ height: `${h * 0.9}px` }}
                        />
                        <span className="text-[9px] font-mono text-zinc-600">Jul {i + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500">
                    <span>Recent Link Clicks: <strong className="text-zinc-300">1,245</strong></span>
                    <span>Direct Signups: <strong className="text-zinc-300">104</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Logotypes */}
      <section className="py-12 border-t border-b border-zinc-900 bg-zinc-950/50 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Empowering Modern Marketing Teams Across the Globe
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-40 grayscale contrast-200 pt-4">
            <span className="text-lg font-extrabold tracking-tight">KUSHA</span>
            <span className="text-lg font-extrabold tracking-tight">DUNDA TECH</span>
            <span className="text-lg font-extrabold tracking-tight">SAFARI CORP</span>
            <span className="text-lg font-extrabold tracking-tight">MTANDAO INC</span>
            <span className="text-lg font-extrabold tracking-tight">JUMIA GROUP</span>
          </div>
        </div>
      </section>

      {/* Interactive Feature Explorer */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How Rafiki Rewards Power Your Referrals
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-base">
            No complex installations, no AI integrations to configure. Just a solid, stable referral engine with reliable click analytics and secure wallets.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center gap-2 pt-6 max-w-md mx-auto">
            <button
              onClick={() => setActiveFeatureTab('campaign')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md border transition-all ${
                activeFeatureTab === 'campaign'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/10'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              1. Setup Campaigns
            </button>
            <button
              onClick={() => setActiveFeatureTab('share')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md border transition-all ${
                activeFeatureTab === 'share'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/10'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              2. Share Custom Links
            </button>
            <button
              onClick={() => setActiveFeatureTab('analytics')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md border transition-all ${
                activeFeatureTab === 'analytics'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/10'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              3. Track & Withdraw
            </button>
          </div>
        </div>

        {/* Tab Interactive Mock Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-2xl">
          <div className="lg:col-span-5 space-y-6 text-left">
            {activeFeatureTab === 'campaign' && (
              <>
                <div className="h-10 w-10 rounded-lg bg-purple-950 flex items-center justify-center border border-purple-800/30">
                  <Layers className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Create Custom Campaigns</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Design reward incentives that align with your business goals. Set flat fee structures or commission percentages. You control the minimum payouts and currency details.
                </p>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" /> Flat-rate, percentage, or gift commission incentives
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" /> Custom cookies & verification time periods
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" /> Instant fraud-filtering activation
                  </li>
                </ul>
              </>
            )}

            {activeFeatureTab === 'share' && (
              <>
                <div className="h-10 w-10 rounded-lg bg-indigo-950 flex items-center justify-center border border-indigo-800/30">
                  <Share2 className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Generate Live Affiliate Links</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Instantly distribute trackable links for your referrers. Affiliates can easily copy their custom URL from their personal portal and begin public sharing on social, messaging channels, or blogs.
                </p>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400" /> Short, clean referral links (no messy query params)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400" /> One-click clipboard copy utility
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400" /> Direct QR code generation options
                  </li>
                </ul>
              </>
            )}

            {activeFeatureTab === 'analytics' && (
              <>
                <div className="h-10 w-10 rounded-lg bg-purple-950 flex items-center justify-center border border-purple-800/30">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Secure Balance Payouts</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Review complete breakdown of clicks, registrations, and conversions. Once earnings clear, affiliates request direct withdrawals to Bank Transfer, PayPal, or local Kenyan payout channels.
                </p>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" /> Real-time conversions feed & charts
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" /> Simple wallet interface with clear balance states
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" /> Fast verification with automated processing fees
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* Interactive Preview Panel */}
          <div className="lg:col-span-7 bg-zinc-950/80 border border-zinc-800/60 rounded-xl p-6 min-h-[300px] flex flex-col justify-center text-left">
            {activeFeatureTab === 'campaign' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">New Campaign Dashboard</span>
                  <span className="text-[10px] text-purple-400 font-semibold bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/30">ACTIVE</span>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase">Campaign Title</label>
                    <div className="px-3 py-2 bg-zinc-900 border border-zinc-850 rounded text-xs text-zinc-200">
                      Primary Partner Referral Program
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase">Reward Per Signup</label>
                      <div className="px-3 py-2 bg-zinc-900 border border-zinc-850 rounded text-xs text-zinc-200 font-mono">
                        $15.00 Flat Fee
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase">Cookie Expiry</label>
                      <div className="px-3 py-2 bg-zinc-900 border border-zinc-850 rounded text-xs text-zinc-200 font-mono">
                        30 Days
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <button className="w-full py-2 bg-purple-600/10 hover:bg-purple-600/15 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded transition-colors">
                    Update Campaign Settings
                  </button>
                </div>
              </div>
            )}

            {activeFeatureTab === 'share' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Affiliate Sharing Portal</h4>
                  <p className="text-zinc-500 text-[11px]">Copy your custom trackable link to start sharing with your contacts.</p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <span className="text-xs font-mono text-zinc-400 flex-1 truncate">{copyLinkText}</span>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 p-2.5 bg-zinc-900/60 rounded border border-zinc-800/40 text-center">
                    <span className="block text-[10px] text-zinc-500 font-bold uppercase">WhatsApp Share</span>
                    <span className="text-xs font-medium text-emerald-400 cursor-pointer hover:underline">Launch App ↗</span>
                  </div>
                  <div className="flex-1 p-2.5 bg-zinc-900/60 rounded border border-zinc-800/40 text-center">
                    <span className="block text-[10px] text-zinc-500 font-bold uppercase">Twitter Share</span>
                    <span className="text-xs font-medium text-blue-400 cursor-pointer hover:underline">Post Tweet ↗</span>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'analytics' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Approved Wallet Balance</span>
                  <span className="text-xs font-bold text-zinc-300">$2,845.50</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-zinc-500">Processing Fee (2%)</span>
                    <span className="text-zinc-400">-$56.91</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-zinc-500">Destination</span>
                    <span className="text-zinc-400">Direct Bank Transfer</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-t border-zinc-850 pt-2 font-bold">
                    <span className="text-zinc-300">Total Settlement</span>
                    <span className="text-purple-400">$2,788.59</span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors shadow-md shadow-purple-900/20">
                  Request Wallet Withdrawal
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid of Key Features */}
      <section className="py-24 px-6 bg-zinc-900/20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Robust Infrastructure</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise features, developer simplicity.
            </h2>
            <p className="text-zinc-400 text-base">
              A clean, high-performance toolkit focusing solely on referral accuracy, lightning-fast redirect logic, and transparent financial tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-4 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <div className="h-10 w-10 rounded-lg bg-purple-950/60 flex items-center justify-center border border-purple-900/25">
                <ShieldCheck className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Anti-Fraud Protection</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Smart browser validation, IP verification, and cookie controls prevent self-referrals and artificial signups automatically.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-4 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <div className="h-10 w-10 rounded-lg bg-indigo-950/60 flex items-center justify-center border border-indigo-900/25">
                <DollarSign className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Flexible Rewards</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Choose flat rates, percentages, or recurring commissions. Define exact terms for payouts based on user subscription levels.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-4 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <div className="h-10 w-10 rounded-lg bg-purple-950/60 flex items-center justify-center border border-purple-900/25">
                <BarChart3 className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Comprehensive Charts</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Track daily link click rates, conversion funnels, top affiliates, and payouts history inside a single dashboard.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-4 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <div className="h-10 w-10 rounded-lg bg-indigo-950/60 flex items-center justify-center border border-indigo-900/25">
                <Zap className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Quick Withdrawals</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Request balance clearances straight from your integrated wallet to major payout lines with transparent processing summaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto text-center space-y-16">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Clear Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Simple plans for companies of all sizes
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm">
            Unlock complete referral features. Save 20% by billing annually. Absolutely no hidden fees.
          </p>

          {/* Pricing Toggle Switch */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-11 h-6 rounded-full bg-zinc-800 p-0.5 transition-colors focus:outline-none relative"
            >
              <div
                className={`w-5 h-5 rounded-full bg-purple-500 transition-transform ${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold ${isAnnual ? 'text-white' : 'text-zinc-500'} flex items-center gap-1.5`}>
              Annually <span className="bg-purple-950 text-purple-400 border border-purple-800/40 text-[9px] px-1.5 py-0.5 rounded font-bold">SAVE 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {/* Starter Plan */}
          <div className="p-8 bg-zinc-900/40 border border-zinc-850 rounded-2xl space-y-6 relative flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Starter Campaigner</h3>
                <p className="text-zinc-500 text-xs mt-1">Perfect for growing startups and personal brands.</p>
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">${starterPrice}</span>
                <span className="text-xs text-zinc-500 font-semibold">/ month</span>
              </div>
              <div className="border-t border-zinc-850 pt-6">
                <ul className="space-y-3.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Up to 500 referrals per month
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Core tracking link creator
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Standard dashboard & charts
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Standard email support
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/dashboard" className="pt-6 block">
              <Button variant="outline" className="w-full text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                Start Starter Trial
              </Button>
            </Link>
          </div>

          {/* Pro Plan (Best Value) */}
          <div className="p-8 bg-zinc-900 border border-purple-500/30 rounded-2xl space-y-6 relative flex flex-col justify-between shadow-xl shadow-purple-950/10">
            <div className="absolute top-0 right-8 -translate-y-1/2 px-2.5 py-1 rounded bg-purple-600 text-[10px] font-bold uppercase tracking-widest text-white">
              RECOMMENDED
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Professional Drive</h3>
                <p className="text-purple-300/60 text-xs mt-1">Best for established scaling businesses.</p>
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">${proPrice}</span>
                <span className="text-xs text-purple-300/50 font-semibold">/ month</span>
              </div>
              <div className="border-t border-zinc-800 pt-6">
                <ul className="space-y-3.5 text-xs text-zinc-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Up to 5,000 referrals per month
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Dedicated custom branding options
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Advanced M-Pesa & bank transfers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Anti-Fraud checking rules editor
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Priority 24/7 support response
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/dashboard" className="pt-6 block">
              <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-900/20">
                Get Started with Pro
              </Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 bg-zinc-900/40 border border-zinc-850 rounded-2xl space-y-6 relative flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Enterprise Hub</h3>
                <p className="text-zinc-500 text-xs mt-1">For massive agencies requiring complete control.</p>
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">Custom</span>
              </div>
              <div className="border-t border-zinc-850 pt-6">
                <ul className="space-y-3.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Unlimited referrals & campaigns
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Developer Webhooks & API Access
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Single Sign-On (SSO) Support
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-purple-400" /> Dedicated Support Manager
                  </li>
                </ul>
              </div>
            </div>
            <a href="mailto:sales@rafikirewards.com" className="pt-6 block">
              <Button variant="outline" className="w-full text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                Contact Enterprise Sales
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Common Questions</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Frequently Asked Questions</h2>
          <p className="text-zinc-400 text-sm">Have queries about setup or wallets? Find answers here.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-zinc-900 bg-zinc-900/20 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white focus:outline-none hover:bg-zinc-900/40"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-purple-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900 animate-slide-down">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 relative text-center">
        <div className="max-w-4xl mx-auto border border-zinc-800/60 bg-gradient-to-b from-zinc-900 to-zinc-950 p-12 rounded-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-950/20 rounded-full blur-[100px] pointer-events-none -z-10" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to boost your organic acquisition?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Create tracking links, reward sharing, and settle payouts through bank or local integrations today.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-md text-sm px-6 py-3 font-semibold transition-all shadow-lg shadow-purple-900/10">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-zinc-900 bg-zinc-950/90 py-16 px-6 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-600 text-white font-bold">
                <Gift className="h-4 w-4" />
              </div>
              <span className="text-sm font-extrabold tracking-tight text-white">Rafiki Rewards</span>
            </Link>
            <p className="text-[11px] leading-relaxed text-zinc-500">
              High-performance referral tracking dashboards tailored for modern marketing divisions.
            </p>
          </div>
          <div>
            <h4 className="text-zinc-200 font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#features" className="hover:text-white transition-colors">Campaign Creator</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Fraud Prevention</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-zinc-200 font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="mailto:contact@rafikirewards.com" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
              <li><span className="text-zinc-600">Privacy Policy (Internal)</span></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-zinc-200 font-semibold">Join Our Newsletter</h4>
            <p className="text-[11px] leading-relaxed text-zinc-500">
              Get the latest marketing templates and guides directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded focus:outline-none focus:border-purple-500 text-[11px] text-white placeholder-zinc-600"
                required
              />
              <button
                type="submit"
                className="px-3 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[10px]">
          <span>© {new Date().getFullYear()} Rafiki Rewards. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Designed elegantly in Kenya.</span>
        </div>
      </footer>
    </div>
  );
}

