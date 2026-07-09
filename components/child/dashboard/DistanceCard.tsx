"use client";

interface DistanceCardProps {
  distance: number;
  isOutsideZone: boolean;
}

export default function DistanceCard({
  distance,
  isOutsideZone,
}: DistanceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Distance from Safe Zone
          </p>
          <div className="mt-2">
            <p className="text-3xl font-bold text-gray-900">
              {distance}{" "}
              <span className="text-base font-normal text-gray-500">meters</span>
            </p>
          </div>
        </div>
        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center ${
            isOutsideZone ? "bg-red-50" : "bg-blue-50"
          }`}
        >
          <svg
            className={`h-6 w-6 ${
              isOutsideZone ? "text-red-600" : "text-blue-600"
            }`}
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
