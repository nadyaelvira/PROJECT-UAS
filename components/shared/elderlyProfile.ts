/**
 * Shared elderly profile data.
 *
 * This is the single source of truth for the elderly person's information.
 * Both the Elderly Data page (Child/Family) and the Emergency Mode page
 * (Elderly user) read from this store — no duplicate data entry required.
 *
 * When the Child/Family user updates profile data here, it is automatically
 * reflected on the Elderly user's Emergency Mode page.
 */

export interface ElderlyProfile {
  photoUrl: string;
  name: string;
  age: number;
  homeAddress: string;
  familyContact: string;
  medicalNotes: string;
}

const defaultProfile: ElderlyProfile = {
  photoUrl: "",
  name: "Suti",
  age: 69,
  homeAddress: "Jl. Sukarno No.70",
  familyContact: "0812-3456-7890",
  medicalNotes: "Mild Dementia",
};

const STORAGE_KEY = "safeelder_elderly_profile";

function loadProfile(): ElderlyProfile {
  if (typeof window === "undefined") return { ...defaultProfile };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultProfile };
}

function saveProfile(p: ElderlyProfile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

let profile: ElderlyProfile = loadProfile();

export function getElderlyProfile(): ElderlyProfile {
  return { ...profile };
}

export function updateElderlyProfile(update: Partial<ElderlyProfile>): ElderlyProfile {
  profile = { ...profile, ...update };
  saveProfile(profile);
  return { ...profile };
}
