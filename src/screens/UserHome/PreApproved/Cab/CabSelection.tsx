import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute} from '@react-navigation/native';
import commonStyles from '../../../../commonStyles/commonStyles';

const CabSelection = () => {
  const route = useRoute();
  const initialTab = route.params?.selectedTab || 'Once';
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [validHours, setValidHours] = useState('1 hour');
  const [daysOfWeek, setDaysOfWeek] = useState('All days of Week');
  const [validity, setValidity] = useState('For 6 months');
  const [startTime, setStartTime] = useState('00:00 am');
  const [endTime, setEndTime] = useState('11:59 pm');
  const [entriesPerDay, setEntriesPerDay] = useState('One Entry');
  const [companyName, setCompanyName] = useState('');
  const [advancedOptionVisible, setAdvancedOptionVisible] = useState(false);

  useEffect(() => {
    if (route.params?.selectedTab) {
      setSelectedTab(route.params.selectedTab);
    }
  }, [route.params?.selectedTab]);

  const companies = ['Ola', 'Uber', 'Rapido', 'Other'];

  const generateTimeSlots = () => {
    const slots = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hour = h % 12 === 0 ? 12 : h % 12;
        const minute = m === 0 ? '00' : m;
        const period = h < 12 ? 'am' : 'pm';
        const label = `${hour}:${minute} ${period}`;
        slots.push(label);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>Cab Selection</Text>

      <View style={styles.cabCard}>
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Once' && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab('Once')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Once' && styles.activeTabText,
              ]}>
              Once
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Frequently' && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab('Frequently')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Frequently' && styles.activeTabText,
              ]}>
              Frequently
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'Once' ? (
          <View style={styles.formContainer}>
            <Text style={styles.label}>
              Allow my cab to enter today once in next
            </Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={validHours}
                onValueChange={value => setValidHours(value)}
                style={styles.picker}
                dropdownIconColor="#333"
                mode="dropdown">
                <Picker.Item label="1 hour" value="1 hour" />
                <Picker.Item label="2 hours" value="2 hours" />
                <Picker.Item label="3 hours" value="3 hours" />
              </Picker>
            </View>

            <Text style={styles.label}>Add last 4 digits of vehicle no</Text>
            <TextInput
              style={styles.input}
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
              keyboardType="numeric"
              placeholder="Enter last 4 digits"
              maxLength={4}
            />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Select Days of Week</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={daysOfWeek}
                onValueChange={value => setDaysOfWeek(value)}
                style={styles.picker}
                dropdownIconColor="#333"
                mode="dropdown">
                <Picker.Item
                  label="All days of Week"
                  value="All days of Week"
                />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
            </View>

            <Text style={styles.label}>Select Validity</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={validity}
                onValueChange={value => setValidity(value)}
                style={styles.picker}
                dropdownIconColor="#333"
                mode="dropdown">
                <Picker.Item label="For 1 months" value="For 1 months" />
                <Picker.Item label="For 3 months" value="For 3 months" />
                <Picker.Item label="For 6 months" value="For 6 months" />
                <Picker.Item label="For 12 months" value="For 12 months" />
              </Picker>
            </View>

            <Text style={styles.label}>Select Time Slot</Text>
            <View style={styles.row}>
              <View style={[styles.pickerWrapper, {flex: 1, marginRight: 5}]}>
                <Picker
                  selectedValue={startTime}
                  onValueChange={value => setStartTime(value)}
                  style={styles.picker}
                  dropdownIconColor="#333"
                  mode="dropdown">
                  {timeSlots.map((slot, index) => (
                    <Picker.Item
                      key={`start-${index}`}
                      label={slot}
                      value={slot}
                    />
                  ))}
                </Picker>
              </View>

              <View style={[styles.pickerWrapper, {flex: 1, marginLeft: 5}]}>
                <Picker
                  selectedValue={endTime}
                  onValueChange={value => setEndTime(value)}
                  style={styles.picker}
                  dropdownIconColor="#333"
                  mode="dropdown">
                  {timeSlots.map((slot, index) => (
                    <Picker.Item
                      key={`end-${index}`}
                      label={slot}
                      value={slot}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <Text style={styles.label}>Select Entries Per Day</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={entriesPerDay}
                onValueChange={value => setEntriesPerDay(value)}
                style={styles.picker}
                dropdownIconColor="#333"
                mode="dropdown">
                <Picker.Item label="One Entry" value="One Entry" />
                <Picker.Item
                  label="Multiple Entries"
                  value="Multiple Entries"
                />
              </Picker>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setAdvancedOptionVisible(!advancedOptionVisible)}>
          <Text style={styles.advancedOptionText}>Advanced Option</Text>
        </TouchableOpacity>

        {advancedOptionVisible && (
          <>
            <Text style={styles.label}>Company Name</Text>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={companyName}
                onValueChange={value => setCompanyName(value)}
                style={styles.picker}
                dropdownIconColor="#333"
                mode="dropdown">
                {companies.map((company, index) => (
                  <Picker.Item key={index} label={company} value={company} />
                ))}
              </Picker>
            </View>
          </>
        )}

        <TouchableOpacity
          onPress={() => {
            /* your submit logic */
          }}>
          <LinearGradient
            colors={['#3F71D4', '#64A0E0', '#A6D9CE']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={commonStyles.submitButton}>
            <Text style={commonStyles.submitButtonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  cabCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    elevation: 8,
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E6ECF3',
    borderRadius: 10,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#3F71D4',
  },
  tabText: {
    color: '#3F71D4',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 20,
    color: '#000',
  },
  companyInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 17,
    color: '#000',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    height: 48,
  },
  picker: {
    width: '100%',
    height: 44,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  advancedOptionText: {
    color: '#3F71D4',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default CabSelection;
