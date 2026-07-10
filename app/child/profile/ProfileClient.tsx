"use client";

import { useState, useRef } from "react";
import { useUserProfile } from "@/lib/UserProfileContext";
import { useLanguage } from "@/context/LanguageContext";

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function EditableField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  );
}

export default function ProfileClient() {
  const { profile, updateProfile } = useUserProfile();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      sessionStorage.clear();
      localStorage.clear();
      window.location.replace("/sapa");
    }, 400);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateProfile({ photoUrl: url });
    setDraft((d) => ({ ...d, photoUrl: url }));
  };

  const handleSave = () => {
    updateProfile(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("child.profile.title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("child.profile.subtitle")}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-8 py-10">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="h-28 w-28 rounded-full bg-white/20 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {profile.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-md hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                {t("child.profile.changePhoto")}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </div>
            <h2 className="text-xl font-bold text-white mt-5">{profile.name}</h2>
          </div>
        </div>

        <div className="px-8 py-8">
          {editing ? (
            <div className="space-y-5">
              <EditableField label={t("child.profile.fullName")} value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
              <EditableField label={t("child.profile.homeAddress")} value={draft.address} onChange={(v) => setDraft({ ...draft, address: v })} />
              <EditableField label={t("child.profile.phoneNumber")} value={draft.phone} onChange={(v) => setDraft({ ...draft, phone: v })} />
              <EditableField label={t("child.profile.emailAddress")} type="email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} />
            </div>
          ) : (
            <div className="space-y-5">
              <InfoField label={t("child.profile.fullName")} value={profile.name} />
              <InfoField label={t("child.profile.homeAddress")} value={profile.address} />
              <InfoField label={t("child.profile.phoneNumber")} value={profile.phone} />
              <InfoField label={t("child.profile.emailAddress")} value={profile.email} />
            </div>
          )}
        </div>

        <div className="px-8 pb-8 space-y-3">
          {editing ? (
            <div className="flex gap-3">
              <button onClick={handleCancel} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-3 px-6 rounded-xl transition-colors">
                {t("child.profile.cancel")}
              </button>
              <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors">
                {t("child.profile.saveChanges")}
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setDraft(profile); setEditing(true); }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              {t("child.profile.editProfile")}
            </button>
          )}

          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-3 px-6 rounded-xl border border-red-200 transition-colors"
          >
            {t("child.profile.logout")}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isLoggingOut ? "opacity-0" : "opacity-100"}`}
            onClick={() => !isLoggingOut && setShowLogoutModal(false)}
          />
          <div className={`relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 transition-all duration-300 ${isLoggingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{t("child.profile.logout")}</h3>
              <p className="text-sm text-gray-500 mb-6">Apakah kamu yakin ingin keluar dari akun?</p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                >
                  {isLoggingOut ? "Keluar..." : "Ya, Keluar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
