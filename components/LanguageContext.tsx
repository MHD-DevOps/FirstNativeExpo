import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, I18nManager } from 'react-native';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'ar';

// Single storage key used to remember the user's language between app launches.
const LANGUAGE_STORAGE_KEY = '@firstexpoapp/language';

type Translations = {
  home: string;
  about: string;
  settings: string;
  homeTitle: string;
  homeText: string;
  aboutTitle: string;
  aboutText: string;
  settingsTitle: string;
  settingsText: string;
  language: string;
  chooseLanguage: string;
  chooseLanguageText: string;
  continue: string;
  english: string;
  arabic: string;
  selected: string;
  appVersion: string;
};

// Keep all user-facing copy in one object so screens never hard-code translated text.
const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    about: 'About',
    settings: 'Settings',
    homeTitle: 'Welcome Home',
    homeText: 'This is the home page of your Expo app.',
    aboutTitle: 'About',
    aboutText: 'This simple app supports English and Arabic.',
    settingsTitle: 'Settings',
    settingsText: 'Choose your app language. Your choice will be saved.',
    language: 'Language',
    chooseLanguage: 'Choose your language',
    chooseLanguageText: 'You can change this later from Settings.',
    continue: 'Continue',
    english: 'English',
    arabic: 'Arabic',
    selected: 'Selected',
    appVersion: 'App Version',
  },
  ar: {
    home: 'الرئيسية',
    about: 'حول التطبيق',
    settings: 'الإعدادات',
    homeTitle: 'مرحباً بك',
    homeText: 'هذه هي الصفحة الرئيسية لتطبيق Expo الخاص بك.',
    aboutTitle: 'حول التطبيق',
    aboutText: 'هذا التطبيق البسيط يدعم اللغتين العربية والإنجليزية.',
    settingsTitle: 'الإعدادات',
    settingsText: 'اختر لغة التطبيق. سيتم حفظ اختيارك.',
    language: 'اللغة',
    chooseLanguage: 'اختر لغة التطبيق',
    chooseLanguageText: 'يمكنك تغييرها لاحقاً من الإعدادات.',
    continue: 'متابعة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    selected: 'محددة',
    appVersion: 'إصدار التطبيق',
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language, options?: { reload?: boolean }) => Promise<void>;
  t: Translations;
  isReady: boolean;
  hasSelectedLanguage: boolean;
};

// Context makes one shared language state available to every screen below the provider.
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  children,
  onReady,
}: {
  children: React.ReactNode;
  onReady?: () => void;
}) {
  // English is the default language before the user makes a choice.
  const [language, setLanguageState] = useState<Language>('en');
  const [isReady, setIsReady] = useState(false);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Read the persisted language once when the provider mounts.
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (!mounted) return;

        if (savedLanguage === 'en' || savedLanguage === 'ar') {
          setLanguageState(savedLanguage);
          setHasSelectedLanguage(true);
        }
      } finally {
        if (mounted) {
          setIsReady(true);
          onReady?.();
        }
      }
    };

    loadLanguage();

    return () => {
      mounted = false;
    };
  }, [onReady]);

  const setLanguage = useCallback(async (
    nextLanguage: Language,
    options: { reload?: boolean } = {}
  ) => {
    // reload defaults to true because changing native RTL/LTR needs a fresh app tree.
    // First-launch selection passes reload:false so the choice feels immediate.
    const shouldReload = options.reload !== false;

    // Update React state first so translations change immediately.
    setLanguageState(nextLanguage);
    setHasSelectedLanguage(true);
    // Persist before any reload so the next app start can restore the same language.
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);

    if (!shouldReload) return;

    // I18nManager controls the native app's global LTR/RTL layout direction.
    // Its changes take effect after an app reload, so persist the choice first.
    if (Platform.OS !== 'web') {
      // Arabic uses the native right-to-left layout direction; English uses LTR.
      const shouldUseRTL = nextLanguage === 'ar';
      I18nManager.allowRTL(shouldUseRTL);
      I18nManager.forceRTL(shouldUseRTL);

      try {
        const Updates = await import('expo-updates');
        await Updates.reloadAsync();
      } catch {
        // Expo Go/development environments can have limited Updates API support.
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
      isReady,
      hasSelectedLanguage,
    }),
    [language, isReady, hasSelectedLanguage, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Small hook so screens can access the current language, translations, and setter.
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
