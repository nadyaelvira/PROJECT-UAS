"use client";

import { useEffect, useRef } from "react";
import { useSharedStore } from "@/components/shared/sharedStore";

/**
 * Real GPS tracking for the Elderly user.
 * Updates both elderlyLocation and homeLocation on first GPS fix.
 */
export function useRealGps() {
  const { setElderlyLocation, setHomeLocation, elderlyLocation } = useSharedStore();
  const watchIdRef = useRef<number | null>(null);
  const posRef = useRef(elderlyLocation);
  const gotFirstFix = useRef(false);

  useEffect(() => {
    posRef.current = elderlyLocation;
  }, [elderlyLocation]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    // Get instant position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setElderlyLocation({ lat, lng, address: posRef.current.address });
        // Set home to current position on first fix
        if (!gotFirstFix.current) {
          gotFirstFix.current = true;
          setHomeLocation({ lat, lng, address: "Rumah" });
        }
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000 }
    );

    // Watch continuous updates
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setElderlyLocation({ lat, lng, address: posRef.current.address });
        if (!gotFirstFix.current) {
          gotFirstFix.current = true;
          setHomeLocation({ lat, lng, address: "Rumah" });
        }
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [setElderlyLocation, setHomeLocation]);
}
