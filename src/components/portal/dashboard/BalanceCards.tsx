import type { Wallet } from '../../../types/portal';
import { networkLabels, networkColors, truncateAddress, formatZAR } from '../../../data/portal-mock';
import Badge from '../ui/Badge';

interface Props {
  wallets: Wallet[];
}

const mockBalances: Record<string, number> = {
  w1: 2450000,
  w2: 850000,
  w3: 1150000,
};

export default function BalanceCards({ wallets }: Props) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Balance by Network</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((w) => (
          <div key={w.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Badge color={networkColors[w.network]}>{networkLabels[w.network]}</Badge>
              {w.yieldEnrolled && (
                <span className="text-xs font-medium text-[#009A35] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#009A35] rounded-full"></span>
                  Yield
                </span>
              )}
            </div>
            <p className="text-xl font-bold text-slate-900 tracking-tight">{formatZAR(mockBalances[w.id] || 0)}</p>
            <p className="text-xs text-slate-400 mt-1.5 font-mono">{truncateAddress(w.address)}</p>
            <p className="text-xs text-slate-500 mt-0.5">{w.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
