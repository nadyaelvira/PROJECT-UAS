"use client";

import { useState } from "react";
import { useSharedStore } from "@/components/shared/sharedStore";
import { useUserProfile } from "@/lib/UserProfileContext";
import { useLanguage } from "@/context/LanguageContext";

export default function PairingPage() {
  const { t } = useLanguage();
  const { profile } = useUserProfile();
  const { pairingCode, isPaired, pairedByName, generatePairingCode, clearPairing } = useSharedStore();
  const [copied, setCopied] = useState(false);
  const [showDisconnect, setShowDisconnect] = useState(false);

  const handleGenerate = () => {
    generatePairingCode();
    setCopied(false);
  };

  const handleCopy = async () => {
    if (pairingCode) {
      await navigator.clipboard.writeText(pairingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    clearPairing();
    setShowDisconnect(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("child.pairing.title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("child.pairing.subtitle")}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-8">
          {/* Paired Status */}
          {isPaired && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">{t("child.pairing.paired")}</p>
                  <p className="text-xs text-green-600">{pairedByName || "Device Lansia"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Code Display */}
          {pairingCode && (
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">{t("child.pairing.codeLabel")}</p>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold tracking-[0.3em] text-gray-900 mb-2">
                  {pairingCode}
                </p>
                <p className="text-xs text-gray-500">{t("child.pairing.codeHint")}</p>
              </div>
              <button
                onClick={handleCopy}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {t("child.pairing.copied")}
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    {t("child.pairing.copy")}
                  </>
                )}
              </button>
            </div>
          )}

          {/* Generate / Regenerate Button */}
          <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            {pairingCode ? t("child.pairing.regenerate") : t("child.pairing.generate")}
          </button>
        </div>

        {/* Disconnect */}
        {isPaired && (
          <div className="px-8 pb-8">
            {showDisconnect ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 mb-3">{t("child.pairing.disconnectConfirm")}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDisconnect(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
                  >
                    {t("child.elderly.cancel")}
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
                  >
                    {t("child.pairing.disconnect")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowDisconnect(true)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-3 px-6 rounded-xl border border-red-200 transition-colors"
              >
                {t("child.pairing.disconnect")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
