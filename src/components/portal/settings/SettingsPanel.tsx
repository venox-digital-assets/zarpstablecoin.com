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

      {/* Bank Accounts */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bank Accounts</h3>
          <Button variant="outline" size="sm" onClick={() => showToast('Add bank account coming soon')}>Add Bank Account</Button>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          You may link multiple bank accounts. All accounts must be held in the name of <span className="font-medium text-slate-700">{settings.companyName}</span>. Accounts in any other name will be rejected.
        </p>
        <div className="space-y-3">
          {settings.bankDetails.map((bank) => (
            <div key={bank.id} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-semibold text-slate-900">{bank.bankName}</p>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-1.5 gap-x-4 text-xs">
                    <div>
                      <dt className="text-slate-500">Account Number</dt>
                      <dd className="font-mono text-slate-900">{bank.accountNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Branch Code</dt>
                      <dd className="text-slate-900">{bank.branchCode}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Account Holder</dt>
                      <dd className="text-slate-900">{bank.accountHolder}</dd>
                    </div>
                  </dl>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => showToast('Edit coming soon')}>Edit</Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      showToast(
                        settings.bankDetails.length > 1
                          ? 'Remove coming soon'
                          : 'At least one bank account is required',
                      )
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-100">
                  Required
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {settings.twoFactorEnabled
                  ? '2FA is active on your account.'
                  : '2FA is mandatory for all partners. Set it up to authorise issuance and redemptions.'}
              </p>
            </div>
            <Button
              variant={settings.twoFactorEnabled ? 'outline' : 'primary'}
              size="sm"
              onClick={() => showToast(settings.twoFactorEnabled ? 'Manage 2FA coming soon' : 'Set up 2FA coming soon')}
            >
              {settings.twoFactorEnabled ? 'Manage 2FA' : 'Set up 2FA'}
            </Button>
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
