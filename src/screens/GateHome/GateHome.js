import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import {
  faClock,
  faTools,
  faTruck,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import commonStyles from '../../commonStyles/commonStyles';
import LinearGradient from 'react-native-linear-gradient';
import {SaveGuestNotification} from '../../api/myHome/fcmService';

export default function GateHomeScreen({fcmToken}) {
  const navigation = useNavigation();

  const [guestName, setGuestName] = useState(''); // State to store the guest name input
  console.log('FCM Token:', fcmToken);
  // Function to send notification to resident
  const sendNotificationToResident = async () => {
    const req = {
      residentId: 1241, // Resident ID (hardcoded for now)
      guestName: guestName,
    };

    await SaveGuestNotification(req);
    Alert.alert('Success', 'Notification sent successfully.');
  };
  const cards = [
    {
      id: 1,
      label: 'Service Provider',
      route: 'GateServiceProvider',
      icon: faTools,
      gradient: ['#7F79D1', '#6F72A3'],
    },
    {
      id: 2,
      label: 'Delivery Person',
      route: 'GateDelivery',
      icon: faTruck,
      gradient: ['#4B8DFF', '#4B8DFF'],
    },
    {
      id: 3,
      label: 'Visitors',
      // route: 'GateVisitors',
      route: 'Visitors Log',
      icon: faUsers,
      gradient: ['#648A61', '#D1F2D1'],
    },
    {
      id: 4,
      label: 'Delivery Waiting',
      route: 'DeliveryWaitingScreen',
      icon: faClock,
      gradient: ['#FF8D4E', '#FF8D4E'],
    },
  ];

  return (
    <ScrollView style={commonStyles.container}>
      <LinearGradient
        colors={['#3F71D4', '#64A0E0', '#A6D9CE']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{uri: 'https://picsum.photos/id/237/200/300'}}
            style={styles.avatar}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>ASPEN WOODS Apartments</Text>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesomeIcon icon={faBell} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.cardContainer}>
        {cards.map(card => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardWrapper}
            onPress={() => navigation.navigate(card.route)}>
            <LinearGradient colors={card.gradient} style={styles.cardSquare}>
              <FontAwesomeIcon icon={card.icon} size={30} color="#fff" />
              <Text style={commonStyles.submitButtonText}>{card.label}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
GateHomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
  fcmToken: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  notificationButton: {
    backgroundColor: '#3F71D4',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  notificationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cardWrapper: {
    width: '48%', // Adjust width for two cards in a row
    aspectRatio: 1, // ensures a square card
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardSquare: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
