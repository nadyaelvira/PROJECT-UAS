"use client";

import { useState } from "react";
import { useSharedStore } from "@/components/shared/sharedStore";

interface RadiusCardProps {
  radius: number;
}

export default function RadiusCard({ radius }: RadiusCardProps) {
  const { safeZoneDistance, setSafeZoneDistance } = useSharedStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(safeZoneDistance);

  const handleSave = () => {
    setSafeZoneDistance(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(safeZoneDistance);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">Safe Zone Radius</p>
          <div className="mt-1">
            <p className="text-3xl font-bold text-gray-900" suppressHydrationWarning>
              {radius}{" "}
              <span className="text-base font-normal text-gray-500">meters</span>
            </p>
          </div>
        </div>
        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-blue-50">
          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {editing ? (
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Radius (meters)
          </label>
          <select
            value={draft}
            onChange={(e) => setDraft(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
          >
            {[5, 10, 15, 20, 25, 30, 50, 100].map((r) => (
              <option key={r} value={r}>{r} meters</option>
            ))}
          </select>
          <div className="flex gap-2 mt-3">
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
          Change Safe Zone Radius
        </button>
      )}
    </div>
  );
}
