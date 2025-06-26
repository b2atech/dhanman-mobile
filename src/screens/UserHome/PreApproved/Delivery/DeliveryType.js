import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const DeliveryType = () => {
  const navigation = useNavigation();

  const handleSelectOption = option => {
    navigation.navigate('Delivery Entry', {type: option});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.modalContainer}>
        <LinearGradient
                  colors={['#3F71D4', '#64A0E0', '#A6D9CE']}
                  style={styles.iconContainer}>
        <FontAwesomeIcon
          icon={faMotorcycle}
          size={50}
          color="#fff"
          style={styles.icon}
        />
        </LinearGradient>

        <Text style={styles.title}>Delivery Person</Text>

        <Text style={styles.subtitle}>
          Choose the delivery option for the executive
        </Text>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleSelectOption('Once')}>
          <Text style={styles.buttonText}>Allow Once</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleSelectOption('Frequent')}>
          <Text style={styles.buttonText}>Allow Frequently</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  iconContainer: {
    borderRadius: 40,
    padding: 15,
    marginBottom: 10,
    height:80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#3B6FD6',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButtonText: {
    color: 'white',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: '#3B6FD6',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#D9534F',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default DeliveryType;


