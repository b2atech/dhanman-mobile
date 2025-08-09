import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import useConfig from '../../hooks/useConfig';
import {getTicket} from '../../api/myHome/ticket';
import HeaderComponent from '../HeaderScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faCheckCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import commonStyles from '../../commonStyles/commonStyles';

const TicketHomeScreen = ({fcmToken}) => {
  const {user} = useContext(AuthContext);
  const config = useConfig();
  const roles = user?.roles || [];
  const [selectedRole, setSelectedRole] = useState(
    roles.length > 0 ? roles[0] : '',
  );
  const apartmentId = config?.company?.id;
  const [tickets, setTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTicket(apartmentId);
        const category = selectedRole;
        const filteredTickets = response.filter(
          ticket => ticket.ticketCategory === category,
        );
        setTickets(filteredTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [selectedRole]);

  const handleCloseTicket = ticket => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const handleSendNotification = () => {
    alert(`Notification sent for Unit: ${selectedTicket?.unit}`);
    setModalVisible(false);
  };

  return (
    <View style={commonStyles.container}>
      {user && (
        <HeaderComponent
          user={user}
          companyName={config?.company?.name}
          roles={roles}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}

      <FlatList
        data={tickets}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={[
              commonStyles.shadow,
              commonStyles.rounded,
              styles.ticketCard,
            ]}>
            <Text style={commonStyles.headerText}>{item.title}</Text>

            {/* Priority and Status */}
            <View style={[commonStyles.flexDirectionRow, styles.ticketRow]}>
              <Text style={[commonStyles.descriptionText, styles.text]}>
                {item.unit}
              </Text>

              <FontAwesomeIcon icon={faCheckCircle} size={22} />
              <Text style={[commonStyles.descriptionText, styles.text]}>
                {item.ticketPriority}
              </Text>
            </View>

            {/* Ticket Description */}
            <Text style={commonStyles.descriptionText}>{item.description}</Text>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => handleCloseTicket(item)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
          <Text style={[commonStyles.headerText, styles.noTicketsText]}>
            No Plumbing Tickets Found
          </Text>
        }
      />

      {/* Modal for Closing Ticket */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={[commonStyles.rounded, styles.modalContent]}>
            <Text style={[commonStyles.headerBoldText, styles.modalTitle]}>
              Close Ticket
            </Text>
            <Text style={[commonStyles.descriptionText, styles.modalText]}>
              Are you sure you want to close the ticket for Unit:{' '}
              <Text style={commonStyles.headerBoldText}>
                {selectedTicket?.unit}
              </Text>
              ?
            </Text>

            {/* Send Notification Button */}
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={handleSendNotification}>
              <FontAwesomeIcon icon={faBell} size={18} color="white" />
              <Text style={styles.notificationButtonText}>
                Send Notification
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <FontAwesomeIcon icon={faTimes} size={18} color="black" />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

TicketHomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
  fcmToken: PropTypes.string, // If optional
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  flatListContent: {
    paddingBottom: 80,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  ticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  text: {
    flex: 1,
    padding: 5,
  },
  noTicketsText: {
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 15,
  },
  notificationButton: {
    backgroundColor: '#3B6FD6',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  cancelButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButtonText: {
    marginLeft: 5,
    color: 'black',
  },
});

export default TicketHomeScreen;
