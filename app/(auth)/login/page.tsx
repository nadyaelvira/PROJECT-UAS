'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSapaLanguage } from '@/context/SapaLanguageContext';

const MOCK_EMAIL = 'admin@sapa.com';
const MOCK_PASSWORD = 'admin1234';

export default function LoginPage() {
  const { t } = useSapaLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError(t('auth.login.error.empty'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('auth.login.error.emailFormat'));
      return;
    }

    if (password.length < 8) {
      setError(t('auth.login.error.passwordMin'));
      return;
    }

    if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
      setError(t('auth.login.error.invalid'));
      return;
    }

    router.push('/role-select');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {!showForgot ? (
          <>
            <div className="text-center mb-4">
              <Image src="/logo.png" alt="SAPA Logo" width={56} height={56} className="mx-auto rounded-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
              {t('auth.login.title')}
            </h1>
            <p className="text-gray-500 text-center mb-8">
              {t('auth.login.subtitle')}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t('auth.login.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t('auth.login.password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm text-[#1e3a8a] hover:underline"
                >
                  {t('auth.login.forgotPassword')}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-base font-semibold text-white bg-[#1e3a8a] rounded-xl hover:bg-[#172554] transition-all shadow-lg"
              >
                {t('auth.login.submit')}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {t('auth.login.noAccount')}{' '}
              <Link href="/register" className="text-[#1e3a8a] font-semibold hover:underline">
                {t('auth.login.register')}
              </Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
              {t('auth.forgot.title')}
            </h1>
            <p className="text-gray-500 text-center mb-8 text-sm">
              {t('auth.forgot.subtitle')}
            </p>

            {!forgotSent ? (
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('auth.login.email')}
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-base font-semibold text-white bg-[#1e3a8a] rounded-xl hover:bg-[#172554] transition-all shadow-lg"
                >
                  {t('auth.forgot.submit')}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">{t('auth.forgot.success')}</p>
              </div>
            )}

            <button
              onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(''); }}
              className="w-full text-center text-sm text-[#1e3a8a] hover:underline mt-4"
            >
              {t('auth.forgot.back')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
