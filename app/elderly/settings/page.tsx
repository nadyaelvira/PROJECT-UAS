"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useTextSize } from "@/context/TextSizeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSharedStore } from "@/components/shared/sharedStore";

type AlarmType = "alarm1" | "alarm2" | "alarm3";

function playTone(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  startTime: number = 0,
  volume: number = 0.5
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + startTime + duration
  );
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

function playAlarmSound(ctx: AudioContext, alarm: AlarmType, volume: number) {
  const v = volume / 100;
  if (alarm === "alarm1") {
    [523, 659, 784, 1047].forEach((freq, i) =>
      playTone(ctx, freq, 0.4, "sine", i * 0.3, v * 0.4)
    );
    [523, 659, 784, 1047].forEach((freq, i) =>
      playTone(ctx, freq, 0.4, "sine", 1.2 + i * 0.3, v * 0.4)
    );
  }
  if (alarm === "alarm2") {
    for (let i = 0; i < 4; i++) {
      playTone(ctx, 880, 0.15, "square", i * 0.2, v * 0.3);
      playTone(ctx, 1100, 0.15, "square", i * 0.2 + 0.1, v * 0.2);
    }
    for (let i = 0; i < 4; i++) {
      playTone(ctx, 880, 0.15, "square", 0.9 + i * 0.2, v * 0.3);
      playTone(ctx, 1100, 0.15, "square", 0.9 + i * 0.2 + 0.1, v * 0.2);
    }
  }
  if (alarm === "alarm3") {
    const melody = [
      { f: 523, d: 0.25 },
      { f: 587, d: 0.25 },
      { f: 659, d: 0.25 },
      { f: 523, d: 0.25 },
      { f: 659, d: 0.25 },
      { f: 587, d: 0.25 },
      { f: 784, d: 0.5 },
    ];
    let t = 0;
    melody.forEach(({ f, d }) => {
      playTone(ctx, f, d + 0.05, "sine", t, v * 0.4);
      t += d;
    });
  }
}

export default function ElderlySettingsPage() {
  const { textSize, setTextSize } = useTextSize();
  const { t, language, setLanguage } = useLanguage();
  const { alarmEnabled, setAlarmEnabled, alarmSound, setAlarmSound, alarmVolume, setAlarmVolume } = useSharedStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAlarm = useCallback(() => {
    if (ctxRef.current && ctxRef.current.state !== "closed") {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
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
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        ctxRef.current.close();
        ctxRef.current = null;
      }
    }, 2500);
  }, [alarmSound, alarmVolume, stopAlarm]);

  useEffect(() => () => stopAlarm(), [stopAlarm]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("settings.title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("settings.subtitle")}</p>
      </div>

      <div className="space-y-6">
        {/* Text Size */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{t("settings.textSize")}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{t("settings.textSizeDesc")}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-2">
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`w-full py-3 px-4 rounded-xl text-left transition-colors flex items-center justify-between text-sm font-medium ${
                    textSize === size
                      ? "bg-blue-50 border border-blue-200 text-blue-600"
                      : "bg-gray-50 border border-transparent text-gray-600 hover:bg-gray-100"
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
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">{t("settings.preview")}</p>
              <p className="text-base font-medium text-gray-900">{t("settings.previewText")}</p>
              <p className="text-sm text-gray-600 mt-1">{t("settings.previewSecondary")}</p>
            </div>
          </div>
        </section>

        {/* Alarm Volume */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{t("settings.alarmVolume")}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{t("settings.alarmVolumeDesc")}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">{t("settings.volume")}</span>
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
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={isPlaying ? stopAlarm : playAlarm}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isPlaying
                    ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                    : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                }`}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                    <span>{t("settings.stop")}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>{t("settings.testSound")}</span>
                  </>
                )}
              </button>
              <span className="text-xs text-gray-500">
                {isPlaying ? t("settings.playing") : t("settings.clickToTest")}
              </span>
            </div>
          </div>
        </section>

        {/* Language */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{t("settings.language")}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{t("settings.languageDesc")}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "id" | "en")}
              className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="id">{t("settings.indonesian")}</option>
              <option value="en">{t("settings.english")}</option>
            </select>
            <div className="mt-3 p-3 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-700">
                {language === "id" ? t("settings.langIdNote") : t("settings.langEnNote")}
              </p>
            </div>
          </div>
        </section>

        {/* Alarm Sound */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{t("settings.alarmSound")}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{t("settings.alarmSoundDesc")}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <select
              value={alarmSound}
              onChange={(e) => setAlarmSound(e.target.value as AlarmType)}
              className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="alarm1">{t("settings.alarm1")}</option>
              <option value="alarm2">{t("settings.alarm2")}</option>
              <option value="alarm3">{t("settings.alarm3")}</option>
            </select>
            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-700">
                {t(`settings.alarm${alarmSound.replace("alarm", "")}Desc`)}
              </p>
              <p className="text-xs text-gray-500 mt-1">{t("settings.alarmTestNote")}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Safe Zone Notice */}
      <div className="mt-6 bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">{t("settings.safeZoneTitle")}</h3>
            <p className="text-xs text-gray-500 mt-1">{t("settings.safeZoneDesc")}</p>
          </div>
        </div>
      </div>

      {/* About Application */}
      <div className="mt-4">
        <Link
          href="/elderly/about"
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">About Application</h3>
            <p className="text-xs text-gray-500 mt-0.5">Information about SAPA</p>
          </div>
          <svg className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
