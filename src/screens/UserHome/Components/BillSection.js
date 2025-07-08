import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

const BillSection = ({ bills, navigation }) => {
  const [expandedBillId, setExpandedBillId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBillId((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Bills</Text>

      <ScrollView style={{ maxHeight: 250 }}>
        {bills.slice(0, 2).map((bill) => (
          <View key={bill.id} style={styles.billCard}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.billTitle}>{bill.title}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleExpand(bill.id)}>
                <Icon
                  name={
                    expandedBillId === bill.id ? "chevron-up" : "chevron-down"
                  }
                  type="feather"
                  color="#3B6FD6"
                  size={22}
                />
              </TouchableOpacity>
            </View>

            {expandedBillId === bill.id && (
              <View style={styles.expandedContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoLabel}>Vendor</Text>
                  <Text style={styles.infoLabel}>Amount</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoValue}>{bill.date}</Text>
                  <Text style={styles.infoValue}>{bill.vendor}</Text>
                  <Text style={styles.infoValue}>₹ {bill.amount}</Text>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Description</Text>
                  <Text style={styles.value}>{bill.description}</Text>
                </View>

                <View style={[styles.infoRow, { marginTop: 15 }]}>
                  <Text style={styles.infoLabel}>Due Date</Text>
                  <Text style={styles.infoLabel}>Status</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoValue}>{bill.date}</Text>
                  <Text
                    style={[
                      styles.infoValue,
                      {
                        color: bill.status === "Paid" ? "#28a745" : "#dc3545",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {bill.status}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {bills.length > 3 && (
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={() => navigation.navigate("Bills List", { bills })}
        >
          <Text style={styles.viewAllText}>View All →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

BillSection.propTypes = {
  bills: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default BillSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  billCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  billTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  billVendor: {
    fontSize: 13,
    color: "#666",
  },
  expandedContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#555",
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    color: "#333",
    marginRight: 12,
  },
  descriptionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
    color: "#555",
  },
  descriptionText: {
    fontSize: 14,
    color: "#333",
  },
  viewAllContainer: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  viewAllText: {
    color: "#3B6FD6",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  infoLabel: {
    flex: 1,
    fontWeight: "600",
    fontSize: 13,
    color: "#555",
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  fieldGroup: {
    marginTop: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
});
