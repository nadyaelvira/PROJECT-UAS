"use client";

import { useLanguage } from "@/context/LanguageContext";

interface StatusCardProps {
  status: "safe" | "out_of_zone";
}

export default function StatusCard({ status }: StatusCardProps) {
  const { t } = useLanguage();
  const isSafe = status === "safe";

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{t("child.dashboard.status.currentStatus")}</p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
                isSafe
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isSafe ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {isSafe ? t("child.dashboard.status.safe") : t("child.dashboard.status.outOfZone")}
            </span>
          </div>
        </div>
        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center ${
            isSafe ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <svg
            className={`h-6 w-6 ${isSafe ? "text-green-600" : "text-red-600"}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            {isSafe ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
