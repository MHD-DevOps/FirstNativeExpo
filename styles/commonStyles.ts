import { StyleSheet } from 'react-native';

import { Colors, Layout, Radius, Spacing, Typography } from './designTokens';

// Shared screen styles. Pages should focus on content and behavior, not repeated design tokens.
export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.contentHorizontalPadding,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.contentHorizontalPadding,
  },
  cardContent: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.glass,
  },
  title: {
    color: Colors.textPrimary,
    ...Typography.title,
  },
  body: {
    color: Colors.textSecondary,
    ...Typography.body,
  },
  rtlText: {
    writingDirection: 'rtl',
    textAlign: 'right',
  },
});
