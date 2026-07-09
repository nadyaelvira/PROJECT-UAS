"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { useSharedStore, calculateDistance } from "@/components/shared/sharedStore";
import { usePollElderlyLocation } from "@/hooks/usePollElderlyLocation";
import { reverseGeocode } from "@/lib/reverseGeocode";

const ElderlyHomeMap = dynamic(() => import("@/components/elderly/ElderlyHomeMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

export default function ElderlyHomePage() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [realAddress, setRealAddress] = useState("");
  const {
    elderlyLocation,
    homeLocation,
    homeName,
    safeZoneEnabled,
    safeZoneDistance,
    isOutsideZone,
    emergencyMode,
    sosActive,
    triggerSOS,
    battery,
  } = useSharedStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  usePollElderlyLocation(mounted);

  // Reverse geocode elderly location
  useEffect(() => {
    if (!mounted) return;
    reverseGeocode(elderlyLocation.lat, elderlyLocation.lng).then(setRealAddress);
  }, [mounted, elderlyLocation.lat, elderlyLocation.lng]);

  const distance = mounted
    ? calculateDistance(
        elderlyLocation.lat,
        elderlyLocation.lng,
        homeLocation.lat,
        homeLocation.lng
      )
    : 0;
  const distanceMeters = Math.round(distance);

  return (
    <div className="flex gap-6 h-full">
      {/* Left: Map */}
      <div className="flex-1 min-w-0">
        <div className="h-[calc(100vh-8rem)]">
          <ElderlyHomeMap
            elderlyLat={elderlyLocation.lat}
            elderlyLng={elderlyLocation.lng}
            homeLat={homeLocation.lat}
            homeLng={homeLocation.lng}
            safeZoneDistance={safeZoneDistance}
            isOutsideZone={isOutsideZone}
          />
        </div>
      </div>

      {/* Right: Info Cards */}
      <div className="w-[380px] flex-shrink-0 space-y-4 overflow-y-auto pr-1">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{t("home.currentLocation")}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
                    isOutsideZone
                      ? "bg-red-50 text-red-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOutsideZone ? "bg-red-500" : "bg-green-500"
                    }`}
                  />
                  {isOutsideZone ? "OUT OF SAFE ZONE" : "SAFE"}
                </span>
              </div>
            </div>
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                isOutsideZone ? "bg-red-50" : "bg-green-50"
              }`}
            >
              <svg
                className={`h-6 w-6 ${isOutsideZone ? "text-red-600" : "text-green-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                {isOutsideZone ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Distance Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{t("home.distance")}</p>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-900">
                  {distanceMeters}{" "}
                  <span className="text-base font-normal text-gray-500">{t("home.meters")}</span>
                </p>
              </div>
            </div>
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                isOutsideZone ? "bg-red-50" : "bg-blue-50"
              }`}
            >
              <svg
                className={`h-6 w-6 ${isOutsideZone ? "text-red-600" : "text-blue-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Safe Zone Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">{t("home.safeZone")}</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{mounted ? homeName : "Rumah"}</p>
              <p className="text-sm text-gray-500 mt-0.5">{mounted ? homeLocation.address : "Loading..."}</p>
            </div>
            <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-blue-50">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">{t("home.radius")}</p>
              <p className="text-sm font-bold text-blue-600" suppressHydrationWarning>{safeZoneDistance}m</p>
            </div>
            <div className="flex-1 bg-green-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">{t("home.status")}</p>
              <p className="text-sm font-bold text-green-600">
                {safeZoneEnabled ? t("home.safe") : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">{t("home.currentLocation")}</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{mounted ? (realAddress || elderlyLocation.address) : "Loading..."}</p>
            </div>
            <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gray-50">
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Battery Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{t("home.deviceBattery")}</p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-900">{battery}%</p>
              </div>
              <div className="mt-2 h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    battery > 50 ? "bg-green-500" : battery > 20 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${battery}%` }}
                />
              </div>
            </div>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
              battery > 50 ? "bg-green-50" : battery > 20 ? "bg-yellow-50" : "bg-red-50"
            }`}>
              <svg className={`h-6 w-6 ${
                battery > 50 ? "text-green-600" : battery > 20 ? "text-yellow-600" : "text-red-600"
              }`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
              </svg>
            </div>
          </div>
        </div>

        {/* SOS Button */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-red-50">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{t("home.needHelp")}</p>
              <p className="text-xs text-gray-500">{t("home.tapForHelp")}</p>
            </div>
          </div>
          <button
            onClick={triggerSOS}
            disabled={sosActive}
            className={`w-full py-3 px-4 text-sm font-semibold rounded-xl transition-colors ${
              sosActive
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{sosActive ? "SOS ACTIVE" : t("home.needHelpBtn")}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
