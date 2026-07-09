'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Sidebar
    'sidebar.logo': 'SAPA',
    'sidebar.portal': 'Portal Lansia',
    'sidebar.menu': 'Menu',
    'sidebar.home': 'Beranda',
    'sidebar.settings': 'Pengaturan',
    'sidebar.device': 'Informasi Perangkat',
    'sidebar.alerts': 'Peringatan',
    'sidebar.outOfZone': 'Keluar Zona',
    'sidebar.online': 'Online',

    // Child Sidebar
    'child.sidebar.portal': 'Portal Keluarga',
    'child.sidebar.dashboard': 'Dashboard',
    'child.sidebar.notifications': 'Notifikasi',
    'child.sidebar.elderlyData': 'Data Lansia',
    'child.sidebar.settings': 'Pengaturan',
    'child.sidebar.profile': 'Profil',
    'child.sidebar.recentNotif': 'Notifikasi Terbaru',

    // Navbar
    'navbar.safeZone': 'Zona Aman Aktif',
    'navbar.outsideZone': 'Di Luar Zona Aman',

    // Settings
    'settings.title': 'Pengaturan',
    'settings.subtitle': 'Kustomisasi pengalaman Anda',
    'settings.textSize': 'Ukuran Teks',
    'settings.textSizeDesc': 'Atur ukuran teks tampilan',
    'settings.alarmVolume': 'Volume Alarm',
    'settings.alarmVolumeDesc': 'Atur level suara alarm',
    'settings.volume': 'Volume',
    'settings.testSound': 'Uji Suara',
    'settings.stop': 'Berhenti',
    'settings.playing': 'Memutar...',
    'settings.clickToTest': 'Klik untuk menguji volume',
    'settings.language': 'Bahasa',
    'settings.languageDesc': 'Pilih bahasa yang diinginkan',
    'settings.indonesian': '🇮🇩 Indonesia',
    'settings.english': '🇺🇸 English',
    'settings.langIdNote': 'Bahasa Indonesia dipilih sebagai bahasa utama.',
    'settings.langEnNote': 'English is set as the primary language.',
    'settings.alarmSound': 'Suara Alarm',
    'settings.alarmSoundDesc': 'Pilih nada alarm',
    'settings.alarm1': '🔔 Alarm 1 - Chime Lembut',
    'settings.alarm2': '🔕 Alarm 2 - Bel Klasik',
    'settings.alarm3': '🎵 Alarm 3 - Melodi',
    'settings.alarm1Desc': '🔔 Chime Lembut — nada naik lembut',
    'settings.alarm2Desc': '🔕 Bel Klasik — bel klasik tajam',
    'settings.alarm3Desc': '🎵 Melodi — melodi musik',
    'settings.alarmTestNote': 'Gunakan slider volume di atas untuk menguji dan menyesuaikan suara',
    'settings.safeZoneTitle': 'Pengaturan Zona Aman',
    'settings.safeZoneDesc': 'Zona Aman dan Radius Aman dikelola oleh keluarga Anda melalui dashboard Anak/Keluarga. Hubungi keluarga Anda jika perlu mengubah pengaturan ini.',
    'settings.preview': 'Pratinjau:',
    'settings.previewText': 'Ini adalah cara teks Anda akan muncul.',
    'settings.previewSecondary': 'Konten teks sekunder di sini.',

    // Home
    'home.title': 'Dashboard',
    'home.subtitle': 'Pemantauan lokasi real-time',
    'home.liveLocation': 'Lokasi Langsung',
    'home.safeZoneActive': 'Zona Aman Aktif',
    'home.currentLocation': 'Lokasi Saat Ini',
    'home.address': 'Alamat',
    'home.distance': 'Jarak dari Zona Aman',
    'home.meters': 'meter',
    'home.safeZone': 'Zona Aman',
    'home.zoneName': 'Nama Zona',
    'home.home': 'Rumah',
    'home.radius': 'Radius',
    'home.status': 'Status',
    'home.safe': 'AMAN',
    'home.deviceBattery': 'Baterai Perangkat',
    'home.goodCondition': 'Kondisi Baik',
    'home.needHelp': 'Butuh Bantuan',
    'home.tapForHelp': 'Ketuk untuk bantuan segera',
    'home.needHelpBtn': 'BUTUH BANTUAN',
    'home.loadingMap': 'Memuat peta...',

    // Out of Zone
    'ozone.title': 'Keluar Zona Aman',
    'ozone.subtitle': 'Anda telah bergerak keluar dari area zona aman',
    'ozone.outsideZone': 'Di Luar Zona Aman',
    'ozone.currentLocation': 'Lokasi Saat Ini',
    'ozone.address': 'Alamat',
    'ozone.distance': 'Jarak dari Zona Aman',
    'ozone.safeZone': 'Zona Aman',
    'ozone.zoneName': 'Nama Zona',
    'ozone.home': 'Rumah',
    'ozone.safeRadius': 'Radius Aman',
    'ozone.meters': 'meter',
    'ozone.ozoneStatus': 'DI LUAR ZONA AMAN',
    'ozone.deviceBattery': 'Baterai Perangkat',
    'ozone.goodCondition': 'Kondisi Baik',
    'ozone.needHelp': 'Butuh Bantuan',
    'ozone.tapForHelp': 'Ketuk untuk bantuan segera',
    'ozone.needHelpBtn': 'BUTUH BANTUAN',

    // Device Info
    'device.title': 'Informasi Perangkat',
    'device.subtitle': 'Pantau status perangkat Anda',
    'device.battery': 'Baterai Perangkat',
    'device.batteryDesc': 'Level charge saat ini',
    'device.batteryLevel': 'Level Baterai',
    'device.goodCondition': 'Kondisi Baik',
    'device.lastUpdate': 'Pembaruan Terakhir',
    'device.lastUpdateDesc': 'Kapan data disinkronkan',
    'device.lastUpdateLabel': 'Pembaruan Terakhir',
    'device.realtimeSync': 'Sinkronisasi Real-time',
    'device.status': 'Status Perangkat',
    'device.statusDesc': 'Status koneksi',
    'device.active': 'Aktif',
    'device.connected': 'Tersambung',
    'device.infoNote': 'Perangkat ini terhubung ke sistem pemantauan Anak/Keluarga.',

    // Emergency
    'emergency.help': 'TOLONG',
    'emergency.subtitle': 'Tolong hubungkan saya dengan keluarga',
    'emergency.photo': 'Foto Lansia',
    'emergency.name': 'Nama',
    'emergency.age': 'Usia',
    'emergency.years': 'Tahun',
    'emergency.address': 'Alamat Rumah',
    'emergency.familyContact': 'Kontak Keluarga',
    'emergency.medicalNotes': 'Catatan Medis',
    'emergency.dementia': 'Demensia Ringan',
    'emergency.callFamily': 'HUBUNGI KELUARGA',
    'emergency.findNote': 'Jika Anda menemukan orang ini, tekan tombol di atas untuk menghubungi keluarga mereka.',
    'emergency.syncNote': 'Informasi secara otomatis disinkronkan dengan sistem SAPA.',

    // Child Settings
    'child.settings.title': 'Pengaturan',
    'child.settings.subtitle': 'Kelola preferensi pemantauan dan pengaturan akun Anda.',
    'child.settings.safeZone': 'Zona Aman Default',
    'child.settings.safeZoneDesc': 'Secara otomatis memperbarui zona aman pengguna lansia.',
    'child.settings.notifications': 'Notifikasi',
    'child.settings.notificationsDesc': 'Kontrol bagaimana Anda menerima notifikasi.',
    'child.settings.enableNotif': 'Aktifkan Notifikasi',
    'child.settings.enableNotifDesc': 'Terima notifikasi push untuk peringatan.',
    'child.settings.alarmSound': 'Suara Alarm',
    'child.settings.alarmSoundDesc': 'Putar suara saat peringatan darurat datang.',
    'child.settings.others': 'Lainnya',
    'child.settings.othersDesc': 'Pengaturan akun dan aplikasi.',
    'child.settings.about': 'Tentang Aplikasi',
    'child.settings.aboutDesc': 'Informasi tentang SAPA',
    'child.settings.langNote': 'Bahasa Indonesia dipilih sebagai bahasa utama.',
    'child.settings.langEnNote': 'English is set as the primary language.',

    // Child Dashboard
    'child.dashboard.actions': 'Tindakan',
    'child.dashboard.emergencyMode': 'Mode Darurat',
    'child.dashboard.deactivateEmergency': 'Nonaktifkan Darurat',
    'child.dashboard.directionToElderly': 'Arah ke Lansia',
    'child.dashboard.latestNotif': 'Notifikasi Terbaru',
    'child.dashboard.loading': 'Memuat...',
    'child.dashboard.justNow': 'Baru saja',
    'child.dashboard.status.currentStatus': 'Status Saat Ini',
    'child.dashboard.status.safe': 'AMAN',
    'child.dashboard.status.outOfZone': 'DI LUAR ZONA AMAN',
    'child.dashboard.distance.label': 'Jarak dari Zona Aman',
    'child.dashboard.distance.meters': 'meter',
    'child.dashboard.location.label': 'Lokasi Saat Ini',
    'child.dashboard.location.updated': 'Diperbarui: ',
    'child.dashboard.battery.label': 'Baterai Perangkat',

    // Child Notifications
    'child.notif.title': 'Notifikasi',
    'child.notif.subtitle': 'Semua aktivitas dari perangkat anggota keluarga lansia Anda.',
    'child.notif.markAllRead': 'Tandai semua sudah dibaca',
    'child.notif.all': 'Semua',
    'child.notif.emergency': 'Darurat',
    'child.notif.safe': 'Aman',
    'child.notif.information': 'Informasi',
    'child.notif.warning': 'Peringatan',
    'child.notif.noNotif': 'Tidak ada notifikasi',
    'child.notif.emptyDesc': 'Tidak ada notifikasi {filter} untuk ditampilkan.',

    // Child Elderly Data
    'child.elderly.title': 'Data Lansia',
    'child.elderly.subtitle': 'Kelola informasi profil anggota keluarga lansia Anda.',
    'child.elderly.autoSync': 'Sinkronisasi Otomatis dengan Mode Darurat',
    'child.elderly.autoSyncDesc': 'Perubahan di sini secara otomatis tercermin di halaman Mode Darurat pengguna lansia.',
    'child.elderly.changePhoto': 'Ubah Foto',
    'child.elderly.name': 'Nama',
    'child.elderly.age': 'Usia',
    'child.elderly.years': 'Tahun',
    'child.elderly.homeAddress': 'Alamat Rumah',
    'child.elderly.familyContact': 'Nomor Kontak Keluarga',
    'child.elderly.medicalNotes': 'Catatan Medis',
    'child.elderly.cancel': 'Batal',
    'child.elderly.saveChanges': 'Simpan Perubahan',
    'child.elderly.editData': 'Edit Data',

    // Child Profile
    'child.profile.title': 'Profil',
    'child.profile.subtitle': 'Lihat dan kelola informasi akun Anda.',
    'child.profile.changePhoto': 'Ubah Foto',
    'child.profile.fullName': 'Nama Lengkap',
    'child.profile.homeAddress': 'Alamat Rumah',
    'child.profile.phoneNumber': 'Nomor Telepon',
    'child.profile.emailAddress': 'Alamat Email',
    'child.profile.cancel': 'Batal',
    'child.profile.saveChanges': 'Simpan Perubahan',
    'child.profile.editProfile': 'Edit Profil',
    'child.profile.logout': 'Keluar',
  },
  en: {
    // Sidebar
    'sidebar.logo': 'SAPA',
    'sidebar.portal': 'Elderly Portal',
    'sidebar.menu': 'Menu',
    'sidebar.home': 'Home',
    'sidebar.settings': 'Settings',
    'sidebar.device': 'Device Information',
    'sidebar.alerts': 'Alerts',
    'sidebar.outOfZone': 'Out of Zone',
    'sidebar.online': 'Online',

    // Child Sidebar
    'child.sidebar.portal': 'Family Portal',
    'child.sidebar.dashboard': 'Dashboard',
    'child.sidebar.notifications': 'Notifications',
    'child.sidebar.elderlyData': 'Elderly Data',
    'child.sidebar.settings': 'Settings',
    'child.sidebar.profile': 'Profile',
    'child.sidebar.recentNotif': 'Recent Notifications',

    // Navbar
    'navbar.safeZone': 'Safe Zone Active',
    'navbar.outsideZone': 'Outside Safe Zone',

    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Customize your experience',
    'settings.textSize': 'Text Size',
    'settings.textSizeDesc': 'Adjust display text size',
    'settings.alarmVolume': 'Alarm Volume',
    'settings.alarmVolumeDesc': 'Adjust alarm sound level',
    'settings.volume': 'Volume',
    'settings.testSound': 'Test Sound',
    'settings.stop': 'Stop',
    'settings.playing': 'Playing...',
    'settings.clickToTest': 'Click to test volume',
    'settings.language': 'Language',
    'settings.languageDesc': 'Select preferred language',
    'settings.indonesian': '🇮🇩 Indonesia',
    'settings.english': '🇺🇸 English',
    'settings.langIdNote': 'Indonesian is set as the primary language.',
    'settings.langEnNote': 'English is set as the primary language.',
    'settings.alarmSound': 'Alarm Sound',
    'settings.alarmSoundDesc': 'Choose alarm tone',
    'settings.alarm1': '🔔 Alarm 1 - Gentle Chime',
    'settings.alarm2': '🔕 Alarm 2 - Classic Bell',
    'settings.alarm3': '🎵 Alarm 3 - Melody',
    'settings.alarm1Desc': '🔔 Gentle Chime — soft ascending tones',
    'settings.alarm2Desc': '🔕 Classic Bell — sharp classic bell',
    'settings.alarm3Desc': '🎵 Melody — musical melody',
    'settings.alarmTestNote': 'Use the volume slider above to test and adjust the sound',
    'settings.safeZoneTitle': 'Safe Zone Settings',
    'settings.safeZoneDesc': 'Safe Zone and Safe Radius are managed by your family through the Child/Family dashboard. Contact your family if you need to modify these settings.',
    'settings.preview': 'Preview:',
    'settings.previewText': 'This is how your text will appear.',
    'settings.previewSecondary': 'Secondary text content here.',

    // Home
    'home.title': 'Dashboard',
    'home.subtitle': 'Real-time location monitoring',
    'home.liveLocation': 'Live Location',
    'home.safeZoneActive': 'Safe Zone Active',
    'home.currentLocation': 'Current Location',
    'home.address': 'Address',
    'home.distance': 'Distance from Safe Zone',
    'home.meters': 'meters',
    'home.safeZone': 'Safe Zone',
    'home.zoneName': 'Zone Name',
    'home.home': 'Home',
    'home.radius': 'Radius',
    'home.status': 'Status',
    'home.safe': 'SAFE',
    'home.deviceBattery': 'Device Battery',
    'home.goodCondition': 'Good Condition',
    'home.needHelp': 'Need Help',
    'home.tapForHelp': 'Tap for immediate assistance',
    'home.needHelpBtn': 'NEED HELP',
    'home.loadingMap': 'Loading map...',

    // Out of Zone
    'ozone.title': 'Out of Safe Zone',
    'ozone.subtitle': 'You have moved outside the designated safe area',
    'ozone.outsideZone': 'Outside Safe Zone',
    'ozone.currentLocation': 'Current Location',
    'ozone.address': 'Address',
    'ozone.distance': 'Distance from Safe Zone',
    'ozone.safeZone': 'Safe Zone',
    'ozone.zoneName': 'Zone Name',
    'ozone.home': 'Home',
    'ozone.safeRadius': 'Safe Radius',
    'ozone.meters': 'meters',
    'ozone.ozoneStatus': 'OUT OF SAFE ZONE',
    'ozone.deviceBattery': 'Device Battery',
    'ozone.goodCondition': 'Good Condition',
    'ozone.needHelp': 'Need Help',
    'ozone.tapForHelp': 'Tap for immediate assistance',
    'ozone.needHelpBtn': 'NEED HELP',

    // Device Info
    'device.title': 'Device Information',
    'device.subtitle': 'Monitor your device status',
    'device.battery': 'Device Battery',
    'device.batteryDesc': 'Current charge level',
    'device.batteryLevel': 'Battery Level',
    'device.goodCondition': 'Good Condition',
    'device.lastUpdate': 'Last Update',
    'device.lastUpdateDesc': 'When data was synced',
    'device.lastUpdateLabel': 'Last Update',
    'device.realtimeSync': 'Real-time Sync',
    'device.status': 'Device Status',
    'device.statusDesc': 'Connection status',
    'device.active': 'Active',
    'device.connected': 'Connected',
    'device.infoNote': 'This device is connected to the Child/Family monitoring system.',

    // Emergency
    'emergency.help': 'HELP',
    'emergency.subtitle': 'Please help me contact my family',
    'emergency.photo': 'Photo of Elderly Person',
    'emergency.name': 'Name',
    'emergency.age': 'Age',
    'emergency.years': 'Years',
    'emergency.address': 'Home Address',
    'emergency.familyContact': 'Family Contact',
    'emergency.medicalNotes': 'Medical Notes',
    'emergency.dementia': 'Mild Dementia',
    'emergency.callFamily': 'CALL FAMILY',
    'emergency.findNote': 'If you find this person, please press the button above to contact their family.',
    'emergency.syncNote': 'Information is automatically synchronized with the SAPA system.',

    // Child Settings
    'child.settings.title': 'Settings',
    'child.settings.subtitle': 'Manage your monitoring preferences and account settings.',
    'child.settings.safeZone': 'Default Safe Zone',
    'child.settings.safeZoneDesc': 'Automatically updates the elderly user\'s safe zone.',
    'child.settings.notifications': 'Notifications',
    'child.settings.notificationsDesc': 'Control how you receive alerts.',
    'child.settings.enableNotif': 'Enable Notifications',
    'child.settings.enableNotifDesc': 'Receive push notifications for alerts.',
    'child.settings.alarmSound': 'Alarm Sound',
    'child.settings.alarmSoundDesc': 'Play a sound when an emergency alert arrives.',
    'child.settings.others': 'Others',
    'child.settings.othersDesc': 'Account and application settings.',
    'child.settings.about': 'About Application',
    'child.settings.aboutDesc': 'Information about SAPA',
    'child.settings.langNote': 'Indonesian is set as the primary language.',
    'child.settings.langEnNote': 'English is set as the primary language.',

    // Child Dashboard
    'child.dashboard.actions': 'Actions',
    'child.dashboard.emergencyMode': 'Emergency Mode',
    'child.dashboard.deactivateEmergency': 'Deactivate Emergency',
    'child.dashboard.directionToElderly': 'Direction to Elderly',
    'child.dashboard.latestNotif': 'Latest Notification',
    'child.dashboard.loading': 'Loading...',
    'child.dashboard.justNow': 'Just now',
    'child.dashboard.status.currentStatus': 'Current Status',
    'child.dashboard.status.safe': 'SAFE',
    'child.dashboard.status.outOfZone': 'OUT OF SAFE ZONE',
    'child.dashboard.distance.label': 'Distance from Safe Zone',
    'child.dashboard.distance.meters': 'meters',
    'child.dashboard.location.label': 'Current Location',
    'child.dashboard.location.updated': 'Updated: ',
    'child.dashboard.battery.label': 'Device Battery',

    // Child Notifications
    'child.notif.title': 'Notifications',
    'child.notif.subtitle': 'All activity from your elderly family member\'s device.',
    'child.notif.markAllRead': 'Mark all as read',
    'child.notif.all': 'All',
    'child.notif.emergency': 'Emergency',
    'child.notif.safe': 'Safe',
    'child.notif.information': 'Information',
    'child.notif.warning': 'Warning',
    'child.notif.noNotif': 'No notifications',
    'child.notif.emptyDesc': 'There are no {filter} notifications to display.',

    // Child Elderly Data
    'child.elderly.title': 'Elderly Data',
    'child.elderly.subtitle': 'Manage your elderly family member\'s profile information.',
    'child.elderly.autoSync': 'Auto-synced with Emergency Mode',
    'child.elderly.autoSyncDesc': 'Changes here are automatically reflected on the elderly user\'s Emergency Mode page.',
    'child.elderly.changePhoto': 'Change Photo',
    'child.elderly.name': 'Name',
    'child.elderly.age': 'Age',
    'child.elderly.years': 'Years',
    'child.elderly.homeAddress': 'Home Address',
    'child.elderly.familyContact': 'Family Contact Number',
    'child.elderly.medicalNotes': 'Medical Notes',
    'child.elderly.cancel': 'Cancel',
    'child.elderly.saveChanges': 'Save Changes',
    'child.elderly.editData': 'Edit Data',

    // Child Profile
    'child.profile.title': 'Profile',
    'child.profile.subtitle': 'View and manage your account information.',
    'child.profile.changePhoto': 'Change Photo',
    'child.profile.fullName': 'Full Name',
    'child.profile.homeAddress': 'Home Address',
    'child.profile.phoneNumber': 'Phone Number',
    'child.profile.emailAddress': 'Email Address',
    'child.profile.cancel': 'Cancel',
    'child.profile.saveChanges': 'Save Changes',
    'child.profile.editProfile': 'Edit Profile',
    'child.profile.logout': 'Logout',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && ['id', 'en'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
