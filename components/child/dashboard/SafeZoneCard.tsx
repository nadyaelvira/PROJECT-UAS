"use client";

interface SafeZoneCardProps {
  zoneName: string;
  address: string;
}

export default function SafeZoneCard({ zoneName, address }: SafeZoneCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">
            Current Safe Zone
          </p>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {zoneName}
          </p>
          <p className="text-sm text-gray-500 mt-0.5">{address}</p>
        </div>
        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-blue-50">
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors">
        Change Safe Zone
      </button>
    </div>
  );
}
