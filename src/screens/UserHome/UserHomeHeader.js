import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
const TOP_EXTRA_PAD = 16;

const UserHomeHeader = ({
  name = 'John',
  unit = 'A-511',
  bellCount = 4,
  onBellPress,
  onProfilePress,
  style = {},
}) => (
  <SafeAreaView style={{ backgroundColor: '#F3EEFC' }}>
    <View style={[styles.headerContainer, style]}>
      <TouchableOpacity onPress={onProfilePress} style={styles.avatarWrap} activeOpacity={0.7}>
        <FontAwesomeIcon icon={faUserCircle} size={38} color="#D1D5DB" />
      </TouchableOpacity>
      <View style={styles.textWrap}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <TouchableOpacity style={styles.bellContainer} onPress={onBellPress} activeOpacity={0.7}>
        <FontAwesomeIcon icon={faBell} size={26} color="#22223B" />
        {bellCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{bellCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    // Add enough top padding to avoid overlap with system bar
    paddingTop: STATUSBAR_HEIGHT + TOP_EXTRA_PAD,
    paddingBottom: 12,
    backgroundColor: '#F3EEFC',
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
    color: '#22223B',
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 13,
    color: '#7C7D81',
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