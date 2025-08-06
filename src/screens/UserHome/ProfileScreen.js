import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  Animated,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faBell,
  faGlobe,
  faCreditCard,
  faHeart,
  faCog,
  faSignOutAlt,
  faChevronLeft,
  faHome,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const ProfileScreen = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState("unit");
  const [toggleAnimation] = useState(new Animated.Value(0));

  console.log("user1111", user);

  useEffect(() => {
    const loadSelectedTab = async () => {
      const storedTab = await AsyncStorage.getItem("selectedTab");
      if (storedTab) {
        setSelectedRole(storedTab);
        // Animate toggle to correct position based on stored role
        Animated.timing(toggleAnimation, {
          toValue: storedTab === "Gate" ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    };
    loadSelectedTab();
  }, []);

  const handleRoleChange = async (role) => {
    setSelectedRole(role);
    await AsyncStorage.setItem("selectedTab", role);
    
    // Animate toggle
    Animated.timing(toggleAnimation, {
      toValue: role === "Gate" ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    // Reset navigation to refresh the app with new role
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

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

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "This feature will be available soon!");
  };

  const handleNotifications = () => {
    Alert.alert("Notifications", "Manage your notification preferences here.");
  };

  const handleLanguage = () => {
    Alert.alert("Language", "Select your preferred language.");
  };

  const handleMyCard = () => {
    Alert.alert("My Card", "View your card information.");
  };

  const handleFavorites = () => {
    Alert.alert("Favorites", "View your favorite items.");
  };

  const handleSettings = () => {
    Alert.alert("Settings", "Manage your app settings.");
  };

  const menuItems = [
    {
      id: "1",
      name: "Edit profile",
      icon: faUser,
      onPress: handleEditProfile,
    },
    {
      id: "2",
      name: "Notifications",
      icon: faBell,
      onPress: handleNotifications,
    },
    {
      id: "3",
      name: "Language",
      icon: faGlobe,
      onPress: handleLanguage,
    },
    {
      id: "4",
      name: "My card",
      icon: faCreditCard,
      onPress: handleMyCard,
    },
    {
      id: "5",
      name: "Favorite",
      icon: faHeart,
      onPress: handleFavorites,
    },
    {
      id: "6",
      name: "Settings",
      icon: faCog,
      onPress: handleSettings,
    },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        <FontAwesomeIcon icon={item.icon} size={20} color="#666" style={styles.menuIcon} />
        <Text style={styles.menuText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleTranslateX = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 100], // Moves from left (Unit) to right (Gate) - adjusted for new width
  });

  const RoleToggle = () => (
    <View style={styles.roleToggleContainer}>
      <Text style={styles.roleToggleTitle}>Switch Role</Text>
      <View style={styles.toggleContainer}>
        <View style={styles.toggleBackground}>
          <Animated.View
            style={[
              styles.toggleSlider,
              {
                transform: [{ translateX: toggleTranslateX }],
              },
            ]}
          />
          <TouchableOpacity
            style={styles.toggleOption}
            onPress={() => handleRoleChange("unit")}
            activeOpacity={0.8}
          >
            <FontAwesomeIcon 
              icon={faHome} 
              size={16} 
              color={selectedRole === "unit" ? "#fff" : "#666"} 
            />
            <Text style={[
              styles.toggleOptionText,
              { color: selectedRole === "unit" ? "#fff" : "#666" }
            ]}>
              Unit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleOption}
            onPress={() => handleRoleChange("Gate")}
            activeOpacity={0.8}
          >
            <FontAwesomeIcon 
              icon={faShieldAlt} 
              size={16} 
              color={selectedRole === "Gate" ? "#fff" : "#666"} 
            />
            <Text style={[
              styles.toggleOptionText,
              { color: selectedRole === "Gate" ? "#fff" : "#666" }
            ]}>
              Gate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View> */}

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Information */}
        <View style={styles.profileSection}>
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require("../../assets/images/decent_user.png")
            }
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user?.name || "Test User"}</Text>
          <Text style={styles.userEmail}>
            {user?.email || "TestUser@gmail.com"}
          </Text>
        </View>

        {/* Role Toggle */}
        <RoleToggle />

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>

      {/* Logout Button - Fixed at bottom */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <FontAwesomeIcon icon={faSignOutAlt} size={18} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to the bottom to prevent content from going behind the logout button
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerSpacer: {
    width: 30,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  roleToggleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  roleToggleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  toggleContainer: {
    width: "100%",
    maxWidth: 200,
  },
  toggleBackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  toggleSlider: {
    position: "absolute",
    width: 98,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#8B5CF6",
    zIndex: 1,
    top: 2,
  },
  toggleOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 98,
    height: 46,
    borderRadius: 23,
    zIndex: 2,
  },
  toggleOptionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 5,
  },
  menuIcon: {
    marginRight: 15,
    width: 25,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  logoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 15,
    backgroundColor: "#fff", // Ensure it's on top of the scroll content
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android
  },
  logoutButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 8,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
