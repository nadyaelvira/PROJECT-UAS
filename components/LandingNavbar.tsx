'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSapaLanguage } from '@/context/SapaLanguageContext';

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useSapaLanguage();

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.features', href: '#features' },
    { key: 'nav.howItWorks', href: '#how-it-works' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (window.innerHeight / 2) + (element.scrollHeight / 2) - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ background: 'rgba(30, 58, 138, 0.9)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="SAPA Logo" width={40} height={40} className="rounded-xl" />
            <span className="text-xl font-bold text-white">SAPA</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {t(item.key)}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              className="px-3 py-1.5 text-xs font-medium text-white bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              {language === 'id' ? 'EN' : 'ID'}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors">
                {t('nav.login')}
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] rounded-lg hover:bg-[#172554] transition-colors shadow-md">
                {t('nav.signIn')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-white/80"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10" style={{ background: 'rgba(30, 58, 138, 0.95)' }}>
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {t(item.key)}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Link href="/login" className="block w-full px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors text-center">
                {t('nav.login')}
              </Link>
              <Link href="/register" className="block w-full px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] rounded-lg hover:bg-[#172554] transition-colors shadow-md text-center">
                {t('nav.signIn')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
