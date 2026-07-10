"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSharedStore, formatNotificationTime } from "@/components/shared/sharedStore";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { getLatestNotification } = useSharedStore();
  const { t } = useLanguage();
  const latestNotif = mounted ? getLatestNotification() : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    {
      labelKey: "child.sidebar.dashboard",
      href: "/child/dashboard",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      labelKey: "child.sidebar.pairDevice",
      href: "/child/pairing",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.318a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
        </svg>
      ),
    },
    {
      labelKey: "child.sidebar.notifications",
      href: "/child/notifications",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
    },
    {
      labelKey: "child.sidebar.elderlyData",
      href: "/child/elderly-data",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      labelKey: "child.sidebar.settings",
      href: "/child/settings",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      labelKey: "child.sidebar.profile",
      href: "/child/profile",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 min-h-screen flex flex-col transition-[width] duration-300 ease-in-out flex-shrink-0 overflow-hidden ${
        isCollapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="px-3 h-16 flex items-center border-b border-gray-100 overflow-hidden flex-shrink-0">
        <div className="flex items-center gap-3 ml-0.5">
          <img
            src="/logo.png"
            alt="SAPA Logo"
            className="h-10 w-10 rounded-xl flex-shrink-0 object-cover"
          />
          <div
            className="overflow-hidden"
            style={{
              width: isCollapsed ? 0 : "auto",
              opacity: isCollapsed ? 0 : 1,
              transition: "width 0.2s ease, opacity 0.15s ease",
            }}
          >
            <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">SAPA</h1>
            <p className="text-xs text-gray-400 whitespace-nowrap">{t("child.sidebar.portal")}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-hidden">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  title={isCollapsed ? t(item.labelKey) : undefined}
                >
                  <span className={`flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  <span
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    style={{
                      maxWidth: isCollapsed ? 0 : 200,
                      opacity: isCollapsed ? 0 : 1,
                      transition: "max-width 0.2s ease, opacity 0.15s ease",
                    }}
                  >
                    {t(item.labelKey)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Recent Notifications */}
      {!isCollapsed && (
        <div className="px-3 pb-4 overflow-hidden">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-3">
            {t("child.sidebar.recentNotif")}
          </p>
          {latestNotif ? (
            <div className="px-3 py-2.5 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-2.5">
                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${
                  latestNotif.type === "emergency" ? "bg-red-500" :
                  latestNotif.type === "safe" ? "bg-green-500" :
                  latestNotif.type === "warning" ? "bg-orange-500" : "bg-blue-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{latestNotif.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatNotificationTime(latestNotif.timestamp)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="px-3 text-xs text-gray-400">No notifications yet</p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100 overflow-hidden">
        <p
          className="text-xs text-gray-400 text-center whitespace-nowrap transition-opacity duration-200"
          style={{ opacity: isCollapsed ? 0 : 1 }}
        >
          © 2026 SAPA
        </p>
      </div>
    </aside>
  );
}
