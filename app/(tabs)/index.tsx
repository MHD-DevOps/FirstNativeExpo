import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { BlueGradientScreen } from '@/components/BlueGradientScreen';
import { useLanguage } from '@/components/LanguageContext';
import { Colors, Radius, Spacing } from '@/styles/designTokens';
import { commonStyles } from '@/styles/commonStyles';

// Home is the main tab. Keep the screen simple until real app content is added.
export default function HomeScreen() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <BlueGradientScreen withTabBar>
      <StatusBar style="light" />
      <View style={commonStyles.centeredContent}>
        {/* Small visual anchor. Replace with the real brand mark later. */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>EXPO</Text>
        </View>

        {/* All visible copy comes from the active language translation. */}
        <Text style={[commonStyles.title, isArabic && commonStyles.rtlText]}>
          {t.homeTitle}
        </Text>
        <Text style={[commonStyles.body, isArabic && commonStyles.rtlText]}>
          {t.homeText}
        </Text>
      </View>
    </BlueGradientScreen>
  );
}

const styles = StyleSheet.create({
  // Home-only styling; shared tokens stay in the styles/ folder.
  badge: {
    minWidth: 76,
    paddingHorizontal: Spacing.md + 2,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.glassStrong,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
});
