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
import PropTypes from "prop-types";

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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const isChecked = selectedIds.includes(item.id);

    return (
      <View style={styles.billCard}>
        <View style={styles.topRow}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={() => toggleSelection(item.id)}
              tintColors={{ true: "#3B6FD6", false: "#999" }}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.billTitle}>{item.billType}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={styles.billAmount}>₹ {item.totalAmount}</Text>
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

        {isExpanded && (
          <>
            <View style={styles.expandedContainer}>
              <View style={[styles.infoRow, { marginTop: 10 }]}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoLabel}>Vendor</Text>
                <Text
                  style={[styles.infoLabel, { flex: 0.5, marginRight: 15 }]}
                >
                  Status
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoValue}>
                  {formatDate(item.billDate)}
                </Text>
                <Text style={[styles.infoValue, { marginLeft: 10 }]}>
                  {item.vendorName}
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    {
                      color:
                        item.billStatus?.toLowerCase() === "paid" ||
                        item.billStatus?.toLowerCase() === "approved"
                          ? "#28a745"
                          : "#dc3545",
                      fontWeight: "bold",
                      marginRight: -40,
                    },
                  ]}
                >
                  {item.billStatus}
                </Text>
              </View>

              <View style={[styles.infoRow, { marginTop: 10 }]}>
                <Text style={styles.label}>Bill Voucher No</Text>
                <Text style={[styles.label, { marginRight: 30 }]}>
                  Due Date
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.value}>{item.billVoucher}</Text>
                <Text style={[styles.value, { marginRight: 20 }]}>
                  {formatDate(item.dueDate)}
                </Text>
              </View>
            </View>
            {isExpanded && (
              <View style={styles.buttonRow}>
                {isChecked && (
                  <>
                    {item.billStatus === "Draft" && (
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSendForApproval(item.id)}
                      >
                        <Text style={styles.buttonText}>Send for Approval</Text>
                      </TouchableOpacity>
                    )}

                    {item.billStatus === "Pending Approval" && (
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleApprove(item.id)}
                      >
                        <Text style={styles.buttonText}>Approve</Text>
                      </TouchableOpacity>
                    )}

                    {item.billStatus === "Approved" && (
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSendForPayment(item.id)}
                      >
                        <Text style={styles.buttonText}>Send for Payment</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            )}
          </>
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

BillsList.propTypes = {
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  billTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  billAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginRight: 10,
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
  viewAllContainer: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  viewAllText: {
    color: "#3B6FD6",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#3B6FD6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default BillsList;
