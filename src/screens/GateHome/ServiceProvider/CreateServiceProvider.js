import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  addServiceProvider,
  getServiceProviderSubType,
  getServiceProviderType,
} from '../../../api/myHome/serviceProvider';
import AddressForm from '../../CommonFiles/AddressForm';
import SubmitButton from '../../../components/shared/SubmitButton';
import commonStyles from '../../../commonStyles/commonStyles';

export default function CreateServiceProvider({navigation}) {
  const [serviceProviderType, setServiceProviderType] = useState([]);
  const [serviceProviderSubType, setServiceProviderSubType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [identityTypeId, setIdentityTypeId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    visitingFrom: '',
    contactNumber: '',
    permanentAddress: {
      countryId: '',
      stateId: '',
      cityName: '',
      addressLine1: '',
      addressLine2: '',
      zipCode: '',
    },
    presentAddress: {
      countryId: '',
      stateId: '',
      cityName: '',
      addressLine1: '',
      addressLine2: '',
      zipCode: '',
    },
    serviceProviderTypeId: '',
    serviceProviderSubTypeId: '',
    vehicleNumber: '',
    identityTypeId: 22,
    identityNumber: '',
    validityDate: '2025-05-01',
    policeVerificationStatus: false,
    isHireable: false,
    isVisible: false,
    isFrequentVisitor: false,
    apartmentId: '12fb50f0-9998-456f-8aee-bb83ab2fbbdb',
    pin: '',
  });

  const identityTypes = [
    {label: 'Aadhar', value: 0},
    {label: 'VoterId', value: 1},
    {label: 'Passport', value: 2},
  ];

  const handleInputChange = (name, value, nested = false, nestedField = '') => {
    if (nested) {
      setFormData(prevState => ({
        ...prevState,
        [nestedField]: {
          ...prevState[nestedField],
          [name]: value,
        },
      }));
    } else {
      setFormData(prevState => ({...prevState, [name]: value}));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'contactNumber',
      'serviceProviderTypeId',
      'serviceProviderSubTypeId',
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        Alert.alert('Validation Error', `Please fill in the ${field} field.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {return;}

    setIsLoading(true);
    try {
      await addServiceProvider(formData);
      Alert.alert('Success', 'Service provider added successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding service provider:', error);
      Alert.alert(
        'Error',
        'Failed to add service provider. Please check your inputs and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllServiceProviderType = async () => {
      try {
        const response = await getServiceProviderType();
        setServiceProviderType(response);
      } catch (error) {
        console.error('Error fetching service provider types:', error);
      }
    };

    fetchAllServiceProviderType();
  }, []);

  useEffect(() => {
    const fetchAllServiceProviderSubType = async () => {
      try {
        const response = await getServiceProviderSubType();
        setServiceProviderSubType(response);
      } catch (error) {
        console.error('Error fetching service provider subtypes:', error);
      }
    };

    fetchAllServiceProviderSubType();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[commonStyles.container, styles.container]}>
      <Text style={[styles.label, commonStyles.headerText]}>First Name</Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.firstName}
        onChangeText={value => handleInputChange('firstName', value)}
      />

      <Text style={[styles.label, commonStyles.headerText]}>Last Name</Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.lastName}
        onChangeText={value => handleInputChange('lastName', value)}
      />

      <Text style={[styles.label, commonStyles.headerText]}>Email</Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.email}
        onChangeText={value => handleInputChange('email', value)}
        keyboardType="email-address"
      />

      <Text style={[styles.label, commonStyles.headerText]}>Visiting From</Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.visitingFrom}
        onChangeText={value => handleInputChange('visitingFrom', value)}
      />

      <Text style={[styles.label, commonStyles.headerText]}>
        Contact Number
      </Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.contactNumber}
        onChangeText={value => handleInputChange('contactNumber', value)}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <AddressForm
        formData={formData}
        handleInputChange={handleInputChange}
        label="Permanent Address"
        addressType={'permanentAddress'}
      />

      <AddressForm
        formData={formData}
        handleInputChange={handleInputChange}
        label="Present Address"
        addressType={'presentAddress'}
      />

      <Text style={[styles.label, commonStyles.headerText]}>
        Service Provider Type
      </Text>
      <Dropdown
        data={serviceProviderType}
        labelField="name"
        valueField="id"
        value={formData.serviceProviderTypeId}
        onChange={item => handleInputChange('serviceProviderTypeId', item.id)}
        style={commonStyles.dropdown}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
        selectedTextStyle={commonStyles.selectedTextStyle}
      />

      <Text style={[styles.label, commonStyles.headerText]}>
        Service Provider Sub Type
      </Text>
      <Dropdown
        data={serviceProviderSubType}
        labelField="name"
        valueField="id"
        value={formData.serviceProviderSubTypeId}
        onChange={item =>
          handleInputChange('serviceProviderSubTypeId', item.id)
        }
        style={commonStyles.dropdown}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
        selectedTextStyle={commonStyles.selectedTextStyle}
      />

      <Text style={[styles.label, commonStyles.headerText]}>
        Vehicle Number
      </Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.vehicleNumber}
        onChangeText={value => handleInputChange('vehicleNumber', value)}
      />

      <Text style={[styles.label, commonStyles.headerText]}>
        Identity Type ID
      </Text>
      <Dropdown
        style={commonStyles.dropdown}
        data={identityTypes}
        labelField="label"
        valueField="value"
        value={identityTypeId}
        onChange={item => {
          setIdentityTypeId(item.value);
        }}
        selectedTextStyle={commonStyles.selectedTextStyle}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
      />

      <Text style={[styles.label, commonStyles.headerText]}>
        Identity Number
      </Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.identityNumber}
        onChangeText={value => handleInputChange('identityNumber', value)}
      />

      <Text style={[styles.label, commonStyles.headerText]}>Validity Date</Text>
      <TextInput
        style={[commonStyles.input, styles.input]}
        value={formData.validityDate}
        onChangeText={value => handleInputChange('validityDate', value)}
      />

      <View style={styles.switchContainer}>
        <Text style={[styles.label, commonStyles.headerText]}>
          Police Verification Status
        </Text>
        <Switch
          value={formData.policeVerificationStatus}
          onValueChange={value =>
            handleInputChange('policeVerificationStatus', value)
          }
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.label, commonStyles.headerText]}>Is Hireable</Text>
        <Switch
          value={formData.isHireable}
          onValueChange={value => handleInputChange('isHireable', value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.label, commonStyles.headerText]}>Is Visible</Text>
        <Switch
          value={formData.isVisible}
          onValueChange={value => handleInputChange('isVisible', value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.label, commonStyles.headerText]}>
          Is Frequent Visitor
        </Text>
        <Switch
          value={formData.isFrequentVisitor}
          onValueChange={value => handleInputChange('isFrequentVisitor', value)}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <SubmitButton title="Submit" onPress={handleSubmit} />
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    color: '#000',
  },
});
