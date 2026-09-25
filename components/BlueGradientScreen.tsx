import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Layout } from '@/styles/designTokens';

type BlueGradientScreenProps = {
  children: ReactNode;
  withTabBar?: boolean;
};

// Shared screen wrapper used by Home, About, Settings, and Language.
// It owns the background, safe-area padding, and decorative non-interactive shapes.
export function BlueGradientScreen({
  children,
  withTabBar = false,
}: BlueGradientScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={Colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View
        style={[
          styles.safeContent,
          {
            // Respect status bar/notch on top and home indicator/navigation area below.
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            paddingBottom: insets.bottom + (withTabBar ? Layout.tabBarClearance : 0),
          },
        ]}>
        {/* Decorative glows sit behind content and must never capture touches. */}
        <View style={[styles.glowTop, styles.nonInteractive]} />
        <View style={[styles.glowBottom, styles.nonInteractive]} />
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContent: {
    flex: 1,
  },
  glowTop: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    top: -90,
    right: -70,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  nonInteractive: {
    // Use the style property instead of the deprecated pointerEvents prop on Web.
    pointerEvents: 'none',
  },
  glowBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    bottom: -120,
    left: -90,
    backgroundColor: 'rgba(0,25,90,0.12)',
  },
});
