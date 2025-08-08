// Sigma theme color palette - comprehensive variable-based color system
// Modern tech-inspired blue/cyan theme with full shade ranges

export const sigmaPalette = {
  // Primary colors (50–950) - Modern blue/tech theme
  primary50: '#EFF6FF',
  primary100: '#DBEAFE',
  primary200: '#BFDBFE',
  primary300: '#93C5FD',
  primary400: '#60A5FA',
  primary500: '#3B82F6', // Main primary
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
  secondary500: '#06B6D4', // Main secondary
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
  success500: '#22C55E', // Main success
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
  warning500: '#F59E0B', // Main warning
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
  danger500: '#EF4444', // Main danger
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
  gradientH01: '#3B82F6', // Primary start
  gradientH02: '#06B6D4', // Primary to secondary
  gradientH03: '#1D4ED8', // Deeper primary start
  gradientH04: '#0891B2', // Deeper secondary end
  gradientH05: '#60A5FA', // Light primary start
  gradientH06: '#22D3EE', // Light secondary end

  // Vertical gradients
  gradientV01: '#EFF6FF', // Light primary start
  gradientV02: '#3B82F6', // To main primary
  gradientV03: '#ECFEFF', // Light secondary start
  gradientV04: '#06B6D4', // To main secondary
  gradientV05: '#DBEAFE', // Medium light start
  gradientV06: '#1E40AF', // To deep primary

  // Bi-directional gradients (diagonal/radial)
  gradientB01: '#3B82F6', // Primary diagonal start
  gradientB02: '#06B6D4', // Secondary diagonal end
  gradientB03: '#1D4ED8', // Deep primary radial center
  gradientB04: '#EFF6FF', // Light primary radial edge
  gradientB05: '#2563EB', // Medium primary start
  gradientB06: '#0E7490', // Medium secondary end
  gradientB07: '#60A5FA', // Light primary multi-stop
  gradientB08: '#22D3EE', // Light secondary multi-stop
  gradientB09: '#1E3A8A', // Dark primary accent
  gradientB10: '#164E63', // Dark secondary accent

  // Theme-specific mappings for consistency with existing architecture
  primary: '#3B82F6',           // Maps to primary500
  primaryLight: '#60A5FA',      // Maps to primary400
  primaryDark: '#1D4ED8',       // Maps to primary700
  primaryUltraLight: '#EFF6FF', // Maps to primary50

  secondary: '#06B6D4',         // Maps to secondary500
  accent: '#22D3EE',           // Maps to secondary400
  surface: '#F0F9FF',          // Light blue surface

  // Text colors
  textPrimary: '#1E3A8A',      // Maps to primary900
  textSecondary: '#1D4ED8',    // Maps to primary700
  textTertiary: '#64748B',     // Maps to dark500
  textInverse: '#FFFFFF',      // Maps to light950

  // Background colors
  backgroundPrimary: '#FFFFFF',  // Maps to light950
  backgroundSecondary: '#F8FAFC', // Maps to dark50
  backgroundTertiary: '#F0F9FF', // Light blue background

  // Border colors
  borderPrimary: '#DBEAFE',     // Maps to primary100
  borderSecondary: '#93C5FD',   // Maps to primary300
  borderAccent: '#60A5FA',      // Maps to primary400

  // Shadow color
  shadow: 'rgba(59, 130, 246, 0.1)', // Primary with opacity
};
