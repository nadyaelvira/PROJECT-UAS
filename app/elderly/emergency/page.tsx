"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useSharedStore } from "@/components/shared/sharedStore";

export default function ElderlyEmergencyPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { elderlyProfile, deactivateEmergencyMode, clearSOS } = useSharedStore();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Warning Banner */}
      <div className="bg-red-600 rounded-2xl p-8 mb-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h1 className="text-4xl font-bold text-white">{t("emergency.help")}</h1>
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-lg text-red-100 mt-3">{t("emergency.subtitle")}</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Photo section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-8 py-10">
          <div className="flex flex-col items-center">
            <div className="h-28 w-28 rounded-full bg-white/20 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
              {elderlyProfile.photoUrl ? (
                <img
                  src={elderlyProfile.photoUrl}
                  alt={elderlyProfile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg className="h-14 w-14 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>
            <h2 className="text-xl font-bold text-white mt-5">{elderlyProfile.name}</h2>
            <p className="text-blue-100 text-sm mt-0.5">{t("emergency.photo")}</p>
          </div>
        </div>

        {/* Info section */}
        <div className="px-8 py-8 space-y-4">
          {/* Name */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("emergency.name")}</p>
              <p className="text-xl font-bold text-gray-900">{elderlyProfile.name}</p>
            </div>
          </div>

          {/* Age */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("emergency.age")}</p>
              <p className="text-xl font-bold text-gray-900">{elderlyProfile.age} {t("emergency.years")}</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("emergency.address")}</p>
              <p className="text-xl font-bold text-gray-900">{elderlyProfile.homeAddress}</p>
            </div>
          </div>

          {/* Family Contact */}
          <div className="bg-red-50 rounded-xl p-4 flex items-center gap-4 border border-red-200">
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("emergency.familyContact")}</p>
              <p className="text-xl font-bold text-red-600">{elderlyProfile.familyContact}</p>
            </div>
          </div>

          {/* Medical Notes */}
          <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-4 border border-yellow-200">
            <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("emergency.medicalNotes")}</p>
              <p className="text-xl font-bold text-yellow-700">{elderlyProfile.medicalNotes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call Family Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            const phone = elderlyProfile.familyContact.replace(/[^0-9]/g, "");
            const msg = encodeURIComponent(`Tolong, ini ${elderlyProfile.name}. Saya butuh bantuan segera!`);
            window.open(`https://wa.me/62${phone.startsWith("0") ? phone.slice(1) : phone}?text=${msg}`, "_blank");
            deactivateEmergencyMode();
            clearSOS();
            router.replace("/elderly/home");
          }}
          className="w-full py-5 px-6 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-2xl shadow-sm transition-colors"
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span>{t("emergency.callFamily")}</span>
          </div>
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">{t("emergency.findNote")}</p>
        <p className="text-xs text-gray-500 mt-1">{t("emergency.syncNote")}</p>
      </div>
    </div>
  );
}
