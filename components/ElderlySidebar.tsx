"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const menuItems = [
  {
    labelKey: "sidebar.home",
    href: "/elderly/home",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    labelKey: "sidebar.settings",
    href: "/elderly/settings",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

interface ElderlySidebarProps {
  isCollapsed: boolean;
}

export default function ElderlySidebar({ isCollapsed }: ElderlySidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

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
            <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">{t("sidebar.logo")}</h1>
            <p className="text-xs text-gray-400 whitespace-nowrap">{t("sidebar.portal")}</p>
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
