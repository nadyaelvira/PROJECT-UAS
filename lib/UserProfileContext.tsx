"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface UserProfile {
  photoUrl: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  role: string;
}

const defaultProfile: UserProfile = {
  photoUrl: "",
  name: "Dian Safira",
  address: "Jl. Merdeka No.15",
  phone: "0812-3456-7890",
  email: "dian@email.com",
  role: "Family Member",
};

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
