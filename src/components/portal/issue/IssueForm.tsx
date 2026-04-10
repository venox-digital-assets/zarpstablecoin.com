import { useState, useRef, useEffect } from 'react';
import type { Wallet } from '../../../types/portal';
import { mockWallets, mockAccount, networkLabels, networkColors, formatZAR, truncateAddress } from '../../../data/portal-mock';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function IssueForm() {
  const [wallets, setWallets] = useState<Wallet[]>(mockWallets);
  const [selectedWalletId, setSelectedWalletId] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddInline, setShowAddInline] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newNetwork, setNewNetwork] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedWallet = wallets.find((w) => w.id === selectedWalletId);
  const zarAmount = parseFloat(amount) || 0;
  const partnerRef = mockAccount.companyName.replace(/[^A-Z0-9]/gi, '').slice(0, 6).toUpperCase() + '-' + '00247';

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setShowAddInline(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleAddWallet = () => {
    if (!newLabel.trim() || !newNetwork || !newAddress.trim()) return;
    const w: Wallet = {
      id: `w${Date.now()}`,
      label: newLabel.trim(),
      network: newNetwork as Wallet['network'],
      address: newAddress.trim(),
      yieldEnrolled: false,
    };
    setWallets((prev) => [...prev, w]);
    setSelectedWalletId(w.id);
    setDropdownOpen(false);
    setShowAddInline(false);
    setNewLabel('');
    setNewNetwork('');
    setNewAddress('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedWalletId || zarAmount <= 0) return;
    setShowConfirm(true);
  };

  const confirm = () => {
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedWalletId('');
      setAmount('');
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Issue Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Issue ZARP</h2>
        <p className="text-sm text-slate-500 mb-6">Deposit ZAR and receive ZARP tokens on your chosen network.</p>

        {showSuccess ? (
          <div className="text-center py-10">
            <div className="mx-auto w-14 h-14 bg-[#009A35]/10 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#009A35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-base font-semibold text-slate-900">Issuance request submitted</p>
            <p className="text-sm text-slate-500 mt-1">Your ZARP tokens will be issued once the deposit is confirmed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Wallet selector dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Destination Wallet <span className="text-red-500">*</span>
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`block w-full text-left rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#009A35] ${
                    selectedWallet ? 'border-slate-200 text-slate-900' : 'border-slate-200 text-slate-400'
                  }`}
                >
                  {selectedWallet ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{selectedWallet.label}</span>
                        <span className="text-slate-400 ml-2 font-mono text-xs">{truncateAddress(selectedWallet.address)}</span>
                      </div>
                      <Badge color={networkColors[selectedWallet.network]}>{networkLabels[selectedWallet.network]}</Badge>
                    </div>
                  ) : (
                    'Select a wallet...'
                  )}
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                    {/* Existing wallets */}
                    <div className="max-h-56 overflow-y-auto">
                      {wallets.length === 0 && !showAddInline && (
                        <div className="px-4 py-3 text-sm text-slate-400">No wallets yet</div>
                      )}
                      {wallets.map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => { setSelectedWalletId(w.id); setDropdownOpen(false); }}
                          className={`block w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${
                            selectedWalletId === w.id ? 'bg-[#009A35]/5' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium text-slate-900">{w.label}</span>
                              <p className="text-xs text-slate-400 font-mono mt-0.5">{truncateAddress(w.address)}</p>
                            </div>
                            <Badge color={networkColors[w.network]}>{networkLabels[w.network]}</Badge>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Add new inline */}
                    {showAddInline ? (
                      <div className="border-t border-slate-100 p-4 bg-slate-50 space-y-3">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Add New Wallet</p>
                        <input
                          type="text"
                          placeholder="Label (e.g. Treasury)"
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009A35]"
                        />
                        <select
                          value={newNetwork}
                          onChange={(e) => setNewNetwork(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009A35]"
                        >
                          <option value="">Select chain...</option>
                          {Object.entries(networkLabels).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Wallet address"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#009A35]"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setShowAddInline(false)}
                            className="flex-1 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleAddWallet}
                            disabled={!newLabel.trim() || !newNetwork || !newAddress.trim()}
                            className="flex-1 px-3 py-2 text-sm text-white bg-slate-900 rounded-lg hover:bg-[#009A35] transition-colors disabled:opacity-50"
                          >
                            Add & Select
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAddInline(true)}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-[#009A35] hover:bg-[#009A35]/5 transition-colors border-t border-slate-100 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add new wallet
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Amount (ZAR) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">R</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="0.00"
                  className="block w-full rounded-xl border border-slate-200 pl-8 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#009A35] focus:border-[#009A35]"
                />
              </div>
            </div>

            {/* Summary */}
            {zarAmount > 0 && selectedWallet && (
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">You deposit</span>
                  <span className="font-semibold text-slate-900">{formatZAR(zarAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">You receive</span>
                  <span className="font-bold text-[#009A35]">{zarAmount.toLocaleString('en-ZA')} ZARP</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-200">
                  <span>Fee</span>
                  <span>R0.00 (0%)</span>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={!selectedWalletId || zarAmount <= 0}>
              Issue ZARP
            </Button>
          </form>
        )}
      </div>

      {/* Deposit Details */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Deposit Details</h2>
        <p className="text-sm text-slate-500 mb-6">
          Use the banking details below to make your ZAR deposit. You <strong className="text-slate-700">must</strong> include your unique reference so we can match your payment.
        </p>

        {/* Unique Reference */}
        <div className="bg-[#009A35]/5 border border-[#009A35]/20 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-[#009A35] uppercase tracking-wider mb-1.5">Your Unique Reference</p>
          <div className="flex items-center justify-between">
            <code className="text-lg font-bold text-slate-900 tracking-wider">{partnerRef}</code>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(partnerRef)}
              className="text-[#009A35] hover:text-[#008A2E] transition-colors p-1.5 rounded-lg hover:bg-[#009A35]/10"
              title="Copy reference"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-[#009A35]/70 mt-2">
            Include this reference in the payment description/reference field of your EFT or bank transfer.
          </p>
        </div>

        {/* Banking details */}
        <div className="space-y-0 divide-y divide-slate-100">
          <div className="flex justify-between py-3">
            <span className="text-sm text-slate-500">Account Name</span>
            <span className="text-sm font-medium text-slate-900">Inves Capital (Pty) Ltd</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-slate-500">Bank</span>
            <span className="text-sm font-medium text-slate-900">First National Bank (FNB)</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-slate-500">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-900 font-mono">63090829358</span>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText('63090829358')}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="Copy"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-slate-500">Branch Code</span>
            <span className="text-sm font-medium text-slate-900 font-mono">250655</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-slate-500">Account Type</span>
            <span className="text-sm font-medium text-slate-900">Cheque / Current</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-slate-500">Reference</span>
            <span className="text-sm font-bold text-[#009A35] font-mono">{partnerRef}</span>
          </div>
        </div>

        <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-3.5">
          <p className="text-xs text-yellow-800">
            <strong>Important:</strong> Deposits without the correct reference may experience delays.
            ZARP tokens will be issued to your selected wallet once the deposit has been confirmed, typically within 1 business day.
          </p>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && selectedWallet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Confirm Issuance</h3>
            <p className="text-sm text-slate-600 mb-4">
              You are about to deposit <strong>{formatZAR(zarAmount)}</strong> and receive{' '}
              <strong>{zarAmount.toLocaleString('en-ZA')} ZARP</strong> on {networkLabels[selectedWallet.network]}.
            </p>
            <p className="text-xs text-slate-500 mb-5 bg-slate-50 rounded-lg p-3">
              Deposit to FNB account <strong className="font-mono">63090829358</strong> with
              reference <strong className="font-mono text-[#009A35]">{partnerRef}</strong>
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">Cancel</Button>
              <Button onClick={confirm} className="flex-1">Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
