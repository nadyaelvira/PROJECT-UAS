"use client";

import { useState } from "react";
import Link from "next/link";
import { useSharedStore } from "@/components/shared/sharedStore";
import { useLanguage } from "@/context/LanguageContext";

export default function SettingsClient() {
  const { safeZoneDistance, setSafeZoneDistance } = useSharedStore();
  const { t, language, setLanguage } = useLanguage();
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [alarmOn, setAlarmOn] = useState(true);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("child.settings.title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("child.settings.subtitle")}
        </p>
      </div>

      <div className="space-y-6">
        {/* Default Safe Zone */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{t("child.settings.safeZone")}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("child.settings.safeZoneDesc")}
                </p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Safe Zone
            </label>
            <select
              value={safeZoneDistance}
              onChange={(e) => setSafeZoneDistance(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {[5, 10, 15, 20, 25].map((r) => (
                <option key={r} value={r}>{r} meters</option>
              ))}
            </select>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{t("child.settings.notifications")}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{t("child.settings.notificationsDesc")}</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{t("child.settings.enableNotif")}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t("child.settings.enableNotifDesc")}</p>
              </div>
              <button
                onClick={() => setNotificationsOn(!notificationsOn)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${notificationsOn ? "bg-blue-600" : "bg-gray-200"}`}
                role="switch"
                aria-checked={notificationsOn}
              >
                <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${notificationsOn ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{t("child.settings.alarmSound")}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t("child.settings.alarmSoundDesc")}</p>
              </div>
              <button
                onClick={() => setAlarmOn(!alarmOn)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${alarmOn ? "bg-blue-600" : "bg-gray-200"}`}
                role="switch"
                aria-checked={alarmOn}
              >
                <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${alarmOn ? "translate-x-5" : "translate-x-0"}`} />
              </button>
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
                {language === "id" ? t("child.settings.langNote") : t("child.settings.langEnNote")}
              </p>
            </div>
          </div>
        </section>

        {/* Others */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{t("child.settings.others")}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{t("child.settings.othersDesc")}</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            <Link href="/child/about" className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">{t("child.settings.about")}</span>
              </div>
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
