import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserCheck,
  faPersonWalkingArrowLoopLeft,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

const GuestInvite = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Guest Invite</Text>
        <Text style={styles.subtitle}>
          Create pre-approval of expected visitors to ensure hassle-free entry
          for them
        </Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Quick Invite')}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Quick Invite</Text>
              <Text style={styles.cardDesc}>
                Ensure smooth entry by manually pre-approving guests. Best for
                small, personal gatherings.
              </Text>
            </View>
            <FontAwesomeIcon icon={faUserCheck} size={24} style={styles.icon} />
          </TouchableOpacity>

          {/* Frequent Invite */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Frequent Invite')}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Frequent Invite</Text>
              <Text style={styles.cardDesc}>
                Invite multiple guests with one simple link.
              </Text>
            </View>
            <FontAwesomeIcon
              icon={faPersonWalkingArrowLoopLeft}
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>

          {/* Private section */}
          <TouchableOpacity
            style={[styles.card]}
            onPress={() => navigation.navigate('Private Invite')}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Private Invite</Text>
              <Text style={styles.cardDesc}>
                This allows silent entries of your guests without disturbing
                others.
              </Text>
            </View>
            <FontAwesomeIcon icon={faLock} size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  cardContainer: {
    width: '100%',
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  cardDesc: {
    fontSize: 12,
    color: 'gray',
  },
  icon: {
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
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

export default GuestInvite;
