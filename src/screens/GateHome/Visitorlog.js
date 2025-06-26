import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation, useRoute} from '@react-navigation/native';
import commonStyles from '../../style/CommonStyles';
import {addVisitorLog} from '../../api/visitorLog';
import UnitSelection from '../CommonFiles/UnitSelection';

export default function VisitorLogScreen() {
  const navigation = useNavigation();
  const [selectedUnit, setSelectedUnit] = useState([]);
  const [selectedVisitorType, setSelectedVisitorType] = useState('');
  const [visitingForm, setVisitingForm] = useState('');
  const [entryTime, setEntryTime] = useState(new Date());
  const route = useRoute();
  const {id} = route.params;

  const handleSelectionComplete = (building, floor, unit, unitId) => {
    console.log(building, floor, unit, unitId);
    setSelectedUnit(unitId);
  };

  const visitorTypes = [
    {label: 'Delivery', value: '1'},
    {label: 'Guest', value: '2'},
    {label: 'Service Provider', value: '3'},
  ];

  const handleSubmit = async () => {
    const newVisitorLog = {
      visitorId: id,
      visitingUnitIds: selectedUnit,
      visitorTypeId: selectedVisitorType,
      visitingFrom: visitingForm,
      currentStatusId: 1,
      entryTime: '2024-07-13',
      exitTime: '2024-07-13',
    };
    try {
      await addVisitorLog(newVisitorLog);
      Alert.alert('Visitors added successfully');
      navigation.navigate('GateHomeScreen');
    } catch (error) {
      console.error('Error adding visitor:', error);
      Alert.alert(
        'Error',
        'Failed to add visitor. Please check your inputs and try again.',
      );
    }
  };

  return (
    <View style={commonStyles.container}>
      {selectedUnit.length === 0 ? (
        <UnitSelection onSelectionComplete={handleSelectionComplete} />
      ) : (
        <>
          <Text style={[styles.label, commonStyles.headerText]}>
            Visitor Type
          </Text>
          <Dropdown
            style={styles.dropdown}
            data={visitorTypes}
            labelField="label"
            valueField="value"
            placeholder="Select visitor type"
            value={selectedVisitorType}
            onChange={item => setSelectedVisitorType(item.value)}
          />

          <Text style={[styles.label, commonStyles.headerText]}>
            Visiting From
          </Text>
          <TextInput
            style={styles.textBox}
            value={visitingForm}
            onChangeText={setVisitingForm}
          />

          <Text style={[styles.label, commonStyles.headerText]}>
            Entry Time
          </Text>
          <TextInput
            style={styles.textBox}
            value={entryTime}
            onChangeText={setEntryTime}
          />

          <Button title="Enter" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  textBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  pushButton: {
    padding: 10,
    backgroundColor: '#f8ac59',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
});
