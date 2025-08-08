import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPalette, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import commonStyles from '../commonStyles/commonStyles';
import PropTypes from 'prop-types';

const Settings = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { theme, themeName } = useTheme();
  const { colors, components, spacing } = theme;
  const [themeSwitcherVisible, setThemeSwitcherVisible] = useState(false);

  const settingsOptions = [
    {
      id: '1',
      name: 'Profile',
      icon: faUser,
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: '2',
      name: 'Theme',
      icon: faPalette,
      subtitle: `Current: ${theme.displayName}`,
      onPress: () => setThemeSwitcherVisible(true),
    },
    {
      id: '3',
      name: 'Logout',
      icon: faSignOutAlt,
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();

            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleRoleChange = async (role) => {
    // This function can be removed or kept for future use
  };

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.settingItem, {
        backgroundColor: colors.backgroundPrimary,
        borderBottomColor: colors.borderPrimary,
      }]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <FontAwesomeIcon
            icon={item.icon}
            size={20}
            color={colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.settingText, { color: colors.textPrimary }]}>
            {item.name}
          </Text>
          {item.subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
              {item.subtitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <Text style={[styles.headerText, { color: colors.textPrimary }]}>Settings</Text>
      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <ThemeSwitcher
        visible={themeSwitcherVisible}
        onClose={() => setThemeSwitcherVisible(false)}
      />
    </View>
  );
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  settingItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default Settings;
