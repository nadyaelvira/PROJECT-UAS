'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';

const LiveLocationMap = dynamic(() => import('@/components/LiveLocationMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
});

const SAFE_ZONE_CENTER: [number, number] = [-7.9666, 112.6326];
const CURRENT_POSITION: [number, number] = [-7.9663, 112.6330];
const SAFE_ZONE_RADIUS = 5;

export default function OutOfZonePage() {
  const distanceFromZone = 8;
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-red-700">{t('ozone.title')}</h1>
          <p className="text-sm text-red-600">{t('ozone.subtitle')}</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-sm font-semibold text-gray-900">{t('home.liveLocation')}</h2>
          </div>
          <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">{t('ozone.outsideZone')}</span>
        </div>
        <LiveLocationMap center={SAFE_ZONE_CENTER} currentPosition={CURRENT_POSITION} safeZoneRadius={SAFE_ZONE_RADIUS} isInsideZone={false} address="Jl. Sukarno No.70, Malang" />
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{t('ozone.currentLocation')}</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{t('ozone.address')}</p>
              <p className="text-sm font-semibold text-gray-900">Jl. Jenderal Sudirman</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{t('ozone.distance')}</p>
              <p className="text-lg font-bold text-red-600">{distanceFromZone} {t('ozone.meters')}</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{t('ozone.safeZone')}</h3>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{t('ozone.zoneName')}</p>
              <p className="text-sm font-semibold text-gray-900">{t('ozone.home')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{t('ozone.address')}</p>
              <p className="text-xs font-medium text-gray-900">Jl. Sukarno No.70, Malang</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{t('ozone.safeRadius')}</p>
              <p className="text-sm font-bold text-blue-600">{SAFE_ZONE_RADIUS} {t('ozone.meters')}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">{t('home.status')}</p>
              <p className="text-sm font-bold text-red-600">{t('ozone.ozoneStatus')}</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{t('ozone.deviceBattery')}</h3>
          </div>
          <div className="text-center py-4">
            <div className="relative inline-block mb-3">
              <div className="w-20 h-10 bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute left-1 top-1 bottom-1 w-[70%] bg-green-500 rounded"></div>
              </div>
              <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-1.5 h-4 bg-gray-300 rounded-r"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">78%</p>
            <p className="text-xs text-gray-500 mt-1">{t('ozone.goodCondition')}</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-red-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{t('ozone.needHelp')}</h3>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-xs text-red-500 mb-4 text-center font-medium">{t('ozone.tapForHelp')}</p>
            <button className="w-full py-3 px-4 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>{t('ozone.needHelpBtn')}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
