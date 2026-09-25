import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BlueGradientScreen } from '@/components/BlueGradientScreen';
import { useLanguage } from '@/components/LanguageContext';

// First-launch language selection screen.
// The user can switch the visible language here without reloading the app.
export default function LanguageScreen() {
  const { language, setLanguage, t } = useLanguage();
  const isArabic = language === 'ar';

  const handleContinue = async () => {
    // First launch intentionally uses reload:false. We want the language choice
    // to update the screen immediately, then navigate to the main app.
    await setLanguage(language, { reload: false });
    router.replace('/(tabs)');
  };

  return (
    <BlueGradientScreen>
      <View style={styles.content}>
        {/* Simple app mark used while we are still defining the final branding. */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>EX</Text>
        </View>

        {/* Translation values come from LanguageContext, so they update live. */}
        <Text style={[styles.title, isArabic && styles.rtl]}>{t.chooseLanguage}</Text>
        <Text style={[styles.subtitle, isArabic && styles.rtl]}>{t.chooseLanguageText}</Text>

        <View style={styles.languageOptions}>
          <LanguageButton
            label="English"
            selected={language === 'en'}
            onPress={() => setLanguage('en', { reload: false })}
          />
          <LanguageButton
            label="العربية"
            selected={language === 'ar'}
            onPress={() => setLanguage('ar', { reload: false })}
          />
        </View>

        <Pressable onPress={handleContinue} style={styles.continueButton}>
          <Text style={styles.continueText}>{t.continue}</Text>
        </Pressable>
      </View>
    </BlueGradientScreen>
  );
}

// Reusable button for each language option.
// Keeping it separate makes the main screen easier to read and extend later.
function LanguageButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void | Promise<void>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.languageButton, selected && styles.languageButtonSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}>
      <Text style={[styles.languageButtonText, selected && styles.languageButtonTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    marginBottom: 24,
  },
  logoText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '800',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 23,
    marginBottom: 28,
  },
  languageOptions: {
    width: '100%',
    maxWidth: 360,
    gap: 12,
  },
  languageButton: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.11)',
    alignItems: 'center',
  },
  languageButtonSelected: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  languageButtonTextSelected: {
    color: '#0B3C91',
  },
  continueButton: {
    marginTop: 18,
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    backgroundColor: '#072E73',
  },
  continueText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  // Used for Arabic text alignment. Global native RTL is controlled separately.
  rtl: {
    writingDirection: 'rtl',
  },
});
