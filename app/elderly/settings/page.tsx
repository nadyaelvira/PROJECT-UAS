'use client';

import { useState } from 'react';

export default function ElderlySettingsPage() {
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [alarmVolume, setAlarmVolume] = useState(70);
  const [language, setLanguage] = useState('indonesian');
  const [alarmSound, setAlarmSound] = useState('alarm1');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Customize your experience</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Text Size */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Text Size</h2>
              <p className="text-xs text-gray-500">Adjust display text size</p>
            </div>
          </div>

          <div className="space-y-2">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setTextSize(size)}
                className={`w-full py-3 px-4 rounded-lg text-left transition-colors flex items-center justify-between text-sm font-medium ${
                  textSize === size
                    ? 'bg-blue-50 border border-blue-200 text-blue-600'
                    : 'bg-gray-50 border border-transparent text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="capitalize">{size}</span>
                {textSize === size && (
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Card 2: Alarm Volume */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Alarm Volume</h2>
              <p className="text-xs text-gray-500">Adjust alarm sound level</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Volume</span>
              <span className="text-sm font-semibold text-blue-600">{alarmVolume}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={alarmVolume}
              onChange={(e) => setAlarmVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />

            <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-lg">
              <svg className={`w-5 h-5 ${alarmVolume === 0 ? 'text-gray-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <div className="flex-1">
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${alarmVolume}%` }}></div>
                </div>
              </div>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Language */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Language</h2>
              <p className="text-xs text-gray-500">Select preferred language</p>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="indonesian">🇮🇩 Indonesian</option>
            <option value="english">🇺🇸 English</option>
          </select>

          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              {language === 'indonesian'
                ? 'Bahasa Indonesia dipilih sebagai bahasa utama.'
                : 'English is set as the primary language.'}
            </p>
          </div>
        </div>

        {/* Card 4: Alarm Sound */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Alarm Sound</h2>
              <p className="text-xs text-gray-500">Choose alarm tone</p>
            </div>
          </div>

          <select
            value={alarmSound}
            onChange={(e) => setAlarmSound(e.target.value)}
            className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="alarm1">🔔 Alarm 1 - Gentle Chime</option>
            <option value="alarm2">🔕 Alarm 2 - Classic Bell</option>
            <option value="alarm3">🎵 Alarm 3 - Melody</option>
          </select>

          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="text-sm text-gray-700">
                {alarmSound === 'alarm1' && 'Gentle Chime'}
                {alarmSound === 'alarm2' && 'Classic Bell'}
                {alarmSound === 'alarm3' && 'Melody'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Safe Zone Notice */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Safe Zone Settings</h3>
            <p className="text-xs text-gray-500 mt-1">
              Safe Zone and Safe Radius are managed by your family through the Child/Family dashboard.
              Contact your family if you need to modify these settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
