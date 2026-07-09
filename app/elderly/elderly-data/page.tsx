"use client";

import { useSharedStore } from "@/components/shared/sharedStore";

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

export default function ElderlyDataPage() {
  const { elderlyProfile } = useSharedStore();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Elderly Data</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your profile information.
        </p>
      </div>

      {/* Sync notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900">Auto-synced with Family</p>
          <p className="text-xs text-blue-600 mt-0.5">
            This data is managed by your family member through their dashboard.
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Photo section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-8 py-10">
          <div className="flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-white/20 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
              {elderlyProfile.photoUrl ? (
                <img
                  src={elderlyProfile.photoUrl}
                  alt={elderlyProfile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg className="h-16 w-16 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>
            <h2 className="text-xl font-bold text-white mt-5">{elderlyProfile.name}</h2>
            <p className="text-blue-100 text-sm mt-0.5">{elderlyProfile.age} Years</p>
          </div>
        </div>

        {/* Info section */}
        <div className="px-8 py-8 space-y-5">
          <InfoField label="Name" value={elderlyProfile.name} />
          <InfoField label="Age" value={`${elderlyProfile.age} Years`} />
          <InfoField label="Home Address" value={elderlyProfile.homeAddress} />
          <InfoField label="Family Contact Number" value={elderlyProfile.familyContact} />
          <InfoField label="Medical Notes" value={elderlyProfile.medicalNotes} />
        </div>
      </div>
    </div>
  );
}
