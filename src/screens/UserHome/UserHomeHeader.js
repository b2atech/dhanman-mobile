import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
const TOP_EXTRA_PAD = 16;

const UserHomeHeader = ({
  name = 'John',
  unit = 'A-511',
  bellCount = 4,
  onBellPress,
  onProfilePress,
  style = {},
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  return (
    <SafeAreaView style={[{ backgroundColor: colors.backgroundTertiary }, style]}>
      <View style={[styles.headerContainer, { backgroundColor: colors.backgroundTertiary }]}>
        <TouchableOpacity onPress={onProfilePress} style={styles.avatarWrap} activeOpacity={0.7}>
          <FontAwesomeIcon icon={faUserCircle} size={38} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.textWrap}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>{name}</Text>
          <Text style={[styles.unit, { color: colors.textSecondary }]}>{unit}</Text>
        </View>
        <TouchableOpacity style={styles.bellContainer} onPress={onBellPress} activeOpacity={0.7}>
          <FontAwesomeIcon icon={faBell} size={26} color={colors.textPrimary} />
          {bellCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{bellCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    // Add enough top padding to avoid overlap with system bar
    paddingTop: STATUSBAR_HEIGHT + TOP_EXTRA_PAD,
    paddingBottom: 12,
  },
  avatarWrap: {
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 13,
    marginTop: 3,
    fontWeight: '400',
  },
  bellContainer: {
    marginLeft: 10,
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default UserHomeHeader;
