import { Redirect } from 'expo-router';

import { useLanguage } from '@/components/LanguageContext';

// This is the routing decision point for the app startup flow.
// It does not render the real UI; it redirects to the correct first screen.
export default function StartScreen() {
  const { hasSelectedLanguage, isReady } = useLanguage();

  // Wait until AsyncStorage has been checked before choosing a route.
  // This avoids briefly showing the language screen to returning users.
  if (!isReady) {
    return null;
  }

  // First launch -> language selection. Returning user -> main tab layout.
  return <Redirect href={hasSelectedLanguage ? '/(tabs)' : '/language'} />;
}
