export type NotificationType = "emergency" | "safe" | "info" | "warning";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  date: string;
  time: string;
}

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "emergency",
    title: "Suti left the Safe Zone",
    description: "Distance: 8 meters outside the safe zone boundary.",
    date: "Jul 2, 2026",
    time: "10:30 AM",
  },
  {
    id: 2,
    type: "safe",
    title: "Suti returned to the Safe Zone",
    description: "Suti has re-entered the designated safe zone.",
    date: "Jul 2, 2026",
    time: "10:25 AM",
  },
  {
    id: 3,
    type: "info",
    title: "Safe Zone updated",
    description: "The safe zone boundaries have been modified successfully.",
    date: "Jul 2, 2026",
    time: "09:15 AM",
  },
  {
    id: 4,
    type: "info",
    title: "Safe Radius updated",
    description: "The safe zone radius has been changed to 5 meters.",
    date: "Jul 2, 2026",
    time: "09:10 AM",
  },
  {
    id: 5,
    type: "warning",
    title: "Device battery is low",
    description: "Battery level is at 15%. Please charge the device soon.",
    date: "Jul 1, 2026",
    time: "08:40 PM",
  },
  {
    id: 6,
    type: "info",
    title: "GPS location updated",
    description: "Location has been refreshed. Current position: Jl. Sukarno No.70.",
    date: "Jul 1, 2026",
    time: "06:30 PM",
  },
  {
    id: 7,
    type: "emergency",
    title: "Suti left the Safe Zone",
    description: "Distance: 15 meters outside the safe zone boundary.",
    date: "Jul 1, 2026",
    time: "03:15 PM",
  },
  {
    id: 8,
    type: "safe",
    title: "Suti returned to the Safe Zone",
    description: "Suti has re-entered the designated safe zone.",
    date: "Jul 1, 2026",
    time: "03:45 PM",
  },
  {
    id: 9,
    type: "warning",
    title: "Device battery is low",
    description: "Battery level dropped below 20%. Charge recommended.",
    date: "Jun 30, 2026",
    time: "09:00 AM",
  },
  {
    id: 10,
    type: "info",
    title: "GPS location updated",
    description: "Location refreshed. Current position: Jl. Merdeka No.12.",
    date: "Jun 30, 2026",
    time: "07:15 AM",
  },
  {
    id: 11,
    type: "safe",
    title: "Suti returned to the Safe Zone",
    description: "Suti has re-entered the designated safe zone.",
    date: "Jun 29, 2026",
    time: "05:20 PM",
  },
  {
    id: 12,
    type: "emergency",
    title: "Suti left the Safe Zone",
    description: "Distance: 22 meters outside the safe zone boundary.",
    date: "Jun 29, 2026",
    time: "04:50 PM",
  },
];
