import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/Feather";
import PropTypes from "prop-types";
import {
  updateBillSendForApproval,
  updateBillApproveLevel1,
} from "../../../api/purchase/bill";
import commonStyles from "../../../commonStyles/commonStyles";

const BillItem = ({
  bill,
  isExpanded,
  isChecked,
  onToggleExpand,
  onToggleCheck,
  company,
  finYearId,
  billType,
}) => {
  const [loading, setLoading] = useState(false);
  const [localStatus, setLocalStatus] = useState(bill.billStatus);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSendForApproval = async () => {
    setLoading(true);
    try {
      await updateBillSendForApproval(
        { billIds: [bill.id], companyId: company.id },
        finYearId,
        billType
      );
      setLocalStatus("Pending Approval");
    } catch (err) {
      console.error("Send for approval failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      await updateBillApproveLevel1(
        { billIds: [bill.id], companyId: company.id },
        finYearId,
        billType
      );
      setLocalStatus("Approved");
    } catch (err) {
      console.error("Approval failed", err);
    } finally {
      setLoading(false);
    }
  };

  const renderActionButton = () => {
    if (!isChecked) return null;

    if (localStatus === "Draft") {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSendForApproval}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send for Approval</Text>
          )}
        </TouchableOpacity>
      );
    }

    if (localStatus === "Pending Approval") {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleApprove}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Approve</Text>
          )}
        </TouchableOpacity>
      );
    }

    if (localStatus === "Approved") {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log("Go to Payment Screen")}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      );
    }

    return null;
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
                      localStatus.toLowerCase()
                    )
                      ? "#28a745"
                      : "#dc3545",
                    fontWeight: "bold",
                    marginLeft: 35,
                  },
                ]}
              >
                {localStatus}
              </Text>
            </View>
          </View>

          <View style={styles.buttonRow}>{renderActionButton()}</View>
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
  company: PropTypes.object.isRequired,
  finYearId: PropTypes.number.isRequired,
  billType: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  billCard: {
    ...commonStyles.shadow,
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
    ...commonStyles.headerText,
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
    ...commonStyles.flexDirectionRow,
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
  buttonRow: {
    ...commonStyles.flexDirectionRow,
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
    ...commonStyles.fontPoppins,
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default BillItem;
