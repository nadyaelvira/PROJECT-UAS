'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ElderlyDeviceInformationPage() {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const { t, language } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const locale = language === 'id' ? 'id-ID' : 'en-US';
      setLastUpdate(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: language === 'en' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('device.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('device.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Battery */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t('device.battery')}</h2>
              <p className="text-xs text-gray-500">{t('device.batteryDesc')}</p>
            </div>
          </div>
          <div className="text-center py-4">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-12 bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute left-1 top-1 bottom-1 w-[70%] bg-green-500 rounded"></div>
              </div>
              <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-2 h-5 bg-gray-300 rounded-r"></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">78%</p>
            <p className="text-xs text-gray-500 mt-1">{t('device.batteryLevel')}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">{t('device.goodCondition')}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Last Update */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t('device.lastUpdate')}</h2>
              <p className="text-xs text-gray-500">{t('device.lastUpdateDesc')}</p>
            </div>
          </div>
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">{lastUpdate}</p>
            <p className="text-xs text-gray-500 mt-1">{t('device.lastUpdateLabel')}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-700">{t('device.realtimeSync')}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t('device.status')}</h2>
              <p className="text-xs text-gray-500">{t('device.statusDesc')}</p>
            </div>
          </div>
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🟢</span>
              <p className="text-2xl font-bold text-gray-900">{t('device.active')}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t('device.status')}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">{t('device.connected')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-sm text-blue-700">{t('device.infoNote')}</p>
        </div>
      </div>
    </div>
  );
}
