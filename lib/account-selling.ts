export type SubscriptionCategory = 
  | 'streaming' 
  | 'ai-tools' 
  | 'vpn' 
  | 'productivity' 
  | 'developer-tools' 
  | 'learning';

export type SubscriptionService = 
  // Streaming
  | 'netflix' 
  | 'spotify' 
  | 'youtube-premium' 
  | 'disney-plus'
  // AI Tools
  | 'chatgpt-plus' 
  | 'claude-pro' 
  | 'google-ai-pro' 
  | 'midjourney'
  // VPN
  | 'nordvpn' 
  | 'surfshark' 
  | 'expressvpn'
  // Productivity
  | 'microsoft-365' 
  | 'canva-pro' 
  | 'notion-ai'
  // Developer Tools
  | 'github-copilot' 
  | 'jetbrains'
  // Learning
  | 'coursera' 
  | 'udemy' 
  | 'duolingo-super';

export type AccountStatus = 'available' | 'sold' | 'pending' | 'inactive';
export type AccountDuration = '1-month' | '3-months' | '6-months' | '12-months';

export interface SubscriptionDetails {
  id: SubscriptionService;
  name: string;
  category: SubscriptionCategory;
  description: string;
  basePrice: number;
  icon: string;
  features: string[];
  popularInKenya: boolean;
}

export interface Account {
  id: string;
  service: SubscriptionService;
  email: string;
  password: string; // In production, this should be encrypted
  duration: AccountDuration;
  price: number;
  status: AccountStatus;
  createdAt: Date;
  expiresAt: Date;
  sellerCommission: number; // percentage
  notes?: string;
}

export interface InventoryItem {
  id: string;
  service: SubscriptionService;
  totalAccounts: number;
  availableAccounts: number;
  soldThisMonth: number;
  totalRevenue: number;
  averagePrice: number;
}

export interface Sale {
  id: string;
  accountId: string;
  service: SubscriptionService;
  buyerEmail: string;
  price: number;
  commission: number;
  saleDate: Date;
  status: 'completed' | 'pending' | 'failed';
}

export const SUBSCRIPTION_SERVICES: Record<SubscriptionService, SubscriptionDetails> = {
  // Streaming
  netflix: {
    id: 'netflix',
    name: 'Netflix Premium',
    category: 'streaming',
    description: '4K Ultra HD streaming, watch on 4 devices simultaneously',
    basePrice: 15.99,
    icon: '🎬',
    features: ['4K Ultra HD', '4 simultaneous streams', 'Offline downloads'],
    popularInKenya: true,
  },
  spotify: {
    id: 'spotify',
    name: 'Spotify Premium',
    category: 'streaming',
    description: 'Ad-free music streaming, offline listening',
    basePrice: 11.99,
    icon: '🎵',
    features: ['Ad-free listening', 'Offline downloads', 'High quality audio'],
    popularInKenya: true,
  },
  'youtube-premium': {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    category: 'streaming',
    description: 'No ads, offline downloads, background play',
    basePrice: 13.99,
    icon: '▶️',
    features: ['No ads', 'Offline downloads', 'Background play', 'YouTube Music'],
    popularInKenya: true,
  },
  'disney-plus': {
    id: 'disney-plus',
    name: 'Disney+',
    category: 'streaming',
    description: 'Disney, Pixar, Marvel, Star Wars, National Geographic',
    basePrice: 10.99,
    icon: '✨',
    features: ['4K streaming', 'Multi-profile', 'Offline downloads'],
    popularInKenya: false,
  },
  // AI Tools
  'chatgpt-plus': {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'ai-tools',
    description: 'Advanced AI assistant with GPT-4 access',
    basePrice: 20,
    icon: '🤖',
    features: ['GPT-4 access', 'DALL-E 3', 'Advanced data analysis', 'Priority support'],
    popularInKenya: true,
  },
  'claude-pro': {
    id: 'claude-pro',
    name: 'Claude Pro',
    category: 'ai-tools',
    description: 'Anthropic\'s advanced AI with longer context window',
    basePrice: 20,
    icon: '🧠',
    features: ['Claude 3 access', '100K token context', 'Priority support'],
    popularInKenya: true,
  },
  'google-ai-pro': {
    id: 'google-ai-pro',
    name: 'Google AI Pro',
    category: 'ai-tools',
    description: 'Gemini Pro with advanced capabilities',
    basePrice: 20,
    icon: '🔮',
    features: ['Gemini Pro access', 'Multi-modal', 'Advanced analysis'],
    popularInKenya: false,
  },
  midjourney: {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'ai-tools',
    description: 'AI image generation with commercial rights',
    basePrice: 30,
    icon: '🎨',
    features: ['Unlimited generations', 'Commercial rights', 'Private mode'],
    popularInKenya: true,
  },
  // VPN
  nordvpn: {
    id: 'nordvpn',
    name: 'NordVPN',
    category: 'vpn',
    description: 'Secure VPN with 5000+ servers worldwide',
    basePrice: 3.99,
    icon: '🔒',
    features: ['5000+ servers', 'Double VPN', 'Kill switch', 'No logs'],
    popularInKenya: true,
  },
  surfshark: {
    id: 'surfshark',
    name: 'Surfshark',
    category: 'vpn',
    description: 'Affordable VPN with unlimited simultaneous connections',
    basePrice: 2.49,
    icon: '🌊',
    features: ['Unlimited connections', 'CleanWeb', 'Private DNS'],
    popularInKenya: false,
  },
  expressvpn: {
    id: 'expressvpn',
    name: 'ExpressVPN',
    category: 'vpn',
    description: 'Premium VPN with fastest speeds',
    basePrice: 8.32,
    icon: '⚡',
    features: ['94 countries', 'Fastest speeds', 'MediaStreamer', '24/7 support'],
    popularInKenya: true,
  },
  // Productivity
  'microsoft-365': {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'productivity',
    description: 'Office apps, cloud storage, advanced security',
    basePrice: 99,
    icon: '📊',
    features: ['Office apps', '1TB storage', 'Advanced support', 'Premium fonts'],
    popularInKenya: true,
  },
  'canva-pro': {
    id: 'canva-pro',
    name: 'Canva Pro',
    category: 'productivity',
    description: 'Design anything with millions of templates',
    basePrice: 13,
    icon: '🎨',
    features: ['Unlimited templates', '100GB storage', 'Brand kit', 'Remove background'],
    popularInKenya: true,
  },
  'notion-ai': {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'productivity',
    description: 'AI-powered productivity workspace',
    basePrice: 10,
    icon: '📝',
    features: ['AI writing assistant', 'Auto-transcription', 'Priority support'],
    popularInKenya: false,
  },
  // Developer Tools
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'developer-tools',
    description: 'AI code assistant for faster development',
    basePrice: 10,
    icon: '💻',
    features: ['AI code completion', 'Chat support', 'CLI support'],
    popularInKenya: false,
  },
  jetbrains: {
    id: 'jetbrains',
    name: 'JetBrains IDEs',
    category: 'developer-tools',
    description: 'Professional IDE subscription for all JetBrains tools',
    basePrice: 20.9,
    icon: '🔧',
    features: ['All IDEs access', 'Extensions', 'Code analysis'],
    popularInKenya: false,
  },
  // Learning
  coursera: {
    id: 'coursera',
    name: 'Coursera Plus',
    category: 'learning',
    description: 'Unlimited access to 7000+ courses',
    basePrice: 59,
    icon: '📚',
    features: ['7000+ courses', 'Certificates', 'Specializations'],
    popularInKenya: false,
  },
  udemy: {
    id: 'udemy',
    name: 'Udemy Plus',
    category: 'learning',
    description: 'Unlimited course access',
    basePrice: 39.99,
    icon: '🎓',
    features: ['Unlimited courses', 'Lifetime access'],
    popularInKenya: false,
  },
  'duolingo-super': {
    id: 'duolingo-super',
    name: 'Duolingo Super',
    category: 'learning',
    description: 'Ad-free language learning with advanced features',
    basePrice: 11.99,
    icon: '🦉',
    features: ['Ad-free', 'Offline learning', 'Advanced lessons'],
    popularInKenya: false,
  },
};

export const CATEGORIES: Record<SubscriptionCategory, { name: string; icon: string }> = {
  streaming: { name: 'Streaming', icon: '🎬' },
  'ai-tools': { name: 'AI Tools', icon: '🤖' },
  vpn: { name: 'VPN', icon: '🔒' },
  productivity: { name: 'Productivity', icon: '📊' },
  'developer-tools': { name: 'Developer Tools', icon: '💻' },
  learning: { name: 'Learning', icon: '📚' },
};

export const POPULAR_IN_KENYA = Object.values(SUBSCRIPTION_SERVICES).filter(
  (s) => s.popularInKenya
);

export const DURATION_MULTIPLIERS: Record<AccountDuration, number> = {
  '1-month': 1,
  '3-months': 2.7,
  '6-months': 5,
  '12-months': 9,
};
