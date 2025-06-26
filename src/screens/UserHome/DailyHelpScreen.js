import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getAllServiceProviders } from '../../api/myHome/serviceProvider';
import commonStyles from '../../commonStyles/commonStyles';

const DailyHelpScreen = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await getAllServiceProviders();
        setServiceProviders(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to load service providers');
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="#3b5998" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={serviceProviders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <Text style={[commonStyles.visitorName, styles.providerName]}>
              {item.firstName} {item.lastName}
            </Text>
            <View style={styles.detailRow}>
              <Text style={styles.unitName}>
                Contact: {item.contactNumber || 'N/A'}
              </Text>
              <Text style={styles.serviceProviderText}>
                Service: {item.serviceProviderSubType || 'N/A'}
              </Text>
            </View>
            <Text style={styles.unitName}>
              ID: {item.identityNumber || 'N/A'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 5,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unitName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 5,
  },
  serviceProviderText: {
    fontSize: 14,
    color: '#ff9900',
    flex: 1,
    textAlign: 'right',
  },
});

export default DailyHelpScreen;
