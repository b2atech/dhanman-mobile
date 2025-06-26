import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import commonStyles from '../../../../commonStyles/commonStyles';
import {useRoute, useNavigation} from '@react-navigation/native';

const formatTime = (time, date = new Date()) => {
  if (!time || isNaN(time.split(':').join(''))) {
    console.error('Invalid time:', time);
    return 'Invalid Time';
  }

  const [hours, minutes] = time.split(':');
  const fullDate = new Date(date);

  fullDate.setHours(parseInt(hours, 10));
  fullDate.setMinutes(parseInt(minutes, 10));

  let formattedHours = fullDate.getHours();
  let ampm = formattedHours >= 12 ? 'PM' : 'AM';
  formattedHours = formattedHours % 12;
  formattedHours = formattedHours ? formattedHours : 12;
  const formattedMinutes =
    fullDate.getMinutes() < 10
      ? '0' + fullDate.getMinutes()
      : fullDate.getMinutes();

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const InviteLink = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {visitorDetails, startDate, endDate, entryTime, exitTime, selectedTab} =
    route.params;

  const [guestList, setGuestList] = useState([]);

  const guestName = visitorDetails?.firstName || 'Guest Name';
  const contactNumber = visitorDetails?.contactNumber || 'Phone Number';

  const formattedEntryTime = formatTime(entryTime);
  const formattedExitTime = formatTime(exitTime);

  navigation.navigate('Create Guest', {
    selectedTab,
    isPrivate,
    date: date.toISOString(),
    time: time.toISOString(),
    validHours,
    selectedOption,
    entryTime: time.toISOString(),
    endDate: endDate.toISOString(),
  });

  const handleEditGuest = index => {
    const guest = guestList[index];
    navigation.navigate('Create Guest', {guest, index});
  };

  const handleDeleteGuest = index => {
    Alert.alert('Delete Guest', 'Are you sure you want to delete this guest?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedGuestList = guestList.filter((_, i) => i !== index);
          setGuestList(updatedGuestList);
        },
      },
    ]);
  };

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Text style={styles.label}>
        {selectedTab === 'Once'
          ? 'Allow single entry between'
          : 'Allow frequent entry between'}
      </Text>
      <TextInput
        style={styles.input}
        value={
          selectedTab === 'Once'
            ? `${startDate} | ${formattedEntryTime} to ${formattedExitTime}`
            : `${startDate} to ${endDate}`
        }
        editable={false}
      />

      <Text style={styles.Note}>Add a Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your note here"
        multiline={true}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.GuestList}>Manage guest list</Text>
      <View style={styles.guestList}>
        <View style={styles.guestItem}>
          <View style={styles.guestInfo}>
            <Text style={styles.guestText}>{guestName}</Text>
            <Text style={styles.guestText}>{contactNumber}</Text>
          </View>
          <View style={styles.guestActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleEditGuest(index)}>
              <FontAwesomeIcon icon={faEdit} size={17} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDeleteGuest(index)}>
              <FontAwesomeIcon icon={faTrashAlt} size={17} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addGuestIcon}
        onPress={navigateToCreateGuest}>
        <FontAwesomeIcon icon={faPlus} size={18} color="black" />
        <Text style={styles.addGuestText}>Add Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createInviteButton}>
        <Text style={styles.createInviteText}>Create Invite</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  guestContainer: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    opacity: 0.95,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  Note: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  GuestList: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  guestList: {
    marginTop: 15,
    width: '100%',
    flex: 1,
  },
  guestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  guestInfo: {
    flex: 1,
  },
  guestText: {
    fontSize: 16,
    color: 'black',
  },
  guestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  addGuestIcon: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  addGuestText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  createInviteButton: {
    backgroundColor: '#3B6FD6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 80,
  },
  createInviteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InviteLink;
