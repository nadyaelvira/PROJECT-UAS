"use client";

import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// Marker icons
const createIcon = (color: string, label: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="position:relative;display:flex;flex-direction:column;align-items:center;">
      <div style="
        width:32px;height:32px;border-radius:50%;
        background:${color};border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="color:white;font-size:12px;font-weight:bold;">${label}</span>
      </div>
      <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid ${color};margin-top:-2px;"></div>
    </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -44],
  });

const childIcon = createIcon("#16A34A", "C");
const elderlyIcon = createIcon("#DC2626", "E");

// Auto-fit bounds to show both markers
function FitBounds({
  childPos,
  elderlyPos,
}: {
  childPos: [number, number];
  elderlyPos: [number, number];
}) {
  const map = useMap();
  const fittedRef = useRef(false);

  useEffect(() => {
    if (!fittedRef.current) {
      const bounds = L.latLngBounds([childPos, elderlyPos]);
      map.fitBounds(bounds, { padding: [60, 60] });
      fittedRef.current = true;
    }
  }, [map, childPos, elderlyPos]);

  return null;
}

// Center on elderly when FAB is clicked, and auto-follow with debounce
function ElderlyFollower({
  elderlyPos,
}: {
  elderlyPos: [number, number];
}) {
  const map = useMap();
  const lastPanRef = useRef(0);

  useEffect(() => {
    function handleCenter() {
      map.flyTo(elderlyPos, 17, { duration: 1 });
    }
    window.addEventListener("centerOnElderly", handleCenter);
    return () => window.removeEventListener("centerOnElderly", handleCenter);
  }, [map, elderlyPos]);

  // Auto-follow: only pan every 8 seconds to avoid jitter
  useEffect(() => {
    const now = Date.now();
    if (now - lastPanRef.current > 8000) {
      lastPanRef.current = now;
      map.panTo(elderlyPos, { animate: true, duration: 0.5 });
    }
  }, [map, elderlyPos]);

  return null;
}

interface NavigationMapProps {
  childLat: number;
  childLng: number;
  elderlyLat: number;
  elderlyLng: number;
  routeCoords: [number, number][];
}

export default function NavigationMap({
  childLat,
  childLng,
  elderlyLat,
  elderlyLng,
  routeCoords,
}: NavigationMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  const childPos: [number, number] = [childLat, childLng];
  const elderlyPos: [number, number] = [elderlyLat, elderlyLng];
  const center: [number, number] = [
    (childLat + elderlyLat) / 2,
    (childLng + elderlyLng) / 2,
  ];

  return (
    <div className="h-full w-full">
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

        <FitBounds childPos={childPos} elderlyPos={elderlyPos} />
        <ElderlyFollower elderlyPos={elderlyPos} />

        {/* Child marker */}
        <Marker position={childPos} icon={childIcon}>
          <Popup>
            <div className="text-center p-1">
              <p className="font-semibold text-green-700">You (Child)</p>
              <p className="text-xs text-gray-500">Current location</p>
            </div>
          </Popup>
        </Marker>

        {/* Elderly marker */}
        <Marker position={elderlyPos} icon={elderlyIcon}>
          <Popup>
            <div className="text-center p-1">
              <p className="font-semibold text-red-700">Elderly</p>
              <p className="text-xs text-gray-500">Target location</p>
            </div>
          </Popup>
        </Marker>

        {/* Route polyline */}
        {routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords}
            pathOptions={{
              color: "#2563EB",
              weight: 5,
              opacity: 0.8,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-20 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md border border-gray-200">
        <p className="text-[10px] font-semibold text-gray-700 mb-2">Legend</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow" />
            <span className="text-[10px] text-gray-600">You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow" />
            <span className="text-[10px] text-gray-600">Elderly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500 rounded" />
            <span className="text-[10px] text-gray-600">Route</span>
          </div>
        </div>
      </div>
    </div>
  );
}
