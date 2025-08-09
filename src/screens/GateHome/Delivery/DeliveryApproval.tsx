import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import UnitSelection from '../../CommonFiles/UnitSelection';

export default function DeliveryApprovalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {deliveryManName, selectedCompany} = route.params;

  const [selection, setSelection] = useState({
    building: '',
    floor: '',
    unit: '',
  });

  const handleSelectionComplete = (building, floor, unit) => {
    setSelection({building, floor, unit});
  };

  const handleApproval = () => {
    navigation.navigate('DeliveryWaiting', {
      deliveryManName,
      selectedCompany,
      unitDetails: selection,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Delivery Approval</Text>
      <UnitSelection onSelectionComplete={handleSelectionComplete} />
      <View style={styles.selectionContainer}>
        <Text>Selected Building: {selection.building}</Text>
        <Text>Selected Floor: {selection.floor}</Text>
        <Text>Selected Unit: {selection.unit}</Text>
      </View>
      <Button title="Approve Delivery" onPress={handleApproval} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectionContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
});
