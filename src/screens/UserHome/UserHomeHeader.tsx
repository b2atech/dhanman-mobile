import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

type UserHomeHeaderProps = {
  name: string;
  bellCount?: number;
  onBellPress?: () => void;
  style?: object;
};

export default function UserHomeHeader({
  name,
  bellCount = 0,
  onBellPress,
  style = {},
}: UserHomeHeaderProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.row}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <TouchableOpacity style={styles.bellCircle} onPress={onBellPress}>
          <FontAwesomeIcon icon={faBell} size={22} color="#fff" />
          {bellCount > 0 && (
            <View style={styles.badge} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#38b7a7', // Match image color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.85,
  },
  nameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bellCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 1.2,
    borderColor: '#fff',
  },
});