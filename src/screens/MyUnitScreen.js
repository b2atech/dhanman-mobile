import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import commonStyles from "../commonStyles/commonStyles";
import { useNavigation } from "@react-navigation/native";

// Household items with hasData flag
const householdItems = [
  {
    id: "1",
    title: "Family",
    icon: "users",
    subtitle: "1 member",
    hasData: true,
  },
  { id: "2", title: "Visitors", icon: "users", subtitle: "", hasData: true },
  {
    id: "3",
    title: "Daily Help",
    icon: "handshake-o",
    subtitle: "",
    hasData: true,
  },
  {
    id: "4",
    title: "Vehicles",
    icon: "car",
    subtitle: "KA01MG7444",
    hasData: true,
  },
  { id: "5", title: "Pets", icon: "paw", subtitle: "+ Add", hasData: false },
];

const defaultIcon = require("../assets/images/decent_user.png");

const MyUnitScreen = () => {
  const navigation = useNavigation();
  const handleNavigation = (item) => {
    switch (item.title) {
      case "Visitors":
        navigation.navigate("VisitorsList");
        break;
      case "Family":
        navigation.navigate("Add Family Member");
        break;
      case "Vehicles":
        navigation.navigate("VehiclesScreen");
        break;
      case "Daily Help":
        navigation.navigate("DailyHelpScreen");
        break;
      case "Pets":
        console.warn("No navigation assigned for", item.title);
        break;
      default:
        console.warn("No navigation assigned for", item.title);
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Image source={defaultIcon} style={styles.profileImage} />
              <View style={styles.usernameContainer}>
                <Text style={styles.greeting}>Hi User,</Text>
                <Text style={styles.subGreeting}>
                  this is your recent usage
                </Text>
              </View>
              <Icon name="bell" size={24} color="#fff" />
            </View>
          </View>

          <View style={styles.householdContainer}>
            <View style={styles.headerRow}>
              <View style={styles.householdTitle}>
                <Icon
                  name="home"
                  size={19}
                  color="#3b5998"
                  style={styles.householdIcon}
                />
                <Text style={styles.sectionTitle}>Household</Text>
              </View>
            </View>
          </View>
        </>
      }
      data={householdItems}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={commonStyles.container}
      renderItem={({ item }) => (
        <Card
          containerStyle={[styles.card, !item.hasData && styles.dottedBorder]}
        >
          <View style={styles.cardContent}>
            <Icon
              name={item.icon}
              size={18}
              color="black"
              style={styles.IconStyle}
            />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </View>

          {item.title !== "Visitors" && item.title !== "Daily Help" && (
            <TouchableOpacity
              style={commonStyles.addButton}
              onPress={() => handleNavigation(item)}
            >
              <View style={commonStyles.addCircle}>
                <Icon name="plus" size={12} color="black" />
              </View>
            </TouchableOpacity>
          )}

          {(item.title === "Visitors" || item.title === "Daily Help") && (
            <TouchableOpacity
              style={commonStyles.addButton}
              onPress={() => {
                if (item.title === "Daily Help") {
                  navigation.navigate("DailyHelpScreen");
                } else if (item.title === "Visitors") {
                  navigation.navigate("VisitorsList");
                }
              }}
            >
              <View style={commonStyles.infoCircle}>
                <Text style={commonStyles.infoText}>i</Text>
              </View>
            </TouchableOpacity>
          )}
        </Card>
      )}
      ListFooterComponent={
        <Card containerStyle={styles.addressCard}>
          <View style={styles.addressContent}>
            <Icon
              name="map-marker"
              size={24}
              color="#d32f2f"
              style={styles.MapIconStyle}
            />
            <View style={styles.addressText}>
              <Text style={styles.addressTitle}>My Address</Text>
              <Text style={styles.addressDetail}>
                A 511, Aspen Woods Apartment, Bengaluru-560076
              </Text>
            </View>
            <TouchableOpacity style={commonStyles.shareButton}>
              <Icon
                name="share"
                size={22}
                color="#3b5998"
                style={styles.MapIconStyle}
              />
            </TouchableOpacity>
          </View>
        </Card>
      }
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3b5998",
    padding: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileImage: { width: 50, height: 50, borderRadius: 25 },
  usernameContainer: { flex: 1, alignItems: "center" },
  greeting: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  subGreeting: { color: "#fff", fontSize: 14 },

  householdContainer: { marginTop: 40, marginHorizontal: 7 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  householdTitle: { flexDirection: "row", alignItems: "center" },
  householdIcon: { marginRight: 6 },
  sectionTitle: { fontSize: 17, fontWeight: "bold", color: "#333" },
  seeAll: { color: "#3b5998", fontSize: 14 },

  row: { justifyContent: "space-between" },
  card: {
    width: "41%",
    borderRadius: 10,
    padding: 25,
    elevation: 5,
    backgroundColor: "#fff",
  },
  dottedBorder: {
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "#999",
  },
  cardContent: { flexDirection: "row", alignItems: "center" },
  textContainer: { marginLeft: 9 },
  cardTitle: { fontSize: 14, fontWeight: "bold", color: "#333", marginTop: 0 },
  cardSubtitle: { fontSize: 12, color: "gray" },

  IconStyle: {
    //Main Icon style
    marginLeft: -12,
    marginBottom: 10,
  },
  MapIconStyle: {
    //Map Marker Icon style
    marginBottom: 35,
  },
  addressCard: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
    padding: 17,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  addressContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    marginLeft: 10,
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addressDetail: {
    fontSize: 14,
    color: "gray",
  },
});

export default MyUnitScreen;
