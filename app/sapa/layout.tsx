import type { Metadata } from "next";
import { SapaLanguageProvider } from "@/context/SapaLanguageContext";
import "../globals.css";

export const metadata: Metadata = {
  title: "SAPA - Solusi Aman untuk Pemantauan Lansia",
  description: "SAPA membantu keluarga memantau lokasi lansia secara langsung, mengatur zona aman, dan menerima notifikasi ketika lansia keluar dari area yang telah ditentukan.",
};

export default function SapaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SapaLanguageProvider>
      <div className="min-h-screen bg-white">
        {children}
      </div>
    </SapaLanguageProvider>
  );
}
