import { mockAccount, mockYield, formatZAR } from '../../../data/portal-mock';
import StatCard from '../ui/StatCard';
import BalanceCards from './BalanceCards';
import RecentActivity from './RecentActivity';

export default function OverviewPanel() {
  const account = mockAccount;
  const yieldData = mockYield;
  const totalBalance = account.totalIssued - account.totalRedeemed;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total ZARP Balance"
          value={formatZAR(totalBalance)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Total Issued"
          value={formatZAR(account.totalIssued)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
            </svg>
          }
        />
        <StatCard
          label="Total Redeemed"
          value={formatZAR(account.totalRedeemed)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12H9" />
            </svg>
          }
        />
        <StatCard
          label="Pending Yield"
          value={formatZAR(yieldData.pendingYield)}
          trend={`${yieldData.currentApy}% APY`}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      {/* Balance by network */}
      <BalanceCards wallets={account.wallets} />

      {/* Recent activity */}
      <RecentActivity transactions={account.recentTransactions} />
    </div>
  );
}
