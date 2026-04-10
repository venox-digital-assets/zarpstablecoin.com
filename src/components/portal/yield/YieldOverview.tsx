import { mockYield, mockWallets, formatZAR, networkLabels } from '../../../data/portal-mock';
import StatCard from '../ui/StatCard';
import Badge from '../ui/Badge';

export default function YieldOverview() {
  const yieldData = mockYield;
  const enrolledWallets = mockWallets.filter((w) => w.yieldEnrolled);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Current APY"
          value={`${yieldData.currentApy}%`}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatCard
          label="Total Earned"
          value={formatZAR(yieldData.totalEarned)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Pending Yield"
          value={formatZAR(yieldData.pendingYield)}
          trend="Accruing daily"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Enrolled wallets */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Wallets Enrolled in Yield</h3>
        {enrolledWallets.length === 0 ? (
          <p className="text-sm text-slate-500">
            No wallets enrolled. Visit your <a href="/portal/addressbook" className="text-[#009A35] hover:underline font-medium">Addressbook</a> to enroll wallets in yield.
          </p>
        ) : (
          <div className="space-y-2">
            {enrolledWallets.map((w) => (
              <div key={w.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 hover:bg-slate-100/70 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-900">{w.label}</p>
                  <p className="text-xs text-slate-400 font-mono">{w.address}</p>
                </div>
                <Badge color="bg-[#009A35]/10 text-[#009A35]">{networkLabels[w.network]}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-[#009A35]/5 border border-[#009A35]/15 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-2">How Yield Works</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          ZARP yield is earned on enrolled wallets holding ZARP tokens. Yield accrues daily based on the current
          APY rate and is paid out monthly. Enroll or manage your wallets in the{' '}
          <a href="/portal/addressbook" className="text-[#009A35] hover:underline font-medium">Addressbook</a>.
        </p>
      </div>

      {/* Yield history */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Yield History</h3>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Period</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount Earned</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">APY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {yieldData.history.map((entry) => (
                  <tr key={entry.date} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-slate-600">
                      {new Date(entry.date).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' })}
                    </td>
                    <td className="px-6 py-3.5 text-right font-semibold text-slate-900">{formatZAR(entry.amount)}</td>
                    <td className="px-6 py-3.5 text-right text-slate-500">{entry.apy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
