import { useState } from 'react';
import Button from '../ui/Button';

type Step = 'credentials' | '2fa';
type TwoFAMethod = 'passkey' | 'authenticator';

export default function LoginForm() {
  const [step, setStep] = useState<Step>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFAMethod, setTwoFAMethod] = useState<TwoFAMethod>('passkey');
  const [otpCode, setOtpCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passkeyState, setPasskeyState] = useState<'idle' | 'waiting' | 'success'>('idle');

  const validateCredentials = () => {
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    return next;
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCredentials();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep('2fa');
  };

  const handlePasskeyPrompt = () => {
    setPasskeyState('waiting');
    // Simulates a passkey prompt resolving
    setTimeout(() => setPasskeyState('success'), 2200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (otpCode.replace(/\s/g, '').length !== 6) errs.otp = 'Enter the 6-digit code from your authenticator app';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    // Simulate success — redirect to dashboard
    window.location.href = '/portal/dashboard';
  };

  if (passkeyState === 'success') {
    window.location.href = '/portal/dashboard';
    return null;
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src="/img/zarp_logo_light.svg" alt="ZARP" className="h-9 w-auto mb-3" />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Partner Portal</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Step indicator strip */}
        <div className="flex border-b border-slate-100">
          <div className={`flex-1 py-2.5 text-center text-xs font-semibold transition-colors ${step === 'credentials' ? 'text-[#009A35]' : 'text-slate-400'}`}>
            <span className={`inline-flex items-center gap-1.5`}>
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${step === 'credentials' ? 'bg-[#009A35] text-white' : 'bg-[#009A35] text-white'}`}>
                {step === '2fa' ? (
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : '1'}
              </span>
              Sign in
            </span>
          </div>
          <div className={`flex-1 py-2.5 text-center text-xs font-semibold transition-colors ${step === '2fa' ? 'text-[#009A35]' : 'text-slate-400'}`}>
            <span className="inline-flex items-center gap-1.5">
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${step === '2fa' ? 'bg-[#009A35] text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
              Verify
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1 — Credentials */}
          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009A35] focus:border-transparent transition ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                  placeholder="you@company.co.za"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <a href="#" className="text-xs text-[#009A35] hover:underline">Forgot password?</a>
                </div>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009A35] focus:border-transparent transition ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                  placeholder="••••••••••••"
                />
                {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full mt-1">
                Continue
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </form>
          )}

          {/* Step 2 — 2FA */}
          {step === '2fa' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 mb-0.5">Two-factor verification</h2>
                <p className="text-xs text-slate-500">Choose how you'd like to verify your identity.</p>
              </div>

              {/* Method toggle */}
              <div className="grid grid-cols-2 gap-2">
                {(['passkey', 'authenticator'] as TwoFAMethod[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setTwoFAMethod(m); setErrors({}); setOtpCode(''); setPasskeyState('idle'); }}
                    className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border text-xs font-medium transition-all ${
                      twoFAMethod === m
                        ? 'border-[#009A35] bg-[#009A35]/5 text-[#009A35] ring-1 ring-[#009A35]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {m === 'passkey' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {m === 'passkey' ? 'Passkey' : 'Authenticator'}
                  </button>
                ))}
              </div>

              {/* Passkey panel */}
              {twoFAMethod === 'passkey' && (
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 text-center">
                    {passkeyState === 'idle' && (
                      <>
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-700 mb-1">Use your passkey</p>
                        <p className="text-xs text-slate-500 mb-3">Authenticate with your device biometrics or security key.</p>
                        <Button variant="primary" size="sm" className="w-full" onClick={handlePasskeyPrompt}>
                          Authenticate with Passkey
                        </Button>
                      </>
                    )}
                    {passkeyState === 'waiting' && (
                      <div className="py-2">
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-[#009A35] border-t-transparent animate-spin" />
                        <p className="text-sm font-medium text-slate-700">Waiting for passkey…</p>
                        <p className="text-xs text-slate-400 mt-1">Complete the prompt on your device.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Authenticator panel */}
              {twoFAMethod === 'authenticator' && (
                <form onSubmit={handleOtpSubmit} noValidate className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">6-digit code</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={7}
                      value={otpCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
                        setOtpCode(val);
                      }}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-mono tracking-[0.25em] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#009A35] focus:border-transparent transition ${errors.otp ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                      placeholder="000000"
                    />
                    {errors.otp && <p className="mt-1.5 text-xs text-red-600">{errors.otp}</p>}
                  </div>
                  <p className="text-xs text-slate-400">Open your authenticator app and enter the current code for ZARP Portal.</p>
                  <Button type="submit" variant="primary" size="md" className="w-full">
                    Verify & Sign In
                  </Button>
                </form>
              )}

              <button
                type="button"
                onClick={() => { setStep('credentials'); setErrors({}); setPasskeyState('idle'); }}
                className="w-full text-xs text-slate-400 hover:text-slate-600 transition-colors text-center"
              >
                ← Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Apply link */}
      <p className="text-center text-xs text-slate-500 mt-6">
        Not a partner yet?{' '}
        <a href="/portal/apply" className="text-[#009A35] font-medium hover:underline">
          Apply for a partner account
        </a>
      </p>
    </div>
  );
}
