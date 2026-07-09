"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSharedStore, calculateDistance } from "@/components/shared/sharedStore";

const NavigationMap = dynamic(
  () => import("@/components/child/navigation/NavigationMap"),
  { ssr: false }
);

// Throttle helper: only run once per interval ms
function useThrottle(callback: () => void, delay: number) {
  const lastRun = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(() => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        lastRun.current = Date.now();
        callback();
      }, delay - (now - lastRun.current));
    }
  }, [callback, delay]);
}

export default function NavigationPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const {
    childLocation,
    elderlyLocation,
    setChildLocation,
  } = useSharedStore();

  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState(0);
  const [eta, setEta] = useState("");
  const [speed, setSpeed] = useState(0);
  const prevPosRef = useRef<{ lat: number; lng: number; time: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get child's real GPS location
  useEffect(() => {
    if (!mounted) return;
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setChildLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setChildLocation({ lat: elderlyLocation.lat + 0.001, lng: elderlyLocation.lng + 0.001 });
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [mounted, setChildLocation, elderlyLocation.lat, elderlyLocation.lng]);

  // Calculate speed from position changes
  useEffect(() => {
    if (!prevPosRef.current) {
      prevPosRef.current = { lat: elderlyLocation.lat, lng: elderlyLocation.lng, time: Date.now() };
      return;
    }

    const prev = prevPosRef.current;
    const now = Date.now();
    const timeDiff = (now - prev.time) / 1000;

    if (timeDiff > 1) {
      const dist = calculateDistance(prev.lat, prev.lng, elderlyLocation.lat, elderlyLocation.lng);
      const spd = dist / timeDiff;
      setSpeed(spd * 3.6);
      prevPosRef.current = { lat: elderlyLocation.lat, lng: elderlyLocation.lng, time: now };
    }
  }, [elderlyLocation.lat, elderlyLocation.lng]);

  // Fetch route from OSRM — throttled to avoid excessive calls
  const doFetchRoute = useCallback(async () => {
    const url = `https://router.project-osrm.org/route/v1/foot/${childLocation.lng},${childLocation.lat};${elderlyLocation.lng},${elderlyLocation.lat}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords: [number, number][] = route.geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]]
        );
        setRouteCoords(coords);
        setDistance(route.distance);

        const walkingSpeed = 5 / 3.6;
        const etaSeconds = route.distance / walkingSpeed;
        const etaMinutes = Math.ceil(etaSeconds / 60);

        if (etaMinutes < 1) {
          setEta("< 1 min");
        } else if (etaMinutes < 60) {
          setEta(`${etaMinutes} min`);
        } else {
          const hours = Math.floor(etaMinutes / 60);
          const mins = etaMinutes % 60;
          setEta(`${hours}h ${mins}m`);
        }
      }
    } catch {
      const dist = calculateDistance(
        childLocation.lat, childLocation.lng,
        elderlyLocation.lat, elderlyLocation.lng
      );
      setRouteCoords([
        [childLocation.lat, childLocation.lng],
        [elderlyLocation.lat, elderlyLocation.lng],
      ]);
      setDistance(dist);
      const walkingSpeed = 5 / 3.6;
      const etaSeconds = dist / walkingSpeed;
      setEta(`${Math.ceil(etaSeconds / 60)} min`);
    }
  }, [childLocation.lat, childLocation.lng, elderlyLocation.lat, elderlyLocation.lng]);

  const fetchRoute = useThrottle(doFetchRoute, 10000);

  // Refetch route when locations change
  useEffect(() => {
    if (!mounted) return;
    fetchRoute();
  }, [mounted, fetchRoute]);

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading navigation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col -m-6">
      {/* Top Card */}
      <div className="shrink-0 p-4 pb-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Direction to Elderly</h1>
                <p className="text-xs text-gray-500">Real-time navigation</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700">Live</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Distance</p>
              <p className="text-lg font-bold text-blue-600">
                {distance >= 1000
                  ? `${(distance / 1000).toFixed(1)} km`
                  : `${Math.round(distance)} m`}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">ETA</p>
              <p className="text-lg font-bold text-green-600">{eta || "--"}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Speed</p>
              <p className="text-lg font-bold text-orange-600">
                {speed > 0.5 ? `${speed.toFixed(1)} km/h` : "Stopped"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 min-h-0 p-4">
        <div className="h-full rounded-2xl overflow-hidden border border-gray-200 relative">
          <NavigationMap
            childLat={childLocation.lat}
            childLng={childLocation.lng}
            elderlyLat={elderlyLocation.lat}
            elderlyLng={elderlyLocation.lng}
            routeCoords={routeCoords}
          />

          {/* Center on Elderly FAB */}
          <button
            onClick={() => {
              // This triggers the map to re-center via a custom event
              window.dispatchEvent(new CustomEvent("centerOnElderly"));
            }}
            className="absolute bottom-4 right-4 z-[1000] h-12 w-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
