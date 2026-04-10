import { useState } from 'react';
import type { BankDetails, Network } from '../../../types/portal';
import { mockAccount, networkLabels, networkColors, formatZAR } from '../../../data/portal-mock';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

// ZARP contract/mint addresses per chain for partners to deposit to
const redeemAddresses: Record<string, string> = {
  ethereum: '0xb755506531786C8aC63B756BaB1ac387bACB0C04',
  base: '0xb755506531786C8aC63B756BaB1ac387bACB0C04',
  polygon: '0xb755506531786C8aC63B756BaB1ac387bACB0C04',
  solana: 'dngKhBQM3BGvsDHKhrLnjvRKfY5Q7gEnYGToj9Lk8rk',
};

const initialBankAccounts: BankDetails[] = [
  {
    bankName: 'First National Bank',
    accountNumber: '62890457321',
    branchCode: '250655',
    accountHolder: 'Protea Digital Trading (Pty) Ltd',
  },
];

export default function RedeemForm() {
  const [selectedChain, setSelectedChain] = useState<string>('');
  const [selectedBankIdx, setSelectedBankIdx] = useState<number>(0);
  const [bankAccounts, setBankAccounts] = useState<BankDetails[]>(initialBankAccounts);
  const [showAddBank, setShowAddBank] = useState(false);
  const [newBank, setNewBank] = useState<BankDetails>({ bankName: '', accountNumber: '', branchCode: '', accountHolder: mockAccount.companyName });
  const [bankErrors, setBankErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const redeemAddress = selectedChain ? redeemAddresses[selectedChain] : '';
  const selectedBank = bankAccounts[selectedBankIdx];

  const copyAddress = () => {
    navigator.clipboard?.writeText(redeemAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddBank = () => {
    const errors: Record<string, string> = {};
    if (!newBank.bankName.trim()) errors.bankName = 'Bank name is required';
    if (!newBank.accountNumber.trim()) errors.accountNumber = 'Account number is required';
    if (!newBank.branchCode.trim()) errors.branchCode = 'Branch code is required';
    if (Object.keys(errors).length > 0) {
      setBankErrors(errors);
      return;
    }
    setBankAccounts((prev) => [...prev, { ...newBank }]);
    setSelectedBankIdx(bankAccounts.length);
    setShowAddBank(false);
    setNewBank({ bankName: '', accountNumber: '', branchCode: '', accountHolder: mockAccount.companyName });
    setBankErrors({});
  };

  const removeBank = (idx: number) => {
    setBankAccounts((prev) => prev.filter((_, i) => i !== idx));
    if (selectedBankIdx >= idx && selectedBankIdx > 0) setSelectedBankIdx(selectedBankIdx - 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Chain selection & deposit address */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Redeem ZARP</h2>
        <p className="text-sm text-slate-500 mb-6">
          Deposit ZARP tokens to the address below. Tokens are automatically burned and the equivalent ZAR is sent to your bank account.
        </p>

        {/* Chain selector */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Chain <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(networkLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedChain(key)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedChain === key
                    ? 'border-[#009A35] bg-[#009A35]/5 text-[#009A35] ring-1 ring-[#009A35]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Badge color={networkColors[key]}>{label}</Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Deposit address */}
        {selectedChain && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                ZARP Deposit Address ({networkLabels[selectedChain]})
              </p>
              <div className="flex items-start gap-2">
                <code className="text-sm font-mono text-slate-900 break-all flex-1 leading-relaxed">{redeemAddress}</code>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-[#009A35] hover:bg-[#009A35]/10 transition-all"
                  title="Copy address"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-[#009A35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-[#009A35]/5 border border-[#009A35]/15 rounded-xl p-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                Send your ZARP tokens to the address above from a wallet registered in your{' '}
                <a href="/portal/addressbook" className="text-[#009A35] hover:underline font-medium">Addressbook</a>.
                Tokens will be <strong>automatically burned</strong> and the equivalent ZAR deposited to your selected bank account within 1-2 business days.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3.5">
              <p className="text-xs text-yellow-800">
                <strong>Important:</strong> Only send ZARP from a registered wallet. Deposits from unregistered wallets may experience delays while we verify the source.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right: Bank account management */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Bank Account</h2>
          {!showAddBank && (
            <Button variant="outline" size="sm" onClick={() => setShowAddBank(true)}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Account
            </Button>
          )}
        </div>
        <p className="text-sm text-slate-500 mb-5">
          ZAR proceeds will be deposited to the selected account. Accounts must be held in the name of <strong className="text-slate-700">{mockAccount.companyName}</strong>.
        </p>

        {/* Bank account list */}
        <div className="space-y-2 mb-4">
          {bankAccounts.map((bank, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedBankIdx(idx)}
              className={`relative flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                selectedBankIdx === idx
                  ? 'border-[#009A35] bg-[#009A35]/5 ring-1 ring-[#009A35]'
                  : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                selectedBankIdx === idx ? 'border-[#009A35]' : 'border-slate-300'
              }`}>
                {selectedBankIdx === idx && <div className="w-2 h-2 rounded-full bg-[#009A35]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{bank.bankName}</p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{bank.accountNumber} &middot; Branch {bank.branchCode}</p>
                <p className="text-xs text-slate-400 mt-0.5">{bank.accountHolder}</p>
              </div>
              {bankAccounts.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeBank(idx); }}
                  className="shrink-0 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add bank form */}
        {showAddBank && (
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Add Bank Account</p>

            <div>
              <input
                type="text"
                placeholder="Bank name (e.g. First National Bank)"
                value={newBank.bankName}
                onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#009A35] ${bankErrors.bankName ? 'border-red-300' : 'border-slate-200'}`}
              />
              {bankErrors.bankName && <p className="mt-1 text-xs text-red-600">{bankErrors.bankName}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Account number"
                value={newBank.accountNumber}
                onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#009A35] ${bankErrors.accountNumber ? 'border-red-300' : 'border-slate-200'}`}
              />
              {bankErrors.accountNumber && <p className="mt-1 text-xs text-red-600">{bankErrors.accountNumber}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Branch code"
                value={newBank.branchCode}
                onChange={(e) => setNewBank({ ...newBank, branchCode: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#009A35] ${bankErrors.branchCode ? 'border-red-300' : 'border-slate-200'}`}
              />
              {bankErrors.branchCode && <p className="mt-1 text-xs text-red-600">{bankErrors.branchCode}</p>}
            </div>

            <div className="bg-white rounded-lg border border-slate-200 px-3 py-2.5">
              <p className="text-xs text-slate-400">Account holder</p>
              <p className="text-sm text-slate-700 font-medium">{mockAccount.companyName}</p>
            </div>
            <p className="text-xs text-slate-400">
              Bank accounts must be held in the name of your registered company.
            </p>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => { setShowAddBank(false); setBankErrors({}); }}
                className="flex-1 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddBank}
                className="flex-1 px-3 py-2 text-sm text-white bg-slate-900 rounded-lg hover:bg-[#009A35] transition-colors"
              >
                Add Account
              </button>
            </div>
          </div>
        )}

        {/* Summary when chain is selected */}
        {selectedChain && selectedBank && (
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Redemption Summary</p>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Deposit chain</span>
              <Badge color={networkColors[selectedChain]}>{networkLabels[selectedChain]}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tokens burned</span>
              <span className="text-slate-700">Automatically on receipt</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">ZAR paid to</span>
              <span className="font-medium text-slate-900">{selectedBank.bankName} &middot; {selectedBank.accountNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Processing</span>
              <span className="text-slate-700">1-2 business days</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-200">
              <span>Fee</span>
              <span>R0.00 (0%)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
