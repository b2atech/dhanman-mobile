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
  isTablet,
  getResponsiveValue,
  getTabletValue,
} from '../utils/responsive';

// Color palette
export const colors = {
  primary: '#3B6FD6',
  primaryDark: '#2E5BC0',
  primaryLight: '#5B8FE6',
  secondary: '#FFD700',
  secondaryDark: '#E6C200',
  secondaryLight: '#FFE44D',

  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F7F7F7',
  backgroundTertiary: '#F0F0F0',

  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Border colors
  borderPrimary: '#E0E0E0',
  borderSecondary: '#CCCCCC',
  borderTertiary: '#DDDDDD',

  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

// Typography
export const typography = {
  // Font families
  fontFamily: {
    regular: 'Poppins-Regular',
    light: 'Poppins-ExtraLight',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },

  // Font sizes
  fontSize: {
    xs: fontSize.xs,
    sm: fontSize.sm,
    md: fontSize.md,
    lg: fontSize.lg,
    xl: fontSize.xl,
    xxl: fontSize.xxl,
    xxxl: fontSize.xxxl,
    title: fontSize.title,
    largeTitle: fontSize.largeTitle,
  },

  // Line heights
  lineHeight: {
    xs: lineHeight.xs,
    sm: lineHeight.sm,
    md: lineHeight.md,
    lg: lineHeight.lg,
    xl: lineHeight.xl,
    xxl: lineHeight.xxl,
    xxxl: lineHeight.xxxl,
    title: lineHeight.title,
    largeTitle: lineHeight.largeTitle,
  },

  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

// Spacing
export const spacingSystem = {
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  xxl: spacing.xxl,

  // Responsive padding
  padding: {
    horizontal: responsivePadding.horizontal,
    vertical: responsivePadding.vertical,
  },

  // Responsive margins
  margin: {
    horizontal: responsivePadding.horizontal,
    vertical: responsivePadding.vertical,
  },
};

// Layout
export const layout = {
  // Responsive widths
  width: responsiveWidth,

  // Responsive heights
  height: responsiveHeight,

  // Border radius
  borderRadius: {
    xs: borderRadius.xs,
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
    xl: borderRadius.xl,
    xxl: borderRadius.xxl,
    round: borderRadius.round,
  },

  // Shadows
  shadow: {
    small: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: colors.shadowDark,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

// Components
export const components = {
  // Button styles
  button: {
    height: {
      sm: buttonHeight.sm,
      md: buttonHeight.md,
      lg: buttonHeight.lg,
      xl: buttonHeight.xl,
    },
    padding: {
      horizontal: responsivePadding.horizontal.md,
      vertical: responsivePadding.vertical.sm,
    },
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
  },

  // Input styles
  input: {
    height: {
      sm: inputHeight.sm,
      md: inputHeight.md,
      lg: inputHeight.lg,
    },
    padding: {
      horizontal: responsivePadding.horizontal.sm,
      vertical: responsivePadding.vertical.xs,
    },
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    borderWidth: 1,
  },

  // Card styles
  card: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.backgroundPrimary,
    ...layout.shadow.small,
  },

  // Icon sizes
  icon: {
    xs: iconSize.xs,
    sm: iconSize.sm,
    md: iconSize.md,
    lg: iconSize.lg,
    xl: iconSize.xl,
    xxl: iconSize.xxl,
    xxxl: iconSize.xxxl,
  },
};

// Responsive breakpoints
export const breakpoints = {
  isSmallDevice: getResponsiveValue(true, false, false),
  isMediumDevice: getResponsiveValue(false, true, false),
  isLargeDevice: getResponsiveValue(false, false, true),
  isTablet: isTablet,
};

// Responsive helpers
export const responsive = {
  // Get responsive value based on device size
  getValue: getResponsiveValue,

  // Get tablet-specific value
  getTabletValue: getTabletValue,

  // Scale functions
  horizontalScale,
  verticalScale,
  fontScale,
};

// Theme object
export const theme = {
  colors,
  typography,
  spacing: spacingSystem,
  layout,
  components,
  breakpoints,
  responsive,
};

export default theme;
