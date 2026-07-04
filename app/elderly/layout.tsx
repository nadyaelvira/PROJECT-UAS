'use client';

import ElderlySidebar from '@/components/ElderlySidebar';
import Navbar from '@/components/Navbar';
import { TextSizeProvider } from '@/context/TextSizeContext';
import { LanguageProvider } from '@/context/LanguageContext';

export default function ElderlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <TextSizeProvider>
        <div className="flex h-screen bg-gray-50">
          <ElderlySidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-hidden p-6">
              {children}
            </main>
          </div>
        </div>
      </TextSizeProvider>
    </LanguageProvider>
  );
}
