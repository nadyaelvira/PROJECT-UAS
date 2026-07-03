"use client";

interface Notification {
  id: number;
  icon: "exit" | "return" | "zone" | "battery";
  message: string;
  time: string;
}

interface NotificationsCardProps {
  notifications: Notification[];
}

function NotificationIcon({ type }: { type: Notification["icon"] }) {
  const config = {
    exit: {
      bg: "bg-red-50",
      color: "text-red-600",
      path: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      ),
    },
    return: {
      bg: "bg-green-50",
      color: "text-green-600",
      path: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      ),
    },
    zone: {
      bg: "bg-blue-50",
      color: "text-blue-600",
      path: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      ),
    },
    battery: {
      bg: "bg-yellow-50",
      color: "text-yellow-600",
      path: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
        />
      ),
    },
  };

  const c = config[type];

  return (
    <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${c.bg}`}>
      <svg className={`h-4 w-4 ${c.color}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        {c.path}
      </svg>
    </div>
  );
}

export default function NotificationsCard({ notifications }: NotificationsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <p className="text-sm font-medium text-gray-500">Latest Notifications</p>
      <div className="mt-3 space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-center gap-3">
            <NotificationIcon type={n.icon} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">{n.message}</p>
              <p className="text-xs text-gray-400">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
