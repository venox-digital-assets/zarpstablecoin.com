import type { Transaction } from '../../../types/portal';
import {
  networkLabels, networkColors, statusColors, typeLabels,
  formatZAR, formatDate, truncateAddress,
} from '../../../data/portal-mock';
import Badge from '../ui/Badge';

interface Props {
  transactions: Transaction[];
}

const typeColors: Record<string, string> = {
  issue: 'bg-[#009A35]/10 text-[#009A35]',
  redeem: 'bg-orange-100 text-orange-700',
  yield: 'bg-blue-100 text-blue-700',
};

export default function RecentActivity({ transactions }: Props) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent Activity</h3>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Network</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{formatDate(tx.createdAt)}</td>
                  <td className="px-4 py-3.5"><Badge color={typeColors[tx.type]}>{typeLabels[tx.type]}</Badge></td>
                  <td className="px-4 py-3.5 text-right font-semibold text-slate-900 whitespace-nowrap">{formatZAR(tx.amount)}</td>
                  <td className="px-4 py-3.5"><Badge color={networkColors[tx.network]}>{networkLabels[tx.network]}</Badge></td>
                  <td className="px-4 py-3.5"><Badge color={statusColors[tx.status]}>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</Badge></td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono text-xs">
                    {tx.txHash ? truncateAddress(tx.txHash) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
