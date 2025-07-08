import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Icon } from "react-native-elements";

const BillsList = ({ route }) => {
  const { bills } = route.params;
  const [expandedId, setExpandedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const isChecked = selectedIds.includes(item.id);

    return (
      <View style={styles.billCard}>
        <View style={styles.cardHeader}>
          <CheckBox
            value={isChecked}
            onValueChange={() => toggleSelection(item.id)}
            tintColors={{ true: "#3B6FD6", false: "#999" }}
          />
          <View style={styles.cardHeaderContent}>
            <View style={styles.titleVendorContainer}>
              <Text style={styles.billTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Icon
                name={isExpanded ? "chevron-up" : "chevron-down"}
                type="feather"
                color="#3B6FD6"
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.expandedContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoLabel}>Vendor</Text>
              <Text style={styles.infoLabel}>Amount</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{item.date}</Text>
              <Text style={styles.infoValue}>{item.vendor}</Text>
              <Text style={styles.infoValue}>₹ {item.amount}</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.value}>{item.description}</Text>
            </View>

            <View style={[styles.infoRow, { marginTop: 15 }]}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <Text style={styles.infoLabel}>Status</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{item.date}</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: item.status === "Paid" ? "#28a745" : "#dc3545",
                    fontWeight: "bold",
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  billCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  titleVendorContainer: {
    flex: 1,
    paddingLeft: 10,
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
    paddingHorizontal: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: 5,
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

export default BillsList;
