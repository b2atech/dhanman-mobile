import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base spacing unit
const SPACING_UNIT = 4;

// Spacing system with consistent values
export const spacing = {
  xs: SPACING_UNIT,      // 4
  sm: SPACING_UNIT * 2,  // 8
  md: SPACING_UNIT * 3,  // 12
  lg: SPACING_UNIT * 4,  // 16
  xl: SPACING_UNIT * 5,  // 20
  '2xl': SPACING_UNIT * 6, // 24
  '3xl': SPACING_UNIT * 8, // 32
  '4xl': SPACING_UNIT * 10, // 40
  '5xl': SPACING_UNIT * 12, // 48
  '6xl': SPACING_UNIT * 16, // 64
};

// Grid system for consistent alignment
export const grid = {
  // Horizontal padding for content alignment
  horizontalPadding: spacing.lg, // 16
  contentMaxWidth: screenWidth - (spacing.lg * 2), // Full width minus padding

  // Card spacing
  cardHorizontalMargin: spacing.lg, // 16
  cardVerticalMargin: spacing.md, // 12
  cardPadding: spacing.lg, // 16

  // Section spacing
  sectionSpacing: spacing['2xl'], // 24
  sectionHeaderSpacing: spacing.md, // 12
};

// Layout dimensions
export const layout = {
  // Screen dimensions
  screenWidth,
  screenHeight,

  // Component dimensions
  headerHeight: 60,
  tabBarHeight: 60,
  fabSize: 56,

  // Border radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },

  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  },

  // Shadow elevations
  elevation: {
    sm: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    xl: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};
