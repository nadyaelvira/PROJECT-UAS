"use client";

import { SharedStoreProvider } from "@/components/shared/sharedStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SharedStoreProvider>{children}</SharedStoreProvider>;
}
