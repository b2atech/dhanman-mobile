import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ProfileScreenOld = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('unit');

  useEffect(() => {
    const loadSelectedTab = async () => {
      const storedTab = await AsyncStorage.getItem('selectedTab');
      if (storedTab) {
        setSelectedRole(storedTab);
      }
    };
    loadSelectedTab();
  }, []);

  const handleRoleChange = async (role) => {
    setSelectedRole(role);
    await AsyncStorage.setItem('selectedTab', role);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature will be available soon!');
  };

  const handleChangeProfilePhoto = () => {
    Alert.alert('Edit Info', 'This feature will be available soon!');
  };

  const handleNotificationSettings = () => {
    Alert.alert(
      'Notification Settings',
      'Manage your notifications preferences here.'
    );
  };

  const settingsOptions = [
    {
      id: '1',
      name: 'Change Role',
      onPress: () => {},
      hasPicker: true,
    },
    {
      id: '2',
      name: 'Edit Info',
      onPress: handleChangeProfilePhoto,
      hasPicker: false,
    },
    {
      id: '3',
      name: 'Change Password',
      onPress: handleChangePassword,
      hasPicker: false,
    },
    {
      id: '4',
      name: 'Notification Settings',
      onPress: handleNotificationSettings,
      hasPicker: false,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.optionContainer}>
      <TouchableOpacity
        onPress={item.onPress}
        style={styles.optionTextContainer}
        activeOpacity={item.hasPicker ? 1 : 0.7}
      >
        <Text style={styles.optionText}>{item.name}</Text>
      </TouchableOpacity>
      {item.hasPicker && (
        <Picker
          selectedValue={selectedRole}
          onValueChange={handleRoleChange}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="User Home" value="unit" />
          <Picker.Item label="Gate Home" value="Gate" />
        </Picker>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  list: {
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    width: '100%',
  },
  optionTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
  picker: {
    width: 140,
    marginLeft: 10,
  },
});

export default ProfileScreenOld;
