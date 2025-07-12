import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import BillItem from "./BillItem";

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

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const isChecked = selectedIds.includes(item.id);

    return (
      <BillItem
        bill={item}
        isExpanded={isExpanded}
        isChecked={isChecked}
        onToggleExpand={() => toggleExpand(item.id)}
        onToggleCheck={() => toggleSelection(item.id)}
        onSendForApproval={() => handleSendForApproval(item.id)}
        onApprove={() => handleApprove(item.id)}
        onSendForPayment={() => handleSendForPayment(item.id)}
      />
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

export default BillsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
});
