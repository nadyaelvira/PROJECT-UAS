import { getElderlyProfile } from "@/components/shared/elderlyProfile";
import { mockElderlyData } from "@/components/child/dashboard/mockData";
import { mockNotifications } from "@/components/child/notifications/mockNotifications";

export interface SearchResult {
  id: string;
  label: string;
  description: string;
  href: string;
  category: "page" | "elderly" | "notification" | "setting" | "dashboard";
  icon: React.ReactNode;
}

const pageIcons = {
  dashboard: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  notifications: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  elderlyData: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  settings: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  profile: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  user: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  notification: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  location: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  battery: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
    </svg>
  ),
  status: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

const categoryLabels: Record<SearchResult["category"], string> = {
  page: "Page",
  elderly: "Elderly Data",
  notification: "Notification",
  setting: "Setting",
  dashboard: "Dashboard",
};

export function getCategoryLabel(category: SearchResult["category"]): string {
  return categoryLabels[category];
}

export function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // 1. Search pages
  const pageMatches: { label: string; href: string; icon: React.ReactNode }[] = [
    { label: "Dashboard", href: "/child/dashboard", icon: pageIcons.dashboard },
    { label: "Notifications", href: "/child/notifications", icon: pageIcons.notifications },
    { label: "Elderly Data", href: "/child/elderly-data", icon: pageIcons.elderlyData },
    { label: "Settings", href: "/child/settings", icon: pageIcons.settings },
    { label: "Profile", href: "/child/profile", icon: pageIcons.profile },
  ];

  for (const page of pageMatches) {
    if (page.label.toLowerCase().includes(q)) {
      results.push({
        id: `page-${page.href}`,
        label: page.label,
        description: "Navigate to page",
        href: page.href,
        category: "page",
        icon: page.icon,
      });
    }
  }

  // 2. Search elderly profile data
  const elderlyProfile = getElderlyProfile();
  const elderlyFields = [
    { label: elderlyProfile.name, description: "Elderly name", field: "name" },
    { label: elderlyProfile.homeAddress, description: "Home address", field: "address" },
    { label: elderlyProfile.familyContact, description: "Family contact", field: "contact" },
    { label: elderlyProfile.medicalNotes, description: "Medical notes", field: "medical" },
    { label: `${elderlyProfile.age} Years`, description: "Age", field: "age" },
  ];

  for (const item of elderlyFields) {
    if (item.label.toLowerCase().includes(q)) {
      results.push({
        id: `elderly-${item.field}`,
        label: item.label,
        description: item.description,
        href: "/child/elderly-data",
        category: "elderly",
        icon: pageIcons.user,
      });
    }
  }

  // 3. Search dashboard data
  const dashboardData = mockElderlyData;
  const dashboardFields = [
    { label: dashboardData.safeZone.name, description: "Safe zone name", field: "zone-name" },
    { label: dashboardData.safeZone.address, description: "Safe zone address", field: "zone-address" },
    { label: dashboardData.location.address, description: "Current location", field: "location" },
    { label: `${dashboardData.safeZoneDistance}m safe zone`, description: "Safe Zone", field: "radius" },
    { label: `${dashboardData.battery}% Battery`, description: "Battery level", field: "battery" },
    { label: dashboardData.status === "safe" ? "Status: Safe" : "Status: Outside Zone", description: "Current status", field: "status" },
  ];

  for (const item of dashboardFields) {
    if (item.label.toLowerCase().includes(q)) {
      results.push({
        id: `dashboard-${item.field}`,
        label: item.label,
        description: item.description,
        href: "/child/dashboard",
        category: "dashboard",
        icon: item.field === "battery" ? pageIcons.battery : item.field === "status" ? pageIcons.status : pageIcons.location,
      });
    }
  }

  // 4. Search notifications
  for (const notif of mockNotifications) {
    if (
      notif.title.toLowerCase().includes(q) ||
      notif.description.toLowerCase().includes(q)
    ) {
      results.push({
        id: `notification-${notif.id}`,
        label: notif.title,
        description: `${notif.description} — ${notif.date}`,
        href: "/child/notifications",
        category: "notification",
        icon: pageIcons.notification,
      });
    }
  }

  // 5. Search settings
  const settingsItems = [
    { label: "Safe Zone", description: "Configure monitoring safe zone", keywords: ["safe", "zone", "radius", "meters"] },
    { label: "Enable Notifications", description: "Push notification settings", keywords: ["notification", "alert", "push"] },
    { label: "Alarm Sound", description: "Emergency alert sound", keywords: ["alarm", "sound", "emergency", "audio"] },
    { label: "Change Password", description: "Account security", keywords: ["password", "security", "account"] },
    { label: "About Application", description: "App information", keywords: ["about", "app", "version", "info"] },
  ];

  for (const item of settingsItems) {
    if (
      item.label.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    ) {
      results.push({
        id: `setting-${item.label.toLowerCase().replace(/\s/g, "-")}`,
        label: item.label,
        description: item.description,
        href: "/child/settings",
        category: "setting",
        icon: pageIcons.settings,
      });
    }
  }

  return results;
}
