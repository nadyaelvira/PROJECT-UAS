export const mockElderlyData = {
  name: "Suti",
  status: "safe" as "safe" | "out_of_zone",
  distanceFromZone: 3,
  safeZone: {
    name: "Home",
    address: "Jl. Sukarno No.70, Kediri",
  },
  safeZoneDistance: 5,
  location: {
    address: "Jl. Sukarno No.70",
    lastUpdated: "10:32 AM",
    lat: -7.8161,
    lng: 112.0161,
  },
  home: {
    lat: -7.8161,
    lng: 112.0161,
  },
  battery: 78,
  notifications: [
    {
      id: 1,
      icon: "exit" as const,
      message: "Suti left the safe zone",
      time: "10:30 AM",
    },
    {
      id: 2,
      icon: "return" as const,
      message: "Suti returned to the safe zone",
      time: "10:25 AM",
    },
    {
      id: 3,
      icon: "zone" as const,
      message: "Safe Zone updated",
      time: "09:15 AM",
    },
    {
      id: 4,
      icon: "battery" as const,
      message: "Battery Low",
      time: "08:40 AM",
    },
  ],
};
