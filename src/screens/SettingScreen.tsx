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
import { StackNavigationProp } from '@react-navigation/stack';
import Logger from '../utils/logger';

interface SettingsProps {
  navigation: StackNavigationProp<any>;
}

interface SettingOption {
  id: string;
  name: string;
  icon: any;
  subtitle?: string;
  onPress: () => void;
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext || {};
  const { theme, themeName } = useTheme();
  const { colors, components, spacing } = theme;
  const [themeSwitcherVisible, setThemeSwitcherVisible] = useState(false);

  const settingsOptions: SettingOption[] = [
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
          style: 'destructive',
          onPress: () => {
            Logger.userLogout();
            if (logout) {logout();}
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderSettingItem = ({ item }: { item: SettingOption }) => (
    <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.borderPrimary }]} onPress={item.onPress}>
      <View style={styles.settingIcon}>
        <FontAwesomeIcon icon={item.icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>{item.name}</Text>
        {item.subtitle && (
          <Text style={[styles.settingSubtitle, { color: colors.textTertiary }]}>{item.subtitle}</Text>
        )}
      </View>
      <FontAwesomeIcon icon={faCog} size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <Text style={[styles.headerText, { color: colors.textPrimary }]}>Settings</Text>

      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <ThemeSwitcher
        visible={themeSwitcherVisible}
        onClose={() => setThemeSwitcherVisible(false)}
      />
    </View>
  );
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default Settings;
