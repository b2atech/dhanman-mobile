import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import PropTypes from 'prop-types';
import {getCountries, getStates} from '../../api/myHome/address';
import commonStyles from '../../commonStyles/commonStyles';

const AddressForm = ({formData, handleInputChange, label, addressType}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData[addressType].countryId) {
      const fetchStates = async () => {
        try {
          const response = await getStates(formData[addressType].countryId);
          setStates(response);
        } catch (error) {
          console.error('Error fetching states', error);
        }
      };

      fetchStates();
    }
  }, [formData[addressType]?.countryId]);

  return (
    <View>
      <Text style={[styles.label, commonStyles.headerText]}>{label}</Text>
      <TextInput
        style={commonStyles.input}
        value={formData[addressType].addressLine1}
        onChangeText={value =>
          handleInputChange('addressLine1', value, true, addressType)
        }
        placeholder="Address Line 1"
        placeholderTextColor="#999"
      />
      <TextInput
        style={commonStyles.input}
        value={formData[addressType].addressLine2}
        onChangeText={value =>
          handleInputChange('addressLine2', value, true, addressType)
        }
        placeholder="Address Line 2"
        placeholderTextColor="#999"
      />
      <Dropdown
        style={commonStyles.dropdown}
        data={countries}
        labelField="name"
        valueField="id"
        value={formData[addressType].countryId}
        onChange={item =>
          handleInputChange('countryId', item.id, true, addressType)
        }
        placeholder="Select Country"
        placeholderStyle={commonStyles.placeholderStyle}
        selectedTextStyle={commonStyles.selectedTextStyle}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
      />
      <Dropdown
        data={states}
        labelField="name"
        valueField="id"
        value={formData[addressType].stateId}
        onChange={item =>
          handleInputChange('stateId', item.id, true, addressType)
        }
        style={commonStyles.dropdown}
        placeholder="Select State"
        placeholderStyle={commonStyles.placeholderStyle}
        selectedTextStyle={commonStyles.selectedTextStyle}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
      />
      <TextInput
        style={commonStyles.input}
        value={formData[addressType].cityName}
        onChangeText={value =>
          handleInputChange('cityName', value, true, addressType)
        }
        placeholder="Enter City Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={commonStyles.input}
        value={formData[addressType].zipCode}
        onChangeText={value =>
          handleInputChange('zipCode', value, true, addressType)
        }
        placeholder="Enter Zip Code"
        placeholderTextColor="#999"
      />
    </View>
  );
};

AddressForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  addressType: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  placeholderStyle: {
    color: '#999', // Ensure the placeholder text color is visible
  },
});

export default AddressForm;
