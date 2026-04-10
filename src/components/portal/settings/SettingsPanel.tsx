import { useState } from 'react';
import { mockSettings } from '../../../data/portal-mock';
import Button from '../ui/Button';

export default function SettingsPanel() {
  const settings = mockSettings;
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Company Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Company Information</h3>
        <dl className="divide-y divide-slate-100">
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Registered Name</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.companyName}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Trading As</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.tradingAs}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Registration Number</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.registrationNumber}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Country</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.country}</dd>
          </div>
        </dl>
      </div>

      {/* Account Representative */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Account Representative</h3>
          <Button variant="ghost" size="sm" onClick={() => showToast('Edit functionality coming soon')}>Edit</Button>
        </div>
        <dl className="divide-y divide-slate-100">
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Name</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.representative.name}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Email</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.representative.email}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Mobile</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.representative.mobile}</dd>
          </div>
        </dl>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bank Details</h3>
          <Button variant="ghost" size="sm" onClick={() => showToast('Update functionality coming soon')}>Update</Button>
        </div>
        <dl className="divide-y divide-slate-100">
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Bank</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.bankDetails.bankName}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Account Number</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2 font-mono">{settings.bankDetails.accountNumber}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Branch Code</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.bankDetails.branchCode}</dd>
          </div>
          <div className="py-3 grid grid-cols-3 gap-4">
            <dt className="text-sm text-slate-500">Account Holder</dt>
            <dd className="text-sm font-medium text-slate-900 col-span-2">{settings.bankDetails.accountHolder}</dd>
          </div>
        </dl>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Security</h3>
        <div className="space-y-0 divide-y divide-slate-100">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Password</p>
              <p className="text-xs text-slate-400 mt-0.5">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => showToast('Coming soon')}>Change Password</Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400 mt-0.5">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => showToast('Coming soon')}>Enable 2FA</Button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
