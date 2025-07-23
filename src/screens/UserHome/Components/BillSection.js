import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import BillItem from "./BillItem";

const BillSection = ({ bills, company, finYearId, billType, navigation }) => {
  const [expandedBillId, setExpandedBillId] = useState(null);
  const [selectedBills, setSelectedBills] = useState([]);
  const [localBills, setLocalBills] = useState(bills);

  useEffect(() => {
    setLocalBills(bills);
  }, [bills]);

  const toggleExpand = (id) => {
    setExpandedBillId((prevId) => (prevId === id ? null : id));
  };

  const toggleCheckbox = (id) => {
    setSelectedBills((prev) =>
      prev.includes(id) ? prev.filter((billId) => billId !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedBills = localBills.map((bill) =>
      bill.id === id ? { ...bill, billStatus: newStatus } : bill
    );
    setLocalBills(updatedBills);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Bills</Text>
      <ScrollView style={{ maxHeight: 250 }}>
        {localBills.slice(0, 2).map((bill) => {
          const isExpanded = expandedBillId === bill.id;
          const isChecked = selectedBills.includes(bill.id);
          return (
            <BillItem
              key={bill.id}
              bill={bill}
              company={company}
              finYearId={finYearId}
              billType={billType}
              isExpanded={isExpanded}
              isChecked={isChecked}
              onToggleExpand={() => toggleExpand(bill.id)}
              onToggleCheck={() => toggleCheckbox(bill.id)}
              onStatusChange={handleStatusChange}
            />
          );
        })}
      </ScrollView>

      {localBills.length > 3 && (
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={() =>
            navigation.navigate("Bills List", {
              bills: localBills,
              company,
              finYearId,
              billType,
            })
          }
        >
          <Text style={styles.viewAllText}>View All →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

BillSection.propTypes = {
  bills: PropTypes.array.isRequired,
  company: PropTypes.object.isRequired,
  finYearId: PropTypes.number.isRequired,
  billType: PropTypes.number.isRequired,
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
  viewAllContainer: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  viewAllText: {
    color: "#3B6FD6",
    fontWeight: "600",
  },
});
