'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTextSize } from '@/context/TextSizeContext';
import { useLanguage } from '@/context/LanguageContext';

type AlarmType = 'alarm1' | 'alarm2' | 'alarm3';

function playTone(ctx: AudioContext, freq: number, duration: number, type: OscillatorType = 'sine', startTime: number = 0, volume: number = 0.5) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

function playAlarmSound(ctx: AudioContext, alarm: AlarmType, volume: number) {
  const v = volume / 100;
  if (alarm === 'alarm1') {
    [523, 659, 784, 1047].forEach((freq, i) => playTone(ctx, freq, 0.4, 'sine', i * 0.3, v * 0.4));
    [523, 659, 784, 1047].forEach((freq, i) => playTone(ctx, freq, 0.4, 'sine', 1.2 + i * 0.3, v * 0.4));
  }
  if (alarm === 'alarm2') {
    for (let i = 0; i < 4; i++) {
      playTone(ctx, 880, 0.15, 'square', i * 0.2, v * 0.3);
      playTone(ctx, 1100, 0.15, 'square', i * 0.2 + 0.1, v * 0.2);
    }
    for (let i = 0; i < 4; i++) {
      playTone(ctx, 880, 0.15, 'square', 0.9 + i * 0.2, v * 0.3);
      playTone(ctx, 1100, 0.15, 'square', 0.9 + i * 0.2 + 0.1, v * 0.2);
    }
  }
  if (alarm === 'alarm3') {
    const melody = [{ f: 523, d: 0.25 }, { f: 587, d: 0.25 }, { f: 659, d: 0.25 }, { f: 523, d: 0.25 }, { f: 659, d: 0.25 }, { f: 587, d: 0.25 }, { f: 784, d: 0.5 }];
    let t = 0;
    melody.forEach(({ f, d }) => { playTone(ctx, f, d + 0.05, 'sine', t, v * 0.4); t += d; });
  }
}

export default function ElderlySettingsPage() {
  const { textSize, setTextSize } = useTextSize();
  const { t, language, setLanguage } = useLanguage();
  const [alarmVolume, setAlarmVolume] = useState(70);
  const [alarmSound, setAlarmSound] = useState<AlarmType>('alarm1');
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAlarm = useCallback(() => {
    if (ctxRef.current && ctxRef.current.state !== 'closed') { ctxRef.current.close(); ctxRef.current = null; }
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setIsPlaying(false);
  }, []);

  const playAlarm = useCallback(() => {
    stopAlarm();
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    playAlarmSound(ctx, alarmSound, alarmVolume);
    setIsPlaying(true);
    timerRef.current = setTimeout(() => {
      setIsPlaying(false);
      if (ctxRef.current && ctxRef.current.state !== 'closed') { ctxRef.current.close(); ctxRef.current = null; }
    }, 2500);
  }, [alarmSound, alarmVolume, stopAlarm]);

  useEffect(() => () => stopAlarm(), [stopAlarm]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Text Size */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t('settings.textSize')}</h2>
              <p className="text-xs text-gray-500">{t('settings.textSizeDesc')}</p>
            </div>
          </div>
          <div className="space-y-2">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button key={size} onClick={() => setTextSize(size)}
                className={`w-full py-3 px-4 rounded-lg text-left transition-colors flex items-center justify-between text-sm font-medium ${textSize === size ? 'bg-blue-50 border border-blue-200 text-blue-600' : 'bg-gray-50 border border-transparent text-gray-600 hover:bg-gray-100'}`}>
                <span className="capitalize">{size}</span>
                {textSize === size && <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">{t('settings.preview')}</p>
            <p className="text-base font-medium text-gray-900">{t('settings.previewText')}</p>
            <p className="text-sm text-gray-600 mt-1">{t('settings.previewSecondary')}</p>
          </div>
        </div>

        {/* Card 2: Alarm Volume */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t('settings.alarmVolume')}</h2>
              <p className="text-xs text-gray-500">{t('settings.alarmVolumeDesc')}</p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">{t('settings.volume')}</span>
              <span className="text-sm font-semibold text-blue-600">{alarmVolume}%</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              <input type="range" min="0" max="100" value={alarmVolume} onChange={(e) => setAlarmVolume(Number(e.target.value))} className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={isPlaying ? stopAlarm : playAlarm} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isPlaying ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'}`}>
                {isPlaying ? (
                  <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg><span>{t('settings.stop')}</span></>
                ) : (
                  <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg><span>{t('settings.testSound')}</span></>
                )}
              </button>
              <span className="text-xs text-gray-500">{isPlaying ? t('settings.playing') : t('settings.clickToTest')}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Language */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t('settings.language')}</h2>
              <p className="text-xs text-gray-500">{t('settings.languageDesc')}</p>
            </div>
          </div>
          <select value={language} onChange={(e) => setLanguage(e.target.value as 'id' | 'en')}
            className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
            <option value="id">{t('settings.indonesian')}</option>
            <option value="en">{t('settings.english')}</option>
          </select>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">{language === 'id' ? t('settings.langIdNote') : t('settings.langEnNote')}</p>
          </div>
        </div>

        {/* Card 4: Alarm Sound */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t('settings.alarmSound')}</h2>
              <p className="text-xs text-gray-500">{t('settings.alarmSoundDesc')}</p>
            </div>
          </div>
          <select value={alarmSound} onChange={(e) => setAlarmSound(e.target.value as AlarmType)}
            className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
            <option value="alarm1">{t('settings.alarm1')}</option>
            <option value="alarm2">{t('settings.alarm2')}</option>
            <option value="alarm3">{t('settings.alarm3')}</option>
          </select>
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{t(`settings.alarm${alarmSound.replace('alarm', '')}Desc`)}</p>
            <p className="text-xs text-gray-500 mt-1">{t('settings.alarmTestNote')}</p>
          </div>
        </div>
      </div>

      {/* Safe Zone Notice */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">{t('settings.safeZoneTitle')}</h3>
            <p className="text-xs text-gray-500 mt-1">{t('settings.safeZoneDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
