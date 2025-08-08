import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle, faBuilding} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { IUser, IUnit } from '../types/common';

interface HeaderComponentProps {
  user: IUser;
  companyName: string;
  units: IUnit[];
  selectedUnit: string | null;
  setSelectedUnit: (unitId: string) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  user,
  companyName,
  units,
  selectedUnit,
  setSelectedUnit,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Set the first unit as default when component mounts
  useEffect(() => {
    if (units.length > 0 && !selectedUnit) {
      setSelectedUnit(units[0].id);
    }
  }, [units, selectedUnit, setSelectedUnit]);

  return (
    <>
      <LinearGradient
        colors={['#3F71D4', '#64A0E0', '#A6D9CE']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{uri: 'https://picsum.photos/id/237/200/300'}}
            style={styles.avatar}
          />

          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText}>
              Hello {user?.name || 'Guest'}!! 👋
            </Text>
            <Text style={styles.locationText}>{companyName}</Text>
            <Text style={styles.unitText}>
              Unit: {selectedUnit || 'Not Assigned'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon icon={faUserCircle} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Modal for Selecting Unit */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Unit</Text>

            <View style={styles.iconRow}>
              {units.map((unit: IUnit) => (
                <TouchableOpacity
                  key={unit.id}
                  style={styles.unitItem}
                  onPress={() => {
                    setSelectedUnit(unit.id);
                    setModalVisible(false);
                  }}>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    size={30}
                    color={selectedUnit === unit.id ? '#3B6FD6' : '#999'}
                  />
                  <Text
                    style={[
                      styles.unitLabel,
                      selectedUnit === unit.id && styles.selectedUnit,
                    ]}>
                    {unit.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  greetingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
  },
  unitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingBottom: 50,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  unitItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    marginVertical: 10,
  },
  unitLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedUnit: {
    color: '#3B6FD6',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#D9534F',
  },
});

export default HeaderComponent;
