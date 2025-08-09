import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CheckBox from '@react-native-community/checkbox';
import {
  getAllVisitorsLog,
  visitorCheckOut,
} from '../../../api/myHome/visitorLog';
import useConfig from '../../../hooks/useConfig';
import moment from 'moment';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Logger from '../../../utils/logger';

const VisitorLog = () => {
  const config = useConfig();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const apartmentId = config?.company?.id;

  useEffect(() => {
    const fetchVisitorLogs = async () => {
      try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

        const response = await getAllVisitorsLog(apartmentId, formattedDate);
        const filteredLogs = response.filter(log => {
          if (activeTab === 'Upcoming') {
            return (
              new Date(log.expectedArrival) > new Date() && !log.latestEntryTime
            );
          }
          if (activeTab === 'Checked In') {
            return log.latestEntryTime && !log.latestExitTime;
          }
          if (activeTab === 'Checked Out') {
            return log.latestExitTime;
          }
          return false;
        });
        setVisitorLogs(filteredLogs);
      } catch (error) {
        Logger.error('Error fetching Visitor logs:', error);
      }
    };

    if (apartmentId) {
      fetchVisitorLogs();
    }
  }, [apartmentId, selectedDate, activeTab]);

  useEffect(() => {
    if (selectAll) {
      const allSelectedItems = visitorLogs.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {});
      setSelectedItems(allSelectedItems);
    } else {
      setSelectedItems({});
    }
  }, [selectAll, visitorLogs]);

  const handleCheckboxChange = id => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckOut = async visitorLog => {
    const visitorId = {
      id: visitorLog.id,
    };
    try {
      await visitorCheckOut(visitorId);
      Alert.alert('Success', 'Visitor checked out');
      setVisitorLogs(prev => prev.filter(log => log.id !== visitorId));
    } catch (error) {
      Alert.alert('Error', 'Failed to check out visitor');
      Logger.error(error);
    }
  };

  const ListHeaderComponent = () => (
    <View>
      <TextInput
        style={styles.searchBox}
        placeholder="Search your Visitor"
        placeholderTextColor="#888"
      />

      <View style={styles.selectAllContainer}>
        {activeTab === 'Checked In' && (
          <>
            <CheckBox
              value={selectAll}
              onValueChange={() => setSelectAll(prev => !prev)}
              tintColors={{true: '#000', false: '#000'}}
            />
            <Text style={styles.selectAllText}>Select All</Text>
          </>
        )}
        <View style={styles.dateBoxWrapper}>
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateBoxText}>Select Date</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        {['Upcoming', 'Checked In', 'Checked Out'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.tab, activeTab === status && styles.activeTab]}
            onPress={() => setActiveTab(status)}>
            <Text
              style={[
                styles.tabText,
                activeTab === status && styles.activeTabText,
              ]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const EmptyListMessage = () => (
    <View style={{padding: 20, alignItems: 'center'}}>
      <Text style={{color: '#888'}}>No visitors found for this date.</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={visitorLogs}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {ListHeaderComponent()}
            <Text style={styles.totalVisitorsText}>
              Total Visitors: {visitorLogs.length}
            </Text>
          </>
        )}
        ListEmptyComponent={EmptyListMessage}
        renderItem={({item}) => (
          <View style={styles.logItem}>
            {activeTab === 'Checked In' && (
              <CheckBox
                value={!!selectedItems[item.id]}
                onValueChange={() => handleCheckboxChange(item.id)}
                tintColors={{true: '#000', false: '#000'}}
              />
            )}
            <View style={styles.detailsContainer}>
              <View style={styles.row}>
                <View style={styles.iconNameRow}>
                  <FontAwesomeIcon
                    icon={faUser}
                    size={17}
                    color="#3B6FD6"
                    style={styles.userIcon}
                  />
                  <Text style={styles.nameText}>
                    {item.firstName} {item.lastName}
                  </Text>
                </View>
                {activeTab === 'Checked In' && (
                  <Text style={styles.subText}>
                    <Text style={styles.boldText}>Entry:</Text>{' '}
                    {item.latestEntryTime
                      ? moment(item.latestEntryTime).format('hh:mm A')
                      : '--'}
                  </Text>
                )}
                {activeTab === 'Checked Out' && (
                  <Text style={styles.subText}>
                    <Text style={styles.boldText}>Exit:</Text>{' '}
                    {item.latestExitTime
                      ? moment(item.latestExitTime).format('hh:mm A')
                      : '--'}
                  </Text>
                )}
              </View>

              <View style={styles.row}>
                <Text style={styles.subText}>
                  <Text style={styles.boldText}>Type:</Text>{' '}
                  {item.visitorTypeName}
                </Text>
                <Text style={styles.subText}>
                  <Text style={styles.boldText} />{' '}
                  {item.latestEntryTime
                    ? moment(item.latestEntryTime).format('DD MMM YYYY')
                    : '--'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.subText}>
                  <Text style={styles.boldText}>Visit To:</Text> {item.unitName}
                </Text>
                {activeTab === 'Checked In' && selectedItems[item.id] && (
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      paddingVertical: 6,
                      paddingHorizontal: 5,
                      backgroundColor: '#E53935',
                      borderRadius: 6,
                      alignSelf: 'flex-start',
                    }}
                    onPress={() => handleCheckOut(item)}>
                    <Text style={{color: 'white', fontWeight: '600'}}>
                      Check Out
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Create Visitors')}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    marginTop: 20,
    borderRadius: 10,
    color: '#000',
    marginHorizontal: 15,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 15,
  },
  selectAllText: {
    fontSize: 14,
    marginLeft: 10,
    color: 'black',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
  activeTab: {
    backgroundColor: '#3B6FD6',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  logItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  totalVisitorsText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    marginBottom: 10,
  },
  dateBoxWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15,
  },

  dateBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  dateBoxText: {
    fontSize: 14,
    color: '#333',
  },
  iconNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#3B6FD6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default VisitorLog;
