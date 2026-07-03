"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default marker icons in Next.js
const createIcon = (color: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width:24px;height:24px;border-radius:50%;
      background:${color};border:3px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

const elderlyIcon = createIcon("#2563EB");
const homeIcon = createIcon("#16A34A");

function MapBoundsUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
  }, [map, center]);
  return null;
}

interface ElderlyMapProps {
  elderlyLat: number;
  elderlyLng: number;
  homeLat: number;
  homeLng: number;
  safeRadius: number;
  isOutsideZone: boolean;
}

export default function ElderlyMap({
  elderlyLat,
  elderlyLng,
  homeLat,
  homeLng,
  safeRadius,
  isOutsideZone,
}: ElderlyMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full rounded-2xl bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  const center: [number, number] = [homeLat, homeLng];

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
        style={{ background: "#e5e3df" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBoundsUpdater center={center} />

        {/* Safe zone circle */}
        <Circle
          center={[homeLat, homeLng]}
          radius={safeRadius * 1000}
          pathOptions={{
            color: "#2563EB",
            fillColor: "#2563EB",
            fillOpacity: 0.08,
            weight: 2,
            dashArray: "8 4",
          }}
        />

        {/* Home marker */}
        <Marker position={[homeLat, homeLng]} icon={homeIcon}>
          <Popup>
            <div className="text-center p-1">
              <p className="font-semibold text-gray-900">Home</p>
              <p className="text-xs text-gray-500">Safe Zone Center</p>
            </div>
          </Popup>
        </Marker>

        {/* Elderly marker */}
        <Marker position={[elderlyLat, elderlyLng]} icon={elderlyIcon}>
          <Popup>
            <div className="text-center p-1">
              <p className="font-semibold text-gray-900">Suti</p>
              <p className="text-xs text-gray-500">
                {isOutsideZone ? "Outside safe zone" : "Inside safe zone"}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Route line if outside zone */}
        {isOutsideZone && (
          <Polyline
            positions={[
              [elderlyLat, elderlyLng],
              [homeLat, homeLng],
            ]}
            pathOptions={{
              color: "#DC2626",
              weight: 3,
              dashArray: "10 6",
              opacity: 0.8,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
