import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  faUser,
  faCalendar,
  faArrowUp,
  faArrowDown,
  faIndianRupee,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import commonStyles from '../../../commonStyles/commonStyles';

const DefaulterScreen = ({route}) => {
  const {list} = route.params;
  const [sortedList, setSortedList] = useState(
    [...list].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)),
  );
  const [amountAscending, setAmountAscending] = useState(true);
  const [dateAscending, setDateAscending] = useState(false);

  const sortByAmount = () => {
    const sorted = [...sortedList].sort((a, b) =>
      amountAscending ? a.amount - b.amount : b.amount - a.amount,
    );
    setSortedList(sorted);
    setAmountAscending(!amountAscending);
  };

  const sortByDueDate = () => {
    const sorted = [...sortedList].sort((a, b) =>
      dateAscending
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate),
    );
    setSortedList(sorted);
    setDateAscending(!dateAscending);
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={sortByAmount}>
          <FontAwesomeIcon icon={faIndianRupee} style={styles.filterIcon} />
          <FontAwesomeIcon
            icon={amountAscending ? faArrowUp : faArrowDown}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={sortByDueDate}>
          <FontAwesomeIcon icon={faCalendar} style={styles.filterIcon} />
          <FontAwesomeIcon
            icon={dateAscending ? faArrowUp : faArrowDown}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {sortedList.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <FontAwesomeIcon icon={faUser} style={styles.icon} />
              <Text style={commonStyles.descriptionText}>
                {item.customerName}
              </Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={commonStyles.descriptionText}>
                ₹ {item.amount.toFixed(2)}
              </Text>
              <Text style={styles.dueDateText}>
                {' '}
                | Due: {new Date(item.dueDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

DefaulterScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          customerName: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
          dueDate: PropTypes.string.isRequired, // Expecting a date string
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  filterIcon: {
    fontSize: 18,
    color: '#3B6FD6',
    marginRight: 5,
  },
  filterText: {
    fontSize: 16,
    color: '#3B6FD6',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#3B6FD6',
    marginRight: 5,
  },
  dueDateText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
});

export default DefaulterScreen;
