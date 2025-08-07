import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPalette, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = ({ visible, onClose }) => {
  const { theme, themeName, setTheme, availableThemes } = useTheme();

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.backgroundPrimary }]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <FontAwesomeIcon 
                icon={faPalette} 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                Choose Theme
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesomeIcon 
                icon={faTimes} 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {Object.entries(availableThemes).map(([key, themeOption]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.themeOption,
                  { 
                    backgroundColor: themeName === key 
                      ? theme.colors.surface 
                      : theme.colors.backgroundSecondary,
                    borderColor: themeName === key 
                      ? theme.colors.primary 
                      : theme.colors.borderPrimary,
                  }
                ]}
                onPress={() => handleThemeSelect(key)}
                activeOpacity={0.7}
              >
                <View style={styles.themeInfo}>
                  <View style={styles.colorPreview}>
                    <View 
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: themeOption.colors.primary }
                      ]}
                    />
                    <View 
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: themeOption.colors.primaryLight }
                      ]}
                    />
                    <View 
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: themeOption.colors.surface }
                      ]}
                    />
                  </View>
                  <View style={styles.themeText}>
                    <Text style={[
                      styles.themeName,
                      { color: theme.colors.textPrimary }
                    ]}>
                      {themeOption.displayName}
                    </Text>
                    <Text style={[
                      styles.themeDescription,
                      { color: theme.colors.textSecondary }
                    ]}>
                      {key === 'green' ? 'Fresh and natural' : 'Elegant and modern'}
                    </Text>
                  </View>
                </View>
                {themeName === key && (
                  <FontAwesomeIcon 
                    icon={faCheck} 
                    size={20} 
                    color={theme.colors.primary} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 34,
    paddingHorizontal: 20,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorPreview: {
    flexDirection: 'row',
    marginRight: 16,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  themeText: {
    flex: 1,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  themeDescription: {
    fontSize: 14,
  },
});

export default ThemeSwitcher;