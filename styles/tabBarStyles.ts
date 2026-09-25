import { StyleSheet } from 'react-native';

import { Colors, Layout, Typography } from './designTokens';

// Full-width tab bar. It is intentionally rectangular rather than a floating rounded pill.
export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Layout.tabBarHeight,
    paddingTop: 5,
    paddingHorizontal: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.55)',
    borderRadius: 0,
    backgroundColor: Colors.tabBackground,
    boxShadow: '0px -6px 14px rgba(0, 26, 74, 0.16)',
    elevation: 8,
  },
  tabLabel: {
    ...Typography.tabLabel,
    marginBottom: 2,
  },
  tabItem: {
    paddingVertical: 2,
  },
});
