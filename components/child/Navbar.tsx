"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserProfile } from "@/lib/UserProfileContext";
import { searchAll, getCategoryLabel, type SearchResult } from "@/lib/searchData";

export default function Navbar() {
  const { profile } = useUserProfile();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    setResults(searchAll(query));
    setHighlightedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(href: string) {
    router.push(href);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0) {
        handleSelect(results[highlightedIndex].href);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  const hasResults = results.length > 0;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 flex-shrink-0 relative z-50">
      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div ref={containerRef} className="relative hidden md:block">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => query.trim() && setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search pages, data, notifications..."
              className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-56"
            />
          </div>

          {/* Dropdown */}
          {isOpen && query.trim() && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-[100] max-h-96 overflow-y-auto">
              {hasResults ? (
                <>
                  {/* Group results by category */}
                  {(["page", "dashboard", "elderly", "notification", "setting"] as const).map((category) => {
                    const categoryResults = results.filter((r) => r.category === category);
                    if (categoryResults.length === 0) return null;
                    return (
                      <div key={category}>
                        <div className="px-3 py-1.5">
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {getCategoryLabel(category)}
                          </span>
                        </div>
                        {categoryResults.map((result) => {
                          const globalIndex = results.indexOf(result);
                          return (
                            <button
                              key={result.id}
                              onClick={() => handleSelect(result.href)}
                              onMouseEnter={() => setHighlightedIndex(globalIndex)}
                              className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                                globalIndex === highlightedIndex
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <span className={globalIndex === highlightedIndex ? "text-blue-600" : "text-gray-400"}>
                                {result.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{result.label}</p>
                                <p className="text-xs text-gray-400 truncate">{result.description}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className="px-4 py-3 text-sm text-gray-400 text-center">No results found</p>
              )}
            </div>
          )}
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
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white overflow-hidden">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{profile.name}</p>
            <p className="text-xs text-gray-400">{profile.role}</p>
          </div>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
