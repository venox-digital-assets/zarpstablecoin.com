import { useState } from 'react';
import type { Wallet } from '../../../types/portal';
import { mockWallets, networkLabels, networkColors, truncateAddress } from '../../../data/portal-mock';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AddWalletModal from './AddWalletModal';

export default function AddressBook() {
  const [wallets, setWallets] = useState<Wallet[]>(mockWallets);
  const [showModal, setShowModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);

  const handleSave = (data: Omit<Wallet, 'id'> & { id?: string }) => {
    if (data.id) {
      setWallets((prev) => prev.map((w) => (w.id === data.id ? { ...w, ...data, id: w.id } : w)));
    } else {
      const newWallet: Wallet = { ...data, id: `w${Date.now()}` };
      setWallets((prev) => [...prev, newWallet]);
    }
    setShowModal(false);
    setEditingWallet(null);
  };

  const handleEdit = (wallet: Wallet) => {
    setEditingWallet(wallet);
    setShowModal(true);
  };

  const handleRemove = (id: string) => {
    setWallets((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleYield = (id: string) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, yieldEnrolled: !w.yieldEnrolled } : w))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Addressbook</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage your wallet addresses and yield enrollment.</p>
        </div>
        <Button onClick={() => { setEditingWallet(null); setShowModal(true); }}>
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Wallet
        </Button>
      </div>

      {wallets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-16 px-6">
          <div className="mx-auto w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 mb-4">No wallets added yet.</p>
          <Button onClick={() => setShowModal(true)}>Add Your First Wallet</Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Label</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Chain</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Yield</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {wallets.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-slate-900">{w.label}</td>
                    <td className="px-4 py-3.5">
                      <Badge color={networkColors[w.network]}>{networkLabels[w.network]}</Badge>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                      <span className="hidden sm:inline">{w.address}</span>
                      <span className="sm:hidden">{truncateAddress(w.address)}</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => toggleYield(w.id)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                          w.yieldEnrolled ? 'bg-[#009A35]' : 'bg-slate-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
                            w.yieldEnrolled ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(w)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemove(w.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <AddWalletModal
          wallet={editingWallet}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingWallet(null); }}
        />
      )}
    </div>
  );
}
