import type {
  PartnerAccount,
  Transaction,
  Wallet,
  YieldSummary,
  YieldEntry,
  PartnerSettings,
} from '../types/portal';

export const mockWallets: Wallet[] = [
  {
    id: 'w1',
    label: 'Primary EVM',
    network: 'ethereum',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18',
    yieldEnrolled: true,
  },
  {
    id: 'w2',
    label: 'Base Operations',
    network: 'base',
    address: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72',
    yieldEnrolled: false,
  },
  {
    id: 'w3',
    label: 'Solana Treasury',
    network: 'solana',
    address: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV',
    yieldEnrolled: true,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'issue',
    amount: 500000,
    zarAmount: 500000,
    status: 'completed',
    network: 'ethereum',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    createdAt: '2026-04-09T14:30:00Z',
  },
  {
    id: 'tx2',
    type: 'redeem',
    amount: 150000,
    zarAmount: 150000,
    status: 'completed',
    network: 'base',
    txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    createdAt: '2026-04-08T10:15:00Z',
  },
  {
    id: 'tx3',
    type: 'yield',
    amount: 2145.83,
    zarAmount: 2145.83,
    status: 'completed',
    network: 'ethereum',
    createdAt: '2026-04-07T00:00:00Z',
  },
  {
    id: 'tx4',
    type: 'issue',
    amount: 1000000,
    zarAmount: 1000000,
    status: 'processing',
    network: 'solana',
    createdAt: '2026-04-10T09:00:00Z',
  },
  {
    id: 'tx5',
    type: 'redeem',
    amount: 250000,
    zarAmount: 250000,
    status: 'pending',
    network: 'ethereum',
    createdAt: '2026-04-10T08:45:00Z',
  },
  {
    id: 'tx6',
    type: 'issue',
    amount: 750000,
    zarAmount: 750000,
    status: 'completed',
    network: 'polygon',
    txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    createdAt: '2026-04-05T16:20:00Z',
  },
  {
    id: 'tx7',
    type: 'yield',
    amount: 1987.50,
    zarAmount: 1987.50,
    status: 'completed',
    network: 'solana',
    createdAt: '2026-03-31T00:00:00Z',
  },
  {
    id: 'tx8',
    type: 'redeem',
    amount: 300000,
    zarAmount: 300000,
    status: 'completed',
    network: 'base',
    txHash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a',
    createdAt: '2026-03-28T11:30:00Z',
  },
  {
    id: 'tx9',
    type: 'issue',
    amount: 2000000,
    zarAmount: 2000000,
    status: 'completed',
    network: 'ethereum',
    txHash: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
    createdAt: '2026-03-25T09:45:00Z',
  },
  {
    id: 'tx10',
    type: 'redeem',
    amount: 100000,
    zarAmount: 100000,
    status: 'failed',
    network: 'polygon',
    createdAt: '2026-03-20T14:00:00Z',
  },
];

export const mockAccount: PartnerAccount = {
  companyName: 'Protea Digital Trading (Pty) Ltd',
  tradingAs: 'Protea Digital',
  status: 'active',
  kycLevel: 'enhanced',
  totalIssued: 5250000,
  totalRedeemed: 800000,
  wallets: mockWallets,
  recentTransactions: mockTransactions,
};

export const mockYieldHistory: YieldEntry[] = [
  { date: '2026-04-01', amount: 2145.83, apy: 5.2 },
  { date: '2026-03-01', amount: 1987.50, apy: 5.1 },
  { date: '2026-02-01', amount: 1832.64, apy: 5.0 },
  { date: '2026-01-01', amount: 1756.25, apy: 4.8 },
  { date: '2025-12-01', amount: 1690.00, apy: 4.8 },
  { date: '2025-11-01', amount: 1543.75, apy: 4.5 },
];

export const mockYield: YieldSummary = {
  currentApy: 5.2,
  totalEarned: 10955.97,
  pendingYield: 1120.42,
  history: mockYieldHistory,
};

export const mockSettings: PartnerSettings = {
  companyName: 'Protea Digital Trading (Pty) Ltd',
  tradingAs: 'Protea Digital',
  registrationNumber: '2024/123456/07',
  country: 'South Africa',
  representative: {
    name: 'Thabo Mokoena',
    email: 'thabo@proteadigital.co.za',
    mobile: '+27 82 555 1234',
  },
  bankDetails: [
    {
      id: 'b1',
      bankName: 'First National Bank',
      accountNumber: '****7890',
      branchCode: '250655',
      accountHolder: 'Protea Digital Trading (Pty) Ltd',
    },
    {
      id: 'b2',
      bankName: 'Standard Bank',
      accountNumber: '****4321',
      branchCode: '051001',
      accountHolder: 'Protea Digital Trading (Pty) Ltd',
    },
  ],
  twoFactorEnabled: false,
};

export const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Cambodia', 'Cameroon', 'Canada',
  'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'Colombia', 'Comoros',
  'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Curacao', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador',
  'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
  'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lesotho', 'Liberia',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar',
  'Malawi', 'Malaysia', 'Maldives', 'Malta', 'Marshall Islands', 'Mauritania',
  'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
  'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Niger', 'Nigeria',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Swaziland', 'Sweden', 'Switzerland', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'United Arab Emirates',
  'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vietnam', 'Zambia',
];

export const networkLabels: Record<string, string> = {
  ethereum: 'Ethereum',
  base: 'Base',
  polygon: 'Polygon',
  solana: 'Solana',
};

export const networkColors: Record<string, string> = {
  ethereum: 'bg-blue-100 text-blue-700',
  base: 'bg-indigo-100 text-indigo-700',
  polygon: 'bg-purple-100 text-purple-700',
  solana: 'bg-emerald-100 text-emerald-700',
};

export const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  failed: 'bg-red-100 text-red-700',
};

export const typeLabels: Record<string, string> = {
  issue: 'Issue',
  redeem: 'Redeem',
  yield: 'Yield',
};

export function formatZAR(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
