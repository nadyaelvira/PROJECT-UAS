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

// In a real app this would be fetched from an API / database.
// For now we use a module-level mutable object so both pages
// see the same live state within a session.
const defaultProfile: ElderlyProfile = {
  photoUrl: "",
  name: "Suti",
  age: 69,
  homeAddress: "Jl. Sukarno No.70",
  familyContact: "0812-3456-7890",
  medicalNotes: "Mild Dementia",
};

let profile: ElderlyProfile = { ...defaultProfile };

export function getElderlyProfile(): ElderlyProfile {
  return { ...profile };
}

export function updateElderlyProfile(update: Partial<ElderlyProfile>): ElderlyProfile {
  profile = { ...profile, ...update };
  return { ...profile };
}
