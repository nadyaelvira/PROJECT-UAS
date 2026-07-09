"use client";

import { useState, useRef } from "react";
import {
  getElderlyProfile,
  updateElderlyProfile,
  type ElderlyProfile,
} from "@/components/shared/elderlyProfile";
import { useLanguage } from "@/context/LanguageContext";

export default function ElderlyDataClient() {
  const [profile, setProfile] = useState<ElderlyProfile>(getElderlyProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ElderlyProfile>(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updated = updateElderlyProfile({ photoUrl: url });
    setProfile(updated);
    setDraft(updated);
  };

  const handleSave = () => {
    const updated = updateElderlyProfile(draft);
    setProfile(updated);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("child.elderly.title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("child.elderly.subtitle")}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900">{t("child.elderly.autoSync")}</p>
          <p className="text-xs text-blue-600 mt-0.5">
            {t("child.elderly.autoSyncDesc")}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-8 py-10">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full bg-white/20 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  <svg className="h-16 w-16 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-md hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                {t("child.elderly.changePhoto")}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </div>
            <h2 className="text-xl font-bold text-white mt-5">{profile.name}</h2>
            <p className="text-blue-100 text-sm mt-0.5">{profile.age} {t("child.elderly.years")}</p>
          </div>
        </div>

        <div className="px-8 py-8">
          {editing ? (
            <div className="space-y-5">
              <EditableField label={t("child.elderly.name")} value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
              <EditableField label={t("child.elderly.age")} type="number" value={String(draft.age)} onChange={(v) => setDraft({ ...draft, age: Number(v) || 0 })} />
              <EditableField label={t("child.elderly.homeAddress")} value={draft.homeAddress} onChange={(v) => setDraft({ ...draft, homeAddress: v })} />
              <EditableField label={t("child.elderly.familyContact")} value={draft.familyContact} onChange={(v) => setDraft({ ...draft, familyContact: v })} />
              <EditableField label={t("child.elderly.medicalNotes")} value={draft.medicalNotes} onChange={(v) => setDraft({ ...draft, medicalNotes: v })} multiline />
            </div>
          ) : (
            <div className="space-y-5">
              <InfoField label={t("child.elderly.name")} value={profile.name} />
              <InfoField label={t("child.elderly.age")} value={`${profile.age} ${t("child.elderly.years")}`} />
              <InfoField label={t("child.elderly.homeAddress")} value={profile.homeAddress} />
              <InfoField label={t("child.elderly.familyContact")} value={profile.familyContact} />
              <InfoField label={t("child.elderly.medicalNotes")} value={profile.medicalNotes} />
            </div>
          )}
        </div>

        <div className="px-8 pb-8">
          {editing ? (
            <div className="flex gap-3">
              <button onClick={handleCancel} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-3 px-6 rounded-xl transition-colors">
                {t("child.elderly.cancel")}
              </button>
              <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors">
                {t("child.elderly.saveChanges")}
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setDraft(profile); setEditing(true); }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              {t("child.elderly.editData")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function EditableField({ label, value, onChange, type = "text", multiline = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      )}
    </div>
  );
}
