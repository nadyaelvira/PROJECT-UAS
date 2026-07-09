"use client";

import { useState, useEffect } from "react";
import { useSharedStore } from "@/components/shared/sharedStore";
import { reverseGeocode } from "@/lib/reverseGeocode";

export default function SafeZoneSettingsCard() {
  const {
    homeLocation,
    setHomeLocation,
    homeName,
    setHomeName,
    safeZoneEnabled,
    setSafeZoneEnabled,
    safeZoneDistance,
    setSafeZoneDistance,
  } = useSharedStore();

  const [editingZone, setEditingZone] = useState(false);
  const [editingRadius, setEditingRadius] = useState(false);
  const [draftName, setDraftName] = useState(homeName);
  const [draftRadius, setDraftRadius] = useState(safeZoneDistance);
  const [picking, setPicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for map click events
  useEffect(() => {
    if (!picking) return;
    window.dispatchEvent(new CustomEvent("safezone-pick-start"));
    function handleMapClick(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.lat && detail?.lng) {
        reverseGeocode(detail.lat, detail.lng).then((addr) => {
          setHomeLocation({ lat: detail.lat, lng: detail.lng, address: addr });
        });
        setPicking(false);
        window.dispatchEvent(new CustomEvent("safezone-pick-end"));
      }
    }
    window.addEventListener("safezone-pick", handleMapClick);
    return () => {
      window.removeEventListener("safezone-pick", handleMapClick);
      window.dispatchEvent(new CustomEvent("safezone-pick-end"));
    };
  }, [picking, setHomeLocation]);

  const handleSaveZone = () => {
    setHomeName(draftName);
    setEditingZone(false);
    setPicking(false);
  };

  const handleCancelZone = () => {
    setDraftName(homeName);
    setEditingZone(false);
    setPicking(false);
  };

  const handleSaveRadius = () => {
    setSafeZoneDistance(draftRadius);
    setEditingRadius(false);
  };

  const handleCancelRadius = () => {
    setDraftRadius(safeZoneDistance);
    setEditingRadius(false);
  };

  const disabled = !safeZoneEnabled;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      {/* Header: Title + Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Safe Zone</p>
        <button
          onClick={() => setSafeZoneEnabled(!safeZoneEnabled)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
            safeZoneEnabled ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              safeZoneEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Status Badge */}
      <div className="mt-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
            safeZoneEnabled
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              safeZoneEnabled ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          {safeZoneEnabled ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Edit Zone Section */}
      {editingZone ? (
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
              Zone Name
            </label>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="e.g. Rumah, Toko Es Krim"
              className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setPicking(!picking)}
            className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
              picking
                ? "bg-green-50 text-green-700 border border-green-200 animate-pulse"
                : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
            }`}
          >
            {picking ? "Tap on map to set location..." : "Pick Location on Map"}
          </button>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Current Location</p>
            <p className="text-sm text-gray-900">{homeLocation.address}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCancelZone}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveZone}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : editingRadius ? (
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Radius (meters)
          </label>
          <select
            value={draftRadius}
            onChange={(e) => setDraftRadius(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
          >
            {[5, 10, 15, 20, 25, 30, 50, 100].map((r) => (
              <option key={r} value={r}>{r} meters</option>
            ))}
          </select>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCancelRadius}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveRadius}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        /* Stacked layout: Radius (top) | Current Zone (bottom) */
        <div className="mt-4 space-y-3">
          {/* Radius */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Radius</p>
            <p className="text-2xl font-bold text-blue-600" suppressHydrationWarning>
              {safeZoneDistance}m
            </p>
            <button
              onClick={() => setEditingRadius(true)}
              disabled={disabled}
              className={`mt-3 w-full py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Change Safe Zone Radius
            </button>
          </div>

          {/* Current Zone */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Current Zone</p>
            <p className="text-2xl font-bold text-gray-900" suppressHydrationWarning>
              {mounted ? homeName : "Rumah"}
            </p>
            <p className="text-xs text-gray-500 mt-1 truncate" suppressHydrationWarning>
              {mounted ? homeLocation.address : "Loading..."}
            </p>
            <button
              onClick={() => setEditingZone(true)}
              disabled={disabled}
              className={`mt-3 w-full py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Change Current Safe Zone
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
