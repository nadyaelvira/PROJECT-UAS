"use client";

interface LocationCardProps {
  address: string;
  lastUpdated: string;
}

export default function LocationCard({ address, lastUpdated }: LocationCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">Current Location</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">{address}</p>
          <p className="text-xs text-gray-400 mt-1">
            Updated: {lastUpdated}
          </p>
        </div>
        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gray-50">
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
