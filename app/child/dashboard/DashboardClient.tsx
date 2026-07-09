"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSharedStore, calculateDistance } from "@/components/shared/sharedStore";
import StatusCard from "@/components/child/dashboard/StatusCard";
import DistanceCard from "@/components/child/dashboard/DistanceCard";
import SafeZoneCard from "@/components/child/dashboard/SafeZoneCard";
import RadiusCard from "@/components/child/dashboard/RadiusCard";
import LocationCard from "@/components/child/dashboard/LocationCard";
import BatteryCard from "@/components/child/dashboard/BatteryCard";

const ElderlyMap = dynamic(
  () => import("@/components/child/dashboard/ElderlyMap"),
  { ssr: false }
);

export default function DashboardClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const {
    elderlyLocation,
    homeLocation,
    safeZoneDistance,
    isOutsideZone,
    emergencyMode,
    sosActive,
    battery,
    activateEmergencyMode,
    deactivateEmergencyMode,
    getLatestNotification,
  } = useSharedStore();

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <ElderlyMap
            elderlyLat={elderlyLocation.lat}
            elderlyLng={elderlyLocation.lng}
            homeLat={homeLocation.lat}
            homeLng={homeLocation.lng}
            safeRadius={safeZoneDistance}
            isOutsideZone={isOutsideZone}
          />
        </div>
      </div>

      {/* Right: Info Cards */}
      <div className="w-[380px] flex-shrink-0 space-y-4 overflow-y-auto pr-1">
        <StatusCard status={isOutsideZone ? "out_of_zone" : "safe"} />
        <DistanceCard distance={distanceMeters} isOutsideZone={isOutsideZone} />
        <SafeZoneCard
          zoneName="Home"
          address={homeLocation.address}
        />
        <RadiusCard radius={safeZoneDistance} />
        <LocationCard
          address={elderlyLocation.address}
          lastUpdated="Just now"
        />
        <BatteryCard level={battery} />

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-3">Actions</p>
          <div className="space-y-3">
            {/* Emergency Mode */}
            <button
              onClick={() => {
                if (emergencyMode) {
                  deactivateEmergencyMode();
                } else {
                  activateEmergencyMode();
                }
              }}
              className={`w-full py-3 px-4 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                emergencyMode
                  ? "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {emergencyMode ? "Deactivate Emergency" : "Emergency Mode"}
            </button>

            {/* Direction */}
            <button
              onClick={() => router.push("/child/navigation")}
              className="w-full py-3 px-4 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              Direction to Elderly
            </button>
          </div>
        </div>

        {/* Recent Notification */}
        {mounted && getLatestNotification() && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-3">Latest Notification</p>
            <div className="flex items-start gap-3">
              <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${
                getLatestNotification()?.type === "emergency" ? "bg-red-500" :
                getLatestNotification()?.type === "safe" ? "bg-green-500" :
                getLatestNotification()?.type === "warning" ? "bg-orange-500" : "bg-blue-500"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{getLatestNotification()?.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{getLatestNotification()?.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
