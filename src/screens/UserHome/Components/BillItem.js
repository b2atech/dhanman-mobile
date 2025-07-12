import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

const BillItem = ({
  bill,
  isExpanded,
  isChecked,
  onToggleExpand,
  onToggleCheck,
  onSendForApproval,
  onApprove,
  onSendForPayment,
}) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.billCard}>
      <View style={styles.topRow}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={onToggleCheck}
            tintColors={{ true: "#3B6FD6", false: "#999" }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={styles.billTitle}>{bill.billType}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={styles.billAmount}>₹ {bill.totalAmount}</Text>
        </View>
        <TouchableOpacity onPress={onToggleExpand}>
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
              <Text style={[styles.infoLabel, { flex: 0.5 }]}>Status</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{formatDate(bill.billDate)}</Text>
              <Text style={[styles.infoValue, { marginLeft: 50 }]}>
                {bill.vendorName}
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: ["paid", "approved"].includes(
                      bill.billStatus?.toLowerCase()
                    )
                      ? "#28a745"
                      : "#dc3545",
                    fontWeight: "bold",
                    marginLeft: 35,
                  },
                ]}
              >
                {bill.billStatus}
              </Text>
            </View>

            <View style={[styles.infoRow, { marginTop: 10 }]}>
              <Text style={styles.label}>Bill Voucher No</Text>
              <Text style={[styles.label, { marginRight: 25 }]}>Due Date</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.value}>{bill.billVoucher}</Text>
              <Text style={[styles.value, { marginRight: 20 }]}>
                {formatDate(bill.dueDate)}
              </Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            {isChecked && (
              <>
                {bill.billStatus === "Draft" && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onSendForApproval}
                  >
                    <Text style={styles.buttonText}>Send for Approval</Text>
                  </TouchableOpacity>
                )}
                {bill.billStatus === "Pending Approval" && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onApprove}
                  >
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                )}
                {bill.billStatus === "Approved" && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onSendForPayment}
                  >
                    <Text style={styles.buttonText}>Send for Payment</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

BillItem.propTypes = {
  bill: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  onToggleCheck: PropTypes.func.isRequired,
  onSendForApproval: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  onSendForPayment: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
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
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 14,
    color: "#000",
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

export default BillItem;
