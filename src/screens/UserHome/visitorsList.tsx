import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useConfig from '../../hooks/useConfig';
import {getVisitorByUnitId} from '../../api/myHome/visitors';
import commonStyles from '../../commonStyles/commonStyles';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

const VisitorsList = () => {
  const config = useConfig();
  const navigation = useNavigation();
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apartmentId = config?.company?.id;
  const unitId = config?.unitIds?.[0];
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const visitorData = await getVisitorByUnitId(apartmentId, unitId);
        setVisitors(visitorData);
      } catch (err) {
        setError('Failed to load visitors');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, [apartmentId, unitId]);

  if (loading) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size="large" color="#3b5998" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.center}>
        <Text style={commonStyles.errorText}>{error}</Text>
      </View>
    );
  }

  const getVisitorIcon = visitorTypeName => {
    switch (visitorTypeName.toLowerCase()) {
      case 'guest':
        return {name: 'user', color: '#007bff'};
      case 'delivery':
        return {name: 'shopping-cart', color: '#28a745'};
      case 'service provider':
        return {name: 'wrench', color: '#ff9900'};
      default:
        return {name: 'question-circle', color: '#6c757d'};
    }
  };

  const handleVisitorClick = (apartmentId, visitorId, visitorTypeId) => {
    navigation.navigate('VisitorDetailScreen', {
      apartmentId,
      visitorId,
      visitorTypeId,
    });
  };

  const formatTime = time => {
    return time ? format(new Date(time), 'hh:mm a') : '';
  };

  const getTimeStatus = (entryTime, exitTime) => {
    const currentTime = new Date();
    const entryDate = new Date(entryTime);
    if (!exitTime) {
      return entryDate < currentTime ? 'green' : 'gray';
    }
    return 'red';
  };
  return (
    <View style={commonStyles.container}>
      <FlatList
        data={visitors}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({item}) => {
          const visitorIcon = getVisitorIcon(item.visitorTypeName || '');
          const timeStatus = getTimeStatus(item.entryTime, item.exitTime);
          // To Do consume API once Logs are generated.
          return (
            <TouchableOpacity
              style={[styles.visitorCard, commonStyles.shadow]}
              //  onPress={() => handleVisitorClick(apartmentId, item?.visitorId, item.visitorTypeId)}
              onPress={() => handleVisitorClick(apartmentId, 53, 1)}>
              <View style={styles.iconContainer}>
                <Icon
                  name={visitorIcon.name}
                  size={22}
                  color={visitorIcon.color}
                />
              </View>

              <View style={styles.visitorInfo}>
                <Text style={[commonStyles.visitorName, styles.visitorName]}>
                  {item.visitorName}
                </Text>
                <View style={styles.detailRow}>
                  {item.unitName && (
                    <Text style={styles.unitName}>Unit: {item.unitName}</Text>
                  )}

                  {item.serviceProviderSubTypeName && (
                    <Text style={styles.serviceProviderText}>
                      Service: {item.serviceProviderSubTypeName}
                    </Text>
                  )}
                </View>
                {item.entryTime && item.exitTime && (
                  <View style={styles.timeRow}>
                    <View style={styles.timeItem}>
                      <Icon
                        name="circle"
                        size={10}
                        color={timeStatus === 'green' ? 'green' : 'gray'}
                      />
                      <Text style={styles.timeText}>
                        Entry: {formatTime(item.entryTime)}
                      </Text>
                    </View>
                    <View style={styles.timeItem}>
                      <Icon name="circle" size={10} color="red" />
                      <Text style={styles.timeText}>
                        Exit: {formatTime(item.exitTime)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <Icon name="angle-right" size={20} color="#666" />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  visitorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 1,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visitorDetail: {
    fontSize: 14,
    color: '#666',
  },
  unitName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  timeText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceProviderText: {
    fontSize: 14,
    color: '#ff9900',
    flex: 1,
    textAlign: 'right',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 6,
  },
});

export default VisitorsList;
