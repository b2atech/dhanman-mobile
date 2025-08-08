import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import useConfig from '../../../hooks/useConfig';
import {
  createTicket,
  getTicketCategories,
  getTicketPrioirity,
} from '../../../api/myHome/ticket';
import SubmitButton from '../../../components/shared/SubmitButton';
import commonStyles from '../../../commonStyles/commonStyles';

export default function CreateTicket({navigation}) {
  const config = useConfig();
  const [categories, setCategories] = useState([]);
  const [prioirity, setPrioirity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    apartmentId: config?.company?.id,
    title: '',
    unitId: 1155,
    description: '',
    ticketCategoryId: 0,
    ticketPriorityId: 0,
    ticketStatusId: 1,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getTicketCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to load ticket categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPrioirity = async () => {
      try {
        const response = await getTicketPrioirity();
        setPrioirity(response);
      } catch (error) {
        console.error('Error fetching Prioirity:', error);
        Alert.alert('Error', 'Failed to load ticket Prioirity.');
      }
    };
    fetchPrioirity();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };

  const validateForm = () => {
    const requiredFields = ['title', 'description', 'ticketCategoryId'];
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
      console.log('form:', formData);
      await createTicket(formData);
      Alert.alert('Success', 'Ticket created successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating ticket:', error);
      Alert.alert('Error', 'Failed to create ticket. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={[commonStyles.container, styles.container]}>
        <Text style={[styles.label, commonStyles.headerText]}>Title</Text>
        <TextInput
          style={[commonStyles.input, styles.input]}
          value={formData.title}
          onChangeText={value => handleInputChange('title', value)}
          placeholder="Enter ticket title"
        />

        <Text style={[styles.label, commonStyles.headerText]}>Description</Text>
        <TextInput
          style={[commonStyles.input, styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={value => handleInputChange('description', value)}
          placeholder="Describe the issue..."
          multiline
        />

        <Text style={[styles.label, commonStyles.headerText]}>Category</Text>
        <Dropdown
          data={categories}
          labelField="name"
          valueField="id"
          value={formData.ticketCategoryId}
          onChange={item => handleInputChange('ticketCategoryId', item.id)}
          style={commonStyles.dropdown}
          selectedTextStyle={commonStyles.selectedTextStyle}
          itemTextStyle={commonStyles.dropdownItemTextStyle}
          placeholder="Select Category"
        />

        <Text style={[styles.label, commonStyles.headerText]}>Priority</Text>
        <Dropdown
          data={prioirity}
          labelField="name"
          valueField="id"
          value={formData.ticketPriorityId}
          onChange={item => handleInputChange('ticketPriorityId', item.id)}
          style={commonStyles.dropdown}
          selectedTextStyle={commonStyles.selectedTextStyle}
          itemTextStyle={commonStyles.dropdownItemTextStyle}
          placeholder="Select Priority"
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <SubmitButton title="Submit Ticket" onPress={handleSubmit} />
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageButton: {
    backgroundColor: '#3B6FD6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    borderRadius: 8,
  },
});
