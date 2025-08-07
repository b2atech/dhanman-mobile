import { Dimensions, PixelRatio, Platform } from 'react-native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (design reference - iPhone 11 Pro)
const baseWidth = 375;
const baseHeight = 812;

// Scale factor based on screen width
const scale = SCREEN_WIDTH / baseWidth;
const verticalScaleFactor = SCREEN_HEIGHT / baseHeight;

// Responsive scaling functions
export const horizontalScale = (size) => {
  return size * scale;
};

export const verticalScale = (size) => {
  return size * verticalScaleFactor;
};

export const moderateScale = (size, factor = 0.5) => {
  return size + (scale - 1) * factor;
};

// Font scaling with limits
export const fontScale = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Screen size breakpoints
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;
export const isTablet = SCREEN_WIDTH >= 768;

// Device orientation
export const isPortrait = SCREEN_HEIGHT > SCREEN_WIDTH;
export const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

// Responsive spacing
export const spacing = {
  xs: horizontalScale(4),
  sm: horizontalScale(8),
  md: horizontalScale(16),
  lg: horizontalScale(24),
  xl: horizontalScale(32),
  xxl: horizontalScale(48),
};

// Responsive font sizes
export const fontSize = {
  xs: fontScale(10),
  sm: fontScale(12),
  md: fontScale(14),
  lg: fontScale(16),
  xl: fontScale(18),
  xxl: fontScale(20),
  xxxl: fontScale(24),
  title: fontScale(28),
  largeTitle: fontScale(32),
};

// Responsive line heights
export const lineHeight = {
  xs: fontScale(14),
  sm: fontScale(16),
  md: fontScale(18),
  lg: fontScale(20),
  xl: fontScale(22),
  xxl: fontScale(24),
  xxxl: fontScale(28),
  title: fontScale(32),
  largeTitle: fontScale(36),
};

// Responsive border radius
export const borderRadius = {
  xs: horizontalScale(4),
  sm: horizontalScale(8),
  md: horizontalScale(12),
  lg: horizontalScale(16),
  xl: horizontalScale(20),
  xxl: horizontalScale(24),
  round: horizontalScale(50),
};

// Responsive icon sizes
export const iconSize = {
  xs: horizontalScale(12),
  sm: horizontalScale(16),
  md: horizontalScale(20),
  lg: horizontalScale(24),
  xl: horizontalScale(32),
  xxl: horizontalScale(40),
  xxxl: horizontalScale(48),
};

// Responsive button heights
export const buttonHeight = {
  sm: verticalScale(36),
  md: verticalScale(44),
  lg: verticalScale(52),
  xl: verticalScale(60),
};

// Responsive input heights
export const inputHeight = {
  sm: verticalScale(36),
  md: verticalScale(44),
  lg: verticalScale(52),
};

// Screen dimensions
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  scale,
  verticalScale,
};

// Utility function to get responsive value based on device size
export const getResponsiveValue = (small, medium, large) => {
  if (isSmallDevice) {return small;}
  if (isMediumDevice) {return medium;}
  return large;
};

// Utility function to get responsive value for tablets
export const getTabletValue = (phone, tablet) => {
  return isTablet ? tablet : phone;
};

// Responsive padding and margin helpers
export const responsivePadding = {
  horizontal: {
    xs: horizontalScale(8),
    sm: horizontalScale(16),
    md: horizontalScale(24),
    lg: horizontalScale(32),
    xl: horizontalScale(40),
  },
  vertical: {
    xs: verticalScale(8),
    sm: verticalScale(16),
    md: verticalScale(24),
    lg: verticalScale(32),
    xl: verticalScale(40),
  },
};

// Responsive width helpers
export const responsiveWidth = {
  full: '100%',
  half: '50%',
  third: '33.33%',
  quarter: '25%',
  xs: horizontalScale(60),
  sm: horizontalScale(120),
  md: horizontalScale(200),
  lg: horizontalScale(300),
  xl: horizontalScale(400),
};

// Responsive height helpers
export const responsiveHeight = {
  full: '100%',
  half: '50%',
  third: '33.33%',
  quarter: '25%',
  xs: verticalScale(60),
  sm: verticalScale(120),
  md: verticalScale(200),
  lg: verticalScale(300),
  xl: verticalScale(400),
};

export default {
  horizontalScale,
  verticalScale,
  moderateScale,
  fontScale,
  spacing,
  fontSize,
  lineHeight,
  borderRadius,
  iconSize,
  buttonHeight,
  inputHeight,
  screenDimensions,
  getResponsiveValue,
  getTabletValue,
  responsivePadding,
  responsiveWidth,
  responsiveHeight,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isTablet,
  isPortrait,
  isLandscape,
};
