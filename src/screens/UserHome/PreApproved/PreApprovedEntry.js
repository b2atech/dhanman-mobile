import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faPhone,
  faCarSide,
  faMotorcycle,
  faEnvelope,
  faCar,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const menuItems = [
  {id: '1', title: 'Guest', icon: faUser},
  {id: '2', title: 'Cab', icon: faCarSide},
  {id: '3', title: 'Delivery', icon: faMotorcycle},
];

const securityItems = [
  {id: '4', title: 'Call Security', icon: faPhone},
  {id: '5', title: 'Message Security', icon: faEnvelope},
  {id: '6', title: 'Search a Vehicle', icon: faCar},
];

const PreApprovedEntries = ({visible, onClose}) => {
  const navigation = useNavigation();
  const [navigateTo, setNavigateTo] = useState(null);

  useEffect(() => {
    if (!visible && navigateTo) {
      setTimeout(() => {
        navigation.navigate(navigateTo);
        setNavigateTo(null);
      }, 100);
    }
  }, [visible, navigateTo, navigation]);

  const handleMenuPress = screen => {
    setNavigateTo(screen);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.sectionTitle1}>Pre-approve entry</Text>
          <View style={styles.iconRow}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => {
                  if (item.id === '1') {
                    handleMenuPress('Guest Invite');
                  } else if (item.id === '2') {
                    handleMenuPress('Cab Entry');
                  } else {
                    handleMenuPress('Delivery Type');
                  }
                }}>
                <FontAwesomeIcon icon={item.icon} size={35} color="#3B6FD6" />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle2}>Security</Text>
          <View style={styles.iconRow}>
            {securityItems.map(item => (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <FontAwesomeIcon icon={item.icon} size={30} color="#3B6FD6" />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

PreApprovedEntries.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    height: '50%',
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
  },
  sectionTitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    marginVertical: 6,
  },
  menuText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 35,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#D9534F',
    marginTop: 25,
  },
});

export default PreApprovedEntries;
