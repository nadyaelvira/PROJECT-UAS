"use client";

import { useState, useEffect } from "react";
import { useSharedStore } from "@/components/shared/sharedStore";
import { reverseGeocode } from "@/lib/reverseGeocode";

interface SafeZoneCardProps {
  zoneName: string;
  address: string;
}

export default function SafeZoneCard({ zoneName, address }: SafeZoneCardProps) {
  const { homeLocation, setHomeLocation, homeName, setHomeName } = useSharedStore();
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(homeName);
  const [picking, setPicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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

  const handleSave = () => {
    setHomeName(draftName);
    setEditing(false);
    setPicking(false);
  };

  const handleCancel = () => {
    setDraftName(homeName);
    setEditing(false);
    setPicking(false);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">Current Safe Zone</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">{mounted ? homeName : "Rumah"}</p>
          <p className="text-sm text-gray-500 mt-0.5">{mounted ? address : "Loading..."}</p>
        </div>
        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-blue-50">
          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
      </div>

      {editing ? (
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
            <p className="text-sm text-gray-900">{address}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
        >
          Change Current Safe Zone
        </button>
      )}
    </div>
  );
}
