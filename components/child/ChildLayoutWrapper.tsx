"use client";

import { useState, useCallback } from "react";
import { UserProfileProvider } from "@/lib/UserProfileContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ChildLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleMouseEnter = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  return (
    <UserProfileProvider>
      <div className="flex h-screen bg-gray-50">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </UserProfileProvider>
  );
}
