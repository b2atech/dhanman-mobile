import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { greenTheme, lavenderTheme, sigmaTheme } from '../theme';
import Logger from '../utils/logger';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { greenTheme, lavenderTheme, sigmaTheme } from '../theme';
import { ComponentStyles, GradientStyles } from '../theme/components';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';
import Logger from '../utils/logger';

// Types
interface Theme {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark?: string;
    primaryUltraLight: string;
    secondary: string;
    accent: string;
    surface: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;
    borderPrimary: string;
    borderSecondary: string;
    borderAccent: string;
    shadow: string;
    [key: string]: string | undefined;
  };
  typography: typeof typography;
  spacing: typeof spacing;
  layout: typeof layout;
  components: ComponentStyles;
  gradients: GradientStyles;
}

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: string) => Promise<void>;
  availableThemes: Record<string, Theme>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// Available themes
const themes: Record<string, Theme> = {
  green: greenTheme,
  lavender: lavenderTheme,
  sigma: sigmaTheme,
};

// Theme context
const ThemeContext = createContext<ThemeContextType>({
  theme: greenTheme,
  themeName: 'green',
  setTheme: async () => {},
  availableThemes: themes,
});

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(greenTheme);
  const [themeName, setThemeName] = useState<string>('green');

  // Load saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        Logger.debug('Loading saved theme');
        const savedTheme = await AsyncStorage.getItem('selectedTheme');
        if (savedTheme && themes[savedTheme]) {
          setCurrentTheme(themes[savedTheme]);
          setThemeName(savedTheme);
          Logger.info('Theme loaded successfully', { theme: savedTheme });
        } else {
          Logger.debug('No saved theme found, using default');
        }
      } catch (error) {
        Logger.error('Error loading theme', error);
      }
    };
    loadTheme();
  }, []);

  // Function to switch themes
  const setTheme = async (newThemeName: string): Promise<void> => {
    if (themes[newThemeName]) {
      try {
        Logger.debug('Saving new theme', { theme: newThemeName });
        await AsyncStorage.setItem('selectedTheme', newThemeName);
        setCurrentTheme(themes[newThemeName]);
        setThemeName(newThemeName);
        Logger.info('Theme saved successfully', { theme: newThemeName });
      } catch (error) {
        Logger.error('Error saving theme', error, { theme: newThemeName });
      }
    } else {
      Logger.warn('Invalid theme name provided', { theme: newThemeName });
    }
  };

  const value: ThemeContextType = {
    theme: currentTheme,
    themeName,
    setTheme,
    availableThemes: themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
