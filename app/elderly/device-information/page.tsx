'use client';

import { useEffect, useState } from 'react';

export default function ElderlyDeviceInformationPage() {
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastUpdate(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Device Information</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor your device status</p>
      </div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Device Battery */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Device Battery</h2>
              <p className="text-xs text-gray-500">Current charge level</p>
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
            <p className="text-xs text-gray-500 mt-1">Battery Level</p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">Good Condition</span>
            </div>
          </div>
        </div>

        {/* Card 2: Last Update */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Last Update</h2>
              <p className="text-xs text-gray-500">When data was synced</p>
            </div>
          </div>

          <div className="text-center py-4">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <p className="text-2xl font-bold text-gray-900">{lastUpdate}</p>
            <p className="text-xs text-gray-500 mt-1">Last Update</p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-700">Real-time Sync</span>
            </div>
          </div>
        </div>

        {/* Card 3: Device Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Device Status</h2>
              <p className="text-xs text-gray-500">Connection status</p>
            </div>
          </div>

          <div className="text-center py-4">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🟢</span>
              <p className="text-2xl font-bold text-gray-900">Active</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Device Status</p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Banner */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-blue-700">
            This device is connected to the Child/Family monitoring system.
          </p>
        </div>
      </div>
    </div>
  );
}
