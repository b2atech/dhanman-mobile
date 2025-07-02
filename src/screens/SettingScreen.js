import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import commonStyles from "../commonStyles/commonStyles";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const { logout, setUserRole } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState("unit");

  const settingsOptions = [
    { id: "1", name: "Profile", onPress: () => navigation.navigate("Profile") },
    {
      id: "2",
      name: "Preferences",
      onPress: () => navigation.navigate("Preferences"),
    },
    { id: "3", name: "Logout", onPress: () => handleLogout() },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await logout();

            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleRoleChange = async (role) => {
    setSelectedRole(role);
    await AsyncStorage.setItem("userRole", role);
    setUserRole(role);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={item.onPress} style={styles.optionContainer}>
      <Text style={commonStyles.descriptionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const getStoredRole = async () => {
      const storedRole = await AsyncStorage.getItem("userRole");
      if (storedRole) {
        setSelectedRole(storedRole);
      }
    };
    getStoredRole();
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerBoldText}>Settings</Text>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  list: {
    paddingHorizontal: 20,
  },
  optionContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default Settings;
