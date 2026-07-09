"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  getElderlyProfile,
  type ElderlyProfile,
} from "./elderlyProfile";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppNotification {
  id: string;
  type: "emergency" | "safe" | "info" | "warning";
  title: string;
  description: string;
  timestamp: number;
  read: boolean;
}

export type NotificationType = AppNotification["type"];

interface SharedState {
  // Locations
  elderlyLocation: { lat: number; lng: number; address: string };
  childLocation: { lat: number; lng: number };
  homeLocation: { lat: number; lng: number; address: string };

  // Safe Zone
  safeZoneDistance: number; // meters

  // Status
  emergencyMode: boolean;
  sosActive: boolean;
  isOutsideZone: boolean;

  // Notifications
  notifications: AppNotification[];

  // Device
  battery: number;

  // Alarm
  alarmEnabled: boolean;
  alarmSound: "alarm1" | "alarm2" | "alarm3";
  alarmVolume: number;

  // Elderly profile (cached from elderlyProfile store)
  elderlyProfile: ElderlyProfile;
}

interface SharedActions {
  // Location
  setElderlyLocation: (loc: { lat: number; lng: number; address: string }) => void;
  setChildLocation: (loc: { lat: number; lng: number }) => void;
  setHomeLocation: (loc: { lat: number; lng: number; address: string }) => void;

  // Safe Zone
  setSafeZoneDistance: (distance: number) => void;

  // Emergency
  activateEmergencyMode: () => void;
  deactivateEmergencyMode: () => void;

  // SOS
  triggerSOS: () => void;
  clearSOS: () => void;

  // Out of Zone
  setIsOutsideZone: (outside: boolean) => void;

  // Notifications
  addNotification: (n: Omit<AppNotification, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  getUnreadCount: () => number;
  getLatestNotification: () => AppNotification | null;

  // Alarm
  setAlarmEnabled: (enabled: boolean) => void;
  setAlarmSound: (sound: "alarm1" | "alarm2" | "alarm3") => void;
  setAlarmVolume: (volume: number) => void;

  // Profile
  refreshProfile: () => void;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const defaultState: SharedState = {
  elderlyLocation: {
    lat: -7.8161,
    lng: 112.0161,
    address: "Jl. Sukarno No.70",
  },
  childLocation: { lat: -7.8165, lng: 112.0155 },
  homeLocation: {
    lat: -7.8161,
    lng: 112.0161,
    address: "Jl. Sukarno No.70, Kediri",
  },
  safeZoneDistance: 5,
  emergencyMode: false,
  sosActive: false,
  isOutsideZone: false,
  notifications: [],
  battery: 78,
  alarmEnabled: true,
  alarmSound: "alarm1" as const,
  alarmVolume: 70,
  elderlyProfile: getElderlyProfile(),
};

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = "safeelder_shared_state";

function loadState(): Partial<SharedState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveState(state: SharedState) {
  try {
    const toSave = {
      elderlyLocation: state.elderlyLocation,
      childLocation: state.childLocation,
      homeLocation: state.homeLocation,
      safeZoneDistance: state.safeZoneDistance,
      notifications: state.notifications,
      emergencyMode: state.emergencyMode,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {}
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SharedContext = createContext<(SharedState & SharedActions) | undefined>(
  undefined
);

let notifCounter = 0;

export function SharedStoreProvider({ children }: { children: ReactNode }) {
  const saved = useRef(loadState());

  const [elderlyLocation, setElderlyLocationState] = useState(
    saved.current.elderlyLocation ?? defaultState.elderlyLocation
  );
  const [childLocation, setChildLocationState] = useState(
    saved.current.childLocation ?? defaultState.childLocation
  );
  const [homeLocation, setHomeLocationState] = useState(
    saved.current.homeLocation ?? defaultState.homeLocation
  );
  const [safeZoneDistance, setSafeZoneDistanceState] = useState(
    saved.current.safeZoneDistance ?? defaultState.safeZoneDistance
  );
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [isOutsideZone, setIsOutsideZoneState] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(
    saved.current.notifications ?? []
  );
  const [battery, setBattery] = useState(saved.current.battery ?? 78);
  const [alarmEnabled, setAlarmEnabledState] = useState(true);
  const [alarmSound, setAlarmSoundState] = useState<"alarm1" | "alarm2" | "alarm3">("alarm1");
  const [alarmVolume, setAlarmVolumeState] = useState(70);
  const [elderlyProfile, setElderlyProfile] = useState<ElderlyProfile>(
    getElderlyProfile()
  );

  // Persist on relevant changes
  const stateRef = useRef<SharedState>({
    elderlyLocation,
    childLocation,
    homeLocation,
    safeZoneDistance,
    emergencyMode,
    sosActive,
    isOutsideZone,
    notifications,
    battery,
    alarmEnabled,
    alarmSound,
    alarmVolume,
    elderlyProfile,
  });
  stateRef.current = {
    elderlyLocation,
    childLocation,
    homeLocation,
    safeZoneDistance,
    emergencyMode,
    sosActive,
    isOutsideZone,
    notifications,
    battery,
    alarmEnabled,
    alarmSound,
    alarmVolume,
    elderlyProfile,
  };

  useEffect(() => {
    saveState(stateRef.current);
  }, [elderlyLocation, childLocation, homeLocation, safeZoneDistance, notifications, emergencyMode]);

  // ─── Cross-tab sync via storage event ─────────────────────────────────────
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed.emergencyMode !== undefined) {
          setEmergencyMode(parsed.emergencyMode);
        }
        if (parsed.notifications !== undefined) {
          setNotifications(parsed.notifications);
        }
        if (parsed.elderlyLocation !== undefined) {
          setElderlyLocationState(parsed.elderlyLocation);
        }
        if (parsed.childLocation !== undefined) {
          setChildLocationState(parsed.childLocation);
        }
        if (parsed.homeLocation !== undefined) {
          setHomeLocationState(parsed.homeLocation);
        }
        if (parsed.safeZoneDistance !== undefined) {
          setSafeZoneDistanceState(parsed.safeZoneDistance);
        }
      } catch {}
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ─── Actions ──────────────────────────────────────────────────────────────

  const setElderlyLocation = useCallback(
    (loc: { lat: number; lng: number; address: string }) => {
      setElderlyLocationState(loc);
    },
    []
  );

  const setChildLocation = useCallback(
    (loc: { lat: number; lng: number }) => {
      setChildLocationState(loc);
    },
    []
  );

  const setHomeLocation = useCallback(
    (loc: { lat: number; lng: number; address: string }) => {
      setHomeLocationState(loc);
    },
    []
  );

  const setSafeZoneDistance = useCallback((distance: number) => {
    setSafeZoneDistanceState(distance);
  }, []);

  const activateEmergencyMode = useCallback(() => {
    setEmergencyMode(true);
  }, []);

  const deactivateEmergencyMode = useCallback(() => {
    setEmergencyMode(false);
  }, []);

  const triggerSOS = useCallback(() => {
    setSosActive(true);
    // SOS also activates emergency mode
    setEmergencyMode(true);
    // Add notification
    const profile = getElderlyProfile();
    notifCounter++;
    const now = new Date();
    const notification: AppNotification = {
      id: `sos-${Date.now()}-${notifCounter}`,
      type: "emergency",
      title: `${profile.name} sent an SOS alert`,
      description: "Emergency SOS activated from elderly device.",
      timestamp: now.getTime(),
      read: false,
    };
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const clearSOS = useCallback(() => {
    setSosActive(false);
  }, []);

  const setIsOutsideZone = useCallback((outside: boolean) => {
    setIsOutsideZoneState(outside);
  }, []);

  const addNotification = useCallback(
    (n: Omit<AppNotification, "id" | "timestamp" | "read">) => {
      notifCounter++;
      const now = new Date();
      const notification: AppNotification = {
        ...n,
        id: `${n.type}-${Date.now()}-${notifCounter}`,
        timestamp: now.getTime(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);
    },
    []
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const getUnreadCount = useCallback(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const getLatestNotification = useCallback((): AppNotification | null => {
    if (notifications.length === 0) return null;
    // Already sorted newest first
    return notifications[0];
  }, [notifications]);

  const refreshProfile = useCallback(() => {
    setElderlyProfile(getElderlyProfile());
  }, []);

  const setAlarmEnabled = useCallback((enabled: boolean) => {
    setAlarmEnabledState(enabled);
  }, []);

  const setAlarmSound = useCallback((sound: "alarm1" | "alarm2" | "alarm3") => {
    setAlarmSoundState(sound);
  }, []);

  const setAlarmVolume = useCallback((volume: number) => {
    setAlarmVolumeState(volume);
  }, []);

  // ─── Out of Zone detection ────────────────────────────────────────────────

  const prevOutsideRef = useRef(isOutsideZone);

  useEffect(() => {
    // Calculate distance between elderly and home
    const R = 6371000; // Earth radius in meters
    const dLat = ((elderlyLocation.lat - homeLocation.lat) * Math.PI) / 180;
    const dLng = ((elderlyLocation.lng - homeLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((homeLocation.lat * Math.PI) / 180) *
        Math.cos((elderlyLocation.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const outside = distance > safeZoneDistance;
    setIsOutsideZoneState(outside);

    // Generate notification on state change
    if (outside && !prevOutsideRef.current) {
      // Just went outside
      notifCounter++;
      const now = new Date();
      const profile = getElderlyProfile();
      const notification: AppNotification = {
        id: `exit-${Date.now()}-${notifCounter}`,
        type: "emergency",
        title: `${profile.name} left the Safe Zone`,
        description: `Distance: ${Math.round(distance - safeZoneDistance)} meters outside the safe zone boundary.`,
        timestamp: now.getTime(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);
    } else if (!outside && prevOutsideRef.current) {
      // Just returned
      notifCounter++;
      const now = new Date();
      const profile = getElderlyProfile();
      const notification: AppNotification = {
        id: `return-${Date.now()}-${notifCounter}`,
        type: "safe",
        title: `${profile.name} returned to the Safe Zone`,
        description: `${profile.name} has re-entered the designated safe zone.`,
        timestamp: now.getTime(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);
    }

    prevOutsideRef.current = outside;
  }, [elderlyLocation, homeLocation, safeZoneDistance]);

  const value: SharedState & SharedActions = {
    elderlyLocation,
    childLocation,
    homeLocation,
    safeZoneDistance,
    emergencyMode,
    sosActive,
    isOutsideZone,
    notifications,
    battery,
    alarmEnabled,
    alarmSound,
    alarmVolume,
    elderlyProfile,
    setElderlyLocation,
    setChildLocation,
    setHomeLocation,
    setSafeZoneDistance,
    activateEmergencyMode,
    deactivateEmergencyMode,
    triggerSOS,
    clearSOS,
    setIsOutsideZone,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadCount,
    getLatestNotification,
    refreshProfile,
    setAlarmEnabled,
    setAlarmSound,
    setAlarmVolume,
  };

  return (
    <SharedContext.Provider value={value}>{children}</SharedContext.Provider>
  );
}

export function useSharedStore(): SharedState & SharedActions {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error("useSharedStore must be used within a SharedStoreProvider");
  }
  return context;
}

// ─── Helper: calculate distance between two points ──────────────────────────

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ─── Helper: format timestamp ────────────────────────────────────────────────

export function formatNotificationTime(timestamp: number): string {
  // Use a fixed reference to avoid Date.now() during server render.
  // The caller should only invoke this after mount (client-only).
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
