// src/AddVisitors.js
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  addVisitorPending,
  getVisitorIdentityType,
  getVisitorType,
} from '../../../api/myHome/visitors';
import commonStyles from '../../../commonStyles/commonStyles';
import UnitSelection from '../../CommonFiles/UnitSelection';
import {getOTP} from '../../../api/myHome/otp';
import SubmitButton from '../../../components/shared/SubmitButton';
import useConfig from '../../../hooks/useConfig';
import {SaveGuestNotification} from '../../../api/myHome/fcmService';
import {AuthContext} from '../../../context/AuthContext';
import Logger from '../../../utils/logger';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/common';

type CreateVisitorsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateVisitors'>;
};

export default function CreateVisitors({navigation}: CreateVisitorsProps) {
  const config = useConfig();
  const context = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [email, setEmail] = useState('');
  const [visitingFrom, setVisitingFrom] = useState('');
  const [visitorTypeId, setVisitorTypeId] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [identityTypeId, setIdentityTypeId] = useState(null);
  const [identityNumber, setIdentityNumber] = useState('');

  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedUnit, setSelectedUnit] = useState([]);

  const [visitorTypeList, setVisitorTypeList] = useState([]);
  const [identityTypes, setIdentityTypes] = useState([]);

  useEffect(() => {
    const fetchVisitorTypes = async () => {
      try {
        const response = await getVisitorType();
        setVisitorTypeList(response);
      } catch (error) {
        Logger.error('Error fetching visitor types:', error);
      }
    };
    fetchVisitorTypes();
  }, []);

  useEffect(() => {
    const fetchIdentityTypes = async () => {
      try {
        const response = await getVisitorIdentityType();
        setIdentityTypes(response);
      } catch (error) {
        Logger.error('Error fetching identity types:', error);
      }
    };
    fetchIdentityTypes();
  }, []);
  const handleSendOtp = async () => {
    const otpService = {
      phoneNumber: `+91${contactNumber}`,
      message: 'Welcome Code',
    };

    try {
      await getOTP(otpService);
      setIsOtpSent(true);
    } catch (error) {
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = async () => {
    contactNumber ? setIsOtpVerified(true) : setIsOtpVerified(false);
  };

  const handleSubmit = async () => {
    const visitorPayload = {
      apartmentId: config?.company?.id,
      firstName,
      lastName,
      email,
      visitingFrom,
      contactNumber,
      visitorTypeId: 1,
      vehicleNumber,
      identityTypeId: 1,
      identityNumber,
      createdBy: context?.user?.dhanmanId,
    };

    try {
      const response = await addVisitorPending(visitorPayload);
      await sendNotificationToResident(firstName, response.intId);

      Alert.alert('Visitors added successfully');
      navigation.goBack();
    } catch (error) {
      Logger.error('Error adding visitor:', error);
      Alert.alert(
        'Error',
        'Failed to add visitor. Please check your inputs and try again.',
      );
    }
  };

  const sendNotificationToResident = async (firstName:any, guestId:any) => {
    const req = {
      residentId: 1241,
      guestName: firstName,
      guestId: guestId,
    };

    try {
      await SaveGuestNotification(req);
      Alert.alert('Success', 'Notification sent successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification.');
    }
  };

  const handleSelectionComplete = (building:any, floor:any, unit:any) => {
    setSelectedBuilding(building);
    setSelectedFloor(floor);
    setSelectedUnit(unit);
  };

  return (
    <ScrollView
      contentContainerStyle={[commonStyles.container, styles.container]}>
      {selectedUnit.length === 0 ? (
        <UnitSelection onSelectionComplete={handleSelectionComplete} />
      ) : (
        <>
          <Text style={[styles.label, commonStyles.headerText]}>
            Building: {selectedBuilding}
          </Text>
          <Text style={[styles.label, commonStyles.headerText]}>
            Floor: {selectedFloor}
          </Text>
          <Text style={[styles.label, commonStyles.headerText]}>
            Unit: {selectedUnit.join(', ')}
          </Text>

          {!isOtpVerified && (
            <>
              <Text style={[styles.label, commonStyles.headerText]}>
                First Name
              </Text>
              <TextInput
                style={commonStyles.input}
                value={firstName}
                onChangeText={setFirstName}
              />

              <Text style={[styles.label, commonStyles.headerText]}>
                Last Name
              </Text>
              <TextInput
                style={commonStyles.input}
                value={lastName}
                onChangeText={setLastName}
              />

              <Text style={[styles.label, commonStyles.headerText]}>
                Contact Number
              </Text>
              <TextInput
                style={commonStyles.input}
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />

              {!isOtpSent ? (
                <TouchableOpacity
                  style={styles.sendOtpButton}
                  onPress={handleSendOtp}>
                  <Text style={styles.sendOtpButtonText}>Send OTP</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text style={[styles.label, commonStyles.headerText]}>
                    Enter OTP
                  </Text>
                  <TextInput
                    style={commonStyles.input}
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={6}
                  />
                  <TouchableOpacity
                    style={styles.sendOtpButton}
                    onPress={handleVerifyOtp}>
                    <Text style={styles.sendOtpButtonText}>Verify OTP</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}

          {isOtpVerified && (
            <>
              <Text style={[styles.label, commonStyles.headerText]}>Email</Text>
              <TextInput
                style={commonStyles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <Text style={[styles.label, commonStyles.headerText]}>
                Visiting From
              </Text>
              <TextInput
                style={commonStyles.input}
                value={visitingFrom}
                onChangeText={setVisitingFrom}
              />

              <Text style={[styles.label, commonStyles.headerText]}>
                Visitor Type
              </Text>
              <Dropdown
                style={commonStyles.dropdown}
                data={visitorTypeList}
                labelField="name"
                valueField="id"
                placeholder="Select Visitor Type"
                value={visitorTypeId}
                onChange={item => setVisitorTypeId(item.id)}
                selectedTextStyle={commonStyles.selectedTextStyle}
                itemTextStyle={commonStyles.dropdownItemTextStyle}
              />

              <Text style={[styles.label, commonStyles.headerText]}>
                Vehicle Number
              </Text>
              <TextInput
                style={commonStyles.input}
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
              />

              <Text style={[styles.label, commonStyles.headerText]}>
                Identity Type
              </Text>
              <Dropdown
                style={commonStyles.dropdown}
                data={identityTypes}
                labelField="name"
                valueField="id"
                placeholder="Select identity type"
                value={identityTypeId}
                onChange={item => setIdentityTypeId(item.id)}
                selectedTextStyle={commonStyles.selectedTextStyle}
                itemTextStyle={commonStyles.dropdownItemTextStyle}
              />

              <Text style={[styles.label, commonStyles.headerText]}>
                Identity Number
              </Text>
              <TextInput
                style={commonStyles.input}
                value={identityNumber}
                onChangeText={setIdentityNumber}
              />

              <SubmitButton title="Submit" onPress={handleSubmit} />
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    marginBottom: 5,
  },
  sendOtpButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginTop: 20,
  },
  sendOtpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
