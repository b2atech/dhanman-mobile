import {useNavigation} from '@react-navigation/native';
import Logger from '../../../utils/logger';
import React, {useEffect, useState, useMemo} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import commonStyles from '../../../commonStyles/commonStyles';

import {getDeliveryCompanies} from '../../../api/myHome/delivery';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/common';
import { DeliveryCompany, GroupedCompanies } from '../../../types/delivery';

const defaultIcon = require('../../../assets/images/delivery.jpg');
const defaultUserIcon = require('../../../assets/images/user_icon.png');

export default function GateDeliveryScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [groupedItems, setGroupedItems] = useState<GroupedCompanies>({});

  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryManName, setDeliveryManName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSelectCompany = (company: any) => {
    setSelectedCompany(company);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!deliveryManName.trim()) {
      Alert.alert('Error', 'Please enter the delivery person\'s name.');
      return;
    }

    setModalVisible(false);

    navigation.navigate('DeliveryApproval', {
      deliveryManName,
      selectedCompany,
    });
  };

 useEffect(() => {
    const fetchAllCompanies = async () => {
      setLoading(true);
      try {
        const response: DeliveryCompany[] = await getDeliveryCompanies();
        const dataWithIcons: DeliveryCompany[] = response.map(item => ({
          ...item,
          deliveryCompanyIcon: defaultIcon,
        }));

        const grouped: GroupedCompanies = dataWithIcons.reduce((acc, item) => {
          const category = item.deliveryCompanyCategoryName;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {} as GroupedCompanies);

        setGroupedItems(grouped);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch delivery companies.');
        Logger.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, []);

const filteredGroupedItems = useMemo(() => {
  return Object.keys(groupedItems).reduce((acc, category) => {
    const filteredItems = groupedItems[category].filter(item =>
      item.deliveryCompanyName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {} as GroupedCompanies);
}, [groupedItems, searchQuery]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.container, styles.container]}>
      <Text style={commonStyles.headerText}>Company Name/From</Text>
      <TextInput
        style={commonStyles.searchBar}
        placeholder="Search Company"
        value={searchQuery}
        onChangeText={handleSearchChange}
        accessibilityLabel="Search Company Input"
      />
      <ScrollView>
        {Object.keys(filteredGroupedItems).map(category => (
          <View key={category} style={styles.category}>
            <Text style={commonStyles.headerText}>{category}</Text>
            <View style={styles.iconRow}>
              {filteredGroupedItems[category].map(item => (
                <TouchableOpacity
                  key={item.deliveryCompanyId}
                  style={styles.iconContainer}
                  onPress={() => handleSelectCompany(item)}
                  accessibilityLabel={`Select ${item.deliveryCompanyName}`}>
                  <Image
                    source={item.deliveryCompanyIcon || defaultIcon}
                    style={styles.icon}
                  />
                  <Text style={commonStyles.headerText}>
                    {item.deliveryCompanyName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={defaultUserIcon} style={styles.defaultUserIcon} />
            <Text style={commonStyles.headerText}>Delivery Person Name</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Enter Name"
              value={deliveryManName}
              onChangeText={setDeliveryManName}
              accessibilityLabel="Delivery Person Name Input"
            />
            <View style={styles.submitButton}>
            <Button
              title="Submit"
              onPress={handleSubmit}
            />
          </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  category: {
    marginBottom: 20,
    marginLeft: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    width: '33%',
    marginBottom: 15,
  },
  icon: {
    width: 80,
    height: 60,
    marginBottom: 5,
  },
  iconLabel: {
    textAlign: 'center',
  },
  defaultUserIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginTop: 20,
    width: '30%',
  },
});
