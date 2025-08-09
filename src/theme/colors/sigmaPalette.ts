// Base color system for both themes
export const baseColors = {
  // System colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Gray scale
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',

  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
};

// Green theme colors
export const greenPalette = {
  // Primary greens
  primary: '#059669',
  primaryLight: '#34D399',
  primaryDark: '#047857',
  primaryUltraLight: '#ECFDF5',

  // Supporting colors
  secondary: '#10B981',
  accent: '#6EE7B7',
  surface: '#F0FDF4',

  // Text colors
  textPrimary: '#065F46',
  textSecondary: '#047857',
  textTertiary: '#6B7280',
  textInverse: '#FFFFFF',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F0FDF4',

  // Border colors
  borderPrimary: '#D1FAE5',
  borderSecondary: '#A7F3D0',
  borderAccent: '#6EE7B7',

  // Shadow color
  shadow: 'rgba(5, 150, 105, 0.1)',

  // Chart Colors
  chartPrimary: '#059669',
  chartSecondary: '#10B981',
  chartPalette: [
    '#059669', // primary green
    '#10B981', // secondary green
    '#34D399', // light green
    '#6EE7B7', // accent green
    '#4eaeff', // blue (optional, for variety in charts)
    '#ffc700', // yellow
    '#ee6b7e', // pink
    '#9a6aff', // purple
    '#60e2e0', // teal
    '#f8923b', // orange
    '#72c6a8', // mint
    '#e8b8b7', // light pink
    '#a6d2ff', // light blue
  ],
};

// Lavender theme colors
export const lavenderPalette = {
  // Primary lavenders
  primary: '#A78BFA',
  primaryLight: '#C4B5FD',
  primaryDark: '#8B5CF6',
  primaryUltraLight: '#EDE9FE',

  // Supporting colors
  secondary: '#7B61FF',
  accent: '#DDD6FE',
  surface: '#F3EEFC',

  // Text colors
  textPrimary: '#5B21B6',
  textSecondary: '#7C3AED',
  textTertiary: '#6B7280',
  textInverse: '#FFFFFF',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3EEFC',

  // Border colors
  borderPrimary: '#EDE9FE',
  borderSecondary: '#DDD6FE',
  borderAccent: '#C4B5FD',

  // Shadow color
  shadow: 'rgba(167, 139, 250, 0.1)',

  // Chart Colors
  chartPrimary: '#A78BFA',
  chartSecondary: '#7B61FF',
  chartPalette: [
    '#A78BFA', // primary lavender
    '#7B61FF', // secondary lavender
    '#C4B5FD', // light lavender
    '#DDD6FE', // accent lavender
    '#8B5CF6', // dark lavender
    '#F8923B', // orange
    '#EE6B7E', // pink
    '#60E2E0', // teal
    '#FFC700', // yellow
    '#A6D2FF', // light blue
    '#E8B8B7', // light pink
    '#72C6A8', // mint
    '#9A6AFF', // purple
  ],
};

// Sigma theme colors
export const sigmaPalette = {
  // Primary colors (50–950) - Modern blue/tech theme
  primary50: '#EFF6FF',
  primary100: '#DBEAFE',
  primary200: '#BFDBFE',
  primary300: '#93C5FD',
  primary400: '#60A5FA',
  primary500: '#3B82F6',
  primary600: '#2563EB',
  primary700: '#1D4ED8',
  primary800: '#1E40AF',
  primary900: '#1E3A8A',
  primary950: '#172554',

  // Secondary colors (50–950) - Complementary cyan/teal
  secondary50: '#ECFEFF',
  secondary100: '#CFFAFE',
  secondary200: '#A5F3FC',
  secondary300: '#67E8F9',
  secondary400: '#22D3EE',
  secondary500: '#06B6D4',
  secondary600: '#0891B2',
  secondary700: '#0E7490',
  secondary800: '#155E75',
  secondary900: '#164E63',
  secondary950: '#083344',

  // Success colors (50–950) - Green variants
  success50: '#F0FDF4',
  success100: '#DCFCE7',
  success200: '#BBF7D0',
  success300: '#86EFAC',
  success400: '#4ADE80',
  success500: '#22C55E',
  success600: '#16A34A',
  success700: '#15803D',
  success800: '#166534',
  success900: '#14532D',
  success950: '#052E16',

  // Warning colors (50–950) - Amber/orange variants
  warning50: '#FFFBEB',
  warning100: '#FEF3C7',
  warning200: '#FDE68A',
  warning300: '#FCD34D',
  warning400: '#FBBF24',
  warning500: '#F59E0B',
  warning600: '#D97706',
  warning700: '#B45309',
  warning800: '#92400E',
  warning900: '#78350F',
  warning950: '#451A03',

  // Danger colors (50–950) - Red variants
  danger50: '#FEF2F2',
  danger100: '#FEE2E2',
  danger200: '#FECACA',
  danger300: '#FCA5A5',
  danger400: '#F87171',
  danger500: '#EF4444',
  danger600: '#DC2626',
  danger700: '#B91C1C',
  danger800: '#991B1B',
  danger900: '#7F1D1D',
  danger950: '#450A0A',

  // Dark colors (50–950) - Gray/slate variants for dark mode
  dark50: '#F8FAFC',
  dark100: '#F1F5F9',
  dark200: '#E2E8F0',
  dark300: '#CBD5E1',
  dark400: '#94A3B8',
  dark500: '#64748B',
  dark600: '#475569',
  dark700: '#334155',
  dark800: '#1E293B',
  dark900: '#0F172A',
  dark950: '#020617',

  // Light colors (900, 950) - Light variants for contrast
  light900: '#F9FAFB',
  light950: '#FFFFFF',

  // Horizontal gradients
  gradientH01: '#3B82F6',
  gradientH02: '#06B6D4',
  gradientH03: '#1D4ED8',
  gradientH04: '#0891B2',
  gradientH05: '#60A5FA',
  gradientH06: '#22D3EE',

  // Vertical gradients
  gradientV01: '#EFF6FF',
  gradientV02: '#3B82F6',
  gradientV03: '#ECFEFF',
  gradientV04: '#06B6D4',
  gradientV05: '#DBEAFE',
  gradientV06: '#1E40AF',

  // Bi-directional gradients (diagonal/radial)
  gradientB01: '#3B82F6',
  gradientB02: '#06B6D4',
  gradientB03: '#1D4ED8',
  gradientB04: '#EFF6FF',
  gradientB05: '#2563EB',
  gradientB06: '#0E7490',
  gradientB07: '#60A5FA',
  gradientB08: '#22D3EE',
  gradientB09: '#1E3A8A',
  gradientB10: '#164E63',

  // Theme-specific mappings for consistency with existing architecture
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#1D4ED8',
  primaryUltraLight: '#EFF6FF',

  secondary: '#06B6D4',
  accent: '#22D3EE',
  surface: '#F0F9FF',

  // Text colors
  textPrimary: '#1E3A8A',
  textSecondary: '#1D4ED8',
  textTertiary: '#64748B',
  textInverse: '#FFFFFF',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundTertiary: '#F0F9FF',

  // Border colors
  borderPrimary: '#DBEAFE',
  borderSecondary: '#93C5FD',
  borderAccent: '#60A5FA',

  // Shadow color
  shadow: 'rgba(59, 130, 246, 0.1)',

  // Chart Colors
  chartPrimary: '#3B82F6',
  chartSecondary: '#06B6D4',
  chartPalette: [
    '#3B82F6', // primary blue
    '#06B6D4', // secondary cyan
    '#60A5FA', // light blue
    '#22D3EE', // accent cyan
    '#2563EB', // deep blue
    '#0891B2', // deep cyan
    '#F59E0B', // amber
    '#EF4444', // red
    '#22C55E', // green
    '#64748B', // slate
    '#FBBF24', // yellow
    '#FCA5A5', // pink
    '#A5F3FC', // light teal
    '#8B5CF6', // purple
  ],
};