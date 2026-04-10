import { useState } from 'react';
import type { Wallet, Network } from '../../../types/portal';
import { networkLabels } from '../../../data/portal-mock';
import Button from '../ui/Button';

interface Props {
  wallet?: Wallet | null;
  onSave: (wallet: Omit<Wallet, 'id'> & { id?: string }) => void;
  onClose: () => void;
}

export default function AddWalletModal({ wallet, onSave, onClose }: Props) {
  const [label, setLabel] = useState(wallet?.label || '');
  const [network, setNetwork] = useState<string>(wallet?.network || '');
  const [address, setAddress] = useState(wallet?.address || '');
  const [yieldEnrolled, setYieldEnrolled] = useState(wallet?.yieldEnrolled || false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!label.trim()) newErrors.label = 'Label is required';
    if (!network) newErrors.network = 'Chain is required';
    if (!address.trim()) newErrors.address = 'Wallet address is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave({
      id: wallet?.id,
      label: label.trim(),
      network: network as Network,
      address: address.trim(),
      yieldEnrolled,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          {wallet ? 'Edit Wallet' : 'Add Wallet'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Label <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Primary EVM"
              className={`block w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#009A35] ${errors.label ? 'border-red-300' : 'border-slate-200'}`}
            />
            {errors.label && <p className="mt-1 text-xs text-red-600">{errors.label}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Chain <span className="text-red-500">*</span></label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className={`block w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#009A35] ${errors.network ? 'border-red-300' : 'border-slate-200'}`}
            >
              <option value="">Select chain...</option>
              {Object.entries(networkLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            {errors.network && <p className="mt-1 text-xs text-red-600">{errors.network}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Wallet Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x... or base58 address"
              className={`block w-full rounded-xl border px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#009A35] ${errors.address ? 'border-red-300' : 'border-slate-200'}`}
            />
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={yieldEnrolled}
              onChange={(e) => setYieldEnrolled(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#009A35] focus:ring-[#009A35]"
            />
            <span className="text-sm text-slate-700">Enroll in Yield</span>
          </label>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">{wallet ? 'Save Changes' : 'Add Wallet'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
