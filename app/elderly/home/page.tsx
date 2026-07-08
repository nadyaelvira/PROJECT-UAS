'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';

const LiveLocationMap = dynamic(() => import('@/components/LiveLocationMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
});

const SAFE_ZONE_CENTER: [number, number] = [-7.9666, 112.6326];
const CURRENT_POSITION: [number, number] = [-7.9664, 112.6328];
const SAFE_ZONE_RADIUS = 5;

export default function ElderlyHomePage() {
  const distanceFromZone = 3;
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('home.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('home.subtitle')}</p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Column - Map */}
        <div className="w-[70%] bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h2 className="text-sm font-semibold text-gray-900">{t('home.liveLocation')}</h2>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">{t('home.safeZoneActive')}</span>
          </div>
          <div className="flex-1">
            <LiveLocationMap center={SAFE_ZONE_CENTER} currentPosition={CURRENT_POSITION} safeZoneRadius={SAFE_ZONE_RADIUS} isInsideZone={true} address="Jl. Sukarno No.70, Malang" />
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="w-[30%] flex flex-col gap-4 overflow-y-auto">
          {/* Card 1: Current Location */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{t('home.currentLocation')}</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{t('home.address')}</p>
                <p className="text-sm font-semibold text-gray-900">Jl. Sukarno No.70</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{t('home.distance')}</p>
                <p className="text-lg font-bold text-green-600">{distanceFromZone} {t('home.meters')}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Safe Zone */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{t('home.safeZone')}</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{t('home.zoneName')}</p>
                <p className="text-sm font-semibold text-gray-900">{t('home.home')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{t('home.address')}</p>
                <p className="text-xs font-medium text-gray-900">Jl. Sukarno No.70, Malang</p>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">{t('home.radius')}</p>
                  <p className="text-sm font-bold text-blue-600">{SAFE_ZONE_RADIUS}m</p>
                </div>
                <div className="flex-1 bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">{t('home.status')}</p>
                  <p className="text-sm font-bold text-green-600">{t('home.safe')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Device Battery */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{t('home.deviceBattery')}</h3>
            </div>
            <div className="text-center py-4">
              <div className="relative inline-block mb-3">
                <div className="w-20 h-10 bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute left-1 top-1 bottom-1 w-[70%] bg-green-500 rounded"></div>
                </div>
                <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-1.5 h-4 bg-gray-300 rounded-r"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-xs text-gray-500 mt-1">{t('home.goodCondition')}</p>
            </div>
          </div>

          {/* Card 4: Need Help */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{t('home.needHelp')}</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-xs text-gray-500 mb-4 text-center">{t('home.tapForHelp')}</p>
              <button className="w-full py-3 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>{t('home.needHelpBtn')}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
