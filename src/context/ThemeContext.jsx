import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { greenTheme, lavenderTheme } from '../theme';

// Available themes
const themes = {
  green: greenTheme,
  lavender: lavenderTheme,
};

// Theme context
const ThemeContext = createContext({
  theme: greenTheme,
  themeName: 'green',
  setTheme: () => {},
  availableThemes: themes,
});

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(greenTheme);
  const [themeName, setThemeName] = useState('green');

  // Load saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('selectedTheme');
        if (savedTheme && themes[savedTheme]) {
          setCurrentTheme(themes[savedTheme]);
          setThemeName(savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Function to switch themes
  const setTheme = async (newThemeName) => {
    if (themes[newThemeName]) {
      try {
        await AsyncStorage.setItem('selectedTheme', newThemeName);
        setCurrentTheme(themes[newThemeName]);
        setThemeName(newThemeName);
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
  };

  const value = {
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