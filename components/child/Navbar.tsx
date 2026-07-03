"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      {/* Left spacer for balance */}
      <div />

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search placeholder */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-sm text-gray-400">Search...</span>
        </div>

        {/* Notification bell */}
        <Link
          href="/child/notifications"
          className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* User profile */}
        <Link href="/child/profile" className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white">
            U
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">User</p>
            <p className="text-xs text-gray-400">Family Member</p>
          </div>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
