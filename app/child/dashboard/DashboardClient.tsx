"use client";

import dynamic from "next/dynamic";
import { mockElderlyData } from "@/components/child/dashboard/mockData";
import StatusCard from "@/components/child/dashboard/StatusCard";
import DistanceCard from "@/components/child/dashboard/DistanceCard";
import SafeZoneCard from "@/components/child/dashboard/SafeZoneCard";
import RadiusCard from "@/components/child/dashboard/RadiusCard";
import LocationCard from "@/components/child/dashboard/LocationCard";
import BatteryCard from "@/components/child/dashboard/BatteryCard";
import NotificationsCard from "@/components/child/dashboard/NotificationsCard";

const ElderlyMap = dynamic(
  () => import("@/components/child/dashboard/ElderlyMap"),
  { ssr: false }
);

export default function DashboardClient() {
  const data = mockElderlyData;
  const isOutsideZone = data.status === "out_of_zone";

  return (
    <div className="flex gap-6 h-full">
      {/* Left: Map */}
      <div className="flex-1 min-w-0">
        <div className="h-[calc(100vh-8rem)]">
          <ElderlyMap
            elderlyLat={data.location.lat}
            elderlyLng={data.location.lng}
            homeLat={data.home.lat}
            homeLng={data.home.lng}
            safeRadius={data.safeRadius}
            isOutsideZone={isOutsideZone}
          />
        </div>
      </div>

      {/* Right: Info Cards */}
      <div className="w-[380px] flex-shrink-0 space-y-4 overflow-y-auto pr-1">
        <StatusCard status={data.status} />
        <DistanceCard
          distance={data.distanceFromZone}
          isOutsideZone={isOutsideZone}
        />
        <SafeZoneCard
          zoneName={data.safeZone.name}
          address={data.safeZone.address}
        />
        <RadiusCard radius={data.safeRadius} />
        <LocationCard
          address={data.location.address}
          lastUpdated={data.location.lastUpdated}
        />
        <BatteryCard level={data.battery} />
        <NotificationsCard notifications={data.notifications} />
      </div>
    </div>
  );
}
