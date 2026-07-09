"use client";

interface BatteryCardProps {
  level: number;
}

export default function BatteryCard({ level }: BatteryCardProps) {
  const getColor = () => {
    if (level > 50) return { bg: "bg-green-50", icon: "text-green-600", fill: "bg-green-500" };
    if (level > 20) return { bg: "bg-yellow-50", icon: "text-yellow-600", fill: "bg-yellow-500" };
    return { bg: "bg-red-50", icon: "text-red-600", fill: "bg-red-500" };
  };

  const colors = getColor();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Device Battery</p>
          <div className="mt-2 flex items-end gap-2">
            <p className="text-3xl font-bold text-gray-900">{level}%</p>
          </div>
          {/* Battery bar */}
          <div className="mt-2 h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${colors.fill} transition-all`}
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${colors.bg}`}>
          <svg
            className={`h-6 w-6 ${colors.icon}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
