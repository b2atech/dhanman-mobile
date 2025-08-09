import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Logger from '../utils/logger';
import {getVisitors} from '../../../api/myHome/visitors';
import {getVisitorsLog} from '../../../api/myHome/visitorLog';
import commonStyles from '../../../commonStyles/commonStyles';

const defaultUserIcon = require('../../../assets/images/user_icon.png');

const DeliveryWaitingScreen = () => {
  const [visitorName, setVisitorName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [insideData, setInsideData] = useState([]);
  const [waitingData, setWaitingData] = useState([]);
  const [activeTab, setActiveTab] = useState('inside');

  const visitorTypes = [
    {label: 'Delivery', value: 2},
    {label: 'Guest', value: 3},
    {label: 'Service Provider', value: 1},
  ];

  const calculateTimeDifference = entryTime => {
    const entryDate = new Date(entryTime);
    const currentDate = new Date();
    const diffMs = currentDate - entryDate;
    const diffMins = Math.floor(diffMs / 60000);
    return `${diffMins} mins`;
  };

  const handleSubmit = async () => {
    try {
      const visitors = await getVisitors();
      const visitor = visitors.find(x => x.firstName === visitorName);
      Logger.debug(visitor);
      if (!visitor) {
        Alert.alert('Error', 'Visitor not found');
        return;
      }
      const data = await getVisitorsLog(
        '12fb50f0-9998-456f-8aee-bb83ab2fbbdb',
        visitor.id,
        selectedCompany,
      );
      setInsideData(data);
      setWaitingData(data.waiting);
    } catch (error) {
      Logger.error('Error fetching visitor data:', error);
      Alert.alert('Error', 'Failed to fetch visitor data');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={defaultUserIcon} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={commonStyles.headerText}>{item.visitorName}</Text>
        <Text style={commonStyles.descriptionText}>{item.visitorTypeName}</Text>
        <Text style={commonStyles.descriptionText}>
          {calculateTimeDifference(item.entryTime)}
        </Text>
      </View>
      <View style={commonStyles.alignItemRight}>
        <Text style={commonStyles.descriptionText}>{item.time}</Text>
        <TouchableOpacity style={styles.outButton}>
          <Text style={styles.outButtonText}>IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[commonStyles.container, styles.container]}>
      <TextInput
        style={commonStyles.input}
        placeholder="Visitor's Name"
        value={visitorName}
        onChangeText={setVisitorName}
      />
      <Dropdown
        style={commonStyles.dropdown}
        data={visitorTypes}
        labelField="label"
        valueField="value"
        placeholder="Select visitor type"
        value={selectedCompany}
        onChange={item => setSelectedCompany(item.value)}
        selectedTextStyle={commonStyles.selectedTextStyle}
        itemTextStyle={commonStyles.dropdownItemTextStyle}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'inside' && styles.activeTab]}
          onPress={() => setActiveTab('inside')}>
          <Text style={commonStyles.headerBoldText}>Inside</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'waiting' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('waiting')}>
          <Text style={commonStyles.headerBoldText}>Waiting</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeTab === 'inside' ? insideData : waitingData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  outButton: {
    backgroundColor: '#1ab394',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  outButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
});

export default DeliveryWaitingScreen;
