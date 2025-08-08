import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BillItem from './BillItem';

const BillsList = ({ route }) => {
  const { bills, company, finYearId, billType = 2 } = route.params;
  const [expandedId, setExpandedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [localBills, setLocalBills] = useState(bills);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = localBills.map((bill) =>
      bill.id === id ? { ...bill, billStatus: newStatus } : bill
    );
    setLocalBills(updated);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const isChecked = selectedIds.includes(item.id);

    return (
      <BillItem
        bill={item}
        company={company}
        finYearId={finYearId}
        billType={billType}
        isExpanded={isExpanded}
        isChecked={isChecked}
        onToggleExpand={() => toggleExpand(item.id)}
        onToggleCheck={() => toggleSelection(item.id)}
        onStatusChange={handleStatusChange}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={localBills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

BillsList.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      bills: PropTypes.array.isRequired,
      company: PropTypes.object.isRequired,
      finYearId: PropTypes.number.isRequired,
      billType: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BillsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
});
