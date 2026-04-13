import { mockAccount, mockYield, formatZAR } from '../../../data/portal-mock';
import StatCard from '../ui/StatCard';
import RecentActivity from './RecentActivity';

export default function OverviewPanel() {
  const account = mockAccount;
  const yieldData = mockYield;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {/* Recent activity */}
      <RecentActivity transactions={account.recentTransactions} />
    </div>
  );
}
