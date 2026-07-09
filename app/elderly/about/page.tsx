"use client";

import Link from "next/link";

export default function ElderlyAboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Application</h1>
        <p className="text-sm text-gray-500 mt-1">Information about SAPA</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-8 py-10 text-center border-b border-gray-100">
          <img
            src="/logo.png"
            alt="SAPA Logo"
            className="w-24 h-24 mx-auto mb-4 rounded-2xl"
          />
          <h2 className="text-3xl font-bold text-gray-900">SAPA</h2>
          <p className="text-sm text-gray-500 mt-1">
            Solusi Aman untuk Pemantauan Lansia
          </p>
          <p className="text-xs text-gray-400 mt-3">Version 1.0.0</p>
          <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto leading-relaxed">
            Helping families monitor elderly safely through real-time technology.
          </p>
        </div>

        {/* Features */}
        <div className="px-8 py-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Features</h3>
          <div className="space-y-3">
            {[
              "Real-time Tracking",
              "Safe Zone",
              "Emergency SOS",
              "Navigation",
              "Battery Monitoring",
              "Notifications",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <svg className="h-3.5 w-3.5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Developer */}
        <div className="px-8 py-6 text-center">
          <p className="text-sm font-medium text-gray-900">Developed by</p>
          <p className="text-sm text-gray-600 mt-1">SafeElder Development Team</p>
          <p className="text-xs text-gray-500 mt-0.5">Universitas Mulia</p>
          <p className="text-xs text-gray-400 mt-4">&copy; 2026 SAPA</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Link
          href="/elderly/settings"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Settings
        </Link>
      </div>
    </div>
  );
}
