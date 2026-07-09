"use client";

import { useEffect, useRef } from "react";
import { useSharedStore } from "@/components/shared/sharedStore";

/**
 * Simulates GPS movement for the Elderly user.
 * In production, replace with real navigator.geolocation.watchPosition().
 * Moves the elderly location slightly every 5 seconds to simulate walking.
 */
export function useGpsSimulation() {
  const { setElderlyLocation, elderlyLocation } = useSharedStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const posRef = useRef(elderlyLocation);

  useEffect(() => {
    posRef.current = elderlyLocation;
  }, [elderlyLocation]);

  useEffect(() => {
    // Simulate small random movements every 5 seconds
    intervalRef.current = setInterval(() => {
      const prev = posRef.current;
      // Random drift: ~0.5-2 meters per tick
      const dLat = (Math.random() - 0.5) * 0.00002;
      const dLng = (Math.random() - 0.5) * 0.00002;
      const newLat = prev.lat + dLat;
      const newLng = prev.lng + dLng;
      setElderlyLocation({
        lat: newLat,
        lng: newLng,
        address: prev.address,
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [setElderlyLocation]);
}
