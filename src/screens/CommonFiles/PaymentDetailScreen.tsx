import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Card, CheckBox, Button} from 'react-native-elements';

const pendingInvoices = [
  {
    id: '1',
    amount: 200.0,
    dueDate: '2025-04-01',
    status: 'Approved',
  },
  {
    id: '2',
    amount: 100.5,
    dueDate: '2025-04-05',
    status: 'Overdue',
  },
  {
    id: '3',
    amount: 100.0,
    dueDate: '2025-04-10',
    status: 'Approved',
  },
  {
    id: '4',
    amount: 99.5,
    dueDate: '2025-04-01',
    status: 'Approved',
  },
  {
    id: '5',
    amount: 300.0,
    dueDate: '2025-04-05',
    status: 'Overdue',
  },
  {
    id: '6',
    amount: 200.0,
    dueDate: '2025-04-10',
    status: 'Approved',
  },
];

const PaymentDetailScreen = ({navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = id => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderItem = ({item}) => {
    const isChecked = selectedItems.includes(item.id);

    return (
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.amount}>₹ {item.amount.toFixed(2)}</Text>
          <Text
            style={[
              styles.status,
              {
                color:
                  item.status === 'Overdue'
                    ? 'red'
                    : item.status === 'Approved'
                    ? 'green'
                    : '#FFA500',
              },
            ]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.date}>Due Date: {item.dueDate}</Text>

        <CheckBox
          title="Select"
          checked={isChecked}
          onPress={() => toggleSelection(item.id)}
          containerStyle={styles.checkbox}
        />
      </Card>
    );
  };

  const handlePayNow = () => {
    const selectedInvoices = pendingInvoices.filter(inv =>
      selectedItems.includes(inv.id),
    );
    navigation.navigate('PaymentScreen', {selectedInvoices});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={pendingInvoices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />

      {selectedItems.length > 0 && (
        <View style={styles.payNowContainer}>
          <Button
            title={`Pay Now (${selectedItems.length})`}
            buttonStyle={styles.payNowButton}
            onPress={handlePayNow}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
  card: {
    borderRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    alignItems: 'flex-start',
  },
  payNowContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
  payNowButton: {
    backgroundColor: '#3B6FD6',
    borderRadius: 10,
    paddingVertical: 15,
  },
});

export default PaymentDetailScreen;
