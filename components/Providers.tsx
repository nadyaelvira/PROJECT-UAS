"use client";

import { SharedStoreProvider } from "@/components/shared/sharedStore";
import { useRealGps } from "@/hooks/useRealGps";

function ElderlyGpsTracker() {
  useRealGps();
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SharedStoreProvider>
      <ElderlyGpsTracker />
      {children}
    </SharedStoreProvider>
  );
}
