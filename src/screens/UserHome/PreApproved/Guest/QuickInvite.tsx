import React, {useState, useEffect} from 'react';
import Logger from '../utils/logger';
import PropTypes from 'prop-types';
import Logger from '../utils/logger';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Logger from '../utils/logger';
import {faCalendar, faClock, faLock} from '@fortawesome/free-solid-svg-icons';
import Logger from '../utils/logger';
import {useNavigation} from '@react-navigation/native';
import Logger from '../utils/logger';
import LinearGradient from 'react-native-linear-gradient';
import Logger from '../utils/logger';
import DateTimePicker from '@react-native-community/datetimepicker';
import Logger from '../utils/logger';

const QuickInvite = ({type}) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(
    type === 'Private' ? 'Once' : type || 'Once',
  );
  const [isPrivate, setIsPrivate] = useState(type === 'Private');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [validHours, setValidHours] = useState('');
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const handleStartDateChange = selectedDate => {
    if (selectedDate) {setDate(selectedDate);}
  };

  const handleEndDateChange = selectedDate => {
    if (selectedDate) {setEndDate(selectedDate);}
  };

  const handleSelection = option => {
    Logger.debug('Selected option:', option);
    setSelectedOption(option);
  };

  useEffect(() => {
    if (type === 'Private') {
      setSelectedTab('Once');
      setIsPrivate(true);
    } else if (type === 'Frequent') {
      setSelectedTab('Frequently');
      setIsPrivate(false);
    } else {
      setSelectedTab('Once');
    }
  }, [type]);

  const formatTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  const createGuestLink = () => {
    const optionValue = selectedOption || 'None';
    navigation.navigate('Create Guest', {
      selectedTab,
      isPrivate,
      date,
      time,
      validHours,
      selectedOption: optionValue,
      entryTime: time,
      endDate,
    });
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Once' && styles.activeTab]}
            onPress={() => setSelectedTab('Once')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Once' && styles.activeTabText,
              ]}>
              Once
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'Frequently' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('Frequently')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Frequently' && styles.activeTabText,
              ]}>
              Frequently
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'Once' ? (
          <View style={styles.content}>
            <View style={styles.privateContainer}>
              <Text style={styles.switchLabel}>Make it private</Text>
              <View style={styles.switchContainer}>
                <Switch
                  value={isPrivate}
                  onValueChange={setIsPrivate}
                  trackColor={{false: '#ddd', true: '#3B6FD6'}}
                  thumbColor={isPrivate ? '#fff' : '#f4f3f4'}
                  style={styles.switchStyle}
                />
              </View>
              <View style={styles.privateTextContainer}>
                <Text style={styles.privateDesc}>
                  This allows silent entries of your guests without disturbing
                  others.
                </Text>
              </View>
              <FontAwesomeIcon
                icon={faLock}
                size={20}
                style={styles.lockIcon}
              />
            </View>

            <Text style={styles.label}>Select Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOpenStartDatePicker(true)}>
              <Text style={styles.selectedText}>{date.toDateString()}</Text>
              <FontAwesomeIcon icon={faCalendar} size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Starting from</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenTimePicker(true)}>
                  <Text style={styles.selectedText}>{formatTime(time)}</Text>
                  <FontAwesomeIcon icon={faClock} size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Valid for(Hours)</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.validHoursInput,
                    styles.selectedText,
                  ]}
                  value={validHours}
                  onChangeText={text => setValidHours(text)}
                  keyboardType="numeric"
                  placeholder="Enter hours"
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={styles.label}>Allow entry for next</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.selectionButton,
                  selectedOption === '1 week' && styles.selectedButton,
                ]}
                onPress={() => handleSelection('1 week')}>
                <Text
                  style={[
                    styles.selectedText,
                    selectedOption === '1 week' && styles.selectedTextActive,
                  ]}>
                  1 week
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.selectionButton,
                  selectedOption === '1 month' && styles.selectedButton,
                ]}
                onPress={() => handleSelection('1 month')}>
                <Text
                  style={[
                    styles.selectedText,
                    selectedOption === '1 month' && styles.selectedTextActive,
                  ]}>
                  1 month
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.selectionButton,
                  selectedOption === '>1 month' && styles.selectedButton,
                ]}
                onPress={() => handleSelection('>1 month')}>
                <Text
                  style={[
                    styles.selectedText,
                    selectedOption === '>1 month' && styles.selectedTextActive,
                  ]}>
                  &gt;1 month
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Start date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenStartDatePicker(true)}>
                  <Text style={styles.selectedText}>{date.toDateString()}</Text>
                  <FontAwesomeIcon icon={faCalendar} size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>End date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenEndDatePicker(true)}>
                  <Text style={styles.selectedText}>
                    {endDate.toDateString()}
                  </Text>
                  <FontAwesomeIcon icon={faCalendar} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity onPress={createGuestLink}>
          <LinearGradient
            colors={['#3F71D4', '#64A0E0', '#A6D9CE']}
            style={styles.selectGuestButton}>
            <Text style={styles.selectGuestText}>
              {type === 'Private'
                ? 'Create Private Guest(s)'
                : 'Create Guest(s)'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {openStartDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setOpenStartDatePicker(false);
              if (selectedDate) {
                handleStartDateChange(selectedDate);
              }
            }}
          />
        )}

        {openEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setOpenEndDatePicker(false);
              if (selectedDate) {
                handleEndDateChange(selectedDate);
              }
            }}
          />
        )}

        {openTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={(event, selectedTime) => {
              setOpenTimePicker(false);
              if (selectedTime) {
                setTime(selectedTime);
              }
            }}
          />
        )}
      </View>
    </View>
  );
};
QuickInvite.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
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
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {flex: 1, padding: 10, alignItems: 'center'},
  activeTab: {borderBottomWidth: 2, borderBottomColor: 'black'},
  tabText: {fontSize: 16, color: 'gray'},
  activeTabText: {color: 'black', fontWeight: 'bold'},
  content: {marginTop: 20},
  privateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  privateTextContainer: {flex: 1, marginLeft: 10},
  privateTitle: {fontWeight: 'bold', color: 'black'},
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  privateDesc: {fontSize: 12, color: 'gray'},
  lockIcon: {color: '#666'},
  label: {marginTop: 10, fontSize: 14, fontWeight: 'bold', color: 'black'},
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  halfInput: {width: '48%'},
  validHoursInput: {
    height: 40,
    paddingVertical: 5,
    fontSize: 16,
  },
  selectionButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    alignItems: 'center',
    marginTop: 5,
    width: '30%',
  },
  selectGuestButton: {
    backgroundColor: '#3B6FD6',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  selectGuestText: {fontWeight: 'bold', color: '#FFFFFF'},
  closeButton: {marginTop: 10, alignItems: 'center'},
  closeText: {color: 'red', fontSize: 16, marginTop: 10},
  selectedText: {color: 'black'},
  selectedButton: {backgroundColor: '#3B6FD6'},
  selectedTextActive: {color: 'white'},
});

QuickInvite.propTypes = {
  type: PropTypes.oneOf(['Once', 'Frequent', 'Private']).isRequired,
};

export default QuickInvite;
