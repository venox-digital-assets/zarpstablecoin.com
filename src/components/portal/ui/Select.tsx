import { useState, useRef, useEffect } from 'react';

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  searchable?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  required,
  searchable = false,
  placeholder = 'Select...',
  error,
  className = '',
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = searchable && search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!searchable) {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`block w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:border-[#009A35] focus:ring-[#009A35]'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className={className} ref={ref}>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`block w-full text-left rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-slate-300 focus:ring-[#009A35]'
          } ${value ? 'text-slate-900' : 'text-slate-400'}`}
        >
          {value || placeholder}
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b border-slate-100">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#009A35]"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto max-h-48">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-sm text-slate-400">No results</div>
              ) : (
                filtered.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => { onChange(o); setOpen(false); setSearch(''); }}
                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      value === o ? 'bg-green-50 text-[#009A35] font-medium' : 'text-slate-700'
                    }`}
                  >
                    {o}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
