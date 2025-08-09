import {
  horizontalScale,
  verticalScale,
  fontScale,
  spacing,
  fontSize,
  lineHeight,
  borderRadius,
  buttonHeight,
  inputHeight,
  responsivePadding,
  responsiveWidth,
  responsiveHeight,
  iconSize,
} from '../utils/responsive';

// Resident Dashboard Color Palette - Lavender Mist Theme
export const residentColors = {
  // Primary - Lavender Mist
  primary: '#A78BFA',
  primaryLight: '#C4B5FD',
  primaryDark: '#8B5CF6',
  primaryUltraLight: '#EDE9FE',

  // Supporting Pastel Colors
  offWhite: '#FAFAFA',
  mutedGold: '#F3E8D3',
  goldAccent: '#E5D3A3',
  pastelMint: '#D1FAE5',
  mintAccent: '#A7F3D0',
  lighterNavy: '#4F46E5', // Instead of full black
  navyAccent: '#6366F1',

  // Soft Neutrals
  softGray: '#F8FAFC',
  lightGray: '#F1F5F9',
  mediumGray: '#E2E8F0',

  // Text colors (avoiding full black)
  textPrimary: '#334155', // Lighter navy for primary text
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  textAccent: '#6366F1',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#FAFAFA',
  backgroundTertiary: '#F8FAFC',
  backgroundGradientStart: '#FFFFFF',
  backgroundGradientEnd: '#F8FAFC',

  // Card backgrounds
  cardPrimary: '#FFFFFF',
  cardSecondary: '#FAFAFA',
  cardAccent: '#EDE9FE',

  // Status colors (soft versions)
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Border colors
  borderPrimary: '#E2E8F0',
  borderSecondary: '#CBD5E1',
  borderAccent: '#C4B5FD',

  // Shadow colors
  shadow: 'rgba(160, 139, 250, 0.08)', // Lavender shadow
  shadowMedium: 'rgba(160, 139, 250, 0.12)',
  shadowDark: 'rgba(160, 139, 250, 0.16)',
};

// Typography for minimal design
export const residentTypography = {
  fontFamily: {
    light: 'Poppins-ExtraLight',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },

  fontSize: {
    caption: fontSize.xs,
    body: fontSize.sm,
    subheading: fontSize.md,
    heading: fontSize.lg,
    title: fontSize.xl,
    largeTitle: fontSize.xxl,
    hero: fontSize.xxxl,
  },

  lineHeight: {
    caption: lineHeight.xs,
    body: lineHeight.sm,
    subheading: lineHeight.md,
    heading: lineHeight.lg,
    title: lineHeight.xl,
    largeTitle: lineHeight.xxl,
    hero: lineHeight.xxxl,
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

// Spacing system for generous whitespace
export const residentSpacing = {
  xs: spacing.xs * 0.75, // 6
  sm: spacing.sm, // 12
  md: spacing.md * 1.5, // 24
  lg: spacing.lg * 2, // 40
  xl: spacing.xl * 2.5, // 60
  xxl: spacing.xxl * 3, // 96

  // Generous padding for minimal design
  padding: {
    xs: spacing.xs,
    sm: spacing.sm * 1.5,
    md: spacing.md * 2,
    lg: spacing.lg * 2.5,
    xl: spacing.xl * 3,
  },

  // Large margins for spacious feel
  margin: {
    xs: spacing.xs,
    sm: spacing.sm * 1.5,
    md: spacing.md * 2,
    lg: spacing.lg * 2.5,
    xl: spacing.xl * 3,
  },
};

// Layout system for cards and components
export const residentLayout = {
  borderRadius: {
    xs: borderRadius.xs,
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg * 1.5, // 18
    xl: borderRadius.xl * 2, // 32
    xxl: borderRadius.xxl * 2, // 48
    round: 50,
  },

  shadows: {
    soft: {
      shadowColor: residentColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: residentColors.shadowMedium,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 4,
    },
    large: {
      shadowColor: residentColors.shadowDark,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

// Component styles for the dashboard
export const residentComponents = {
  // Card styles
  card: {
    padding: residentSpacing.md,
    borderRadius: residentLayout.borderRadius.lg,
    backgroundColor: residentColors.cardPrimary,
    ...residentLayout.shadows.soft,
    marginBottom: residentSpacing.md,
  },

  summaryCard: {
    padding: residentSpacing.lg,
    borderRadius: residentLayout.borderRadius.xl,
    backgroundColor: residentColors.cardPrimary,
    ...residentLayout.shadows.medium,
    marginBottom: residentSpacing.lg,
  },

  // Button styles
  button: {
    primary: {
      backgroundColor: residentColors.primary,
      paddingHorizontal: residentSpacing.lg,
      paddingVertical: residentSpacing.sm,
      borderRadius: residentLayout.borderRadius.lg,
      ...residentLayout.shadows.soft,
    },
    secondary: {
      backgroundColor: residentColors.offWhite,
      borderWidth: 1,
      borderColor: residentColors.borderAccent,
      paddingHorizontal: residentSpacing.lg,
      paddingVertical: residentSpacing.sm,
      borderRadius: residentLayout.borderRadius.lg,
    },
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: residentSpacing.xl,
    right: residentSpacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: residentColors.primary,
    ...residentLayout.shadows.large,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Avatar placeholder
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: residentColors.primaryUltraLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Icon styles
  icon: {
    small: iconSize.sm,
    medium: iconSize.md,
    large: iconSize.lg,
  },
};

// Gradient configurations
export const residentGradients = {
  background: {
    colors: [residentColors.backgroundGradientStart, residentColors.backgroundGradientEnd],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  card: {
    colors: [residentColors.cardPrimary, residentColors.offWhite],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  accent: {
    colors: [residentColors.primaryUltraLight, residentColors.primaryLight],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
};

// Complete theme object
export const residentTheme = {
  name: 'resident',
  displayName: 'Resident',
  colors: residentColors,
  typography: residentTypography,
  spacing: residentSpacing,
  layout: residentLayout,
  components: residentComponents,
  gradients: residentGradients,
};

export default residentTheme;
