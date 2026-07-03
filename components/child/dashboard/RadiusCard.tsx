"use client";

interface RadiusCardProps {
  radius: number;
}

export default function RadiusCard({ radius }: RadiusCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">Safe Radius</p>
          <div className="mt-1">
            <p className="text-3xl font-bold text-gray-900">
              {radius}{" "}
              <span className="text-base font-normal text-gray-500">meters</span>
            </p>
          </div>
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
              d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors">
        Change Radius
      </button>
    </div>
  );
}
