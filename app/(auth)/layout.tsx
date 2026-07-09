'use client';

import { SapaLanguageProvider } from '@/context/SapaLanguageContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SapaLanguageProvider>
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ background: 'linear-gradient(to bottom, #1e3a8a, #dbeafe)' }}
      >
        {children}
      </div>
    </SapaLanguageProvider>
  );
}
