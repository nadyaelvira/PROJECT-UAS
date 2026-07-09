'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'id' | 'en';

interface SapaLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    // Navbar
    'nav.home': 'Beranda',
    'nav.features': 'Fitur',
    'nav.howItWorks': 'Cara Kerja',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',
    'nav.login': 'Login',
    'nav.signIn': 'Sign In',

    // Hero
    'hero.subtitle': 'Solusi Aman untuk Pemantauan Lansia',
    'hero.title': 'Lindungi Orang Tersayang dengan Pemantauan Lokasi Secara Real-Time',
    'hero.description': 'SAPA membantu keluarga memantau lokasi lansia secara langsung, mengatur zona aman, dan menerima notifikasi ketika lansia keluar dari area yang telah ditentukan.',
    'hero.cta': 'Daftar Sekarang',
    'hero.ctaLearnMore': 'Pelajari Lebih Lanjut',
    'hero.dashboard': 'Dashboard SAPA',

    // Apa itu SAPA
    'about.title': 'Apa itu SAPA?',
    'about.description': 'SAPA (Solusi Aman untuk Pemantauan Lansia) adalah aplikasi berbasis mobile dan web yang dirancang khusus untuk membantu keluarga memantau lokasi lansia secara real-time.',
    'about.detail': 'Dengan teknologi GPS dan geofencing, SAPA memungkinkan Anda mengetahui keberadaan orang tua atau kakek nenek Anda kapan saja dan di mana saja. Ketika lansia keluar dari zona aman yang telah ditentukan, sistem akan secara otomatis mengirimkan notifikasi kepada anggota keluarga.',

    // Why SAPA
    'why.title': 'Mengapa Menggunakan SAPA?',
    'why.description': 'Penderita demensia memiliki risiko tersesat atau keluar rumah tanpa disadari. SAPA hadir sebagai solusi pemantauan yang mudah digunakan dan dapat memberikan rasa aman bagi keluarga.',
    'why.point1': 'Risiko tersesat yang tinggi pada penderita demensia',
    'why.point2': 'Kebutuhan sistem pemantauan yang mudah digunakan',
    'why.point3': 'Memberikan rasa aman bagi keluarga',

    // Features
    'features.title': 'Fitur Unggulan',
    'features.subtitle': 'Solusi lengkap untuk pemantauan lansia',
    'features.location.title': 'Monitoring Lokasi Real-Time',
    'features.location.desc': 'Pantau lokasi lansia secara langsung melalui dashboard yang intuitif dan mudah digunakan.',
    'features.geofencing.title': 'Zona Aman (Geofencing)',
    'features.geofencing.desc': 'Tentukan area aman untuk lansia dan dapatkan peringatan saat mereka keluar dari zona yang ditentukan.',
    'features.notification.title': 'Notifikasi Otomatis',
    'features.notification.desc': 'Sistem akan mengirimkan notifikasi otomatis ke perangkat keluarga saat lansia keluar dari zona aman.',

    // How it works
    'how.title': 'Cara Kerja',
    'how.subtitle': 'Mulai melindungi orang tersayang dalam 5 langkah mudah',
    'how.step1.title': 'Buat Akun & Login',
    'how.step1.desc': 'Daftar akun SAPA dan login ke dashboard untuk memulai.',
    'how.step2.title': 'Hubungkan Perangkat',
    'how.step2.desc': 'Hubungkan akun dengan perangkat lansia melalui proses pairing atau kode unik.',
    'how.step3.title': 'Tentukan Zona Aman',
    'how.step3.desc': 'Atur lokasi rumah dan radius zona aman untuk lansia.',
    'how.step4.title': 'Pantau Lokasi',
    'how.step4.desc': 'Perangkat lansia mengirimkan lokasi GPS secara berkala untuk dipantau melalui dashboard.',
    'how.step5.title': 'Terima Notifikasi',
    'how.step5.desc': 'Sistem mengirimkan notifikasi otomatis apabila lansia keluar dari zona aman.',

    // Advantages
    'advantages.title': 'Keunggulan SAPA',
    'advantages.subtitle': 'Mengapa memilih SAPA untuk pemantauan lansia?',
    'advantages.easy': 'Mudah Digunakan',
    'advantages.easy.desc': 'Antarmuka intuitif yang dapat digunakan oleh siapa saja.',
    'advantages.friendly': 'Ramah Lansia',
    'advantages.friendly.desc': 'Dirancang khusus untuk kenyamanan pengguna lansia.',
    'advantages.accurate': 'Monitoring Akurat',
    'advantages.accurate.desc': 'Lokasi real-time dengan akurasi tinggi.',
    'advantages.flexible': 'Zona Aman Fleksibel',
    'advantages.flexible.desc': 'Pengaturan zona aman yang dapat disesuaikan.',
    'advantages.fast': 'Notifikasi Cepat',
    'advantages.fast.desc': 'Peringatan instan saat lansia keluar dari zona aman.',
    'advantages.secure': 'Keamanan Data',
    'advantages.secure.desc': 'Data pengguna terjamin keamanannya.',

    // CTA
    'cta.title': 'Mulai Lindungi Orang Tersayang Bersama SAPA',
    'cta.description': 'Daftar sekarang dan berikan perlindungan terbaik untuk lansia yang Anda cintai.',
    'cta.register': 'Daftar Sekarang',
    'cta.login': 'Masuk',

    // Auth - Login
    'auth.login.title': 'Selamat Datang',
    'auth.login.subtitle': 'Masuk ke akun Anda',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.forgotPassword': 'Lupa password?',
    'auth.login.submit': 'Masuk',
    'auth.login.noAccount': 'Belum punya akun?',
    'auth.login.register': 'Daftar',

    // Auth - Register
    'auth.register.title': 'Buat Akun Baru',
    'auth.register.name': 'Nama Lengkap',
    'auth.register.email': 'Email',
    'auth.register.password': 'Password',
    'auth.register.confirmPassword': 'Konfirmasi Password',
    'auth.register.submit': 'Daftar',
    'auth.register.hasAccount': 'Sudah punya akun?',
    'auth.register.login': 'Masuk',

    // Auth - Forgot Password
    'auth.forgot.title': 'Reset Password',
    'auth.forgot.subtitle': 'Masukkan email Anda untuk menerima link reset password',
    'auth.forgot.submit': 'Kirim Link Reset',
    'auth.forgot.success': 'Link reset password telah dikirim ke email Anda',
    'auth.forgot.back': 'Kembali ke login',

    // Footer
    'footer.description': 'Solusi Aman untuk Pemantauan Lansia. Membantu keluarga menjaga keamanan lansia dengan teknologi GPS dan geofencing.',
    'footer.product': 'Produk',
    'footer.company': 'Perusahaan',
    'footer.about': 'Tentang Kami',
    'footer.careers': 'Karir',
    'footer.blog': 'Blog',
    'footer.contact': 'Kontak',
    'footer.support': 'Dukungan',
    'footer.helpCenter': 'Pusat Bantuan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.terms': 'Syarat & Ketentuan',
    'footer.copyright': '© 2024 SAPA. Hak cipta dilindungi.',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signIn': 'Sign In',

    // Hero
    'hero.subtitle': 'Safe Solution for Elderly Monitoring',
    'hero.title': 'Protect Your Loved Ones with Real-Time Location Monitoring',
    'hero.description': 'SAPA helps families monitor elderly locations directly, set up safe zones, and receive notifications when they leave designated areas.',
    'hero.cta': 'Register Now',
    'hero.ctaLearnMore': 'Learn More',
    'hero.dashboard': 'SAPA Dashboard',

    // Apa itu SAPA
    'about.title': 'What is SAPA?',
    'about.description': 'SAPA (Safe Solution for Elderly Monitoring) is a mobile and web application designed specifically to help families monitor elderly locations in real-time.',
    'about.detail': 'Using GPS and geofencing technology, SAPA allows you to know the whereabouts of your parents or grandparents anytime and anywhere. When elderly leave a predetermined safe zone, the system automatically sends notifications to family members.',

    // Why SAPA
    'why.title': 'Why Use SAPA?',
    'why.description': 'Dementia patients have a high risk of getting lost or leaving home without realizing it. SAPA provides an easy-to-use monitoring system that gives families peace of mind.',
    'why.point1': 'High risk of getting lost for dementia patients',
    'why.point2': 'Need for an easy-to-use monitoring system',
    'why.point3': 'Provides peace of mind for families',

    // Features
    'features.title': 'Key Features',
    'features.subtitle': 'Complete solution for elderly monitoring',
    'features.location.title': 'Real-Time Location Monitoring',
    'features.location.desc': 'Monitor elderly locations directly through an intuitive and easy-to-use dashboard.',
    'features.geofencing.title': 'Safe Zone (Geofencing)',
    'features.geofencing.desc': 'Set safe areas for elderly and get warnings when they leave designated zones.',
    'features.notification.title': 'Automatic Notifications',
    'features.notification.desc': 'System sends automatic notifications to family devices when elderly leave safe zones.',

    // How it works
    'how.title': 'How It Works',
    'how.subtitle': 'Start protecting your loved ones in 5 easy steps',
    'how.step1.title': 'Create Account & Login',
    'how.step1.desc': 'Register a SAPA account and login to the dashboard to get started.',
    'how.step2.title': 'Connect Device',
    'how.step2.desc': 'Connect account with elderly device through pairing process or unique code.',
    'how.step3.title': 'Set Safe Zone',
    'how.step3.desc': 'Configure home location and safe zone radius for elderly.',
    'how.step4.title': 'Monitor Location',
    'how.step4.desc': 'Elderly device sends GPS location periodically for monitoring through dashboard.',
    'how.step5.title': 'Receive Notifications',
    'how.step5.desc': 'System sends automatic notifications when elderly leave safe zones.',

    // Advantages
    'advantages.title': 'SAPA Advantages',
    'advantages.subtitle': 'Why choose SAPA for elderly monitoring?',
    'advantages.easy': 'Easy to Use',
    'advantages.easy.desc': 'Intuitive interface that anyone can use.',
    'advantages.friendly': 'Elderly Friendly',
    'advantages.friendly.desc': 'Specifically designed for elderly user comfort.',
    'advantages.accurate': 'Accurate Monitoring',
    'advantages.accurate.desc': 'Real-time location with high accuracy.',
    'advantages.flexible': 'Flexible Safe Zones',
    'advantages.flexible.desc': 'Customizable safe zone settings.',
    'advantages.fast': 'Fast Notifications',
    'advantages.fast.desc': 'Instant alerts when elderly leave safe zones.',
    'advantages.secure': 'Data Security',
    'advantages.secure.desc': 'User data is guaranteed to be secure.',

    // CTA
    'cta.title': 'Start Protecting Your Loved Ones with SAPA',
    'cta.description': 'Register now and provide the best protection for the elderly you love.',
    'cta.register': 'Register Now',
    'cta.login': 'Login',

    // Auth - Login
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your account',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.forgotPassword': 'Forgot password?',
    'auth.login.submit': 'Sign In',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.register': 'Register',

    // Auth - Register
    'auth.register.title': 'Create New Account',
    'auth.register.name': 'Full Name',
    'auth.register.email': 'Email',
    'auth.register.password': 'Password',
    'auth.register.confirmPassword': 'Confirm Password',
    'auth.register.submit': 'Register',
    'auth.register.hasAccount': 'Already have an account?',
    'auth.register.login': 'Sign In',

    // Auth - Forgot Password
    'auth.forgot.title': 'Reset Password',
    'auth.forgot.subtitle': 'Enter your email to receive a password reset link',
    'auth.forgot.submit': 'Send Reset Link',
    'auth.forgot.success': 'Password reset link has been sent to your email',
    'auth.forgot.back': 'Back to login',

    // Footer
    'footer.description': 'Safe Solution for Elderly Monitoring. Helping families keep elderly safe with GPS and geofencing technology.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.support': 'Support',
    'footer.helpCenter': 'Help Center',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.copyright': '© 2024 SAPA. All rights reserved.',
  },
};

const SapaLanguageContext = createContext<SapaLanguageContextType | undefined>(undefined);

export function SapaLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['id']] || key;
  };

  return (
    <SapaLanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </SapaLanguageContext.Provider>
  );
}

export function useSapaLanguage() {
  const context = useContext(SapaLanguageContext);
  if (!context) {
    throw new Error('useSapaLanguage must be used within a SapaLanguageProvider');
  }
  return context;
}
