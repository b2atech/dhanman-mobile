import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

const createEmptyMember = () => ({
  name: '',
  age: '',
  gender: null,
  genderLabel: '',
  relation: null,
  relationLabel: '',
  customRelationLabel: '',
});

const AddFamilyMember = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [newMember, setNewMember] = useState(createEmptyMember());
  const [editIndex, setEditIndex] = useState(null);

  const genderOptions = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
  ];

  const relationsOptions = [
    { id: 'parents', name: 'Parents' },
    { id: 'spouse', name: 'Spouse' },
    { id: 'son', name: 'Son' },
    { id: 'daughter', name: 'Daughter' },
    { id: 'grandparents', name:'Grandparents' },
    { id: 'other', name: 'Other' },
  ];

  const addMember = () => {
    const { name, age, gender, relation, customRelationLabel } = newMember;

    if (
      !name.trim() ||
      !age.trim() ||
      !gender ||
      !relation ||
      (relation === 'other' && !customRelationLabel.trim())
    ) {
      Alert.alert('Missing Fields', 'Please fill all required fields before saving.');
      return;
    }

    const relationDisplay =
      newMember.relation === 'other' && newMember.customRelationLabel
        ? newMember.customRelationLabel
        : newMember.relationLabel;

    const updatedMember = { ...newMember, relationLabel: relationDisplay };

    if (editIndex !== null) {
      const updatedList = [...familyMembers];
      updatedList[editIndex] = updatedMember;
      setFamilyMembers(updatedList);
    } else {
      setFamilyMembers([...familyMembers, updatedMember]);
    }

    setNewMember(createEmptyMember());
    setEditIndex(null);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#000"
            value={newMember.name}
            onChangeText={(text) => setNewMember({ ...newMember, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Age"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            value={newMember.age}
            onChangeText={(text) => setNewMember({ ...newMember, age: text })}
            style={styles.input}
          />
          <Dropdown
            data={genderOptions}
            labelField="name"
            valueField="id"
            placeholder="Select Gender"
            value={newMember.gender}
            onChange={(item) =>
              setNewMember({
                ...newMember,
                gender: item.id,
                genderLabel: item.name,
              })
            }
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.dropdownItemTextStyle}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            activeColor="#e6f7ff"
          />
          <Dropdown
            data={relationsOptions}
            labelField="name"
            valueField="id"
            placeholder="Select Relation"
            value={newMember.relation}
            onChange={(item) =>
              setNewMember({
                ...newMember,
                relation: item.id,
                relationLabel: item.name,
              })
            }
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.dropdownItemTextStyle}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            activeColor="#e6f7ff"
          />
          {newMember.relation === 'other' && (
            <TextInput
              placeholder="Please specify your relation"
              placeholderTextColor="#000"
              value={newMember.customRelationLabel}
              onChangeText={(text) => setNewMember({ ...newMember, customRelationLabel: text })}
              style={styles.input}
            />
          )}

          <TouchableOpacity style={styles.saveButton} onPress={addMember}>
            <Text style={styles.saveButtonText}>{editIndex !== null ? 'Update' : 'Save'}</Text>
          </TouchableOpacity>

          {familyMembers.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.title}>Saved Members</Text>
              <FlatList
                data={familyMembers}
                renderItem={({ item, index }) => (
                  <View style={styles.card}>
                    <Text style={styles.cardText}>Name: {item.name}</Text>
                    <Text style={styles.cardText}>Age: {item.age}</Text>
                    <Text style={styles.cardText}>Gender: {item.genderLabel}</Text>
                    <Text style={styles.cardText}>Relation: {item.relationLabel}</Text>

                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setNewMember(item);
                        setEditIndex(index);
                      }}
                    >
                      <Icon name="edit" size={20} color="#3b5998" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { padding:20, flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    position: 'relative',
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  editButton: {
    position: 'absolute',
    top: 17,
    right: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
    padding:10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 5,
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 0,
  },
  placeholderStyle: {
    color: '#000',
    fontSize: 16,
    padding: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    padding: 5,
  },
  dropdownItemTextStyle: {
    fontSize: 16,
    color: '#222',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dropdownItemContainer: {
    paddingHorizontal: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  saveButton: {
    backgroundColor: '#3b5998',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddFamilyMember;
