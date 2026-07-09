"use client";

import { useState } from "react";
import { useSharedStore, formatNotificationTime, type NotificationType } from "@/components/shared/sharedStore";

const typeConfig: Record<
  NotificationType,
  { bg: string; iconBg: string; iconColor: string; dot: string; label: string }
> = {
  emergency: {
    bg: "bg-red-50 border-red-100",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    dot: "bg-red-500",
    label: "Emergency",
  },
  safe: {
    bg: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    dot: "bg-green-500",
    label: "Safe",
  },
  info: {
    bg: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    dot: "bg-blue-500",
    label: "Information",
  },
  warning: {
    bg: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    dot: "bg-orange-500",
    label: "Warning",
  },
};

function NotificationIcon({ type }: { type: NotificationType }) {
  const config = typeConfig[type];

  const icons: Record<NotificationType, React.ReactNode> = {
    emergency: (
      <svg className={`h-5 w-5 ${config.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    safe: (
      <svg className={`h-5 w-5 ${config.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    info: (
      <svg className={`h-5 w-5 ${config.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    warning: (
      <svg className={`h-5 w-5 ${config.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  };

  return (
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${config.iconBg}`}>
      {icons[type]}
    </div>
  );
}

const filters: { label: string; value: NotificationType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Emergency", value: "emergency" },
  { label: "Safe", value: "safe" },
  { label: "Information", value: "info" },
  { label: "Warning", value: "warning" },
];

export default function NotificationsClient() {
  const [activeFilter, setActiveFilter] = useState<NotificationType | "all">("all");
  const { notifications, markAllNotificationsRead } = useSharedStore();

  const filtered =
    activeFilter === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeFilter);

  const counts = {
    all: notifications.length,
    emergency: notifications.filter((n) => n.type === "emergency").length,
    safe: notifications.filter((n) => n.type === "safe").length,
    info: notifications.filter((n) => n.type === "info").length,
    warning: notifications.filter((n) => n.type === "warning").length,
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            All activity from your elderly family member&apos;s device.
          </p>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {filters.map((f) => {
          const isActive = activeFilter === f.value;
          const count = counts[f.value];
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        {filtered.map((notification) => {
          const config = typeConfig[notification.type];
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow ${
                !notification.read ? "border-l-4 border-l-blue-500" : ""
              }`}
            >
              {/* Icon */}
              <NotificationIcon type={notification.type} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      config.iconBg
                    } ${config.iconColor}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.description}
                </p>
              </div>

              {/* Time */}
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-medium text-gray-900">
                  {formatNotificationTime(notification.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900">No notifications</p>
          <p className="text-sm text-gray-500 mt-1">
            There are no {activeFilter !== "all" ? activeFilter : ""} notifications to display.
          </p>
        </div>
      )}
    </div>
  );
}
