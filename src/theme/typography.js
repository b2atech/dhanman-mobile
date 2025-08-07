// Typography system using DM Sans/Inter for modern, readable text
export const typography = {
  fontFamily: {
    // Use system fonts that are available on both platforms
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  
  // Text styles for common use cases
  textStyles: {
    // Headers
    hero: {
      fontSize: 36,
      fontWeight: '700',
      lineHeight: 40,
    },
    h1: {
      fontSize: 30,
      fontWeight: '700',
      lineHeight: 36,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 28,
    },
    
    // Body text
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    body: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    
    // Subtle section titles (as per requirements)
    sectionTitle: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      // Color will be set by theme
    },
    
    // Interactive elements
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
    },
    
    // Labels and captions
    label: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
  },
};