"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSharedStore } from "@/components/shared/sharedStore";

export default function ElderlyNavbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();
  const { isOutsideZone, emergencyMode, getUnreadCount, elderlyProfile } = useSharedStore();

  const unreadCount = mounted ? getUnreadCount() : 0;

  const initials = elderlyProfile.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const locale = language === "id" ? "id-ID" : "en-US";
      setCurrentTime(
        now.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: language === "en",
        })
      );
      setCurrentDate(
        now.toLocaleDateString(locale, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const getStatusConfig = () => {
    if (emergencyMode) {
      return {
        bg: "bg-red-50 text-red-700 border border-red-200",
        dot: "bg-red-500",
        label: "Emergency Active",
      };
    }
    if (isOutsideZone) {
      return {
        bg: "bg-orange-50 text-orange-700 border border-orange-200",
        dot: "bg-orange-500",
        label: t("navbar.outsideZone"),
      };
    }
    return {
      bg: "bg-green-50 text-green-700 border border-green-200",
      dot: "bg-green-500",
      label: t("navbar.safeZone"),
    };
  };

  const status = getStatusConfig();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      {/* Left: Status */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${status.bg}`}>
          <div className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span>{status.label}</span>
        </div>
      </div>

      {/* Right: Date, Time, Profile */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{currentDate}</p>
          <p className="text-xs text-blue-600">{currentTime}</p>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* Profile */}
        <Link href="/elderly/elderly-data" className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
            {initials}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{elderlyProfile.name}</p>
            <p className="text-xs text-gray-400">Lansia</p>
          </div>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
