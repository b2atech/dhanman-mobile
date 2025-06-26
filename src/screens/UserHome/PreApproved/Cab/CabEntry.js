import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTaxi} from '@fortawesome/free-solid-svg-icons';

const CabEntry = () => {
  const navigation = useNavigation();
  const handleNavigation = type => {
    navigation.navigate('Cab Selection', {selectedTab: type});
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.cabContainer}>
        <LinearGradient
          colors={['#3F71D4', '#64A0E0', '#A6D9CE']}
          style={styles.iconContainer}>
          <FontAwesomeIcon icon={faTaxi} size={45} color="white" />
        </LinearGradient>
        <Text style={styles.title}>CAB</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('Once')}>
          <Text style={styles.buttonText}>Allow Once</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('Frequently')}>
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
  cabContainer: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    opacity: 0.95,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carIcon: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CabEntry;
