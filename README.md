# FirstExpoApp

A small Expo Router app with English/Arabic language support, RTL handling, shared styles, and three main tabs.

## Main structure

- `app/index.tsx` — decides first-launch language screen vs. the main app.
- `app/language.tsx` — first-launch language selection.
- `app/(tabs)/_layout.tsx` — Home/About/Settings bottom tab navigation.
- `app/(tabs)/index.tsx` — Home screen.
- `app/(tabs)/about.tsx` — About screen.
- `app/(tabs)/settings.tsx` — Settings screen with Language and App Version.
- `components/LanguageContext.tsx` — shared language state, persistence, and native RTL/LTR behavior.
- `components/BlueGradientScreen.tsx` — shared blue gradient background and safe-area handling.
- `styles/designTokens.ts` — central design tokens (colors, spacing, radius, typography, layout values).
- `styles/commonStyles.ts` — styles shared by multiple screens.
- `styles/tabBarStyles.ts` — bottom tab bar styling.

Unused Expo starter/template routes and components were removed so the project is focused on the actual app.

The app intentionally does not include a dark-theme system; all screens share the blue-gradient light visual design.
