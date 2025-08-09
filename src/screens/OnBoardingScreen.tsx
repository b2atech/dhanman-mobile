import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert, StyleSheet } from 'react-native';
import { TextInput, Checkbox, HelperText } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import useConfig from '../hooks/useConfig';
import { insertInvoice } from '../api/sales/invoice';
import { insertResident } from '../api/myHome/resident';
import commonStyles from '../commonStyles/commonStyles';
import { getBuildingNames } from '../api/myHome/building';
import { getFloorName } from '../api/myHome/floor';
import { getUnitNames, getUnits } from '../api/myHome/unit';
import SubmitButton from '../components/shared/SubmitButton';
import { getOrganizationAccounts } from '../api/commonApi/organization';
import 'react-native-get-random-values';

const AddResidentRequestSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255)
    .matches(/^[a-zA-Z]+$/, 'First name must contain only letters')
    .required('Please Enter First Name'),
  lastName: Yup.string()
    .max(255)
    .matches(/^[a-zA-Z]+$/, 'Last name must contain only letters')
    .required('Please Enter Last Name'),
  email: Yup.string()
    .required('Please Enter E-mail Address')
    .matches(/^[a-zA-Z0-9._-]+@gmail\.com$/, 'Only Gmail addresses are allowed'),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, 'Please enter a valid 10-digit contact number')
    .required('Please Enter Contact Number'),
});

const Boarding = () => {
  const navigation = useNavigation();
  const config = useConfig();

  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [onboardingCharge, setOnboardingCharge] = useState(false);
  const [organizationDetails, setOrganizationDetails] = useState('');
  const [guid, setGuid] = useState('');

  const [buildingNames, setBuildingNames] = useState([]);
  const [floorNames, setFloorNames] = useState([]);
  const [unitNames, setUnitNames] = useState([]);
  const [unit, setUnit] = useState();

  const generateUUID = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
      12,
      16
    )}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  };

  useEffect(() => {
    const newUuid = generateUUID();
    setGuid(newUuid);
  }, []);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const organizationData = await getOrganizationAccounts(config?.organization?.id);
        setOrganizationDetails(organizationData);
      } catch (error) {
        console.error('Error fetching organization details:', error);
      }
    };

    fetchOrganization();
  }, []);

  useEffect(() => {
    const fetchBuildingNames = async () => {
      try {
        const response = await getBuildingNames(config?.company?.id);
        setBuildingNames(response || []);
      } catch (error) {
        console.error('Error fetching building names:', error);
      }
    };

    fetchBuildingNames();
  }, []);

  useEffect(() => {
    if (!selectedBuilding) {
      return;
    }

    const fetchFloorNames = async () => {
      try {
        const response = await getFloorName(config?.company?.id, selectedBuilding);
        setFloorNames(response || []);
      } catch (error) {
        console.error('Error fetching floor names:', error);
      }
    };

    fetchFloorNames();
  }, [selectedBuilding]);

  useEffect(() => {
    if (!selectedFloor) {
      return;
    }
    const fetchUnitNames = async () => {
      try {
        const response = await getUnitNames(config?.company?.id, selectedBuilding, selectedFloor);
        setUnitNames(response || []);
      } catch (error) {
        console.error('Error fetching unit names:', error);
      }
    };

    fetchUnitNames();
  }, [selectedBuilding, selectedFloor]);

  useEffect(() => {
    if (!selectedUnit) {
      return;
    }
    const fetchUnitDetails = async () => {
      try {
        const unitData = await getUnits(selectedUnit);
        setUnit(unitData);
      } catch (error) {
        console.error('Error fetching unit details:', error);
      }
    };

    fetchUnitDetails();
  }, [selectedUnit]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      residentTypeId: '',
    },
    validationSchema: AddResidentRequestSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const residentData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          contactNumber: values.contactNumber,
          buildingId: selectedBuilding,
          floorId: selectedFloor,
          unitId: selectedUnit,
          permanentAddress: null,
          residentTypeId: 2,
          occupancyStatusId: 1,
        };
        const residentResponse = await insertResident(residentData);

        if (onboardingCharge) {
          const invoiceData = {
            invoiceHeaderId: '',
            companyId: config.company.id,
            creditAccountId: organizationDetails?.salesRevenueId,
            invoiceNumber: '1000',
            debitAccountId: organizationDetails?.accountsReceivableId,
            invoiceDate: format(new Date(), 'yyyy-MM-dd'),
            invoiceVoucher: 'INV0024',
            paymentTerm: 10,
            customerId: unit.customerId,
            invoiceStatusId: 3,
            sourceWarehouseId: '00000000-0000-0000-0000-000000000000',
            destinationWarehouseId: '00000000-0000-0000-0000-000000000000',
            dueDate: format(new Date(), 'yyyy-MM-dd'),
            soNo: '',
            soDate: format(new Date(), 'yyyy-MM-dd'),
            totalAmount: 1500,
            currencyId: 1,
            discount: 0,
            note: '',
            taxableAmount: 0,
            fees: 0,
            cgstAmount: 0,
            sgstAmount: 0,
            igstAmount: 0,
            roundOff: 1500,
            customerInfo: null,
            type: 4,
            lines: [
              {
                id: guid,
                productId: 'fcfd422c-677f-4a8c-84a5-c9da7c5f8800',
                name: 'Onboarding Charges',
                description: 'Onboarding charges for new resident',
                quantity: 1,
                price: 1500,
                amount: 1500,
                discount: 0,
                fees: 0,
                serialNumber: 1,
                taxableAmount: 0,
                cgstAmount: 0,
                sgstAmount: 0,
                igstAmount: 0,
                totalAmount: 1500,
                selectedProduct: '',
              },
            ],
          };
          console.log('iv datda', invoiceData);
          const invoiceResponse = await insertInvoice(invoiceData);
          if (invoiceResponse) {
            Alert.alert('Success', 'Resident On Boarding added successfully.');
            navigation.goBack();
          }
        } else {
          if (residentResponse) {
            Alert.alert('Success', 'Resident added successfully.');
          }
          navigation.goBack();
        }
        setSubmitting(false);
      } catch (error) {
        console.error('Submission error:', error);
        Alert.alert('Error', 'Failed to submit form: ', error);
        setSubmitting(false);
      }
    },
  });

  return (
    <ScrollView contentContainerStyle={[commonStyles.container, styles.container]}>
      <Text style={[styles.label, commonStyles.headerText]}>Select Building</Text>
      <Dropdown
        data={buildingNames}
        labelField="name"
        valueField="id"
        value={selectedBuilding}
        onChange={itemValue => {
          setSelectedBuilding(itemValue.id);
          formik.setFieldValue('buildingId', itemValue.id);
        }}
        style={commonStyles.dropdown}
        selectedTextStyle={commonStyles.selectedTextStyle}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
      />

      <Text style={[styles.label, commonStyles.headerText]}>Select Floor</Text>
      <Dropdown
        data={floorNames}
        labelField="name"
        valueField="id"
        value={selectedFloor}
        onChange={itemValue => {
          setSelectedFloor(itemValue.id);
          formik.setFieldValue('floorId', itemValue.id);
        }}
        style={commonStyles.dropdown}
        selectedTextStyle={commonStyles.selectedTextStyle}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
      />

      <Text style={[styles.label, commonStyles.headerText]}>Select Unit</Text>
      <Dropdown
        data={unitNames}
        labelField="name"
        valueField="id"
        value={selectedUnit}
        onChange={itemValue => {
          setSelectedUnit(itemValue.id);
          formik.setFieldValue('unitId', itemValue.id);
        }}
        style={commonStyles.dropdown}
        selectedTextStyle={commonStyles.selectedTextStyle}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
      />
      <Text style={[styles.label, commonStyles.headerText]}>First Name</Text>
      <TextInput
        onChangeText={formik.handleChange('firstName')}
        value={formik.values.firstName}
        style={[commonStyles.input, styles.input]}
      />
      {formik.touched.firstName && formik.errors.firstName && (
        <HelperText type="error">{formik.errors.firstName}</HelperText>
      )}

      <Text style={[styles.label, commonStyles.headerText]}>Last Name</Text>
      <TextInput
        onChangeText={formik.handleChange('lastName')}
        value={formik.values.lastName}
        style={[commonStyles.input, styles.input]}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <HelperText type="error">{formik.errors.lastName}</HelperText>
      )}

      <Text style={[styles.label, commonStyles.headerText]}>Email</Text>
      <TextInput
        keyboardType="email-address"
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
        style={[commonStyles.input, styles.input]}
      />
      {formik.touched.email && formik.errors.email && (
        <HelperText type="error">{formik.errors.email}</HelperText>
      )}

      <Text style={[styles.label, commonStyles.headerText]}>Contact Number</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={formik.handleChange('contactNumber')}
        value={formik.values.contactNumber}
        style={[commonStyles.input, styles.input]}
      />
      {formik.touched.contactNumber && formik.errors.contactNumber && (
        <HelperText type="error">{formik.errors.contactNumber}</HelperText>
      )}

      <Checkbox
        status={onboardingCharge ? 'checked' : 'unchecked'}
        onPress={() => setOnboardingCharge(!onboardingCharge)}
        label="OnBoarding Charge"
      />
      <Text>OnBoarding Charge</Text>

      <SubmitButton title="Save" onPress={formik.handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    color: '#000',
  },
});
export default Boarding;
