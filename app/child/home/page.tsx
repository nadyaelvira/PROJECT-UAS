'use client';

import dynamic from 'next/dynamic';

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

export default function ChildHomePage() {
  const distanceFromZone = 3;

  return (
    <div className="h-full flex flex-col">
      {/* Page Title */}
      <div className="shrink-0 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time location monitoring</p>
      </div>

      {/* Two-Column Layout: Map (70%) + Cards (30%) */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Column - Map */}
        <div className="w-[70%] bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h2 className="text-sm font-semibold text-gray-900">Live Location</h2>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
              Safe Zone Active
            </span>
          </div>
          <div className="flex-1">
            <LiveLocationMap
              center={SAFE_ZONE_CENTER}
              currentPosition={CURRENT_POSITION}
              safeZoneRadius={SAFE_ZONE_RADIUS}
              isInsideZone={true}
              address="Jl. Sukarno No.70, Malang"
            />
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="w-[30%] flex flex-col gap-4 overflow-y-auto">
          {/* Card 1: Current Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Current Status</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-lg font-bold text-green-600">SAFE</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-gray-900">Just now</p>
              </div>
            </div>
          </div>

          {/* Card 2: Distance from Safe Zone */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Distance from Safe Zone</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Distance</p>
                <p className="text-lg font-bold text-green-600">{distanceFromZone} meters</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Zone Threshold</p>
                <p className="text-sm font-semibold text-gray-900">{SAFE_ZONE_RADIUS}m</p>
              </div>
            </div>
          </div>

          {/* Card 3: Current Safe Zone */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Current Safe Zone</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Zone Name</p>
                <p className="text-sm font-semibold text-gray-900">Home</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-xs font-medium text-gray-900">Jl. Sukarno No.70, Malang</p>
              </div>
            </div>
          </div>

          {/* Card 4: Safe Radius */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Safe Zone</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Safe Zone</p>
                <p className="text-lg font-bold text-blue-600">{SAFE_ZONE_RADIUS}m</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Coverage Area</p>
                <p className="text-sm font-semibold text-gray-900">~78.5 m&sup2;</p>
              </div>
            </div>
          </div>

          {/* Card 5: Current Location */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Current Location</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-sm font-semibold text-gray-900">Jl. Sukarno No.70</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Coordinates</p>
                <p className="text-xs font-medium text-gray-900">-7.9664, 112.6328</p>
              </div>
            </div>
          </div>

          {/* Card 6: Device Battery */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Device Battery</h3>
            </div>
            <div className="text-center py-4">
              <div className="relative inline-block mb-3">
                <div className="w-20 h-10 bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute left-1 top-1 bottom-1 w-[70%] bg-green-500 rounded"></div>
                </div>
                <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-1.5 h-4 bg-gray-300 rounded-r"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-xs text-gray-500 mt-1">Good Condition</p>
            </div>
          </div>

          {/* Card 7: Latest Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Latest Notifications</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-green-700">Entered Safe Zone</p>
                  <p className="text-xs text-gray-500">2 min ago</p>
                </div>
                <p className="text-xs text-gray-600 mt-1">Suti has entered the Home safe zone</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-700">Battery Update</p>
                  <p className="text-xs text-gray-500">1 hr ago</p>
                </div>
                <p className="text-xs text-gray-600 mt-1">Device battery at 78%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
