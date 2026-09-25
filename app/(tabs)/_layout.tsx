import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '@/components/LanguageContext';
import { Colors } from '@/styles/designTokens';
import { tabBarStyles } from '@/styles/tabBarStyles';

// Defines the three main navigation destinations and their icons.
export default function TabLayout() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  // Include the device bottom inset inside the tab bar so it stays flush to the screen edge.
  const tabBarStyle = [
    tabBarStyles.tabBar,
    {
      height: 64 + insets.bottom,
      paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 8 : 10),
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Full-width white tab bar over the blue gradient; intentionally not rounded.
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle,
        tabBarLabelStyle: tabBarStyles.tabLabel,
        tabBarItemStyle: tabBarStyles.tabItem,
      }}>
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: t.home,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'house.fill', android: 'home', web: 'home' }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />

      {/* About */}
      <Tabs.Screen
        name="about"
        options={{
          title: t.about,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: t.settings,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
