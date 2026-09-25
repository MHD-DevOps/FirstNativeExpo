import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { BlueGradientScreen } from '@/components/BlueGradientScreen';
import { useLanguage } from '@/components/LanguageContext';
import { commonStyles } from '@/styles/commonStyles';

// About demonstrates another screen using the same shared language and design system.
export default function AboutScreen() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <BlueGradientScreen withTabBar>
      <StatusBar style="light" />
      <View style={commonStyles.centeredContent}>
        <View style={commonStyles.cardContent}>
          {/* These values update from the active translation object. */}
          <Text style={[commonStyles.title, isArabic && commonStyles.rtlText]}>
            {t.aboutTitle}
          </Text>
          <Text style={[commonStyles.body, isArabic && commonStyles.rtlText]}>
            {t.aboutText}
          </Text>
        </View>
      </View>
    </BlueGradientScreen>
  );
}

