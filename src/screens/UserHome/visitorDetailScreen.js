import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { getVisitorsLog } from '../../api/myHome/visitorLog';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles/commonStyles';

const VisitorDetailScreen = ({ route }) => {
  const { apartmentId, visitorId, visitorTypeId } = route.params;
  const [visitorLog, setVisitorLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorLog = async () => {
      try {
        const logData = await getVisitorsLog(apartmentId, visitorId, visitorTypeId);
        setVisitorLog(logData);
      } catch (err) {
        setError('Failed to load visitor log');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorLog();
  }, [apartmentId, visitorId, visitorTypeId]);

  // Function to determine status based on entry & exit time
  const getStatus = (entryTime, exitTime) => {
    const now = new Date();
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);

    if (now >= entry && now <= exit) {
      return { text: 'Active', color: 'green', icon: 'check-circle' };
    } else {
      return { text: 'Inactive', color: 'red', icon: 'times-circle' };
    }
  };

  const formatDateTime = (date) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-US', options);
    
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    
    return `${formattedDate}, ${formattedTime}`;
  };

  if (loading) {
    return (
      <View style={styles.center}>
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

  return (
    <ScrollView style={commonStyles.container}>
      {visitorLog.length > 0 ? (
        visitorLog.map((log, index) => {
          const status = getStatus(log.entryTime, log.exitTime);

          return (
            <View key={index} style={styles.card}>
              {/* Visitor Name */}
              <Text style={commonStyles.visitorName}>
                <FontAwesome name="user" size={18} color="#3b5998" /> {log.visitorName}
              </Text>

              <View style={styles.statusContainer}>
                <Text style={[commonStyles.status, { color: status.color }]}>
                  <FontAwesome name={status.icon} size={14} /> {status.text}
                </Text>
              </View>
              <Text style={commonStyles.descriptionText}>
                <FontAwesome name="building" size={16} color="#444" /> Unit: {log.unitName}
              </Text>
              <Text style={commonStyles.descriptionText}>
                <FontAwesome name="cogs" size={16} color="#444" /> Visitor Type: {log.visitorTypeName}
              </Text>
              <Text style={commonStyles.descriptionText}>
                <FontAwesome name="map-marker" size={16} color="#444" /> From: {log.visitingFrom}
              </Text>
              <Text style={commonStyles.descriptionText}>
                <FontAwesome name="clock-o" size={16} color="green" /> Entry: {formatDateTime(log.entryTime)}
              </Text>
              <Text style={commonStyles.descriptionText}>
                <FontAwesome name="sign-out" size={16} color="red" /> Exit: {log.exitTime ? formatDateTime(log.exitTime) : 'N/A'}
              </Text>
            </View>
          );
        })
      ) : (
        <Text style={styles.noLogsText}>No logs found for this visitor.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  noLogsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  statusContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
    alignItems: 'flex-end',
  },
});

export default VisitorDetailScreen;
