// Central visual tokens used by the whole app.
// This project intentionally uses one light visual theme: blue gradient + white content.

export const Colors = {
  gradient: ['#0B3C91', '#1976D2', '#63B3ED'] as const,
  primary: '#2563EB',
  primaryDeep: '#0B3C91',
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.88)',
  textMuted: 'rgba(255,255,255,0.72)',
  glass: 'rgba(255,255,255,0.12)',
  glassStrong: 'rgba(255,255,255,0.18)',
  border: 'rgba(255,255,255,0.24)',
  tabBackground: 'rgba(255,255,255,0.96)',
  tabInactive: '#7B8CA8',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Radius = {
  small: 12,
  medium: 16,
  large: 24,
  pill: 999,
};

export const Typography = {
  title: {
    fontSize: 30,
    fontWeight: '800' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
};

export const Layout = {
  contentHorizontalPadding: 24,
  tabBarHeight: 64,
  tabBarClearance: 82,
};
