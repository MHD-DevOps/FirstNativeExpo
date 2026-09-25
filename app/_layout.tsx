import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { LanguageProvider, useLanguage } from '@/components/LanguageContext';

export { ErrorBoundary } from 'expo-router';

// Expo Router starts from app/index.tsx, which decides between first launch and the app.
export const unstable_settings = {
  initialRouteName: 'index',
};

// Keep the native splash visible until the saved language has been loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [languageReady, setLanguageReady] = useState(false);

  // LanguageProvider calls this after AsyncStorage finishes loading the saved language.
  const markLanguageReady = useCallback(() => {
    setLanguageReady(true);
  }, []);

  useEffect(() => {
    if (languageReady) {
      SplashScreen.hideAsync();
    }
  }, [languageReady]);

  return (
    <SafeAreaProvider>
      <LanguageProvider onReady={markLanguageReady}>
        <RootLayoutNav />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const { language } = useLanguage();

  // Web uses the HTML dir attribute because I18nManager is a native iOS/Android API.
  const webDirectionProps =
    Platform.OS === 'web'
      ? ({ dir: language === 'ar' ? 'rtl' : 'ltr' } as const)
      : undefined;

  return (
    <View style={{ flex: 1 }} {...webDirectionProps}>
      <StatusBar style="light" />

      <Stack>
        {/* Startup route: first launch -> language screen, returning user -> tabs. */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* First-launch language selection screen. */}
        <Stack.Screen name="language" options={{ headerShown: false }} />

        {/* Main application tabs: Home, About, Settings. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
