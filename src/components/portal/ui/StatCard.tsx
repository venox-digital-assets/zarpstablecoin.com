import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  trend?: string;
  className?: string;
}

export default function StatCard({ label, value, icon, trend, className = '' }: StatCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-5 group hover:shadow-md transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-[#009A35] transition-colors">{label}</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
          {trend && <p className="mt-1 text-xs font-medium text-[#009A35]">{trend}</p>}
        </div>
        {icon && (
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#009A35]/10 group-hover:text-[#009A35] transition-colors">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
