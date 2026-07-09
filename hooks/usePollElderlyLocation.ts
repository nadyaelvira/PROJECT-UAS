"use client";

import { useEffect } from "react";
import { useSharedStore } from "@/components/shared/sharedStore";

/**
 * Polls shared state from localStorage every 2 seconds.
 * Keeps Child tab in sync with Elderly tab changes.
 */
export function usePollElderlyLocation(enabled = true) {
  const {
    setElderlyLocation,
    setChildLocation,
    setHomeLocation,
    setSafeZoneDistance,
  } = useSharedStore();

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      try {
        const raw = localStorage.getItem("safeelder_shared_state");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.elderlyLocation) {
            setElderlyLocation(parsed.elderlyLocation);
          }
          if (parsed.childLocation) {
            setChildLocation(parsed.childLocation);
          }
          if (parsed.homeLocation) {
            setHomeLocation(parsed.homeLocation);
          }
          if (parsed.safeZoneDistance !== undefined) {
            setSafeZoneDistance(parsed.safeZoneDistance);
          }
        }
      } catch {}
    }, 2000);
    return () => clearInterval(interval);
  }, [enabled, setElderlyLocation, setChildLocation, setHomeLocation, setSafeZoneDistance]);
}
