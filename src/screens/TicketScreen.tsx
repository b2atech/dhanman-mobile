import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {getTicket, getTicketCategories} from '../api/myHome/ticket';
import commonStyles from '../commonStyles/commonStyles';
import useConfig from '../hooks/useConfig';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Logger from '../utils/logger';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFolderOpen,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faUser,
  faBuilding,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faLock,
  faHome,
  faLockOpen,
  faPlusCircle,
  faCircle,
  faCalendarAlt,
  faTrashAlt,
  faSeedling,
  faFirstAid,
  faQuestionCircle,
  faShieldHalved,
  faCoins,
  faSquareParking,
  faBoltLightning,
  faBroomBall,
  faExclamationTriangle,
  faFillDrip,
  faPersonSwimming,
  faTintSlash,
  faWifi3,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

interface TicketScreenProps {
  navigation?: StackNavigationProp<any>;
}

const TicketScreen: React.FC<TicketScreenProps> = () => {
  const config = useConfig();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const apartmentId = config?.company?.id;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allTickets, setAllTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getTicketCategories();
        setCategories(response.map(cat => ({label: cat.name, value: cat.id})));
      } catch (error) {
        Logger.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTicket(apartmentId);
        setAllTickets(response);
        setFilteredTickets(response); // Initially, display all tickets
      } catch (error) {
        Logger.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [apartmentId]);

  useEffect(() => {
    if (selectedCategory) {
      // Filter tickets based on selected category
      const filtered = allTickets.filter(
        ticket => ticket.ticketCategoryId === selectedCategory,
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [selectedCategory, allTickets]);

  const getStatusIcon = status => {
    switch (status) {
      case 'Open':
        return faLockOpen;
      case 'In Progress':
        return faClock;
      case 'Resolved':
        return faCheckCircle;
      case 'Cancelled':
        return faTimesCircle;
      case 'Rejected':
        return faBan;
      case 'Closed':
        return faLock;
      default:
        return faFolderOpen;
    }
  };

  const getPriorityIcon = priority => {
    switch (priority) {
      case 'Low':
        return {icon: faCircle, color: 'green'};
      case 'Medium':
        return {icon: faCircle, color: 'goldenrod'};
      case 'High':
        return {icon: faCircle, color: 'orange'};
      case 'Critical':
        return {icon: faCircle, color: 'red'};
      default:
        return {icon: faCircle, color: 'black'};
    }
  };

  const getCategoryIcon = category => {
    switch (category) {
      case 1:
        return faTools;
      case 2:
        return faShieldHalved;
      case 3:
        return faCoins;
      case 4:
        return faSquareParking;
      case 5:
        return faExclamationTriangle;
      case 6:
        return faBroomBall;
      case 7:
        return faBoltLightning;
      case 8:
        return faTintSlash;
      case 9:
        return faWifi3;
      case 10:
        return faCalendarAlt;
      case 11:
        return faPersonSwimming;
      case 12:
        return faTrashAlt;
      case 13:
        return faFillDrip;
      case 14:
        return faSeedling;
      case 15:
        return faFirstAid;
      case 16:
        return faQuestionCircle;
      default:
        return faQuestionCircle;
    }
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={commonStyles.headerBoldText}>
              <FontAwesomeIcon icon={faBuilding} size={20} />{' '}
              {config?.company?.name}
            </Text>
            <Text style={[styles.label, commonStyles.headerText]}>
              Select Category
            </Text>
            <Dropdown
              data={categories}
              labelField="label"
              valueField="value"
              value={selectedCategory}
              onChange={item => setSelectedCategory(item.value)}
              style={commonStyles.dropdown}
              selectedTextStyle={commonStyles.selectedTextStyle}
              itemTextStyle={commonStyles.dropdownItemTextStyle}
              placeholder="Select Category"
            />
          </>
        }
        contentContainerStyle={[commonStyles.container, styles.container]}
        data={filteredTickets}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.ticketCard}>
            <Text style={styles.ticketTitle}>{item.title}</Text>
            <View style={styles.ticketRow}>
              <FontAwesomeIcon
                icon={getCategoryIcon(item.ticketCategoryId)}
                size={22}
              />
              <Text style={[commonStyles.headerText, styles.text]}>
                {' '}
                {item.ticketCategory}
              </Text>
            </View>
            <View style={styles.ticketRow}>
              <FontAwesomeIcon
                icon={getPriorityIcon(item.ticketPriority).icon}
                size={22}
                color={getPriorityIcon(item.ticketPriority).color}
              />
              <Text style={[commonStyles.headerText, styles.text]}>
                {item.ticketPriority}
              </Text>
              <FontAwesomeIcon
                icon={getStatusIcon(item.ticketStatus)}
                size={22}
                color="#555"
              />
              <Text style={[commonStyles.headerText, styles.text]}>
                {item.ticketStatus}
              </Text>
            </View>
            <View style={styles.ticketRow}>
              <FontAwesomeIcon icon={faHome} size={15} />
              <Text style={[commonStyles.headerText, styles.text]}>
                {item.unit}
              </Text>
              <FontAwesomeIcon icon={faUser} size={15} />
              <Text style={[commonStyles.headerText, styles.text]}>
                {item.ticketAssigned}
              </Text>
            </View>
            <Text style={[commonStyles.descriptionText, styles.text]}>
              {item.description}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateTicket')}>
        <FontAwesomeIcon icon={faPlusCircle} size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3B6FD6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
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
  label: {
    marginBottom: 5,
  },
  container: {
    padding: 10,
  },
});

export default TicketScreen;
