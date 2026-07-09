'use client';

import { useRouter } from 'next/navigation';
import { useSapaLanguage } from '@/context/SapaLanguageContext';

export default function RoleSelectPage() {
  const { t } = useSapaLanguage();
  const router = useRouter();

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {t('role.title')}
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm">
          {t('role.subtitle')}
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/child/dashboard')}
            className="w-full p-5 border-2 border-gray-200 rounded-xl hover:border-[#1e3a8a] hover:bg-blue-50 transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t('role.anak')}</p>
                <p className="text-sm text-gray-500">{t('role.anak.desc')}</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/elderly/home')}
            className="w-full p-5 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t('role.lansia')}</p>
                <p className="text-sm text-gray-500">{t('role.lansia.desc')}</p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={() => router.push('/login')}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-6"
        >
          {t('role.backToLogin')}
        </button>
      </div>
    </div>
  );
}
