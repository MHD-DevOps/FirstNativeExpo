import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import { BlueGradientScreen } from '@/components/BlueGradientScreen';
import { useLanguage } from '@/components/LanguageContext';
import { Colors, Radius, Spacing } from '@/styles/designTokens';
import { commonStyles } from '@/styles/commonStyles';

// Settings currently contains language selection and the app version.
// Keep future preferences in this screen as the app grows.
export default function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <BlueGradientScreen withTabBar>
      <StatusBar style="light" />
      <View style={commonStyles.content}>
        <View style={[commonStyles.cardContent, styles.card]}>
          <Text style={[commonStyles.title, isArabic && commonStyles.rtlText]}>
            {t.settingsTitle}
          </Text>

          <Text style={[commonStyles.body, styles.introText, isArabic && commonStyles.rtlText]}>
            {t.settingsText}
          </Text>

          <Text style={[styles.sectionTitle, isArabic && commonStyles.rtlText]}>
            {t.language}
          </Text>

          {/* Settings language changes request a native reload so RTL/LTR is applied globally. */}
          <Pressable
            onPress={() => setLanguage('en', { reload: true })}
            style={[styles.option, language === 'en' && styles.optionSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected: language === 'en' }}>
            <Text style={[styles.optionText, language === 'en' && styles.optionTextSelected]}>
              {t.english}
            </Text>
            {language === 'en' && <Text style={styles.check}>✓</Text>}
          </Pressable>

          <Pressable
            onPress={() => setLanguage('ar', { reload: true })}
            style={[styles.option, language === 'ar' && styles.optionSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected: language === 'ar' }}>
            <Text style={[styles.optionText, language === 'ar' && styles.optionTextSelected]}>
              {t.arabic}
            </Text>
            {language === 'ar' && <Text style={styles.check}>✓</Text>}
          </Pressable>

          {/* Read the version from Expo config so it stays synced with app.json. */}
          <View style={styles.versionRow}>
            <Text style={[styles.optionText, isArabic && commonStyles.rtlText]}>
              {t.appVersion}
            </Text>
            <Text style={styles.versionText}>
              {Constants.expoConfig?.version ?? '1.0.0'}
            </Text>
          </View>
        </View>
      </View>
    </BlueGradientScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.md,
  },
  introText: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  option: {
    minHeight: 58,
    borderRadius: Radius.medium,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  optionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  optionTextSelected: {
    color: Colors.primary,
  },
  versionRow: {
    minHeight: 58,
    borderRadius: Radius.medium,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
  },
  versionText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  check: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
});
