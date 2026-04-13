// === Application Form Types ===

export interface RepresentativeDetails {
  email: string;
  firstName: string;
  surname: string;
  emailAddress: string;
  mobile: string;
  nationalId: File | null;
  proofOfResidence: File | null;
  bankConfirmationLetter: File | null;
}

export interface CompanyDetails {
  registeredName: string;
  registrationNumber: string;
  tradingAsName: string;
  countryOfRegistration: string;
  primaryBusinessActivity: string;
  businessRegistrationCert: File | null;
  directorsId: File[];
  directorsProofOfAddress: File[];
}

export interface ShareholderDetails {
  shareholdingEvidence: File | null;
  shareholdersId: File[];
  shareholdersProofOfAddress: File[];
  isPep: boolean | null;
  pepDetails: string;
}

export interface PartnerApplication {
  step1: RepresentativeDetails;
  step2: CompanyDetails;
  step3: ShareholderDetails;
}

// === Dashboard Types ===

export type TransactionType = 'issue' | 'redeem' | 'yield';
export type TransactionStatus = 'completed' | 'pending' | 'processing' | 'failed';
export type Network = 'ethereum' | 'base' | 'polygon' | 'solana';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  zarAmount: number;
  status: TransactionStatus;
  network: Network;
  txHash?: string;
  createdAt: string;
}

export interface Wallet {
  id: string;
  label: string;
  network: Network;
  address: string;
  yieldEnrolled: boolean;
}

export interface PartnerAccount {
  companyName: string;
  tradingAs?: string;
  status: 'active' | 'pending' | 'suspended';
  kycLevel: 'basic' | 'enhanced';
  totalIssued: number;
  totalRedeemed: number;
  wallets: Wallet[];
  recentTransactions: Transaction[];
}

export interface YieldSummary {
  currentApy: number;
  totalEarned: number;
  pendingYield: number;
  history: YieldEntry[];
}

export interface YieldEntry {
  date: string;
  amount: number;
  apy: number;
}

export interface BankDetails {
  id: string;
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountHolder: string;
}

export interface PartnerSettings {
  companyName: string;
  tradingAs: string;
  registrationNumber: string;
  country: string;
  representative: {
    name: string;
    email: string;
    mobile: string;
  };
  bankDetails: BankDetails[];
  twoFactorEnabled: boolean;
}
