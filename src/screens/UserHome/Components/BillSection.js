import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import CheckBox from "@react-native-community/checkbox";
import PropTypes from "prop-types";

const BillSection = ({ bills, navigation }) => {
  const [expandedBillId, setExpandedBillId] = useState(null);
  const [selectedBills, setSelectedBills] = useState([]);

  const toggleExpand = (id) => {
    setExpandedBillId((prevId) => (prevId === id ? null : id));
  };

  const toggleCheckbox = (id) => {
    setSelectedBills((prev) =>
      prev.includes(id) ? prev.filter((billId) => billId !== id) : [...prev, id]
    );
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSendForApproval = (billId) => {
    console.log(`Send for Approval clicked for bill ${billId}`);
    // API call or local update here
  };

  const handleApprove = (billId) => {
    console.log(`Approve clicked for bill ${billId}`);
    // API call or local update here
  };

  const handleSendForPayment = (billId) => {
    console.log(`Send for Payment clicked for bill ${billId}`);
    // API call or local update here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Bills</Text>

      <ScrollView style={{ maxHeight: 250 }}>
        {bills.slice(0, 2).map((bill) => {
          const isExpanded = expandedBillId === bill.id;
          const isChecked = selectedBills.includes(bill.id);

          return (
            <View key={bill.id} style={styles.billCard}>
              <View style={styles.topRow}>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={isChecked}
                    onValueChange={() => toggleCheckbox(bill.id)}
                    tintColors={{ true: "#3B6FD6", false: "#999" }}
                  />
                </View>
                <View style={{ flex: 3 }}>
                  <Text style={styles.billTitle}>{bill.billType}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={styles.billAmount}>₹ {bill.totalAmount}</Text>
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

              {isExpanded && (
                <>
                  <View style={styles.expandedContainer}>
                    <View style={[styles.infoRow, { marginTop: 10 }]}>
                      <View style={{ flex: 3 }}>
                        <Text style={styles.infoLabel}>Date</Text>
                        <Text style={styles.infoValue}>
                          {formatDate(bill.billDate)}
                        </Text>
                      </View>
                      <View style={{ flex: 3 }}>
                        <Text style={styles.infoLabel}>Vendor</Text>
                        <Text style={styles.infoValue}>{bill.vendorName}</Text>
                      </View>
                      <View style={{ flex: 2 }}>
                        <Text style={styles.infoLabel}>Status</Text>
                        <Text
                          style={[
                            styles.infoValue,
                            {
                              color:
                                bill.billStatus?.toLowerCase() === "paid" ||
                                bill.billStatus?.toLowerCase() === "approved"
                                  ? "#28a745"
                                  : "#dc3545",
                              fontWeight: "bold",
                            },
                          ]}
                        >
                          {bill.billStatus}
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.infoRow, { marginTop: 10 }]}>
                      <View style={{ flex: 3 }}>
                        <Text style={styles.label}>Bill Voucher No</Text>
                        <Text style={styles.value}>{bill.billVoucher}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={styles.label}>Due Date</Text>
                        <Text style={styles.value}>
                          {formatDate(bill.dueDate)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.buttonRow}>
                    {isChecked && (
                      <>
                        {bill.billStatus === "Draft" && (
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleSendForApproval(bill.id)}
                          >
                            <Text style={styles.buttonText}>
                              Send for Approval
                            </Text>
                          </TouchableOpacity>
                        )}
                        {bill.billStatus === "Pending Approval" && (
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleApprove(bill.id)}
                          >
                            <Text style={styles.buttonText}>Approve</Text>
                          </TouchableOpacity>
                        )}
                        {bill.billStatus === "Approved" && (
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleSendForPayment(bill.id)}
                          >
                            <Text style={styles.buttonText}>
                              Send for Payment
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </View>
                </>
              )}
            </View>
          );
        })}
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
    marginRight: 10,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#555",
    marginRight: 25,
  },
  value: {
    fontSize: 14,
    color: "#333",
    marginRight: 10,
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
